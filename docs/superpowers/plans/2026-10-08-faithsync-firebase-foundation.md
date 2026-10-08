# FaithSync Firebase Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace local mock authentication with Firebase Auth and owner-scoped Firestore storage for real FaithSync accounts and private records.

**Architecture:** Add a modular Firebase client, auth service, and private-data service, then adapt the existing app context and forms to those interfaces. Keep Firestore persistence in memory and retain local drafts/import data under the signed-in UID until writes are acknowledged.

**Tech Stack:** React 19, TypeScript, Vite 8, Firebase JS SDK, Vitest, Firebase Local Emulator Suite, `firebase-tools`, `@firebase/rules-unit-testing`.

**Spec:** [FaithSync V1 product and Firebase design](../specs/2026-10-08-faithsync-v1-responsive-accessibility-performance-design.md)

## Global Constraints

- Email/password is the only V1 sign-in provider; Google sign-in remains future work.
- Private reflections, prayers, and journal entries are owner-only and never shared through activity documents.
- Firestore persistent web cache remains disabled; private drafts are account-scoped on the device.
- Local history import requires explicit user confirmation and excludes seeded demo users and social records.
- Keep `main` unchanged; implementation stays on `codex/faithsync-v1-responsive-a11y-polish`.

## Review Focus

- Missing or malformed Firebase configuration must show setup guidance rather than a blank screen or raw SDK exception.
- Auth state can resolve after the app initially renders; protected screens must not flash another account's data.
- Duplicate usernames must fail safely without leaving an orphan profile.
- Local import can be retried without duplicating entries or deleting local data prematurely.
- A signed-in user must not read or write another UID's private documents.

---

### Task 1: Firebase client and test harness

**Files:**
- Create: `src/lib/firebase.ts`
- Create: `vitest.config.ts`
- Create: `tests/unit/firebase-config.test.ts`
- Create: `firebase.json`
- Create: `firestore.rules`
- Modify: `package.json`
- Modify: `.env.example`

**Interfaces:**
- Produces: `getFirebaseConfig(env): FirebaseConfigResult`; `firebaseApp`; `firebaseAuth`; `firestoreDb`.
- Produces: `npm run test` and `npm run test:rules`.

- [ ] **Step 1: Add failing config tests** for complete config, missing fields, and an emulator-mode config.
- [ ] **Step 2: Run** `npm run test -- tests/unit/firebase-config.test.ts`; confirm the missing module/test failures.
- [ ] **Step 3: Add Vitest and Firebase test dependencies**, define the test scripts, and create the modular client using `memoryLocalCache()`.
- [ ] **Step 4: Run config tests and `npm run build`**; expect all config cases to pass and the build to complete.
- [ ] **Step 5: Commit** as `chore: configure Firebase client and test harness`.

### Task 2: Authentication service

**Files:**
- Create: `src/services/authService.ts`
- Create: `tests/unit/authService.test.ts`

**Interfaces:**
- Produces: `subscribeToAuthState(callback: (user: AuthUser | null) => void): Unsubscribe`.
- Produces: `signUpWithEmailPassword(email: string, password: string): Promise<AuthUser>`.
- Produces: `signInWithEmailPassword(email: string, password: string): Promise<AuthUser>`.
- Produces: `sendPasswordReset(email: string): Promise<void>`; `signOut(): Promise<void>`.

- [ ] **Step 1: Write service tests** for auth-state mapping, sign-up, sign-in, reset, sign-out, and friendly error mapping.
- [ ] **Step 2: Run** `npm run test -- tests/unit/authService.test.ts`; confirm expected failures.
- [ ] **Step 3: Implement the service** with Firebase Auth modular methods and map Firebase error codes to stable user-facing messages.
- [ ] **Step 4: Run service tests and `npm run build`**; expect all assertions to pass.
- [ ] **Step 5: Commit** as `feat: add Firebase email authentication service`.

