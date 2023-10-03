import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import Link from 'next/link';

export default function Page() {
  return (
    <IntroStyled>
      <Link href={'/home'}>
        <h2>Home</h2>
      </Link>
      <p>모든 사용자의 포스팅을 타임라인 형태로 볼 수 있는 공간</p>

      <Link href={'/profile'}>
        <h2>Profile</h2>
      </Link>
      <p>사용자 개인의 포스팅을 타임라인 형태로 볼 수 있는 공간</p>

      <Link href={'/about'}>
        <h2>About</h2>
      </Link>
      <p>사이트 개발 스펙과 이슈를 소개합니다.</p>
    </IntroStyled>
  );
}

const IntroStyled = styled.div`
  margin: auto;
  padding: 40px;
  margin-top: 50px;
  max-width: 480px;
  background: ${theme.palette.bright};
  border-radius: 10px;
  & p {
    & + a {
      display: block;
      margin-top: 30px;
    }
  }
  & a {
    & h2 {
      font-weight: 100;
    }
  }
`;
