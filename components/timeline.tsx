import { auth, db } from '@/firebase';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import Post from './post';
import { UpdateContext, PostingEditModalContext } from '@/components/context';
import styled from '@emotion/styled';
import ModalPotal from './modalPotal';
import PostingEditForm from './posting-edit-form';
import { useQuery } from 'react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const Timeline = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const { isUpdate, setIsUpdate } = useContext(UpdateContext);
  const { isProfile, setProfile } = useContext(UpdateContext);
  const { isAbout, setAbout } = useContext(UpdateContext);
  const [isModal, setModal] = useState<boolean>(false);
  const [isEdit, setEdit] = useState<PostType>();
  const user = auth.currentUser;

  //data = await getDocs(postsQuery); fetchPostsList 함수 선언해서 useQuery에서 사용해보기.

  const fetchPosts = async () => {
    const postsQuery = query(
      collection(db, 'posts'),
      orderBy('createdAt', 'desc'),
      limit(25) // 불러오기 갯수 제한
    );

    // fetch posts data for useQuery
    // const { data } = useQuery('postsList', fetchPostsList);

    const profilePostsQuery = query(
      collection(db, 'posts'),
      where('userId', '==', user?.uid),
      orderBy('createdAt', 'desc'),
      limit(25)
    );

    const aboutQuery = query(
      collection(db, 'about'),
      where('userId', '==', 'txbrBzvRJQXGFBmsX2wmF3q5uo73'),
      // orderBy('createdAt', 'desc'),
      limit(25)
    );
    try {
      let data;
      // '/home' => 모든 사용자 포스팅 보여주기
      if (!isProfile) {
        data = await getDocs(postsQuery);
      }
      // '/profile' => 내 포스팅만 보기
      if (isProfile) {
        data = await getDocs(profilePostsQuery);
      }
      // '/about' => about만 보기
      // if (isAbout) {
      //   console.log('??');
      //   data = await getDocs(aboutQuery);
      // }
      if (data) {
        const posts = data.docs.map((doc) => {
          const { createdAt, modifiedAt, photo, post, userId, userName } =
            doc.data();
          return {
            createdAt,
            modifiedAt,
            photo,
            post,
            userId,
            userName,
            id: doc.id,
          };
        });

        setPosts(posts);
      }
      setIsUpdate(false);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [isUpdate]);

  return (
    <PostingEditModalContext.Provider
      value={{ isModal, setModal, isEdit, setEdit }}
    >
      <SwiperCSS>
        <h2>title</h2>
        <Swiper
          slidesPerView={1}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
        </Swiper>
      </SwiperCSS>
      <TimeLineStyled>
        {posts.map((post) => {
          return <Post key={post.id} {...post} />;
        })}
      </TimeLineStyled>
      <ModalPotal>
        <PostingEditForm />
      </ModalPotal>
    </PostingEditModalContext.Provider>
  );
};

export default Timeline;

export type PostType = {
  createdAt: number;
  modifiedAt?: number;
  photo: string;
  post: string;
  userId: string;
  userName: string;
  id: string;
};

const TimeLineStyled = styled.div``;

const SwiperCSS = styled.div`
  overflow: hidden;
  width: 480px;
  height: 200px;
  padding: 30px 0;
  margin: auto;
  & h2 {
    padding: 0 20px;
  }
  & .swiper {
    padding: 0;
    width: 100%;
    height: calc(100% - 36px);
    overflow: hidden;
    & .swiper-wrapper {
      width: 100%;
      padding: 0;
      /* padding-left: 20px; */
    }
    & .swiper-slide {
      width: 100% !important;
      background: cornflowerblue;
      &.swiper-slide-active {
        width: calc(100% - 52px) !important;
      }
      & + .swiper-slide:not(.swiper-slide-active) {
        width: calc(100% - 6px) !important;
      }
      & + .swiper-slide {
        margin-left: 6px;
      }
      &:first-child {
        margin-left: 20px;
        width: 100% !important;
        &.swiper-slide-active {
          width: calc(100% - 46px) !important;
        }
      }
      &:last-child {
        &.swiper-slide-active {
          width: calc(100% - 46px) !important;
        }
      }
    }
  }
`;