### Task 3: Auth state and account screens

**Files:**
- Modify: `src/context/AppContext.tsx`
- Modify: `src/components/auth/AuthFlow.tsx`
- Modify: `src/components/auth/LoginView.tsx`
- Modify: `src/components/auth/SignUpView.tsx`
- Modify: `src/components/auth/ForgotPasswordView.tsx`
- Create: `tests/components/auth-flow.test.tsx`

**Interfaces:**
- Consumes: the Task 2 auth service.
- Produces: `authStatus: 'loading' | 'signedOut' | 'signedIn'`; `currentUser.uid` is the sole account identity key.

- [ ] **Step 1: Add UI tests** for auth loading, sign-up success/error, password sign-in success/error, and password reset feedback.
- [ ] **Step 2: Run** `npm run test -- tests/components/auth-flow.test.tsx`; confirm expected failures.
- [ ] **Step 3: Replace local login/signup** with service calls; subscribe to auth state before loading account data; prevent protected content from rendering while auth is unresolved.
- [ ] **Step 4: Run auth UI tests and `npm run build`**; expect all cases to pass.
- [ ] **Step 5: Commit** as `feat: connect FaithSync account screens to Firebase Auth`.

### Task 4: Owner-scoped profile and private data

**Files:**
- Create: `src/services/userDataService.ts`
- Modify: `src/context/AppContext.tsx`
- Modify: `src/services/storage.ts`
- Modify: `src/types/index.ts`
- Modify: `firestore.rules`
- Create: `tests/rules/private-data.rules.test.ts`

**Interfaces:**
- Produces: `ensureUserProfile(uid, profileInput): Promise<void>`.
- Produces: `loadPrivateUserData(uid): Promise<PrivateUserData>`.
- Produces: `savePrivateRecord(uid, collectionName, recordId, record): Promise<void>`.
- Produces: `deletePrivateUserData(uid): Promise<void>`.

- [ ] **Step 1: Write Firestore emulator tests** proving unauthenticated denial, owner read/write, and another UID's denial for settings, completions, prayers, and journal records.
- [ ] **Step 2: Run** `npm run test:rules -- tests/rules/private-data.rules.test.ts`; confirm the rules fail before implementation.
- [ ] **Step 3: Implement owner-only rules and the Firestore service**, then adapt context reads/writes to use Firebase UID-scoped data.
- [ ] **Step 4: Run rules tests, unit tests, and `npm run build`**; expect owner access to pass and cross-user access to be denied.
- [ ] **Step 5: Commit** as `feat: persist private FaithSync data in Firestore`.

### Task 5: Confirmed local-data import and account lifecycle

**Files:**
- Modify: `src/services/userDataService.ts`
- Modify: `src/services/storage.ts`
- Modify: `src/components/onboarding/OnboardingModal.tsx`
- Modify: `src/components/profile/ProfileScreen.tsx`
- Create: `tests/unit/local-data-import.test.ts`

**Interfaces:**
- Produces: `previewLocalImport(uid): LocalImportSummary`.
- Produces: `importLocalData(uid, selectedSections): Promise<ImportResult>`.
- Produces: `exportAccountData(uid): Promise<string>`.

- [ ] **Step 1: Write import tests** for explicit confirmation, repeat-safe IDs, excluded demo social data, and retaining local data on failure.
- [ ] **Step 2: Run** `npm run test -- tests/unit/local-data-import.test.ts`; confirm expected failures.
- [ ] **Step 3: Add import preview/confirmation and remote export/delete paths**; preserve the old local data until import acknowledgment.
- [ ] **Step 4: Run all tests and `npm run build`**; expect repeat import to create no duplicates.
- [ ] **Step 5: Commit** as `feat: import local FaithSync records into user accounts`.

## Handoff

After this plan is implemented, use the social-accountability plan. A Firebase project configuration is required for real service testing; the Firebase Emulator Suite covers local auth/data rules without production credentials.
