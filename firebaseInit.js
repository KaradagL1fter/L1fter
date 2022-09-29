import { initializeApp } from 'firebase/app';
const firebaseConfig = {
  apiKey: process.env.FB_API_KEY,
  authDomain: 'deutschrapclout-3d274.firebaseapp.com',
  projectId: 'deutschrapclout-3d274',
  storageBucket: 'deutschrapclout-3d274.appspot.com',
  messagingSenderId: '686095398944',
  appId: '1:686095398944:web:5d930d38e5b35725c26445',
  measurementId: 'G-7XDZFXNEGR',
};

export const app = initializeApp(firebaseConfig);
