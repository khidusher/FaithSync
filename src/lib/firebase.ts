import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

export const firebaseConfigured = Object.values(config).every(
  value => typeof value === 'string' && value.length > 0
);
export const firebaseApp = firebaseConfigured ? (getApps()[0] ?? initializeApp(config)) : null;
export const firebaseAuth = firebaseApp ? getAuth(firebaseApp) : null;
export const firestoreDb = firebaseApp ? getFirestore(firebaseApp) : null;

export function requireFirebase() {
  if (!firebaseAuth || !firestoreDb) {
    throw new Error('Firebase is not configured yet. Add the Firebase web settings to your .env.local file, then restart FaithSync.');
  }
  return { auth: firebaseAuth, db: firestoreDb };
}
