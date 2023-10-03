import React, { createContext, useContext, useEffect, useState } from 'react';
import PostingForm from '@/components/posting-form';
import Timeline from '@/components/timeline';
import { auth } from '@/firebase';
import { LoginCheckContext, UpdateContext } from '../context';
import { useRouter } from 'next/router';

const Home = () => {
  const { setLoading } = useContext(LoginCheckContext);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const user = auth.currentUser;
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    if (!user) {
      router.push('/login');
      setLoading(false);
    }
    if (user) {
      setLoading(false);
    }
  }, []);

  if (!user) return;

  return (
    <UpdateContext.Provider value={{ isUpdate, setIsUpdate }}>
      {user?.displayName && (
        <>
          <h3>환영합니다, {user?.displayName}님</h3>
          <h2>홈, 모든 사용자의 포스팅을 확인 할 수 있습니다.</h2>

          <PostingForm />
          <Timeline />
        </>
      )}
    </UpdateContext.Provider>
  );
};

export default Home;
