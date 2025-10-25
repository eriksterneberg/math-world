# Tasks: Math Planet Learning Site

**Input**: Design documents from `/specs/001-math-worlds-site/`  
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, quickstart.md ✅

**Tests**: Frontend testing is NOT REQUIRED per Constitution III. No test tasks included.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

Using web application structure: `frontend/` directory at repository root containing static HTML/CSS/JS files.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic frontend structure

- [x] T001 Create frontend directory structure per plan.md (frontend/, frontend/worlds/, frontend/styles/, frontend/scripts/, frontend/locales/)
- [x] T002 [P] Create base CSS reset and global styles in frontend/styles/main.css with CSS custom properties
- [x] T003 [P] Configure Google Fonts integration (Fredoka for headings, Nunito for body) in frontend/styles/main.css
- [x] T004 [P] Create English locale file frontend/locales/en.json with all string keys per data-model.md
- [x] T005 [P] Create localization README in frontend/locales/README.md with instructions for adding new languages
- [x] T006 Implement i18n JavaScript loader in frontend/scripts/i18n.js (~50 lines, loads JSON and replaces data-i18n attributes)

**Checkpoint**: Directory structure ready, base styles configured, localization framework implemented

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core UI components and styling that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T007 Create CSS Grid layout system for responsive world cards in frontend/styles/cards.css (2x2 grid on desktop, stacked on tablet)
- [x] T008 Define CSS custom properties for all four world color schemes in frontend/styles/main.css (green/forest, white/mountain, yellow/desert, blue/ocean)
- [x] T009 Implement base world card component styles in frontend/styles/cards.css (structure, sizing, touch targets 44px+, borders, shadows)
- [x] T010 Implement keyboard focus styles for accessible navigation in frontend/styles/main.css (:focus-visible with outline)
- [x] T011 Create media queries for responsive breakpoints (768px, 1200px) in frontend/styles/main.css

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - View Home Page with World Cards (Priority: P1) 🎯 MVP

**Goal**: Create home page with "Math Planet" title and four themed world cards. Addition Forest is active with forest scenery; other three are grayed out with "Coming soon".

**Independent Test**: Open frontend/index.html in browser. Verify: (1) "Math Planet" title displays, (2) four cards shown in 2x2 grid with correct colors, (3) Addition Forest appears active, (4) other three grayed out with "Coming soon", (5) all world names visible in child-friendly font.

### Implementation for User Story 1

- [x] T012 [P] [US1] Create HTML structure for home page in frontend/index.html with semantic header, main, and card container
- [x] T013 [P] [US1] Add "Math Planet" title with data-i18n attribute in frontend/index.html
- [x] T014 [P] [US1] Create Addition Forest card HTML with semantic <a> element in frontend/index.html
- [x] T015 [P] [US1] Create SVG forest scenery inline in Addition Forest card (trees, leaves, grass using simple shapes and green colors)
- [x] T016 [P] [US1] Create Subtraction Mountain card HTML with <div> element in frontend/index.html (inactive)
- [x] T017 [P] [US1] Create SVG mountain scenery inline in Subtraction Mountain card (peaks, snow, clouds using simple shapes and white/gray colors)
- [x] T018 [P] [US1] Create Multiplication Desert card HTML with <div> element in frontend/index.html (inactive)
- [x] T019 [P] [US1] Create SVG desert scenery inline in Multiplication Desert card (dunes, cacti, sun using simple shapes and yellow colors)
- [x] T020 [P] [US1] Create Division Ocean card HTML with <div> element in frontend/index.html (inactive)
- [x] T021 [P] [US1] Create SVG ocean scenery inline in Division Ocean card (waves, fish, bubbles using simple shapes and blue colors)
- [x] T022 [US1] Apply world-specific color schemes to each card using CSS classes in frontend/styles/cards.css
- [x] T023 [US1] Style inactive cards with grayscale filter and reduced opacity in frontend/styles/cards.css
- [x] T024 [US1] Add "Coming soon" text to three inactive cards with styling in frontend/styles/cards.css
- [x] T025 [US1] Add ARIA attributes for accessibility (aria-disabled for inactive cards, aria-label for screen readers) in frontend/index.html
- [x] T026 [US1] Ensure keyboard navigation works (Tab focuses Addition Forest, skips inactive cards) by testing tabindex and focus styles

