import React, { forwardRef, useState } from 'react';
import { ButtonStyled, InputTextStyled } from '@/styles/components';
import { JoinStyled } from '@/styles/pages/join.styled';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { auth } from '@/firebase';
import {
  GithubAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { GithubOutlined } from '@ant-design/icons';

const errors = {
  'auth/weak-password': 'Password should be at least 6 characters',
};

export type FormValues = {
  email: string;
  password: string;
};

const Login = forwardRef(() => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState('');
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({ mode: 'onBlur' });

  const onSubmit = async (data: FormValues) => {
    const { email, password } = data;
    if (isLoading || !email || !password) return;

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/home');
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.message);
      }
      setLoading(false);
    } finally {
    }
  };
  const onGithub = async () => {
    try {
      const provider = new GithubAuthProvider();
      const success = await signInWithPopup(auth, provider);
      if (success) {
        router.push('/home');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <JoinStyled>
        <h2>Log In</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputTextStyled
            register={register('email', {
              required: true,
            })}
            name="email"
            placeholder="이메일 입력"
            type="email"
          />
          {errors.email?.type === 'required' && <p>This is required.</p>}
          <InputTextStyled
            register={register('password', {
              required: true,
            })}
            name="password"
            placeholder="비밀번호 입력"
            type="password"
          />
          {errors.password?.type === 'required' && <p>This is required.</p>}
          {isLoading && (
            <ButtonStyled type="submit" color="loading" disabled={true}>
              Loading...
            </ButtonStyled>
          )}
          {!isLoading && (
            <ButtonStyled type="submit" color="primary">
              로그인
            </ButtonStyled>
          )}
          {isError && <p>{isError}</p>}
        </form>

        <span>
          계정이 없나요?
          <Link href={'/login/join'}>계정 만들기 &rarr;</Link>
        </span>

        <ButtonStyled type="submit" color="default" onClick={onGithub}>
          <>
            깃허브로 로그인
            <GithubOutlined />
          </>
        </ButtonStyled>
      </JoinStyled>
    </>
  );
});

export default Login;
