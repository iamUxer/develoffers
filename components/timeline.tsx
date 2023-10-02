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
import { UpdateContext, PostingEditModalContext } from '@/pages/context';
import styled from '@emotion/styled';
import ModalPotal from './modalPotal';
import PostingEditForm from './posting-edit-form';

const Timeline = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const { isUpdate, setIsUpdate } = useContext(UpdateContext);
  const { isProfile, setProfile } = useContext(UpdateContext);
  const [isModal, setModal] = useState<boolean>(false);
  const [isEdit, setEdit] = useState<PostType>();
  const user = auth.currentUser;

  console.log(isProfile);

  useEffect(() => {}, []);

  const fetchPosts = async () => {
    const postsQuery = query(
      collection(db, 'posts'),
      orderBy('createdAt', 'desc'),
      limit(25) // 불러오기 갯수 제한
    );

    const profilePostsQuery = query(
      collection(db, 'posts'),
      where('userId', '==', user?.uid),
      orderBy('createdAt', 'desc'),
      limit(25)
    );
    try {
      let data;
      if (!isProfile) {
        data = await getDocs(postsQuery);
      }
      if (isProfile) {
        data = await getDocs(profilePostsQuery);
      }
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
      //loading false
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [isUpdate]);

  return (
    <PostingEditModalContext.Provider
      value={{ isModal, setModal, isEdit, setEdit }}
    >
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
