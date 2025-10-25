# Research: Language Switcher for Math World

## 1. Best Practices for Language Switchers in Static Sites

- **Placement**: Top-right or top-left of every page, visible and consistent.
- **Persistence**: Store language preference in localStorage for persistence across reloads.
- **Integration**: Language switcher should update the i18n system and trigger re-rendering of translatable text.
- **Extensibility**: Design for easy addition of new languages (add to locales, update switcher options).

**Decision**: Place a dropdown or button group in a fixed header area. Use localStorage key 'mathworld.language'.

**Rationale**: Consistent placement and persistence improve UX. Simplicity aligns with static site constraints.

**Alternatives considered**: Cookies (less reliable for static sites), query params (not persistent across reloads).

---

## 2. Accessibility Requirements for Language Switchers

- **Keyboard navigation**: Switcher must be reachable and operable via Tab/Enter/Arrow keys.
- **Screen readers**: Use ARIA labels (e.g., `aria-label="Language"`) and visible text.
- **Focus management**: Ensure focus is not lost after switching.
- **Contrast**: Sufficient color contrast for all UI elements.

**Decision**: Use a native <select> element for best accessibility, with proper labeling.

**Rationale**: Native controls are most accessible by default.

**Alternatives considered**: Custom dropdowns (require more ARIA work, more error-prone).

---

## 3. UI Placement Patterns for Global Language Controls

- **Header bar**: Most common for global controls.
- **Sticky/fixed positioning**: Ensures visibility on all pages.
- **Minimal footprint**: Avoids clutter, especially on mobile.

**Decision**: Add to a fixed header or inject at the top of the body if no header exists.

**Rationale**: Ensures discoverability and consistency.

**Alternatives considered**: Footer (less discoverable), modal (interruptive).

---

## Summary Table

| Topic         | Decision                | Rationale                |
|---------------|-------------------------|--------------------------|
| Placement     | Header, fixed           | Consistency, visibility  |
| Persistence   | localStorage            | Simplicity, reliability  |
| Accessibility | Native <select>, ARIA   | Best default support     |
| Integration   | i18n.js event/refresh   | Minimal code changes     |

