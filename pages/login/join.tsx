import React, { forwardRef } from 'react';
import { ButtonStyled, InputTextStyled } from '@/styles/components';
import { JoinStyled } from '@/styles/pages/join.styled';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

export interface FormValues {
  name: string;
  email: string;
  password: string;
}

interface OnSearchType {
  onJoin: (data: FormValues) => void;
}

const Join = forwardRef(() => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({ mode: 'onBlur' });

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
          {errors.name?.type === 'required' && <p>This is required.</p>}
          <InputTextStyled
            register={register('email', {
              required: true,
            })}
            name="email"
            placeholder="email"
            type="email"
          />
          {errors.email?.type === 'required' && <p>This is required.</p>}
          <InputTextStyled
            register={register('password', {
              required: true,
              maxLength: {
                value: 8,
                message: 'This input exceed maxLength.',
              },
            })}
            name="password"
            placeholder="password"
            type="password"
          />
          {errors.password?.type === 'required' && <p>This is required.</p>}
          {errors.password?.type === 'maxLength' && (
            <p>{errors.password.message}</p>
          )}
          <ButtonStyled type="submit" color="primary">
            Join
          </ButtonStyled>
        </form>
      </JoinStyled>
    </>
  );
});

export default Join;