**Checkpoint**: At this point, User Story 1 should be fully functional. Home page displays with all four cards, correct theming, and only Addition Forest is interactive.

---

## Phase 4: User Story 2 - Interact with Addition Forest Card (Priority: P2)

**Goal**: Add falling leaves hover animation to Addition Forest card and enable navigation to map page.

**Independent Test**: Open frontend/index.html, hover over Addition Forest card (leaves should fall), move mouse away (animation stops), click card (navigate to worlds/addition-forest-map.html).

### Implementation for User Story 2

- [ ] T027 [P] [US2] Create CSS keyframe animation for falling leaves in frontend/styles/animations.css (translateY, rotate, opacity fade, 3s duration)
- [ ] T028 [P] [US2] Add multiple leaf SVG elements to Addition Forest card HTML in frontend/index.html (5-8 leaves with different starting positions)
- [ ] T029 [US2] Apply CSS animation to leaves with animation-play-state: paused by default in frontend/styles/animations.css
- [ ] T030 [US2] Create :hover selector for Addition Forest card that sets animation-play-state: running in frontend/styles/animations.css
- [ ] T031 [US2] Add staggered animation-delay to each leaf (0s, 0.5s, 1s, 1.5s, etc.) in frontend/styles/animations.css
- [ ] T032 [US2] Add will-change: transform to leaves for performance optimization in frontend/styles/animations.css
- [ ] T033 [US2] Set href attribute on Addition Forest <a> element to "worlds/addition-forest-map.html" in frontend/index.html
- [ ] T034 [US2] Verify animation performance (60fps target) and adjust if needed
- [ ] T035 [US2] Test keyboard navigation: Enter/Space on focused card should navigate to map

**Checkpoint**: At this point, User Stories 1 AND 2 should both work. Card has smooth falling leaves animation on hover and navigates to map page on click.

---

## Phase 5: User Story 3 - View Addition Forest Map (Priority: P3)

**Goal**: Create Addition Forest map page with treasure map styling showing five spots in progression, first spot highlighted.

**Independent Test**: Click Addition Forest card from home page, verify: (1) map page loads with forest theming, (2) five spots visible, (3) first spot is highlighted, (4) clicking spots does nothing, (5) spots 2-5 not highlighted.

### Implementation for User Story 3

- [ ] T036 [P] [US3] Create HTML structure for map page in frontend/worlds/addition-forest-map.html with header and map container
- [ ] T037 [P] [US3] Add page title with data-i18n attribute in frontend/worlds/addition-forest-map.html
- [ ] T038 [P] [US3] Create map styles in frontend/styles/map.css (treasure map background, parchment texture, forest theme colors)
- [ ] T039 [P] [US3] Create SVG map illustration with path connecting five spots in frontend/worlds/addition-forest-map.html
- [ ] T040 [P] [US3] Add five map spot SVG elements (circles or markers) positioned along the path in frontend/worlds/addition-forest-map.html
- [ ] T041 [US3] Style first spot with highlighted appearance (larger, brighter, outlined, or animated) in frontend/styles/map.css
- [ ] T042 [US3] Style spots 2-5 with non-highlighted appearance (smaller, muted colors) in frontend/styles/map.css
- [ ] T043 [US3] Add spot numbers (1-5) inside or near each spot SVG in frontend/worlds/addition-forest-map.html
- [ ] T044 [US3] Apply pointer-events: none to all spots to prevent interaction in frontend/styles/map.css
- [ ] T045 [US3] Add ARIA labels to spots for accessibility (e.g., "Spot 1 - Not yet available") in frontend/worlds/addition-forest-map.html
- [ ] T046 [US3] Link localization strings for map page title and spot labels in frontend/locales/en.json
- [ ] T047 [US3] Add navigation back to home page (browser back button should work naturally)
- [ ] T048 [US3] Test responsive layout on 768px+ screen sizes

