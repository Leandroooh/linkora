import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDomsLVgrFspZnR4YyGcxieRpaKi-VC8t0',
  authDomain: 'sujeito-programador-a96d8.firebaseapp.com',
  projectId: 'sujeito-programador-a96d8',
  storageBucket: 'sujeito-programador-a96d8.firebasestorage.app',
  messagingSenderId: '526347064300',
  appId: '1:526347064300:web:fd00f90d0c08694ee6a6c9',
  measurementId: 'G-EG03LH5716',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
