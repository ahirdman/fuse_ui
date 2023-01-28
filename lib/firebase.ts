import { config } from '@/config/default';
import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const app = initializeApp(config.firebase.credentials);

const auth = getAuth(app);

if (config.firebase.emulators.auth.active) {
  connectAuthEmulator(auth, config.firebase.emulators.auth.url);
}

const fireStore = getFirestore(app);

export { auth, fireStore };
