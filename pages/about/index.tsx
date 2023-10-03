import PostingForm from '@/components/posting-form';
import { auth } from '@/firebase';

const AboutThisSite = () => {
  const user = auth.currentUser;

  return (
    <>
      <h2>이 사이트는,</h2>
      {user && <PostingForm />}
    </>
  );
};

export default AboutThisSite;
