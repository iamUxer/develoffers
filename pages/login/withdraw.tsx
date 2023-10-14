import { auth } from '@/firebase';
import { ButtonStyled } from '@/styles/components';
import { deleteUser, getAuth } from 'firebase/auth';

const onDeleteUser = async () => {
  const user = auth.currentUser;

  try {
    const result = await user?.delete();
    console.log(result);
  } catch (error) {
    console.log('error:', error);
  }
};

const WithDraw = () => {
  return (
    <>
      <div>탈퇴하기</div>
      <ButtonStyled type="submit" color="default" onClick={onDeleteUser}>
        <>탈퇴 고</>
      </ButtonStyled>
    </>
  );
};

export default WithDraw;
