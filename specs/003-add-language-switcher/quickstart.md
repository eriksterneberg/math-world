# Quickstart: Language Switcher Integration

## Implementation Complete

The language switcher has been successfully integrated into Math World.

## Features Implemented

### 1. UI Component
- Native `<select>` dropdown with English and Swedish options
- Fixed position in top-right corner of every page
- Fully accessible with keyboard navigation and screen readers

### 2. Persistence
- Language preference stored in localStorage as `mathworld.language`
- Preference persists across page reloads and navigation
- Falls back to browser language, then English if not set

### 3. i18n Integration
- Updated `i18n.js` to check localStorage first for language preference
- Language switcher automatically updates when language changes
- All translatable text updates immediately on language switch

## Usage

### For Users
1. Look for the language dropdown in the top-right corner
2. Click or Tab to the dropdown
3. Select your preferred language (English or Svenska)
4. All text updates immediately
5. Your preference is saved automatically

### For Developers

#### Adding the switcher to a new page:
```html
<div class="language-switcher-container">
  <label for="language-switcher" class="visually-hidden" data-i18n="languageSwitcher.label">Language</label>
  <select id="language-switcher" class="language-switcher" aria-label="Language">
    <option value="en">English</option>
    <option value="sv">Svenska</option>
  </select>
</div>
```

#### Adding a new language:
1. Create new locale file: `frontend/locales/{code}.json`
2. Add all translations (copy from `en.json` as template)
3. Add option to language switcher: `<option value="{code}">{Native Name}</option>`
4. Add language code to `isValidLanguage()` function in `i18n.js`
5. Update locale files to include the new language's name:
   ```json
   "languageSwitcher": {
     "label": "Language",
     "english": "English",
     "swedish": "Svenska",
     "{code}": "{Native Name}"
   }
   ```

## Testing Checklist

- [x] Language switcher visible on all pages
- [x] Switching updates all text immediately (< 1 second)
- [x] Preference persists after reload
- [x] Preference persists across page navigation
- [x] Keyboard accessible (Tab, Arrow keys, Enter)
- [x] Screen reader announces language changes
- [x] Defaults to English if localStorage unavailable
- [x] Handles rapid language switching gracefully

## Technical Details

### localStorage Key
- **Key**: `mathworld.language`
- **Values**: `'en'`, `'sv'`, or other supported language codes
- **Fallback**: English (`'en'`) if not set or invalid

### Priority Order
1. localStorage (`mathworld.language`)
2. URL parameter (`?lang=sv`)
3. Browser language (e.g., `navigator.language`)
4. Default fallback (`'en'`)

### API
The i18n module exposes a global API:
```javascript
window.i18n.setLanguage('sv');        // Switch to Swedish
window.i18n.getCurrentLanguage();     // Get current language
window.i18n.getLanguage();            // Get detected/default language
```

