import { auth } from '@/firebase';
import { LoginCheckContext } from '@/pages/context';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState();
  const { isLogin, setLogin } = useContext(LoginCheckContext);

  const checkedUser = async () => {
    try {
      const user = await auth.currentUser;
      if (user) {
        setLogin(true);
        router.push('/home');
      }
      // 첫 렌더링 시 초기값을 null로 주어, 로그인 체킹 후의 false와 완전히 구별하기 위함
      // 첫 렌더링 시 초기값을 false로 주면 로그인 체킹 전 부터 /login으로 진입해버린다.
      if (!user && isLogin !== null) {
        setLogin(false);
        router.push('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkedUser();
  }, []);

  return <>{children}</>;
};

export default AuthProvider;
