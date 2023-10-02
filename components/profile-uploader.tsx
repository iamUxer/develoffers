import { ButtonStyled, InputTextStyled } from '@/styles/components';
import { ProfileUploaderStyled } from '@/styles/components/profileUploader.styled';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  CheckIcon,
  CloseIcon,
  EditIcon,
  ProfileIcon,
  UturnLeftIcon,
} from './icons';
import { auth, storage } from '@/firebase';
import imageCompression from 'browser-image-compression';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { updateProfile } from 'firebase/auth';

const ProfileUploader = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
    setFocus,
    setValue,
  } = useForm<ProfileFormValues>({ mode: 'onChange' });
  const previewFile = watch('profileFile'); // 이미지 프리뷰 와칭
  const [isPreview, setPreview] = useState<string | undefined>(''); // set preview image url
  const user = auth.currentUser;
  const photo = user?.photoURL;
  const [isEdit, setEdit] = useState(false);
  const [isDisplayName, setDisplayName] = useState(user?.displayName);
  const [isDelete, setDelete] = useState(false);

  useEffect(() => {
    setDelete(false);
    setValue('displayName', `${user?.displayName}`);
  }, [isEdit]);

  useEffect(() => {
    if (previewFile && previewFile.length > 0) {
      setPreview(URL.createObjectURL(previewFile[0]));
    }
  }, [previewFile]);

  const onDeleteImg = () => {
    setPreview(undefined);
    setDelete(true);
  };
  const onSubmit = async (data: ProfileFormValues) => {
    const { profileFile, displayName } = data;

    // 로그인 상태가 아니거나, 변경 사항이 없을 때, 종료
    if (!user || (!profileFile && displayName === ('' || null || undefined))) {
      setPreview('');
      setValue('profileFile', undefined);
      setValue('displayName', `${user?.displayName}`);
      setDelete(false);
      setEdit(false);
      reset();
      return;
    }

    const options = {
      maxSizeMB: 1, // 허용하는 최대 사이즈 지정
      maxWidthOrHeight: 800, // 허용하는 최대 width, height 값 지정
      useWebWorker: true, // webworker 사용 여부
    };

    try {
      // 변경 사항이 있을 때 === 업로딩 할 이미지가 있거나, 유저 정보 이름과 폼 이름이 같지 않을 때,
      if (
        (previewFile && previewFile.length > 0) ||
        user.displayName !== displayName ||
        isDelete
      ) {
        // 업로드한 이미지가 있을 때,
        if (previewFile && previewFile.length > 0 && isPreview) {
          const compressedFile = await imageCompression(
            previewFile?.[0],
            options
          );
          const locationRef = ref(storage, `profiles/${user.uid}`);
          const result = await uploadBytes(locationRef, compressedFile);
          const url = await getDownloadURL(result.ref);
          // 사진만 변경 됐을 때,
          if (user.displayName === displayName) {
            await updateProfile(user, {
              photoURL: url,
            });
          }

          // 둘 다 변경 됐을 때,
          if (user.displayName !== displayName) {
            await updateProfile(user, {
              photoURL: url,
              displayName: displayName,
            });
          }
        }

        // 이미지 삭제
        if (isDelete) {
          const locationRef = ref(storage, `profiles/${user.uid}`);
          // 스토리지에서 사진 삭제
          await deleteObject(locationRef);
          // 유저 정보에 강제로 null string 넣기
          await updateProfile(user, {
            photoURL: 'null',
          });
          setDelete(false);
        }
        // 이름만 변경 됐을 때,
        if (!isPreview && displayName !== user.displayName) {
          await updateProfile(user, {
            displayName: displayName,
          });
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPreview('');
      setValue('profileFile', undefined);
      setValue('displayName', `${user.displayName}`);
      setDelete(false);
      setEdit(false);
      reset();
    }
  };

  return (
    <ProfileUploaderStyled>
      <form onSubmit={handleSubmit(onSubmit)}>
        {isEdit && !isDelete === true && photo !== 'null' && (
          <ButtonStyled
            type="button"
            color="danger"
            size="xs"
            bordered
            onClick={onDeleteImg}
            onlyIcon
          >
            <CloseIcon size="xs" color="danger" />
          </ButtonStyled>
        )}
        <input
          {...register('profileFile')}
          type="file"
          id="profileFile"
          disabled={!isEdit}
          readOnly={!isEdit}
        />
        <label htmlFor="profileFile">
          {
            // firebase 사용자 정보 photoURL 있고, 프리뷰 이미지 없는 경우
            photo !== 'null' && photo && !isPreview && !isDelete && (
              <img src={photo} alt="" />
            )
          }
          {
            // 프리뷰 이미지 있는 경우
            isPreview && !isDelete && <img src={isPreview} alt="" />
          }
          {
            // firebase 사용자 정보 photoURL 없는 경우
            ((photo === 'null' && !isPreview) ||
              (!photo && !isPreview) ||
              isDelete) && <ProfileIcon size={'lg'} />
          }
        </label>
        <div>
          <InputTextStyled
            register={register('displayName')}
            name={'displayName'}
            placeholder={`${user?.displayName}`}
            type="text"
            readonly={!isEdit}
          />
          <ButtonStyled
            color="default"
            onClick={() => {
              setEdit(!isEdit);
              setFocus('displayName');
            }}
            type="button"
            onlyIcon
          >
            <>
              {!isEdit && <EditIcon size="xs" color="primary" />}
              {isEdit && <UturnLeftIcon size="xs" color="default" />}
            </>
          </ButtonStyled>
          {isEdit === true && (
            <ButtonStyled type="submit" color="primary" onlyIcon>
              <CheckIcon size="xs" color="bright" />
            </ButtonStyled>
          )}
        </div>
      </form>
    </ProfileUploaderStyled>
  );
};

export default ProfileUploader;

type ProfileFormValues = {
  profileFile: FileList | undefined;
  displayName: string | undefined;
};
