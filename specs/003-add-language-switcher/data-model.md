# Data Model: Language Switcher

## Entity: LanguagePreference
- **Key**: 'mathworld.language' (localStorage)
- **Type**: string
- **Allowed values**: 'en', 'sv' (extensible)
- **Default**: 'en' (if not set)

## Entity: LanguageSwitcher
- **Fields**:
  - `currentLanguage`: string (bound to LanguagePreference)
  - `availableLanguages`: array of { code: string, label: string }
- **Relationships**:
  - Reads/writes LanguagePreference
  - Notifies i18n.js to update translations

## Validation Rules
- Only supported language codes are accepted
- Fallback to default if invalid or missing

## State Transitions
- On switch: Update LanguagePreference, trigger i18n.js refresh
- On page load: Read LanguagePreference, set UI and i18n.js
