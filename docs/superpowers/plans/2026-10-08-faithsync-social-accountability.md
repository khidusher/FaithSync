# FaithSync Social Accountability Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver the V1 trusted-friend loop with accepted connections, opt-in completion sharing, a bounded activity feed, and gentle encouragement.

**Architecture:** Build a Firestore-backed social service over Firebase UIDs and the private-data foundation. Keep connection state, minimal shareable activity events, and private Quiet Time records in separate documents; enforce every relationship rule in Firestore Security Rules.

**Tech Stack:** React 19, TypeScript, Firebase Auth, Cloud Firestore, Vitest, Firebase Emulator Suite, `@firebase/rules-unit-testing`.

**Spec:** [FaithSync V1 product and Firebase design](../specs/2026-10-08-faithsync-v1-responsive-accessibility-performance-design.md)

## Global Constraints

- This plan depends on the completed Firebase foundation plan.
- Only exact username/FaithSync ID lookup is allowed; there is no browsable public directory.
- Activity is private by default; only an explicit completion share creates a friend-readable event.
- Friend feeds never expose reflections, prayers, journal text, verse highlights, or missed-day status.
- No direct messages, public ranking, groups, challenges, or monetization in V1.
- Keep `main` unchanged and work on `codex/faithsync-v1-responsive-a11y-polish`.

## Review Focus

- Duplicate and self-directed requests must be rejected without creating a connection.
- Only the recipient can accept/decline a pending request.
- Removing or blocking a friend immediately removes their feed access.
- Repeated completion/encouragement retries must not create duplicates.
- A forged event containing private fields must be rejected by Firestore Rules.

---

### Task 1: Social data model and security rules

**Files:**
- Modify: `src/types/index.ts`
- Modify: `firestore.rules`
- Create: `tests/rules/social-access.rules.test.ts`

**Interfaces:**
- Produces `ConnectionStatus = 'pending' | 'accepted' | 'declined'`; block records live in a separate owner-controlled collection.
- Produces `SharedActivityEvent` with `id`, `ownerUid`, `completedAt`, `scriptureReference?`, and `visibility: 'friends'`.
- Produces a deterministic `pairId(uidA: string, uidB: string): string`.

- [ ] **Step 1: Write emulator rule tests** for request creation, recipient-only acceptance, accepted friend event reads, non-friend denial, blocked-user denial, and private-field rejection.
- [ ] **Step 2: Run** `npm run test:rules -- tests/rules/social-access.rules.test.ts`; verify the new permissions fail before implementation.
- [ ] **Step 3: Add the connection/activity rules and pure `pairId` helper**; keep rules deny-by-default.
- [ ] **Step 4: Run the social rules test file**; expect each permitted and denied operation to match its assertion.
- [ ] **Step 5: Commit** as `feat: define secure friend and activity rules`.

### Task 2: Friend lookup and connection lifecycle

**Files:**
- Create: `src/services/socialService.ts`
- Modify: `src/context/AppContext.tsx`
- Modify: `src/components/friends/FriendsScreen.tsx`
- Create: `tests/unit/social-service.test.ts`

**Interfaces:**
- Produces `findProfileByHandle(handle: string): Promise<PublicProfile | null>`.
- Produces `sendFriendRequest(fromUid: string, toUid: string): Promise<void>`.
- Produces `respondToFriendRequest(uid: string, pairId: string, response: 'accepted' | 'declined'): Promise<void>`.
- Produces `removeConnection(uid: string, pairId: string): Promise<void>`.
- Produces `blockUser(uid: string, blockedUid: string): Promise<void>`.
- Produces `reportUser(uid: string, targetUid: string, reason: string): Promise<void>`.

- [ ] **Step 1: Write service tests** for normalized exact-handle lookup, self-request rejection, duplicate request idempotency, recipient-only response, remove, block, and report.
- [ ] **Step 2: Run** `npm run test -- tests/unit/social-service.test.ts`; confirm expected failures.
- [ ] **Step 3: Implement Firestore operations** with stable IDs/transactions and expose the connection state in AppContext.
- [ ] **Step 4: Run service and rules tests**; expect request transitions to pass and unauthorized transitions to fail.
- [ ] **Step 5: Commit** as `feat: add trusted friend connections`.

### Task 3: Shared completion and encouragement

**Files:**
- Create: `src/services/activityService.ts`
- Modify: `src/components/reading/CompletionModal.tsx`
- Modify: `src/components/reading/ReadingScreen.tsx`
- Modify: `src/context/AppContext.tsx`
- Modify: `firestore.rules`
- Create: `tests/rules/activity-sharing.rules.test.ts`

**Interfaces:**
- Produces `shareCompletion(uid: string, completionId: string, input: ShareCompletionInput): Promise<void>`.
- Produces `listFriendActivity(uid: string, limit: number, cursor?: ActivityCursor): Promise<ActivityPage>`.
- Produces `sendEncouragement(uid: string, eventId: string, type: EncouragementType): Promise<void>`.

- [ ] **Step 1: Write tests** for private-by-default completion, explicit share creation, stable event IDs, friend-only reads, and allowed encouragement types.
- [ ] **Step 2: Run** `npm run test:rules -- tests/rules/activity-sharing.rules.test.ts`; confirm expected failures.
- [ ] **Step 3: Implement a share toggle on completion** and create a minimal activity event only after explicit user choice.
- [ ] **Step 4: Implement the 20-item paginated friend feed and encouragement actions**; do not load private journal content.
- [ ] **Step 5: Run all social tests and `npm run build`**; expect private records to remain inaccessible from the friend client.
- [ ] **Step 6: Commit** as `feat: add opt-in friend activity and encouragement`.

### Task 4: Circle screen and navigation

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/components/friends/FriendsScreen.tsx`
- Modify: `src/components/navigation/BottomNavBar.tsx`
- Modify: `src/components/navigation/SidebarNav.tsx`
- Modify: `src/components/navigation/TopAppBar.tsx`
- Create: `tests/components/friends-screen.test.tsx`

**Interfaces:**
- Consumes: AppContext `friends`, `connections`, `activityFeed`, and social service actions.
- Produces: Circle tabs `Activity`, `Friends`, and `Requests`, all driven by real account data.

- [ ] **Step 1: Write component tests** for empty feed, pending request actions, accepted friend list, activity share visibility, and loading/error states.
- [ ] **Step 2: Run** `npm run test -- tests/components/friends-screen.test.tsx`; confirm the current hard-coded screen fails the data-driven assertions.
- [ ] **Step 3: Replace hard-coded examples and route Circle**; add a primary-navigation entry while keeping Settings accessible from the profile control.
- [ ] **Step 4: Run component tests and `npm run build`**; expect no mocked sample people in signed-in views.
- [ ] **Step 5: Commit** as `feat: connect the Circle experience to Firebase`.

## Handoff

This plan assumes private-account storage and Firebase Auth are complete. The responsive, accessibility, and offline-draft polish is handled by the experience-polish plan.
