---

description: "Task list for Banner Video Background implementation"
---

# Tasks: Banner Video Background

**Input**: Design documents from `specs/002-banner-video-background/`  
**Prerequisites**: [plan.md](plan.md) ✅ | [spec.md](spec.md) ✅ | [research.md](research.md) ✅ | [data-model.md](data-model.md) ✅ | [contracts/banner.contract.md](contracts/banner.contract.md) ✅

**Validation**: Manual validation only — no unit, integration, or e2e tests per constitution.

**Video asset**: `public/video/HeroBannerVideo.mp4` (already provided)

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no incomplete dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- Exact file paths are included in every task description

---

## Phase 1: Setup

**Purpose**: Place video asset and verify project baseline before any code changes.

- [X] T001 Verify `public/video/HeroBannerVideo.mp4` exists and is playable in a local browser

**Checkpoint**: Video asset confirmed present — implementation can begin.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: CSS positioning foundation that all three user stories depend on. Must complete before any banner template or overlay work.

- [X] T002 Update `src/app/components/banner/banner.scss` — add `position: relative` and `overflow: hidden` to the `.banner` block so absolutely positioned children are clipped to the banner bounds

**Checkpoint**: Banner container is a positioning context — child layers can now be added safely.

---

## Phase 3: User Story 1 — Video Plays Behind Banner Content (Priority: P1) 🎯 MVP

**Goal**: A looped, muted video fills the banner background behind the existing company name, tagline, and CTA content.

**Independent Validation**: Open `http://localhost:4200`, confirm the banner shows a looping video, text is visible on top, and the video does not overflow into the product list section.

### Implementation for User Story 1

- [X] T003 [US1] Add `videoSrc = input<string>()` signal input to `BannerComponent` in `src/app/components/banner/banner.ts`
- [X] T004 [US1] Update `src/app/components/banner/banner.html` — wrap existing content in `<div class="banner__inner">` (if not already wrapped) and add `@if (videoSrc()) { <video> }` block before `banner__inner` with attributes `[src]="videoSrc()"`, `autoplay`, `muted`, `loop`, `playsinline`, `aria-hidden="true"`, `class="banner__video"`
- [X] T005 [P] [US1] Add `.banner__video` CSS rules to `src/app/components/banner/banner.scss` — `position: absolute`, `inset: 0`, `width: 100%`, `height: 100%`, `object-fit: cover`, `z-index: 0`
- [X] T006 [US1] Update `src/app/pages/home/home.html` — add `videoSrc="video/HeroBannerVideo.mp4"` attribute to `<app-banner>`
- [X] T007 [US1] Update `src/app/components/banner/banner.scss` — set `z-index: 2` on `.banner__inner` so text content renders above the video layer

**Checkpoint**: US1 complete — video plays behind banner content. Verify manually before continuing.

---

## Phase 4: User Story 2 — Text Remains Legible Over Video (Priority: P2)

**Goal**: All banner text (company name, tagline, CTA button) maintains WCAG AA contrast at all points in the video loop via a semi-transparent overlay.

**Independent Validation**: Browse the homepage with the video playing; confirm company name, tagline, and CTA are clearly readable. Run the axe DevTools browser extension — zero new violations expected.

### Implementation for User Story 2

- [X] T008 [US2] Add `::before` pseudo-element to `.banner` in `src/app/components/banner/banner.scss` — `content: ''`, `position: absolute`, `inset: 0`, `background: rgba(58, 37, 16, 0.55)`, `z-index: 1`, `pointer-events: none` — overlay sits above video (z-index 0) and below content (z-index 2)

**Checkpoint**: US2 complete — text is legible over all video frames. Verify contrast manually with axe DevTools.

---

## Phase 5: User Story 3 — Graceful Fallback When Video Is Unavailable (Priority: P3)

**Goal**: The banner displays a solid fallback background (`--color-bark`) when the video cannot play (blocked autoplay, missing file, SSR context).

**Independent Validation**: Temporarily change `videoSrc` in `home.html` to a non-existent path; confirm banner shows the solid dark background with no broken element. Restore the correct path after validation.

### Implementation for User Story 3

- [X] T009 [US3] Confirm `background-color: var(--color-bark)` is present on `.banner` in `src/app/components/banner/banner.scss` — this is the automatic CSS fallback visible while the video loads or when it cannot play (no code change needed if already present; verify only)
- [X] T010 [US3] Verify SSR renders without errors — run `yarn build` and confirm build completes without TypeScript or template compilation errors related to the `<video>` element or `videoSrc` input

**Checkpoint**: US3 complete — fallback is solid `--color-bark`; SSR build clean.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Responsive validation, final accessibility check, and quickstart walkthrough.

- [ ] T011 [P] Validate responsive layout — open DevTools at 375 px, 768 px, and 1280 px; confirm video fills banner at each breakpoint and no overflow occurs
- [ ] T012 Run axe DevTools on the homepage — confirm zero new accessibility violations introduced by the video background
- [ ] T013 Run full quickstart validation from [quickstart.md](quickstart.md) — steps 1–6 — and confirm all pass

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — start immediately
- **Phase 2 (Foundational)**: Depends on Phase 1 — BLOCKS Phase 3
- **Phase 3 (US1)**: Depends on Phase 2 — MVP deliverable
- **Phase 4 (US2)**: Depends on Phase 3 (needs video layer present to validate contrast)
- **Phase 5 (US3)**: Depends on Phase 2 (needs `background-color` confirmed); can run in parallel with Phase 4 after Phase 3
- **Phase 6 (Polish)**: Depends on Phases 3, 4, and 5 being complete

### User Story Dependencies

| Story | Depends On | Parallelisable With |
|---|---|---|
| US1 (P1) | Phase 2 (Foundational) | — |
| US2 (P2) | US1 (overlay needs video layer present) | US3 (T009, T010 touch different concerns) |
| US3 (P3) | Phase 2 (T009 verify only), US1 (T010 build) | US2 (T008) |

### Within User Story 1

- T003 (TypeScript input) → T004 (template) → T006 (home template passes value)
- T005 (CSS video rules) can run in parallel with T003/T004 — different concerns, same file

---

## Parallel Execution

Tasks marked `[P]` can be worked simultaneously with other in-progress tasks in the same phase:

| Parallel Set | Tasks | What enables it |
|---|---|---|
| US1 CSS + TS/HTML | T005 alongside T003, T004 | Different lines of banner.scss vs banner.ts/banner.html |
| US3 fallback + US2 overlay | T009, T010 alongside T008 | No shared dependencies |
| Polish checks | T011 alongside T012 | Independent validation activities |

---

## Implementation Strategy

**MVP scope**: Complete Phase 1 + Phase 2 + Phase 3 (US1) for the core deliverable. This is the minimum that satisfies FR-001, FR-002, FR-003, FR-007, FR-008.

**Full delivery**: Continue with Phase 4 (US2, contrast overlay) and Phase 5 (US3, fallback confirmation) — each independently verifiable.

**Total tasks**: 13  
**By user story**: US1 = 5, US2 = 1, US3 = 2, Setup/Foundation/Polish = 5  
**Parallel opportunities**: 3 parallel sets identified
