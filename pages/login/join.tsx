import React, { forwardRef } from 'react';
import { InputTextStyled } from '@/styles/components/inputText.styled';
import { JoinStyled } from '@/styles/pages/join.styled';
import { useForm } from 'react-hook-form';

export interface FormValues {
  name: string;
  email: string;
  password: string;
}

interface OnSearchType {
  onJoin: (data: FormValues) => void;
}

const Join = forwardRef(() => {
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log(data);
    // onJoin(data);
  };
  return (
    <>
      <h2>Create Account</h2>
      <JoinStyled>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputTextStyled
            register={register('name')}
            name="name"
            placeholder="name"
          />
          <button type="submit">Join</button>
        </form>
      </JoinStyled>
    </>
  );
});

export default Join;
