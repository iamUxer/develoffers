import React, { forwardRef, useState } from 'react';
import { ButtonStyled, InputTextStyled } from '@/styles/components';
import { PostingStyled } from '@/styles/pages/posting.styled';
import { useForm } from 'react-hook-form';
import { updateDoc } from 'firebase/firestore';
import { LoadingIcon } from './icons';

interface PostingFormValues {
  postText: string;
  file: File;
}

const PostingForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<PostingFormValues>({ mode: 'onChange' });
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState('');
  const [isFile, setFile] = useState(false);

  const onSubmit = async (data: PostingFormValues) => {
    const { postText, file } = data;
    if (isLoading || !postText) return;
    try {
      console.log(data);
      setLoading(true);

      await updateDoc;
    } catch (error) {
      console.log('error::', error);
    } finally {
    }
  };

  return (
    <PostingStyled>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputTextStyled
          register={register('postText')}
          name="postText"
          placeholder="뭐할래?"
          type="textarea"
          rows={5}
        />
        <InputTextStyled
          register={register('file', {
            onChange: (e) => setFile(true),
          })}
          name="file"
          type="file"
          id="file"
          accept="image/*"
          loading={isFile}
        />
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
      </form>
    </PostingStyled>
  );
};

export default PostingForm;
