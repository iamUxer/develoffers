import { PostStyled } from '@/styles/components';
import { PostType } from './timeline';
import { auth } from '@/firebase';
import Link from 'next/link';

const Post = (props: PostType) => {
  const { createdAt, photo, post, userId, userName, id } = props;
  const user = auth.currentUser;

  const day = ['일', '월', '화', '수', '목', '금', '토'];
  const date = new Date(createdAt);
  const dateFormat =
    date.getFullYear() +
    '년 ' +
    (date.getMonth() + 1) +
    '월 ' +
    date.getDate() +
    '일 ' +
    day[date.getDay()] +
    '요일 ' +
    date.getHours() +
    '시 ' +
    date.getMinutes() +
    '분 ';

  return (
    <PostStyled>
      {photo && <img src={photo} />}
      <div>
        <span>{dateFormat}</span>
        <Link href={''}>
          {user?.uid === userId && '나'}
          {user?.uid !== userId && userName}
        </Link>
        <p>{post}</p>
      </div>
    </PostStyled>
  );
};

export default Post;
