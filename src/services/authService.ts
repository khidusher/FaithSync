import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  type User as FirebaseUser
} from 'firebase/auth';
import { deleteDoc, doc, getDoc, runTransaction, setDoc } from 'firebase/firestore';
import type { User } from '../types';
import { requireFirebase } from '../lib/firebase';

export type NewAccount = {
  email: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
};

export const subscribeToAuthState = (callback: (user: User | null) => void) => {
  const { auth } = requireFirebase();
  return onAuthStateChanged(auth, async firebaseUser => {
    if (!firebaseUser) {
      callback(null);
      return;
    }
    try {
      callback(await loadOrCreateProfile(firebaseUser));
    } catch (error) {
      console.error('Unable to load FaithSync profile', error);
      callback(null);
    }
  });
};

export async function signInWithEmail(email: string, password: string) {
  const { auth } = requireFirebase();
  await signInWithEmailAndPassword(auth, email.trim(), password);
}

export async function registerAccount(input: NewAccount) {
  const { auth, db } = requireFirebase();
  const credential = await createUserWithEmailAndPassword(auth, input.email.trim(), input.password);
  const uid = credential.user.uid;
  const username = normalizeHandle(input.username);
  const faithSyncId = 'FS-' + uid.slice(0, 8).toUpperCase();
  const fullName = (input.firstName + ' ' + input.lastName).trim();
  const profile = {
    uid,
    username,
    faithSyncId,
    firstName: input.firstName,
    lastName: input.lastName,
    fullName,
    displayName: input.firstName,
    avatarUrl: 'https://api.dicebear.com/7.x/micah/svg?seed=' + encodeURIComponent(username) + '&backgroundColor=b6e3f4,c0aede',
    currentStreak: 0,
    bestStreak: 0,
    totalCompletedDays: 0,
    quietTimeGoalMinutes: 10,
    preferredQuietTime: 'Morning',
    readingPlanId: 'plan_walk_with_jesus',
    currentDayNumber: 1,
    isOnboarded: false,
    createdAt: new Date().toISOString()
  };

  try {
    await runTransaction(db, async transaction => {
      const handleRef = doc(db, 'handles', username);
      const faithIdRef = doc(db, 'faithSyncIds', faithSyncId.toLowerCase());
      const [handleSnapshot, idSnapshot] = await Promise.all([
        transaction.get(handleRef),
        transaction.get(faithIdRef)
      ]);
      if (handleSnapshot.exists()) throw new Error('That username is already taken. Try another one.');
      if (idSnapshot.exists()) throw new Error('Could not create a unique FaithSync ID. Please try again.');
      transaction.set(doc(db, 'users', uid), profile);
      transaction.set(doc(db, 'publicProfiles', uid), toPublicProfile(profile));
      transaction.set(handleRef, { uid });
      transaction.set(faithIdRef, { uid });
    });
  } catch (error) {
    await deleteDoc(doc(db, 'users', uid)).catch(() => undefined);
    await deleteDoc(doc(db, 'publicProfiles', uid)).catch(() => undefined);
    await credential.user.delete().catch(() => undefined);
    throw error;
  }
  return profileToUser({ ...profile, email: input.email });
}

export async function sendPasswordReset(email: string) {
  const { auth } = requireFirebase();
  await sendPasswordResetEmail(auth, email.trim());
}

export async function signOutAccount() {
  const { auth } = requireFirebase();
  await signOut(auth);
}

async function loadOrCreateProfile(firebaseUser: FirebaseUser): Promise<User> {
  const { db } = requireFirebase();
  const profileRef = doc(db, 'users', firebaseUser.uid);
  for (let attempt = 0; attempt < 8; attempt += 1) {
    const snapshot = await getDoc(profileRef);
    if (snapshot.exists()) {
      const profile = snapshot.data();
      await setDoc(doc(db, 'publicProfiles', firebaseUser.uid), toPublicProfile(profile), { merge: true });
      return profileToUser({ ...profile, email: firebaseUser.email || '' });
    }
    await new Promise(resolve => window.setTimeout(resolve, 150));
  }
  const emailName = (firebaseUser.email || 'friend').split('@')[0].toLowerCase().replace(/[^a-z0-9_]/g, '') || 'friend';
  const profile = {
    uid: firebaseUser.uid,
    username: emailName,
    faithSyncId: 'FS-' + firebaseUser.uid.slice(0, 8).toUpperCase(),
    firstName: firebaseUser.displayName?.split(' ')[0] || emailName,
    lastName: firebaseUser.displayName?.split(' ').slice(1).join(' ') || '',
    fullName: firebaseUser.displayName || emailName,
    displayName: firebaseUser.displayName || emailName,
    avatarUrl: firebaseUser.photoURL || '',
    currentStreak: 0,
    bestStreak: 0,
    totalCompletedDays: 0,
    quietTimeGoalMinutes: 10,
    preferredQuietTime: 'Morning',
    readingPlanId: 'plan_walk_with_jesus',
    currentDayNumber: 1,
    isOnboarded: false,
    createdAt: new Date().toISOString()
  };
  await runTransaction(db, async transaction => {
    const handleRef = doc(db, 'handles', emailName);
    const current = await transaction.get(handleRef);
    if (current.exists() && current.data().uid !== firebaseUser.uid) {
      throw new Error('Your profile is missing and your email username is already used. Contact support to restore it.');
    }
    transaction.set(profileRef, profile);
    transaction.set(doc(db, 'publicProfiles', firebaseUser.uid), toPublicProfile(profile));
    transaction.set(handleRef, { uid: firebaseUser.uid });
    transaction.set(doc(db, 'faithSyncIds', profile.faithSyncId.toLowerCase()), { uid: firebaseUser.uid });
  });
  return profileToUser({ ...profile, email: firebaseUser.email || '' });
}

export function profileToUser(profile: Record<string, any>): User {
  return {
    id: profile.uid,
    email: profile.email || '',
    firstName: profile.firstName || profile.displayName || 'Friend',
    lastName: profile.lastName || '',
    fullName: profile.fullName,
    displayName: profile.displayName,
    username: profile.username || 'friend',
    faithSyncId: profile.faithSyncId || '',
    avatarUrl: profile.avatarUrl || '',
    photoURL: profile.photoURL,
    currentStreak: profile.currentStreak || 0,
    bestStreak: profile.bestStreak || 0,
    totalCompletedDays: profile.totalCompletedDays || 0,
    createdAt: profile.createdAt || new Date().toISOString(),
    quietTimeGoalMinutes: profile.quietTimeGoalMinutes || 10,
    preferredQuietTime: profile.preferredQuietTime || 'Morning',
    readingPlanId: profile.readingPlanId || 'plan_walk_with_jesus',
    currentDayNumber: profile.currentDayNumber || 1,
    isOnboarded: profile.isOnboarded || false
  };
}

function toPublicProfile(profile: Record<string, any>) {
  return {
    uid: profile.uid,
    username: profile.username,
    faithSyncId: profile.faithSyncId,
    displayName: profile.displayName || profile.firstName || 'Friend',
    avatarUrl: profile.avatarUrl || '',
    createdAt: profile.createdAt
  };
}

export const normalizeHandle = (value: string) => value.trim().toLowerCase().replace(/^@/, '');
