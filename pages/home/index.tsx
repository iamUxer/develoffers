import { auth } from '@/firebase';
import { useRouter } from 'next/router';
import { ButtonStyled } from '@/styles/components';

const Home = () => {
  const router = useRouter();
  const user = auth.currentUser;

  const logOut = () => {
    auth.signOut();
    router.push('/login');
  };
  return (
    <>
      <h2>Home!!</h2>
      {user?.displayName && <h3>Welcome, {user?.displayName}</h3>}
      {user && (
        <ButtonStyled size="sm" color="primary" onClick={logOut}>
          Log out
        </ButtonStyled>
      )}
    </>
  );
};

export default Home;
