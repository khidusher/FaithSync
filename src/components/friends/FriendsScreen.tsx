import React, { useCallback, useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { firebaseConfigured } from '../../lib/firebase';
import {
  listCircleData,
  removeConnection,
  respondToFriendRequest,
  sendActivityEncouragement,
  sendFriendRequest,
  type CircleConnection,
  type SharedActivity
} from '../../services/socialService';

type CircleTab = 'activity' | 'friends' | 'requests';

export const FriendsScreen: React.FC = () => {
  const { currentUser } = useApp();
  const [activeTab, setActiveTab] = useState<CircleTab>('activity');
  const [connections, setConnections] = useState<CircleConnection[]>([]);
  const [feed, setFeed] = useState<SharedActivity[]>([]);
  const [handle, setHandle] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [encouraged, setEncouraged] = useState<string[]>([]);

  const refresh = useCallback(async () => {
    if (!currentUser || !firebaseConfigured) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError('');
    try {
      const result = await listCircleData(currentUser.id);
      setConnections(result.connections);
      setFeed(result.feed);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Could not load your Circle.');
    } finally {
      setLoading(false);
    }
  }, [currentUser?.id]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const handleAddFriend = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!currentUser || !handle.trim()) return;
    setError('');
    setNotice('');
    setSubmitting(true);
    try {
      await sendFriendRequest(currentUser.id, handle);
      setHandle('');
      setNotice('Friend request sent. Your friend will appear here after they accept.');
      await refresh();
    } catch (sendError) {
      setError(sendError instanceof Error ? sendError.message : 'Could not send the friend request.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResponse = async (connection: CircleConnection, response: 'accepted' | 'declined') => {
    if (!currentUser) return;
    setError('');
    try {
      await respondToFriendRequest(currentUser.id, connection.id, response);
      setNotice(response === 'accepted' ? 'You’re connected. You can now share Quiet Time completions.' : 'Request declined.');
      await refresh();
    } catch (responseError) {
      setError(responseError instanceof Error ? responseError.message : 'Could not update that request.');
    }
  };

  const handleRemove = async (connection: CircleConnection) => {
    if (!currentUser) return;
    setError('');
    try {
      await removeConnection(currentUser.id, connection.id);
      setNotice('Friend removed from your Circle.');
      await refresh();
    } catch (removeError) {
      setError(removeError instanceof Error ? removeError.message : 'Could not remove this friend.');
    }
  };

  const handleEncourage = async (activity: SharedActivity) => {
    if (!currentUser) return;
    try {
      await sendActivityEncouragement(currentUser.id, activity, 'growing_together');
      setEncouraged(previous => [...previous, activity.id]);
    } catch (encourageError) {
      setError(encourageError instanceof Error ? encourageError.message : 'Could not send encouragement.');
    }
  };

  if (!firebaseConfigured) {
    return (
      <section className="mx-auto max-w-3xl p-6 md:p-10">
        <h1 className="font-serif text-3xl font-bold text-[#2D2924]">Your Circle</h1>
        <div className="mt-5 rounded-2xl border border-[#E6DCCB] bg-[#FFFDF8] p-6">
          <h2 className="font-bold text-[#6B4F2A]">Connect Firebase to share Quiet Time</h2>
          <p className="mt-2 text-sm leading-6 text-[#766F67]">
            Add your Firebase web app settings to <code>.env.local</code>, enable Email/Password sign-in,
            and deploy <code>firestore.rules</code>. Then you and a friend can create accounts, connect by
            username or FaithSync ID, and share only the completions you choose.
          </p>
          <p className="mt-4 text-sm text-[#766F67]">Your FaithSync ID: <strong>{currentUser?.faithSyncId || 'available after account setup'}</strong></p>
        </div>
      </section>
    );
  }

  const visibleConnections = activeTab === 'friends'
    ? connections.filter(connection => connection.direction === 'accepted')
    : activeTab === 'requests'
      ? connections.filter(connection => connection.direction !== 'accepted')
      : [];

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-5 px-4 py-6 pb-24 md:px-8 md:pb-10">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#A67C52]">Grow together</p>
          <h1 className="mt-1 font-serif text-3xl font-bold text-[#2D2924]">Your Circle</h1>
          <p className="mt-1 text-sm text-[#766F67]">Share encouragement with friends, at your pace.</p>
        </div>
        <div className="rounded-xl border border-[#E6DCCB] bg-[#FFFDF8] px-3 py-2 text-xs text-[#766F67]">
          Your ID: <strong className="text-[#6B4F2A]">{currentUser?.faithSyncId}</strong>
        </div>
      </header>

      <form onSubmit={handleAddFriend} className="flex flex-col gap-2 rounded-2xl border border-[#E6DCCB] bg-[#FFFDF8] p-4 sm:flex-row">
        <label className="sr-only" htmlFor="friend-handle">Friend username or FaithSync ID</label>
        <input
          id="friend-handle"
          value={handle}
          onChange={event => setHandle(event.target.value)}
          placeholder="Friend’s username or FaithSync ID"
          className="min-h-11 min-w-0 flex-1 rounded-xl border border-[#E6DCCB] bg-white px-4 text-sm outline-none focus:border-[#6B4F2A]"
        />
        <button disabled={submitting || !handle.trim()} className="min-h-11 rounded-xl bg-[#6B4F2A] px-5 text-sm font-bold text-white disabled:opacity-50">
          {submitting ? 'Sending…' : 'Add friend'}
        </button>
      </form>

      <p className="rounded-xl bg-[#FFFDF8] px-4 py-3 text-xs leading-5 text-[#766F67]">
        Privacy by default: only your name, completion time, and Scripture reference are shared when you choose to share. Reflections, prayers, and missed days stay private.
      </p>

      {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</p>}
      {notice && <p role="status" className="rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-800">{notice}</p>}

      <nav aria-label="Circle sections" className="flex gap-2 border-b border-[#E6DCCB]">
        {(['activity', 'friends', 'requests'] as CircleTab[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            aria-current={activeTab === tab ? 'page' : undefined}
            className={`min-h-11 border-b-2 px-4 text-sm font-semibold capitalize ${activeTab === tab ? 'border-[#6B4F2A] text-[#6B4F2A]' : 'border-transparent text-[#766F67]'}`}
          >
            {tab === 'activity' ? 'Activity' : tab === 'friends' ? 'Friends' : 'Requests'}
          </button>
        ))}
      </nav>

      {loading ? (
        <p role="status" className="py-8 text-center text-sm text-[#766F67]">Loading your Circle…</p>
      ) : activeTab === 'activity' ? (
        feed.length ? (
          <div className="flex flex-col gap-3">
            {feed.map(activity => (
              <article key={activity.id} className="rounded-2xl border border-[#E6DCCB] bg-[#FFFDF8] p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <img src={activity.avatarUrl || 'https://api.dicebear.com/7.x/micah/svg?seed=friend'} alt="" className="h-11 w-11 rounded-full border border-[#E6DCCB] bg-[#F7F1E5]" />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-[#2D2924]">{activity.displayName} completed Quiet Time</p>
                    <p className="mt-1 text-sm text-[#766F67]">{activity.scriptureReference} · {new Date(activity.completedAt).toLocaleString()}</p>
                  </div>
                  <button
                    onClick={() => void handleEncourage(activity)}
                    disabled={encouraged.includes(activity.id)}
                    className="min-h-10 rounded-full border border-[#E6DCCB] px-3 text-xs font-bold text-[#6B4F2A] disabled:opacity-60"
                  >
                    {encouraged.includes(activity.id) ? 'Encouraged' : 'Encourage'}
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-[#D8CBB8] bg-[#FFFDF8] px-6 py-10 text-center">
            <h2 className="font-serif text-xl font-bold text-[#2D2924]">Your Circle starts with one friend</h2>
            <p className="mt-2 text-sm text-[#766F67]">Add a friend above. Once they accept, shared Quiet Time completions will appear here.</p>
          </div>
        )
      ) : (
        <div className="flex flex-col gap-3">
          {visibleConnections.length ? visibleConnections.map(connection => (
            <article key={connection.id} className="flex flex-wrap items-center gap-3 rounded-2xl border border-[#E6DCCB] bg-[#FFFDF8] p-4">
              <img src={connection.user.avatarUrl || 'https://api.dicebear.com/7.x/micah/svg?seed=friend'} alt="" className="h-11 w-11 rounded-full border border-[#E6DCCB] bg-[#F7F1E5]" />
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-[#2D2924]">{connection.user.displayName || connection.user.firstName}</p>
                <p className="text-xs text-[#766F67]">@{connection.user.username} · {connection.user.faithSyncId}</p>
                {connection.direction === 'outgoing' && <p className="mt-1 text-xs text-[#A67C52]">Request sent · waiting for acceptance</p>}
              </div>
              {connection.direction === 'incoming' && (
                <div className="flex gap-2">
                  <button onClick={() => void handleResponse(connection, 'accepted')} className="min-h-10 rounded-full bg-[#6B4F2A] px-4 text-xs font-bold text-white">Accept</button>
                  <button onClick={() => void handleResponse(connection, 'declined')} className="min-h-10 rounded-full border border-[#E6DCCB] px-4 text-xs font-bold text-[#766F67]">Decline</button>
                </div>
              )}
              {connection.direction === 'accepted' && (
                <button onClick={() => void handleRemove(connection)} className="min-h-10 rounded-full border border-[#E6DCCB] px-4 text-xs font-semibold text-[#766F67]">Remove</button>
              )}
            </article>
          )) : (
            <p className="rounded-2xl border border-dashed border-[#D8CBB8] bg-[#FFFDF8] px-6 py-10 text-center text-sm text-[#766F67]">
              {activeTab === 'friends' ? 'No friends yet. Add someone using their username or FaithSync ID.' : 'No pending friend requests.'}
            </p>
          )}
        </div>
      )}
      {!loading && <button onClick={() => void refresh()} className="self-center py-2 text-xs font-semibold text-[#6B4F2A]">Refresh Circle</button>}
    </section>
  );
};