**Checkpoint**: All three user stories should now be independently functional. Complete site flow: home page → hover animation → click → map page.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple pages and final quality checks

- [ ] T049 [P] Optimize SVG code for performance (remove unnecessary attributes, minimize paths)
- [ ] T050 [P] Verify all localization strings are properly referenced with data-i18n attributes across both pages
- [ ] T051 [P] Test color contrast ratios meet WCAG AA standards for child readability
- [ ] T052 [P] Add meta tags for viewport and character encoding in both HTML files
- [ ] T053 [P] Test keyboard navigation flow through entire site (Tab order, focus indicators)
- [ ] T054 Verify page load performance <1 second per plan.md performance goals
- [ ] T055 Verify animation response time <200ms per SC-004
- [ ] T056 Test site on multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] T057 Test responsive behavior at 768px, 1024px, and 1200px+ widths
- [ ] T058 [P] Create example second language file (e.g., Swedish) to validate localization structure
- [ ] T059 [P] Add HTML comments documenting SVG sections for future maintainers
- [ ] T060 Run through quickstart.md validation checklist completely
- [ ] T061 Validate all Constitution principles are satisfied (especially L10N and child-friendly design)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion (T001-T006) - BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion (T007-T011)
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Phase 6)**: Depends on all user stories (T012-T048) being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Modifies US1's Addition Forest card but doesn't break it
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Creates new page, no dependencies on US1/US2 completion

### Within Each User Story

**User Story 1**:
- T012-T021 (HTML and SVG creation) can run in parallel [P]
- T022-T026 (styling and accessibility) must wait for HTML completion

**User Story 2**:
- T027-T028 (animation CSS and leaf SVG) can run in parallel [P]
- T029-T032 (animation application) must wait for T027-T028
- T033-T035 (navigation setup) can be done anytime after T012-T026

**User Story 3**:
- T036-T040 (map page structure and SVG) can run in parallel [P]
- T041-T048 (styling and finalization) must wait for HTML completion

### Parallel Opportunities

- **Phase 1**: T002, T003, T004, T005 can all run in parallel (different files)
- **Phase 2**: T007-T011 can run in parallel (different CSS concerns)
- **Phase 3 (US1)**: T012-T021 (10 tasks) can all run in parallel - creating HTML structure and SVG for each card
- **Phase 4 (US2)**: T027-T028 can run in parallel - CSS animation and SVG leaves
- **Phase 5 (US3)**: T036-T040 (5 tasks) can all run in parallel - map page structure
- **Phase 6**: T049-T053, T058-T059 (7 tasks) can run in parallel - polish work

**Maximum Parallelism**: If you have 10 developers, Phase 3 tasks T012-T021 could all be worked simultaneously (each dev creates one card/scenery component).

---

## Parallel Example: User Story 1 (Home Page Cards)

