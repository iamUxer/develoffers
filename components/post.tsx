import { ButtonStyled, PostStyled } from '@/styles/components';
import { PostType } from './timeline';
import { auth, db, storage } from '@/firebase';
import Link from 'next/link';
import { DeleteIcon, EditIcon } from './icons';
import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { useContext, useEffect } from 'react';
import { UpdateContext, PostingEditModalContext } from '@/pages/context';
import { useRouter } from 'next/router';

const Post = (props: PostType) => {
  const { createdAt, photo, post, userId, userName, id } = props;
  const user = auth.currentUser;
  const { isUpdate, setIsUpdate } = useContext(UpdateContext);
  const { isModal, setModal } = useContext(PostingEditModalContext);
  const { isEdit, setEdit } = useContext(PostingEditModalContext);
  const router = useRouter();

  const onDelete = async () => {
    const isSure = confirm('확인을 누르면 삭제됩니다.');

    if (!isSure || user?.uid !== userId) return;

    try {
      await deleteDoc(doc(db, 'posts', id));
      if (photo) {
        const photoRef = ref(storage, `posts/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }
      setIsUpdate(true);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const onEdit = () => {
    if (user?.uid !== userId) return;
    // setTimeout(() => {
    // }, 1000);
    setEdit(props);
    setModal(true);
  };

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
        <span>작성: {dateFormat}</span>
        <Link href={''}>
          {user?.uid === userId && '나'}
          {user?.uid !== userId && userName}
        </Link>
        {user?.uid === userId && (
          <div className="button-function">
            <ButtonStyled size="sm" icon onClick={onDelete}>
              <DeleteIcon size="xs" color="primary" />
            </ButtonStyled>
            <ButtonStyled size="sm" icon onClick={onEdit}>
              <EditIcon size="xs" color="primary" />
            </ButtonStyled>
          </div>
        )}
        <p>{post}</p>
      </div>
    </PostStyled>
  );
};

export default Post;
