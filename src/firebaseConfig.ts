import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  // Paste your Firebase configuration object here
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
