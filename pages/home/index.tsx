import React, { createContext, useState } from 'react';
import PostingForm from '@/components/posting-form';
import Timeline from '@/components/timeline';
import { auth } from '@/firebase';
import { UpdateContext } from '../context';

const Home = () => {
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [isProfile, setProfile] = useState<boolean>(false);
  const user = auth.currentUser;

  return (
    <UpdateContext.Provider value={{ isUpdate, setIsUpdate }}>
      <h2>Home!!</h2>
      {user?.displayName && (
        <>
          <h3>Welcome, {user?.displayName}</h3>

          <PostingForm />
          <Timeline />
        </>
      )}
    </UpdateContext.Provider>
  );
};

export default Home;
