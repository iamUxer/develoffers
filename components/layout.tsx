// import styled from 'styled-components';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import { HomeIcon, LogoutIcon, ProfileIcon } from './icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { auth } from '@/firebase';
import { ButtonStyled } from '@/styles/components';
import { useContext, useState } from 'react';
import { LoginCheckContext } from '@/components/context';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setLoading] = useState(true);
  const { isLogin, setLogin } = useContext(LoginCheckContext);
  const user = auth.currentUser;
  const router = useRouter();

  const onLogout = async () => {
    const logoutCheck = confirm('확인을 누르면 로그아웃 됩니다.');
    if (logoutCheck) {
      await auth.signOut();
      setLogin(false);
      router.push('/login');
    }
  };
  const onLogIn = async () => {
    setLogin(true);
    router.push('/home');
  };

  return (
    <>
      <Nav>
        <Link href={'/'}>
          <img src={'/logo.png'} alt="" />
        </Link>
        <ul>
          <li>
            <Link href={'/home'}>홈</Link>
          </li>
          <li>
            <Link href={'/profile'}>프로필</Link>
          </li>
          <li>
            <Link href={'/about'}>About</Link>
          </li>
          {user && (
            <li onClick={onLogout}>
              <ButtonStyled type="button" size="md" color="default" bordered>
                로그아웃
              </ButtonStyled>
            </li>
          )}
          {!user && (
            <li onClick={onLogIn}>
              <ButtonStyled type="button" size="md" color="default" bordered>
                로그인
              </ButtonStyled>
            </li>
          )}
        </ul>
      </Nav>
      <StyledLayout>{children}</StyledLayout>
    </>
  );
};

export default Layout;

const Nav = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 0 0 10px;
  width: 100%;
  background: ${theme.palette.bright};
  img {
    flex: 1;
    height: 32px;
  }
  ul {
    display: flex;
    flex: auto;
    align-items: center;
    justify-content: flex-end;
    height: 40px;
    & li {
      & + li {
        margin-left: 20px;
      }
    }
  }
`;

const StyledLayout = styled.div`
  /* display: flex; */
  padding: 20px;
  h2 {
    margin: auto;
    margin-bottom: 15px;
    max-width: 480px;
    color: ${theme.palette.primary};
  }
`;
