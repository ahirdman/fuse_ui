import { config } from '@/config/default';
import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { getApp } from 'firebase/app';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

const app = initializeApp(config.firebase.credentials);
const auth = getAuth(app);
const fireStore = getFirestore(app);
const functions = getFunctions(getApp());

const { authentication, db, cloudFunctions } = config.firebase.emulators;

if (authentication.isActive) {
  connectAuthEmulator(auth, authentication.url);
}

if (db.isActive) {
  connectFirestoreEmulator(fireStore, db.origin, db.port);
}

if (cloudFunctions.isActive) {
  connectFunctionsEmulator(functions, cloudFunctions.origin, cloudFunctions.port);
}

export { auth, fireStore, functions };
