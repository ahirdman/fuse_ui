import { config } from '@/config/default';
import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const app = initializeApp(config.firebase.credentials);

const auth = getAuth(app);
connectAuthEmulator(auth, 'http://localhost:9099');

const fireStore = getFirestore(app);

export { auth, fireStore };
