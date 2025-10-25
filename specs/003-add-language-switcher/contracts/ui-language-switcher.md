# UI Contract: Language Switcher

## Component: LanguageSwitcher

### Placement
- Present at the top of every page (header or injected at top of body)
- Visible and accessible at all times

### Structure
- Native <select> element with options for each language
- Each option displays the language name in its own language ("English", "Svenska")
- <label> or aria-label for accessibility (e.g., "Language")

### Behavior
- On change, updates localStorage key 'mathworld.language'
- Triggers i18n.js to reload translations and update all text
- Remembers selection across reloads
- Defaults to 'en' if no preference set

### Accessibility
- Fully keyboard accessible (Tab, Arrow, Enter)
- Proper ARIA labeling
- Sufficient color contrast

### Extensibility
- Adding a new language requires updating locales and switcher options only

### Example HTML

<label for="language-switcher" class="visually-hidden">Language</label>
<select id="language-switcher" aria-label="Language">
  <option value="en">English</option>
  <option value="sv">Svenska</option>
</select>
