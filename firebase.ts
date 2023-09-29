import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCi4amyJHAyEhgh9GcCUxtxHRc2fkKXyZE',
  authDomain: 'develoffers.firebaseapp.com',
  projectId: 'develoffers',
  storageBucket: 'develoffers.appspot.com',
  messagingSenderId: '236723799317',
  appId: '1:236723799317:web:37eada82878a564920151c',
  measurementId: 'G-MB2EKV99BS',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);
