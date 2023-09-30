import React, { useContext, useEffect, useState } from 'react';
import { ButtonStyled, InputTextStyled } from '@/styles/components';
import { PostingStyled } from '@/styles/pages/posting.styled';
import { useForm } from 'react-hook-form';
import { addDoc, collection, updateDoc } from 'firebase/firestore';
import { LoadingIcon } from './icons';
import { auth, db, storage } from '@/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import imageCompression from 'browser-image-compression';
import { AppContext } from '@/pages/context';

const PostingForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
    setValue,
  } = useForm<PostingFormValues>({ mode: 'onChange' });
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState('');
  const [isFile, setFile] = useState(false);
  const previewFile = watch('file');
  const [isURL, setURL] = useState('');
  const { isUpdate, setIsUpdate } = useContext(AppContext);
  console.log('isFile::', isFile);
  useEffect(() => {
    if (previewFile && previewFile.length > 0) {
      setURL(URL.createObjectURL(previewFile[0]));
    }
    console.log(previewFile);
  }, [previewFile]);

  const onSubmit = async (data: PostingFormValues) => {
    const { post, file } = data;
    const user = auth.currentUser;

    if (!user || isLoading || !post) return;

    const options = {
      maxSizeMB: 1, // 허용하는 최대 사이즈 지정
      maxWidthOrHeight: 800, // 허용하는 최대 width, height 값 지정
      useWebWorker: true, // webworker 사용 여부
    };

    try {
      setLoading(true);
      const doc = await addDoc(collection(db, 'posts'), {
        post,
        createdAt: Date.now(),
        userName: user.displayName || user.email,
        userId: user.uid,
      });

      // 이미지 파일이 있을 때,
      if (file && file.length > 0) {
        const compressedFile = await imageCompression(file?.[0], options);

        const locationRef = ref(storage, `posts/${user.uid}/${doc.id}`);
        const result = await uploadBytes(locationRef, compressedFile);
        const url = await getDownloadURL(result.ref);
        await updateDoc(doc, {
          photo: url,
        });
      }

      setFile(false);
      setIsUpdate(true);
      reset();
    } catch (error) {
      console.log('error::', error);
    } finally {
      // try 후 무조건 실행
      setLoading(false);
    }
  };

  const onDeleteImg = () => {
    setValue('file', undefined);
  };

  return (
    <PostingStyled>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputTextStyled
          register={register('post')}
          name="post"
          placeholder="뭐할래?"
          type="textarea"
          rows={5}
        />
        <div>
          <div>
            {previewFile && previewFile.length > 0 && <img src={isURL} />}
            <InputTextStyled
              register={register('file', {
                onChange: (e) => setFile(true),
              })}
              name="file"
              type="file"
              id="file"
              accept="image/*"
              already={isFile}
            />
            {previewFile && previewFile.length > 0 && (
              <ButtonStyled color="danger" bordered onClick={onDeleteImg}>
                사진 삭제
              </ButtonStyled>
            )}
          </div>
          {isLoading && (
            <ButtonStyled color="default">
              <>
                <LoadingIcon size="xs" rotate={'rotate'} /> 업로딩
              </>
            </ButtonStyled>
          )}
          {!isLoading && (
            <ButtonStyled type="submit" color="primary">
              포스팅
            </ButtonStyled>
          )}
        </div>
      </form>
    </PostingStyled>
  );
};

export default PostingForm;

type PostingFormValues = {
  post: string;
  file: FileList | undefined;
};
