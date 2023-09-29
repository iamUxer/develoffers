import { db } from '@/firebase';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import Post from './post';
import { AppContext } from '@/pages/context';

const Timeline = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const { isUpdate, setIsUpdate } = useContext(AppContext);

  const fetchPosts = async () => {
    const postsQuery = query(
      collection(db, 'posts'),
      orderBy('createdAt', 'desc'),
      limit(25) // 불러오기 갯수 제한
    );
    try {
      const data = await getDocs(postsQuery);
      if (data) {
        const posts = data.docs.map((doc) => {
          const { createdAt, photo, post, userId, userName } = doc.data();
          return {
            createdAt,
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
    <>
      {posts.map((post) => {
        return <Post key={post.id} {...post} />;
      })}
    </>
  );
};

export default Timeline;

export type PostType = {
  createdAt: number;
  photo: string;
  post: string;
  userId: string;
  userName: string;
  id: string;
};
