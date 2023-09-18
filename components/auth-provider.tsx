import { auth } from '@/firebase';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const user = auth.currentUser;
  useEffect(() => {
    console.log('loading: ', isLoading, 'user: ', user);
    //useEffect가 user정보를 가져오기도 전에 먼저 실행이 되기때문에 setLoading 처리를 해줘야한다.
    setLoading(true);
    console.log('after set loading: ', isLoading, 'user: ', user);
    if (isLoading && user === null) {
      //로딩이 됐는데 유저가 없을때
      router.push('/login');
    }
  }, [user]);

  return <div>{children}</div>;
};

export default AuthProvider;
