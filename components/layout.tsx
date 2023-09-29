// import styled from 'styled-components';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import { HomeIcon, LogoutIcon, ProfileIcon } from './icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { auth } from '@/firebase';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const onLogout = async () => {
    const logoutCheck = confirm('확인을 누르면 로그아웃 됩니다.');
    if (logoutCheck) {
      await auth.signOut();
      router.push('/login');
    }
  };

  return (
    <>
      <span>Layout!</span>
      <ul>
        <li>
          <Link href={'/home'}>
            <HomeIcon size="sm" />
          </Link>
        </li>
        <li>
          <Link href={'/profile'}>
            <ProfileIcon size="sm" />
          </Link>
        </li>
        <li onClick={onLogout}>
          <LogoutIcon size="sm" />
        </li>
      </ul>
      <StyledLayout>{children}</StyledLayout>
    </>
  );
};

export default Layout;

const StyledLayout = styled.div`
  h2 {
    margin-bottom: 15px;
    color: ${theme.palette.primary};
  }
`;
