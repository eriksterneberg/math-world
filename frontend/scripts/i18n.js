/**
 * Math Planet - Internationalization (i18n) Loader
 * 
 * Simple localization system that:
 * 1. Detects browser language or uses ?lang= URL parameter
 * 2. Loads the appropriate JSON locale file
 * 3. Replaces all [data-i18n] attributes with translated strings
 * 
 * Usage in HTML:
 * <h1 data-i18n="title">Math Planet</h1>
 * <span data-i18n="worlds.additionForest">Addition Forest</span>
 */

(function() {
  'use strict';

  /**
   * Get the language code from URL parameter or browser settings
   * @returns {string} Language code (e.g., 'en', 'sv', 'es')
   */
  function getLanguage() {
    // Check URL parameter first: ?lang=sv
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam) {
      return langParam.toLowerCase();
    }

    // Fall back to browser language (e.g., 'en-US' -> 'en')
    const browserLang = navigator.language || navigator.userLanguage;
    return browserLang.split('-')[0].toLowerCase();
  }

  /**
   * Get nested property from object using dot notation
   * @param {Object} obj - The object to search
   * @param {string} path - Dot notation path (e.g., 'worlds.additionForest')
   * @returns {string|undefined} The value or undefined if not found
   */
  function getNestedProperty(obj, path) {
    return path.split('.').reduce((current, prop) => 
      current && current[prop] !== undefined ? current[prop] : undefined
    , obj);
  }

  /**
   * Replace placeholder variables in strings
   * @param {string} str - String with placeholders like "Spot {number}"
   * @param {Object} vars - Object with variable values {number: 1}
   * @returns {string} String with placeholders replaced
   */
  function replacePlaceholders(str, vars = {}) {
    return str.replace(/\{(\w+)\}/g, (match, key) => vars[key] || match);
  }

  /**
   * Load locale JSON file and apply translations
   * @param {string} lang - Language code
   */
  async function loadTranslations(lang) {
    try {
      // Calculate relative path to locales folder
      // Check if we're in a subfolder (like /worlds/)
      const currentPath = window.location.pathname;
      const depth = currentPath.split('/').filter(p => p && p.endsWith('.html')).length > 0 
        ? currentPath.split('/').length - 2  // In a subfolder
        : 0;
      
      // Build relative path based on depth
      const relativePath = depth > 0 ? '../'.repeat(depth - 1) : '';
      const localesPath = `${relativePath}locales/${lang}.json`;
      
      const response = await fetch(localesPath);
      
      if (!response.ok) {
        // If language not found, fall back to English
        if (lang !== 'en') {
          console.warn(`Language '${lang}' not found, falling back to English`);
          return loadTranslations('en');
        }
        throw new Error(`Failed to load locale: ${response.statusText}`);
      }

      const translations = await response.json();
      applyTranslations(translations);
      
      // Store current language for reference
      document.documentElement.lang = lang;
      
    } catch (error) {
      console.error('Error loading translations:', error);
      // If even English fails, we'll just show the default HTML content
    }
  }

  /**
   * Apply translations to all elements with data-i18n attribute
   * @param {Object} translations - The loaded translation object
   */
  function applyTranslations(translations) {
    // Find all elements with data-i18n attribute
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = getNestedProperty(translations, key);
      
      if (translation) {
        // Check if element has data-i18n-vars for placeholder replacement
        const varsAttr = element.getAttribute('data-i18n-vars');
        let finalText = translation;
        
        if (varsAttr) {
          try {
            const vars = JSON.parse(varsAttr);
            finalText = replacePlaceholders(translation, vars);
          } catch (e) {
            console.error(`Error parsing data-i18n-vars for key "${key}":`, e);
          }
        }
        
        element.textContent = finalText;
      } else {
        console.warn(`Translation key not found: ${key}`);
      }
    });
  }

  /**
   * Initialize i18n when DOM is ready
   */
  function init() {
    const lang = getLanguage();
    loadTranslations(lang);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
