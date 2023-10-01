import { ButtonStyled } from '@/styles/components';
import { ProfileUploaderStyled } from '@/styles/components/profileUploader.styled';
import { Ref, forwardRef, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ProfileIcon } from './icons';
import { auth, storage } from '@/firebase';
import imageCompression from 'browser-image-compression';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';

const ProfileUploader = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
    setValue,
  } = useForm<ProfileFormValues>({ mode: 'onChange' });
  const previewFile = watch('profileFile'); // 이미지 프리뷰 와칭
  const [isURL, setURL] = useState(''); // set preview image url
  const user = auth.currentUser;
  const photo = user?.photoURL;

  console.log(photo);

  useEffect(() => {
    if (previewFile && previewFile.length > 0) {
      setURL(URL.createObjectURL(previewFile[0]));
    }
    if (previewFile === undefined) {
      setURL('');
    }
    console.log(previewFile);
  }, [previewFile]);

  const onDeleteImg = () => {
    setValue('profileFile', undefined);
  };

  const onSubmit = async (data: ProfileFormValues) => {
    const { profileFile } = data;

    if (!user || !profileFile) return;
    console.log(profileFile?.[0]);

    const options = {
      maxSizeMB: 1, // 허용하는 최대 사이즈 지정
      maxWidthOrHeight: 800, // 허용하는 최대 width, height 값 지정
      useWebWorker: true, // webworker 사용 여부
    };

    try {
      // 미리보기에 보이는 업로드한 사진이 있을 때,
      if (previewFile && previewFile.length > 0) {
        const compressedFile = await imageCompression(
          previewFile?.[0],
          options
        );
        const locationRef = ref(storage, `profiles/${user.uid}`);
        const result = await uploadBytes(locationRef, compressedFile);
        const url = await getDownloadURL(result.ref);
        await updateProfile(user, {
          photoURL: url,
        });
        setURL('');
        setValue('profileFile', undefined);
        reset();
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  return (
    <ProfileUploaderStyled>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('profileFile')} type="file" id="profileFile" />
        <label htmlFor="profileFile">
          {
            // firebase 사용자 정보 photoURL 있고, 프리뷰 이미지 없는 경우
            photo && !isURL && <img src={photo} alt="" />
          }
          {
            // 프리뷰 이미지 있는 경우
            isURL && <img src={isURL} alt="" />
          }
          {
            // firebase 사용자 정보 photoURL 없는 경우
            !photo && !isURL && <ProfileIcon size={'lg'} />
          }
        </label>
        {previewFile && previewFile.length > 0 && (
          <>
            <ButtonStyled type="submit" color="primary">
              프로필 저장
            </ButtonStyled>
            <ButtonStyled color="danger" bordered onClick={onDeleteImg}>
              사진 삭제
            </ButtonStyled>
          </>
        )}
      </form>
    </ProfileUploaderStyled>
  );
};

export default ProfileUploader;

type ProfileFormValues = {
  profileFile: FileList | undefined;
};
