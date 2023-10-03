import ProfileUploader from '@/components/profile-uploader';
import Timeline from '@/components/timeline';
import { auth } from '@/firebase';
import { useContext, useEffect, useState } from 'react';
import { LoginCheckContext, UpdateContext } from '../../components/context';
import PostingForm from '@/components/posting-form';
import { useRouter } from 'next/router';

const Profile = () => {
  const { setLoading } = useContext(LoginCheckContext);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [isProfile, setProfile] = useState<boolean>(true);
  const user = auth.currentUser;
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    if (!user) {
      router.push('/login');
      setLoading(false);
    }
    if (user) {
      setLoading(false);
    }
  }, []);

  if (!user) return;

  return (
    <UpdateContext.Provider
      value={{ isUpdate, setIsUpdate, isProfile, setProfile }}
    >
      <h2>프로필, 내 포스팅</h2>
      <ProfileUploader />
      <PostingForm />
      <Timeline />
    </UpdateContext.Provider>
  );
};

export default Profile;
