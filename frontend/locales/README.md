# Math Planet Localization

This directory contains translation files for the Math Planet learning site.

## Adding a New Language

To add a new language to Math Planet:

1. **Copy the English file** as a template:
   ```bash
   cp en.json [language-code].json
   ```
   
   Use ISO 639-1 language codes:
   - `sv.json` for Swedish
   - `es.json` for Spanish
   - `fr.json` for French
   - `de.json` for German
   - etc.

2. **Translate all strings** in the new file:
   ```json
   {
     "title": "Your Translation",
     "worlds": {
       "additionForest": "Your Translation",
       ...
     }
   }
   ```

3. **Preserve placeholders**: Keep placeholders like `{number}` and `{world}` unchanged:
   ```json
   "mapSpotLabel": "Learning spot {number} - Not yet available"
   ```

4. **Test your translation**:
   - Open the site in a browser
   - Add `?lang=[your-code]` to the URL (e.g., `?lang=sv`)
   - Or change your browser's language preference

## Translation Guidelines

### For Translators

- **Keep it child-friendly**: Use simple, clear language appropriate for ages 7-12
- **Maintain tone**: The site should feel playful, encouraging, and educational
- **Test length**: Some languages are longer than English - make sure text fits in the UI
- **Ask for help**: If unsure about technical terms, ask the maintainers

### String Categories

**World Names**: These are the main navigation elements
- Addition Forest
- Subtraction Mountain  
- Multiplication Desert
- Division Ocean

**Status Messages**:
- "Coming soon" - for inactive worlds

**Accessibility Labels**: These help screen readers describe the interface
- Keep them descriptive but concise
- They won't be visible but will be read aloud

## File Structure

All locale files must have the same JSON structure as `en.json`:

```json
{
  "title": "...",
  "worlds": {
    "additionForest": "...",
    "subtractionMountain": "...",
    "multiplicationDesert": "...",
    "divisionOcean": "..."
  },
  "comingSoon": "...",
  "map": {
    "title": "...",
    "spot": "..."
  },
  "accessibility": {
    "worldCardLabel": "...",
    "inactiveWorldLabel": "...",
    "mapSpotLabel": "..."
  }
}
```

**Important**: All keys must be present even if some translations are the same as English.

## Current Languages

- 🇬🇧 **English** (`en.json`) - Complete
- _Add your language here!_

## Contributing

We welcome translations! To contribute:

1. Create a new language file following the guidelines above
2. Test it thoroughly on the site
3. Submit a pull request with your translation
4. Include a note about any cultural adaptations you made

## Questions?

If you have questions about translating Math Planet:
- Check existing translations for examples
- Open an issue on GitHub
- Contact the maintainers

Thank you for helping make math education accessible to children worldwide! 🌍✨
