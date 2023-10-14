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
