# FaithSync V1 — Product, Accountability, and Firebase Design

**Status:** Approved conversational design; pending written-spec review  
**Date:** 2026-10-08  
**Repository:** `khidusher/FaithSync`  
**Work branch:** `codex/faithsync-v1-responsive-a11y-polish`

## 1. Product definition

**Tagline:** Grow in Faith. Grow Together.

FaithSync helps young Christians build a consistent Bible-reading and Quiet Time habit through personal progress and trusted-friend encouragement. It is an accountability product built around Scripture, not a replacement Bible reader or a general church-management platform.

The V1 loop is:

**Read → Complete → Track → Share (if chosen) → Encourage → Return**

A missed day is a normal interruption. It is never shown to friends, framed as failure, or used to shame the user.

## 2. Refined product rules and missing decisions

### Sharing contract

- A user's activity is private by default.
- The user may explicitly share a Quiet Time completion with accepted friends. The shared event contains only the user's display identity, completion date/time, and optional Scripture reference.
- Reflections, prayer text, journal entries, highlighted verses, and private notes are never included in the friend feed.
- The user can turn sharing off, remove a friend, block a user, or report a concern.
- V1 has no public activity feed, rankings, direct messages, or visibility of missed days.
- Friend discovery uses an exact username or FaithSync ID lookup; do not expose a browsable directory.

### Safety and audience

The concept includes senior-high-school students, so V1 includes friend-request controls, block/report actions, and no open messaging. Before a public launch, FaithSync must define its minimum supported age and who reviews safety reports. These are product release prerequisites; this design does not invent an age threshold or claim legal compliance.

### Success measurement

The primary measure is whether users return to Bible reading consistently, especially after an interruption. Track activation, daily/weekly active use, completion rate, 7/30-day retention, reading days per active user, plan completion, friend connections, encouragement actions, and return after a missed day. Do not send reflection, prayer, or journal text to analytics. Prefer aggregate event counts and clear definitions over a large dashboard of unvalidated metrics.

### V1 and later

V1 includes real accounts, daily reading and Quiet Time, private progress and journal, optional friend connections, completion sharing, encouragement, privacy controls, and restrained in-app notifications.

Accountability groups, shared challenges, organization tools, subscription tiers, premium plans, and advertising remain future options. V1 should validate adoption and consistency without monetization pressure.

## 3. Current codebase findings

The repository is a React, TypeScript, Vite, and Tailwind web app with the Today, Scripture, reflection, prayer, journal/calendar, and settings flows.

- `src/App.tsx` does not route the existing Circle/Friends screen.
- `src/components/friends/FriendsScreen.tsx` contains hard-coded people and local-only interactions.
- `src/context/AppContext.tsx` and `src/services/storage.ts` keep identity, friend records, prayer records, and quiet-time data in localStorage. The current login path creates a local user and does not authenticate a password.
- The current app has no Firebase SDK/configuration, Firestore rules, Firebase project file, or security-rule tests.

The current social UI is a prototype. Local browser state cannot provide real accounts, cross-device data, or actual friend-to-friend sharing.

## 4. Architecture and data boundaries

Use Firebase Authentication and Cloud Firestore. Start with email/password authentication, password reset, and an auth-state observer. Keep Google sign-in as a later provider. Firebase's modular web SDK supports these authentication flows and an observer for restoring signed-in state ([Firebase Auth for web](https://firebase.google.com/docs/auth/web/start)).

Suggested Firestore boundaries:

- `profiles/{uid}`: minimal discoverable profile fields (username, display name, avatar, discoverability).
- `usernames/{normalizedUsername}`: unique username reservation mapped to a UID.
- `users/{uid}/settings/{document}`: private preferences, reminders, and visibility controls.
- `users/{uid}/quietTimeEntries/{entryId}`: private completion details, reflection, prayer, verse highlights, and journal content.
- `connections/{pairId}`: friend request/accepted relationship state for its two member UIDs.
- `activityEvents/{eventId}`: minimal completion metadata, created only when the owner opts to share.
- `encouragements/{id}`: a bounded encouragement event sent between accepted friends.
- `blocks/{id}` and `reports/{id}`: safety actions with restricted access.

