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
import { MobileFilled } from '@ant-design/icons';
import DateFormatter from './date-formatter';

const Post = (props: PostType) => {
  const { createdAt, modifiedAt, photo, post, userId, userName, id } = props;
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
    setEdit(props);
    setModal(true);
  };

  const createdDate = DateFormatter(createdAt);
  let modifiedDate;
  if (createdAt && modifiedAt) {
    modifiedDate = DateFormatter(modifiedAt);
  }

  return (
    <PostStyled>
      {photo && <img src={photo} />}
      <div>
        <span>작성: {createdDate}</span>
        {modifiedAt && <span>(수정됨)</span>}
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
