import React, { forwardRef, useState } from 'react';
import { ButtonStyled, InputTextStyled } from '@/styles/components';
import { JoinStyled } from '@/styles/pages/join.styled';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import {
  GithubAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { auth } from '@/firebase';
import { useRouter } from 'next/router';
import { FirebaseError } from 'firebase/app';
import Link from 'next/link';
import { GithubOutlined } from '@ant-design/icons';

const errors = {
  'auth/weak-password': 'Password should be at least 6 characters',
};

export interface FormValues {
  name: string;
  email: string;
  password: string;
}

const Join = forwardRef(() => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState('');
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({ mode: 'onBlur' });

  const onSubmit = async (data: FormValues) => {
    const { name, email, password } = data;
    console.log(data);
    if (isLoading || !name || !email || !password) return;

    try {
      setLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(credentials.user, {
        displayName: name,
      });
      router.push('/');
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
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
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
            })}
            name="password"
            placeholder="password"
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
              Join
            </ButtonStyled>
          )}
          {isError && <p>{isError}</p>}
        </form>

        <span>
          이미 계정을 가지고 있나요?
          <Link href={'/login'}>로그인 하기 &rarr;</Link>
        </span>

        <ButtonStyled type="submit" color="default" onClick={onGithub}>
          <>
            Log in with Github
            <GithubOutlined />
          </>
        </ButtonStyled>
      </JoinStyled>
    </>
  );
});

export default Join;
