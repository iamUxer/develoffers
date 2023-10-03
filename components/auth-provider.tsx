import { auth } from '@/firebase';
import { LoginCheckContext } from '@/components/context';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { clearScreenDown } from 'readline';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, setLoading } = useContext(LoginCheckContext);
  const { isLogin, setLogin } = useContext(LoginCheckContext);
  const router = useRouter();
  const checkedUser = async () => {
    try {
      if (isLogin) {
        router.push('/home');
      }
      // 첫 렌더링 시 초기값을 null로 주어, 로그인 체킹 후의 false와 완전히 구별하기 위함
      // 첫 렌더링 시 초기값을 false로 주면 로그인 체킹 전 부터 /login으로 진입해버린다.
      if (!isLogin) {
        router.push('/');
      }
    } catch (error) {
      console.log('auth provider::', error);
    }
  };

  useEffect(() => {
    checkedUser();
  }, [isLogin]);

  return <>{children}</>;
};

export default AuthProvider;
