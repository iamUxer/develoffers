import ProfileUploader from '@/components/profile-uploader';
import Timeline from '@/components/timeline';
import { auth } from '@/firebase';
import { useState } from 'react';
import { UpdateContext } from '../context';

const Profile = () => {
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [isProfile, setProfile] = useState<boolean>(true);

  return (
    <UpdateContext.Provider
      value={{ isUpdate, setIsUpdate, isProfile, setProfile }}
    >
      <h2>Profile!!</h2>
      <ProfileUploader />
      <Timeline />
    </UpdateContext.Provider>
  );
};

export default Profile;