The exact field names can be finalized during implementation, but private and shareable content must remain in different documents. Firestore rules deny access by default, allow private data only to its owner, and allow a shared activity event only to its owner and an accepted, unblocked friend. User discovery returns only a minimal profile to an authenticated exact-handle lookup. Use bounded/paginated feed queries; never fetch the full journal to render a recent feed.

Cloud Firestore Security Rules are the authorization boundary for web client reads and writes ([Firestore security rules](https://firebase.google.com/docs/firestore/security/get-started)). Every client-visible operation must have a matching rule and emulator test.

## 5. Authentication, writes, and migration

- Replace local mock login/signup with Firebase Auth. Use Firebase UID as the stable owner key.
- Create a minimal profile and initial settings after signup; handle collisions for usernames with an atomic reservation.
- Friend requests require explicit acceptance. A block prevents future requests and hides the blocker's activity from the blocked account.
- A Quiet Time completion uses a stable, idempotent event ID so a retry cannot create a duplicate completion or shared event.
- Create a shared activity event only after an explicit share choice. Updating or deleting the private reflection/prayer must never modify a shared event.
- Offer a one-time, user-confirmed import of the current device's personal history after account creation. Import only the active user's personal entries/settings; never import seeded demo users, fake friend activity, or fake social relationships. Preserve local data until the import succeeds.
- Account export and deletion must cover Firebase records as well as any local drafts.

## 6. Offline behavior and privacy

Keep Firestore's persistent web cache disabled for V1 private spiritual records. Firebase documents that web persistence is disabled by default and that its cache is not automatically cleared between sessions, with a trusted-device consideration for sensitive information ([Firestore offline data](https://firebase.google.com/docs/firestore/manage-data/enable-offline)).

Keep unfinished writing drafts in account-scoped device storage until Firestore confirms the write. Show distinct states such as **Saved on this device**, **Syncing**, **Synced**, and **Could not sync — retry**. Do not claim a remote save based on a local cache. Clear a local draft after server acknowledgment or account deletion; never show it under a different UID. Keep offline completion retries idempotent.

## 7. App experience and quality requirements

- Wire the Circle screen into primary mobile and desktop navigation. Replace mock data with authenticated profiles, accepted connections, pending requests, recent shared completions, and encouragement actions.
- Add an explicit share control to the completion flow and a clear privacy setting. Keep private journal/reflection/prayer screens owner-only.
- Add accessible labels, semantic landmarks, visible keyboard focus, form error associations, dialog keyboard behavior, and reduced-motion support.
- Review mobile safe areas and tap targets, tablet breakpoints, and comfortable reading/writing widths on desktop.
- Keep Scripture typography comfortable; keep long-form reflection and prayer fields spacious.
- Show helpful loading, retry, empty, validation, and save states. Handle auth and network errors without exposing raw Firebase errors.
- Paginate the Circle feed (initially 20 recent events) and avoid loading the full journal for previews.
- Preserve the warm cream visual identity and remove only clutter or motion that competes with Scripture, writing, or navigation.

## 8. Verification and release setup

Implementation verification includes:

1. Build and TypeScript checks.
2. Firebase Emulator Suite tests for unauthenticated denial, owner access, accepted-friend shared-event access, non-friend denial, blocked-user denial, private reflection/prayer denial, friend-request transitions, and idempotent completion writes. Firebase recommends emulator-based Security Rules unit tests ([Firebase Rules unit tests](https://firebase.google.com/docs/rules/unit-tests)).
3. A manual V1 journey: sign up, complete Quiet Time, save and reopen private reflection/prayer, choose whether to share, send/accept a friend request, view the Circle feed, encourage a friend, change visibility, sign out/in, and confirm data remains private and available.
4. Responsive review at small/standard/large phone, portrait/landscape tablet, and desktop widths; keyboard-only navigation, screen-reader names, reduced motion, and offline/save-state review.

A Firebase project is not configured in this repository. Running the real backend will require a Firebase web app configuration, Email/Password Auth enabled, Firestore initialized, and local environment values. Keep per-environment configuration out of commits. Do not deploy rules or release the app as part of this design/implementation branch.

## 9. Out of scope

- Public social networking, direct messages, open member search, rankings, or shame-based streak mechanics.
- Accountability groups, organization administration, shared challenges, or monetization features.
- Replacing the Bible reader, adding an unlicensed Bible translation, or collecting private writing as analytics.
- Merging into `main`, deploying, or publishing before review.
