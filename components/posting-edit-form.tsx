import React, { useContext, useEffect, useState } from 'react';
import { ButtonStyled, InputTextStyled } from '@/styles/components';
import { PostingStyled } from '@/styles/pages/posting.styled';
import { useForm } from 'react-hook-form';
import { deleteField, doc, updateDoc } from 'firebase/firestore';
import { LoadingIcon } from './icons';
import { auth, db, storage } from '@/firebase';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import imageCompression from 'browser-image-compression';
import { UpdateContext, PostingEditModalContext } from '@/components/context';

const PostingEditForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
    setFocus,
    setValue,
  } = useForm<PostingEditFormValues>({ mode: 'onChange' });
  const [isLoading, setLoading] = useState(false);
  const { isModal, setModal } = useContext(PostingEditModalContext);
  const { isEdit, setEdit } = useContext(PostingEditModalContext);
  const [isError, setError] = useState('');
  const previewFile = watch('editFile');
  const [isURL, setURL] = useState('');
  const { isUpdate, setIsUpdate } = useContext(UpdateContext);

  const { createdAt, photo, post, userId, userName, id } = isEdit;

  useEffect(() => {
    if (previewFile && previewFile !== 'deleted' && previewFile.length > 0) {
      setURL(URL.createObjectURL(previewFile[0]));
    }
  }, [previewFile]);

  useEffect(() => {
    setFocus('post');
  }, [setFocus]);

  useEffect(() => {
    setValue('post', post);
    setURL(photo);
  }, [isEdit]);

  const onSubmit = async (data: PostingEditFormValues) => {
    const { post, editFile } = data;
    const user = auth.currentUser;

    if (!user || isLoading || !post) return;

    const options = {
      maxSizeMB: 1, // 허용하는 최대 사이즈 지정
      maxWidthOrHeight: 800, // 허용하는 최대 width, height 값 지정
      useWebWorker: true, // webworker 사용 여부
    };

    try {
      setLoading(true);
      await updateDoc(doc(db, `posts/${id}`), {
        post,
        modifiedAt: Date.now(),
      });

      // 이미지가 교체 됐을 때,
      if (editFile !== 'deleted' && editFile.length > 0) {
        const compressedFile = await imageCompression(editFile?.[0], options);

        const locationRef = ref(storage, `posts/${user.uid}/${id}`);
        const result = await uploadBytes(locationRef, compressedFile);
        const url = await getDownloadURL(result.ref);
        await updateDoc(doc(db, `posts/${id}`), {
          photo: url,
        });
      }

      // 이미지 파일 완전 삭제 했을 때
      if (editFile === 'deleted') {
        const locationRef = ref(storage, `posts/${user.uid}/${id}`);
        // 스토리지에서 사진 삭제
        await deleteObject(locationRef);
        // 도큐먼트에서 이미지 URL 삭제
        await updateDoc(doc(db, `posts/${id}`), {
          photo: deleteField(),
        });
      }

      setIsUpdate(true);
      setModal(false);
      reset();
    } catch (error) {
      console.log('error::', error);
    } finally {
      // try 후 무조건 실행
      setLoading(false);
    }
  };

  const onDeleteImg = () => {
    setValue('editFile', 'deleted');
    setURL('');
  };

  return (
    <PostingStyled>
      {!isEdit && <span>로딩중...</span>}
      {isEdit && (
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
              {isURL && <img src={isURL} />}
              <InputTextStyled
                register={register('editFile')}
                name="editFile"
                type="file"
                id="editFile"
                accept="image/*"
                already={photo}
              />
              {isURL && (
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
                수정하기
              </ButtonStyled>
            )}
          </div>
        </form>
      )}
    </PostingStyled>
  );
};

export default PostingEditForm;

type PostingEditFormValues = {
  post: string;
  editFile: FileList | 'deleted';
};
