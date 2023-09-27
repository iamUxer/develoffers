import PostingForm from '@/components/posting-form';
import { auth } from '@/firebase';
import { ButtonStyled } from '@/styles/components';

const Home = () => {
  const user = auth.currentUser;

  return (
    <>
      <h2>Home!!</h2>
      {user?.displayName && (
        <>
          <h3>Welcome, {user?.displayName}</h3>
          <PostingForm />
        </>
      )}
    </>
  );
};

export default Home;
