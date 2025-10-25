# Implementation Plan: Language Switcher

## Technical Context

- **Frontend stack**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Localization**: Existing i18n.js system with en.json, sv.json
- **Persistence**: Browser localStorage
- **UI**: Static site, no frameworks
- **Accessibility**: Must be keyboard and screen-reader accessible
- **Unknowns**: None (requirements are clear and standard)

## Constitution Check

- **Principle I (Functional Programming)**: All new code will use pure functions and avoid classes.
- **Principle II (Iterative Refinement)**: Plan will be broken into phases (setup, UI, integration, accessibility, polish).
- **Principle III (Testing)**: Manual testing and requirements checklist will be used; no automated tests required for frontend.
- **Principle IV (Scope Management)**: Only English and Swedish for MVP; extensible for more languages.
- **Principle V (Performance)**: UI must update within 1 second; minimal DOM manipulation.
- **Principle VI (Clarity)**: All code and requirements will be clearly documented.

**No violations detected.**

---

## Phase 0: Outline & Research

- Research best practices for language switchers in static sites with i18n.js and localStorage
- Research accessibility requirements for language switchers (keyboard, ARIA)
- Research UI placement patterns for global language controls

---

## Phase 1: Design & Contracts

- **Entities**:
  - LanguageSwitcher (UI component)
  - LanguagePreference (localStorage key/value)
- **Data Model**:
  - language: string (e.g., 'en', 'sv')
  - stored in localStorage as 'mathworld.language'
- **UI Contract**:
  - Switcher must be present on every page
  - Must update i18n.js language and trigger re-translation
  - Must be accessible (tab, ARIA, visible label)
- **Quickstart**:
  - Add switcher HTML to base template or inject via JS
  - Update i18n.js to read/write localStorage and react to changes
  - Test with both languages and across reloads

---

## Outputs
- research.md (best practices, accessibility, UI patterns)
- data-model.md (language preference structure)
- contracts/ (UI contract for switcher)
- quickstart.md (setup and integration steps)

---

**Branch**: 003-add-language-switcher
**Plan file**: specs/003-add-language-switcher/plan.md
**Specs dir**: specs/003-add-language-switcher/
