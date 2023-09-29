import React, { createContext, useState } from 'react';
import PostingForm from '@/components/posting-form';
import Timeline from '@/components/timeline';
import { auth } from '@/firebase';

const Home = () => {
  const user = auth.currentUser;
  const [isUpdate, setIsUpdate] = useState(false);

  return (
    <>
      <h2>Home!!</h2>
      {user?.displayName && (
        <>
          <h3>Welcome, {user?.displayName}</h3>

          <PostingForm />
          <Timeline />
        </>
      )}
    </>
  );
};

export default Home;
