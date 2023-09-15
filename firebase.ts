import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDFWpX6PMdwpuTLxzsgin5CPBDSm0Gfkd0',
  authDomain: 'twitter-cloned-258b3.firebaseapp.com',
  projectId: 'twitter-cloned-258b3',
  storageBucket: 'twitter-cloned-258b3.appspot.com',
  messagingSenderId: '471869008876',
  appId: '1:471869008876:web:8ce337d66cf6ae07e36ec9',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
