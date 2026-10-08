# FaithSync Responsive, Accessible, and Reliable Experience Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the authenticated FaithSync experience comfortable and reliable across phones, tablets, and desktop while protecting private writing.

**Architecture:** Refine the shared shell and existing feature screens without changing the product loop. Use account-scoped local draft storage with explicit local/sync status, and add focused component and manual journey verification across viewports and assistive interaction modes.

**Tech Stack:** React 19, TypeScript, Vite 8, Tailwind CSS 4, Firebase Auth/Firestore interfaces, Vitest, Testing Library, browser manual verification.

**Spec:** [FaithSync V1 product and Firebase design](../specs/2026-10-08-faithsync-v1-responsive-accessibility-performance-design.md)

## Global Constraints

- This plan follows the Firebase foundation and social-accountability plans.
- Preserve the warm cream visual identity and keep Scripture and personal writing visually primary.
- Keep all private reflections, prayers, and journal records owner-only.
- Do not add dependencies unless an existing requirement cannot be met with the current stack.
- Do not claim a remote save before Firestore acknowledges the write.
- Keep `main` unchanged and work on `codex/faithsync-v1-responsive-a11y-polish`.

## Review Focus

- A narrow viewport or on-screen keyboard must not cover the active input, save status, or primary action.
- Screen-reader and keyboard users must be able to identify and operate every icon-only control and dialog action.
- A storage failure must preserve entered text and must not show a successful save state.
- Reduced-motion users must not receive looping breathing/pulse/celebration animation.
- Empty history must be calm and must not display fabricated progress or error-like statistics.

---

### Task 1: Account-scoped local draft store

**Files:**
- Create: `src/services/draftStorage.ts`
- Modify: `src/components/reading/ReadingScreen.tsx`
- Modify: `src/components/reflection/ReflectScreen.tsx`
- Modify: `src/components/prayer/PrayerScreen.tsx`
- Create: `tests/unit/draftStorage.test.ts`

**Interfaces:**
- Produces `saveDraft(uid: string, draftId: string, value: DraftValue): Result<void, DraftStorageError>`.
- Produces `loadDraft(uid: string, draftId: string): DraftValue | null`.
- Produces `clearDraft(uid: string, draftId: string): void`.
- Produces save states `'local' | 'syncing' | 'synced' | 'error'`.

- [ ] **Step 1: Write tests** for UID isolation, reload persistence, clear-after-acknowledgment, quota/serialization errors, and text retention after failure.
- [ ] **Step 2: Run** `npm run test -- tests/unit/draftStorage.test.ts`; confirm expected failures.
- [ ] **Step 3: Implement the draft service** and wire it to reflection, prayer, and Quiet Time session changes.
- [ ] **Step 4: Run the draft tests and `npm run build`**; expect one UID to never load another UID's draft.
- [ ] **Step 5: Commit** as `feat: preserve account-scoped writing drafts`.

