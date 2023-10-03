import PostingForm from '@/components/posting-form';
import { auth } from '@/firebase';
import { useEffect, useState } from 'react';
import { UpdateContext } from '../../components/context';
import Timeline from '@/components/timeline';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

const AboutThisSite = () => {
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [isAbout, setAbout] = useState<boolean>(true);
  const [isProfile, setProfile] = useState<boolean>(true);
  const user = auth.currentUser;

  useEffect(() => {
    const now = new Date();
    console.log(now.getTime());
    setProfile(false);
  }, []);

  return (
    <UpdateContext.Provider
      value={{ isUpdate, setIsUpdate, isAbout, setAbout, setProfile }}
    >
      <h2>이 사이트는,</h2>
      {user?.email === 'bonethecomer@gmail.com' && <PostingForm />}
      {user && (
        <TempStyled>
          <h3>개발 스펙</h3>
          <ol>
            <li>Next.js, SWC, Typescript 셋팅</li>
            <li>@emotion styled 사용 (UI 컴포넌트 라이브러리 별도 제작)</li>
            <li>useContext, react-hook-form</li>
            <li>
              서버 리스 셋팅 - Firebase (authentication, firestore, storage)
            </li>
          </ol>
          <h3>개발 이슈</h3>
          <h4>Done</h4>
          <ol>
            <li>사용자 로그인에 따른 상태 제어 useContext 사용하기</li>
            <li>
              내가 쓴 글만 불러오기 - firebase query ⇒ 타임라인 컴포넌트
              재사용하기
            </li>
            <li>프로필 이름, 사진 수정하기, 사진 완전 삭제</li>
            <li>
              서버 리스 셋팅 - Firebase (authentication, firestore, storage)
            </li>
          </ol>
          <h4>To-Do</h4>
          <ol>
            <li>페이지네이션, 무한스크롤</li>
            <li>SSR 페이지 적용</li>
            <li>yup + react-hook-form으로 유효성 체크하기</li>
            <li>정규식 적용</li>
            <li>지도 API ⇒ 위치 넣기</li>
            <li>react-query 사용하기</li>
            <li>recoil 사용하기</li>
            <li>로컬서버 구축하기</li>
          </ol>
        </TempStyled>
      )}

      <Timeline />
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
