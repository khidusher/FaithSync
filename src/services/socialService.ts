import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  runTransaction,
  setDoc,
  where
} from 'firebase/firestore';
import type { EncouragementType, ReadingCompletion, User } from '../types';
import { profileToUser, normalizeHandle } from './authService';
import { requireFirebase } from '../lib/firebase';

export type CircleConnection = {
  id: string;
  requesterUid: string;
  recipientUid: string;
  status: 'pending' | 'accepted';
  direction: 'incoming' | 'outgoing' | 'accepted';
  user: User;
};

export type SharedActivity = {
  id: string;
  ownerUid: string;
  displayName: string;
  avatarUrl: string;
  scriptureReference: string;
  completedAt: string;
  encouragement?: { type: EncouragementType; senderUid: string };
};

const pairId = (a: string, b: string) => [a, b].sort().join('_');

export async function findProfileByHandle(input: string): Promise<User | null> {
  const { db } = requireFirebase();
  const value = normalizeHandle(input);
  if (!value) return null;
  const isFaithId = value.toLowerCase().startsWith('fs-');
  const ref = doc(db, isFaithId ? 'faithSyncIds' : 'handles', value.toLowerCase());
  const mapping = await getDoc(ref);
  if (!mapping.exists()) return null;
  const profile = await getDoc(doc(db, 'publicProfiles', mapping.data().uid));
  return profile.exists() ? profileToUser(profile.data()) : null;
}

export async function sendFriendRequest(fromUid: string, handle: string) {
  const { db } = requireFirebase();
  const target = await findProfileByHandle(handle);
  if (!target) throw new Error('No FaithSync account matches that username or FaithSync ID.');
  if (target.id === fromUid) throw new Error('You cannot add your own account.');
  const id = pairId(fromUid, target.id);
  const relationRef = doc(db, 'connections', id);
  await runTransaction(db, async transaction => {
    const existing = await transaction.get(relationRef);
    if (existing.exists()) {
      const data = existing.data();
      if (data.status === 'accepted') throw new Error('You are already connected.');
      if (data.status === 'pending') throw new Error('A friend request is already pending.');
    }
    transaction.set(relationRef, {
      uids: [fromUid, target.id].sort(),
      requesterUid: fromUid,
      recipientUid: target.id,
      status: 'pending',
      createdAt: new Date().toISOString()
    });
  });
}

export async function respondToFriendRequest(uid: string, connectionId: string, response: 'accepted' | 'declined') {
  const { db } = requireFirebase();
  const ref = doc(db, 'connections', connectionId);
  await runTransaction(db, async transaction => {
    const snapshot = await transaction.get(ref);
    if (!snapshot.exists() || snapshot.data().recipientUid !== uid || snapshot.data().status !== 'pending') {
      throw new Error('This request is no longer available.');
    }
    if (response === 'declined') transaction.delete(ref);
    else transaction.update(ref, { status: 'accepted', updatedAt: new Date().toISOString() });
  });
}

export async function removeConnection(uid: string, connectionId: string) {
  const { db } = requireFirebase();
  const ref = doc(db, 'connections', connectionId);
  const snapshot = await getDoc(ref);
  if (snapshot.exists() && snapshot.data().uids?.includes(uid)) await deleteDoc(ref);
}

export async function unshareCompletion(uid: string, completionId: string) {
  const { db } = requireFirebase();
  await deleteDoc(doc(db, 'users', uid, 'sharedActivity', completionId));
}

export async function shareCompletion(uid: string, completion: ReadingCompletion, user: User) {
  const { db } = requireFirebase();
  const connections = await getDocs(query(
    collection(db, 'connections'),
    where('uids', 'array-contains', uid),
    where('status', '==', 'accepted')
  ));
  if (connections.empty) return 0;
  const activityRef = doc(db, 'users', uid, 'sharedActivity', completion.id);
  await setDoc(activityRef, {
    id: completion.id,
    ownerUid: uid,
    displayName: user.displayName || user.firstName,
    avatarUrl: user.avatarUrl,
    scriptureReference: completion.scriptureReference,
    completedAt: completion.completedAt,
    visibility: 'friends'
  });
  return connections.size;
}

export async function listCircleData(uid: string) {
  const { db } = requireFirebase();
  const connectionsSnapshot = await getDocs(query(
    collection(db, 'connections'),
    where('uids', 'array-contains', uid)
  ));
  const connections: CircleConnection[] = [];
  const friendIds: string[] = [];
  for (const relationDoc of connectionsSnapshot.docs) {
    const relation = relationDoc.data();
    const friendUid = relation.requesterUid === uid ? relation.recipientUid : relation.requesterUid;
    const profileSnap = await getDoc(doc(db, 'publicProfiles', friendUid));
    if (!profileSnap.exists()) continue;
    const direction = relation.status === 'accepted'
      ? 'accepted'
      : relation.recipientUid === uid ? 'incoming' : 'outgoing';
    connections.push({ id: relationDoc.id, requesterUid: relation.requesterUid, recipientUid: relation.recipientUid, status: relation.status, direction, user: profileToUser(profileSnap.data()) });
    if (direction === 'accepted') friendIds.push(friendUid);
  }
  const feedPages = await Promise.all(friendIds.map(friendUid => getDocs(query(
    collection(db, 'users', friendUid, 'sharedActivity'),
    orderBy('completedAt', 'desc'),
    limit(20)
  ))));
  const feed = feedPages.flatMap(page => page.docs.map(item => item.data() as SharedActivity))
    .sort((a, b) => b.completedAt.localeCompare(a.completedAt))
    .slice(0, 20);
  return { connections, feed };
}

export async function sendActivityEncouragement(uid: string, activity: SharedActivity, type: EncouragementType) {
  const { db } = requireFirebase();
  await setDoc(doc(db, 'users', activity.ownerUid, 'sharedActivity', activity.id, 'encouragements', uid), {
    senderUid: uid,
    type,
    createdAt: new Date().toISOString()
  });
}