### Task 2: Responsive layout and navigation

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/index.css`
- Modify: `src/components/navigation/BottomNavBar.tsx`
- Modify: `src/components/navigation/SidebarNav.tsx`
- Modify: `src/components/navigation/TopAppBar.tsx`
- Modify: `src/components/home/TodayScreen.tsx`
- Modify: `src/components/reading/ReadingScreen.tsx`
- Modify: `src/components/bible/BibleScreen.tsx`
- Modify: `src/components/reflection/ReflectScreen.tsx`
- Modify: `src/components/prayer/PrayerScreen.tsx`
- Modify: `src/components/calendar/CalendarScreen.tsx`
- Modify: `tests/components/responsive-shell.test.tsx`

**Interfaces:**
- Consumes: existing shell and Circle navigation from the social plan.
- Produces: no horizontal overflow; fixed navigation respects safe areas and does not cover focused controls.

- [ ] **Step 1: Add navigation component assertions** for Circle visibility, active-route state, and keyboard operation; record a manual viewport checklist for 320px, 390px, 768px, 1024px, and 1440px.
- [ ] **Step 2: Run** `npm run test -- tests/components/navigation.test.tsx`; confirm the Circle navigation assertions fail on the current shell.
- [ ] **Step 3: Adjust shell breakpoints and page max-widths**; retain comfortable desktop reading widths and 44px minimum interactive targets.
- [ ] **Step 4: Run navigation tests and `npm run build`, then manually review the listed viewports**; record overflow and fixed-navigation findings.
- [ ] **Step 5: Commit** as `fix: refine FaithSync responsive shell and reading widths`.

### Task 3: Keyboard, screen-reader, contrast, and motion

**Files:**
- Modify: `src/components/navigation/BottomNavBar.tsx`
- Modify: `src/components/navigation/SidebarNav.tsx`
- Modify: `src/components/common/Modal.tsx`
- Modify: `src/components/reading/ReadingScreen.tsx`
- Modify: `src/components/reflection/ReflectScreen.tsx`
- Modify: `src/components/prayer/PrayerScreen.tsx`
- Modify: `src/components/profile/ProfileScreen.tsx`
- Modify: `src/index.css`
- Create: `tests/components/accessibility.test.tsx`

**Interfaces:**
- Produces: semantic nav state, associated field errors, visible focus, and reduced-motion-compatible effects.

- [ ] **Step 1: Write accessibility tests** for icon labels, current-page navigation, associated field errors, focus visibility, and Escape/focus return in dialogs.
- [ ] **Step 2: Run** `npm run test -- tests/components/accessibility.test.tsx`; confirm missing semantics fail.
- [ ] **Step 3: Add accessible names/landmarks and keyboard dialog behavior**; add `prefers-reduced-motion` handling for non-essential animation.
- [ ] **Step 4: Run accessibility tests and `npm run build`**; expect all interactive controls to have a usable name and focus state.
- [ ] **Step 5: Commit** as `fix: improve keyboard and screen-reader support`.

### Task 4: Loading, errors, empty states, and perceived performance

**Files:**
- Modify: `src/components/home/TodayScreen.tsx`
- Modify: `src/components/bible/BibleScreen.tsx`
- Modify: `src/components/calendar/CalendarScreen.tsx`
- Modify: `src/components/profile/ProfileScreen.tsx`
- Modify: `src/components/friends/FriendsScreen.tsx`
- Modify: `src/services/bibleService.ts`
- Modify: `src/index.css`
- Create: `tests/components/data-states.test.tsx`

**Interfaces:**
- Produces: consistent Loading, Error, Empty, and Retry state behavior for each remote data view.

- [ ] **Step 1: Write component tests** for auth/data loading, Bible failure retry, first-use empty journal/progress, and a failed profile save.
- [ ] **Step 2: Run** `npm run test -- tests/components/data-states.test.tsx`; confirm expected failures.
- [ ] **Step 3: Add calm, branded state components and limit feed/journal reads** to visible pages with pagination where required.
- [ ] **Step 4: Run component tests, all rules tests, and `npm run build`**; expect friendly errors and usable retries.
- [ ] **Step 5: Commit** as `fix: complete FaithSync loading and recovery states`.

### Task 5: Full journey and viewport review

**Files:**
- Modify: `docs/superpowers/specs/2026-10-08-faithsync-v1-responsive-accessibility-performance-design.md` only if findings require a documented decision.
- Test: configured Firebase Emulator Suite and local Vite app.

- [ ] **Step 1: Run** `npm run test`, `npm run test:rules`, `npm run lint`, and `npm run build`; record exact results.
- [ ] **Step 2: Complete the journey** sign up → Today → Quiet Time → private reflection/prayer save and reopen → opt-in share → friend request/accept → Circle feed/encouragement → settings/privacy → sign out/in → data persists.
- [ ] **Step 3: Review viewports** at 320px, 390px, 768px portrait, 1024px landscape, and 1440px desktop; review keyboard-only, screen-reader labels, reduced motion, and offline/retry states.
- [ ] **Step 4: Fix only findings within the approved scope**, rerun the impacted checks, and record remaining blockers such as missing production Firebase config or age/report policy.
- [ ] **Step 5: Commit** as `docs: record FaithSync V1 journey verification`.

## Handoff

This final plan depends on both earlier plans and a configured Firebase project for end-to-end account/social testing. Do not deploy or merge during implementation.
