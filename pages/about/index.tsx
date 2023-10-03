import PostingForm from '@/components/posting-form';
import { auth } from '@/firebase';
import { useEffect, useState } from 'react';
import { UpdateContext } from '../../components/context';
import Timeline from '@/components/timeline';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import Link from 'next/link';

const AboutThisSite = () => {
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [isAbout, setAbout] = useState<boolean>(true);
  const [isProfile, setProfile] = useState<boolean>(true);
  const user = auth.currentUser;

  useEffect(() => {
    setProfile(false);
  }, []);

  return (
    <UpdateContext.Provider
      value={{ isUpdate, setIsUpdate, isAbout, setAbout, setProfile }}
    >
      <h2>이 사이트는,</h2>
      {user?.email === 'bonethecomer@gmail.com' && <PostingForm />}
      <TempStyled>
        <p>
          git repogitory : &nbsp;
          <Link href="https://github.com/iamUxer/develoffers">
            https://github.com/iamUxer/develoffers
          </Link>
        </p>
        <h3>개발 스펙</h3>
        <ol>
          <li>Next.js, SWC, Typescript 셋팅</li>
          <li>@emotion styled 사용 (UI 컴포넌트 라이브러리 제작)</li>
          <li>useContext, react-hook-form</li>
          <li>
            서버 리스 셋팅 - Firebase (authentication, firestore, storage)
          </li>
        </ol>
        <h3>개발 이슈</h3>
        <h4>Done</h4>
        <ol>
          <li>firebase 셋팅</li>
          <li>
            서버 리스를 위한 firebase 셋팅 - (authentication, firestore,
            storage, hosting)
          </li>
          <li>CRUD 작성, firebase API 적용, async await</li>
          <li>사용자, 로그인 상태 제어, useContext 사용하기</li>
          <li>타임라인 컴포넌트 재사용하기</li>
          <li>프로필 이름, 사진 수정하기, 사진 완전 삭제 등</li>
          <li>배포하기</li>
        </ol>
        <h4>To-Do</h4>
        <ol>
          <li>페이지네이션, 무한스크롤</li>
          <li>SSR 페이지 적용</li>
          <li>yup + react-hook-form으로 유효성 체크하기</li>
          <li>정규식 적용</li>
          <li>지도 API ⇒ 위치 넣기</li>
          <li>로컬서버 구축하기</li>
          <li>react-query, recoil 적용</li>
        </ol>
      </TempStyled>
      {/* {user && <Timeline />} */}
    </UpdateContext.Provider>
  );
};

export default AboutThisSite;

const TempStyled = styled.div`
  margin: auto;
  margin-bottom: 20px;
  padding: 20px 20px;
  max-width: 480px;
  background: ${theme.palette.bright};
`;
