import React, { forwardRef } from 'react';
import { ButtonStyled, InputTextStyled } from '@/styles/components';
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
  };
  return (
    <>
      <JoinStyled>
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputTextStyled
            register={register('name', {
              required: true,
            })}
            name="name"
            placeholder="name"
          />
          <InputTextStyled
            register={register('email')}
            name="email"
            placeholder="email"
            type="email"
          />
          <InputTextStyled
            register={register('password')}
            name="password"
            placeholder="password"
            type="password"
          />
          <ButtonStyled type="submit" color="primary">
            Join
          </ButtonStyled>
        </form>
      </JoinStyled>
    </>
  );
});

export default Join;