```bash
# Launch all HTML/SVG creation for User Story 1 together (10 parallel tasks):
Task: "Create HTML structure for home page in frontend/index.html"
Task: "Add Math Planet title with data-i18n in frontend/index.html"
Task: "Create Addition Forest card HTML with <a> element in frontend/index.html"
Task: "Create SVG forest scenery in Addition Forest card"
Task: "Create Subtraction Mountain card HTML with <div> in frontend/index.html"
Task: "Create SVG mountain scenery in Subtraction Mountain card"
Task: "Create Multiplication Desert card HTML with <div> in frontend/index.html"
Task: "Create SVG desert scenery in Multiplication Desert card"
Task: "Create Division Ocean card HTML with <div> in frontend/index.html"
Task: "Create SVG ocean scenery in Division Ocean card"

# After HTML/SVG complete, styling tasks can begin:
Task: "Apply world-specific color schemes in frontend/styles/cards.css"
Task: "Style inactive cards with grayscale in frontend/styles/cards.css"
Task: "Add Coming soon text styling in frontend/styles/cards.css"
Task: "Add ARIA attributes in frontend/index.html"
Task: "Test keyboard navigation"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. **Complete Phase 1: Setup** (T001-T006) → ~1-2 hours
2. **Complete Phase 2: Foundational** (T007-T011) → ~2-3 hours
3. **Complete Phase 3: User Story 1** (T012-T026) → ~4-6 hours
4. **STOP and VALIDATE**: Open frontend/index.html in browser
   - ✅ Verify "Math Planet" title displays
   - ✅ Verify all four cards show with correct colors and scenery
   - ✅ Verify Addition Forest is active, others grayed out
   - ✅ Verify keyboard navigation works
   - ✅ Verify responsive layout on different screen sizes
5. **Deploy/demo if ready** - This is a complete MVP showing the site structure!

**Total MVP Time Estimate**: 7-11 hours (single developer)

### Incremental Delivery

1. **Foundation** (Phases 1-2) → Directory structure, base styles, localization ready
2. **MVP: User Story 1** → Deployable home page with all four world cards
3. **Add User Story 2** → Home page now has engaging falling leaves animation
4. **Add User Story 3** → Complete two-page navigation experience
5. **Add Polish** → Production-ready, multi-language capable, fully tested

Each increment adds value without breaking previous stories. You could deploy after any phase!

### Parallel Team Strategy

With multiple developers (e.g., 3 people):

1. **Together**: Complete Setup + Foundational (Phases 1-2)
2. **Once Foundational is done**:
   - **Developer A**: User Story 1 (T012-T026) - Home page cards
   - **Developer B**: User Story 2 (T027-T035) - Animation (needs A's HTML)
   - **Developer C**: User Story 3 (T036-T048) - Map page (independent)
3. **Developer B waits for A** to finish T012-T021, then adds animation
4. **Developer C works independently** - no waiting
5. **All meet for Polish** (Phase 6)

**Optimal Strategy**: Developer C starts US3 (map) while A/B collaborate on US1/US2 (home page).

---

## Task Summary

**Total Tasks**: 61 tasks across 6 phases

**Task Count by Phase**:
- Phase 1 (Setup): 6 tasks
- Phase 2 (Foundational): 5 tasks (BLOCKING)
- Phase 3 (User Story 1): 15 tasks
- Phase 4 (User Story 2): 9 tasks
- Phase 5 (User Story 3): 13 tasks
- Phase 6 (Polish): 13 tasks

**Task Count by User Story**:
- User Story 1 (P1 - MVP): 15 tasks
- User Story 2 (P2): 9 tasks  
- User Story 3 (P3): 13 tasks
- Infrastructure (Setup + Foundational): 11 tasks
- Polish (Cross-cutting): 13 tasks

**Parallel Opportunities**: 27 tasks marked [P] can run in parallel with other [P] tasks in same phase

**Independent Test Criteria**:
- ✅ **US1**: Open index.html → 4 cards display with correct themes and interactivity
- ✅ **US2**: Hover Addition Forest → leaves fall; Click → navigate to map
- ✅ **US3**: Map page shows 5 spots, first highlighted, none clickable

**Suggested MVP Scope**: Complete through Phase 3 (User Story 1) for minimum viable product showing site structure and theming. This takes approximately 7-11 hours for a single developer.

---

## Notes

- **No tests included**: Frontend testing is not required per Constitution III
- **[P] tasks**: Different files or independent concerns, no dependencies within phase
- **[Story] labels**: Map tasks to user stories for traceability and parallel work
- **File paths**: All include explicit file locations per task generation rules
- **Localization**: All user-facing strings must use data-i18n attributes, no hardcoded text
- **Child-friendly design**: SVG scenery should use simple shapes, bright colors, rounded corners
- **Performance**: Monitor animation FPS and page load times per success criteria
- **Accessibility**: All interactive elements must be keyboard accessible
- **Each user story independently testable**: US3 can be completed without US2 if needed

**Format Validation**: ✅ All 61 tasks follow strict checklist format with checkbox, ID, optional [P]/[Story] labels, and file paths.
