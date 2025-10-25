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

  // Store loaded translations globally within this module
  let currentTranslations = {};
  
  // Promise to track when translations are ready
  let translationsReady = null;
  let resolveTranslations = null;

  /**
   * Get the language code from URL parameter or browser settings
   * @returns {string} Language code (e.g., 'en', 'sv', 'es')
   */
  function getLanguage() {
    // Check localStorage first for user preference
    try {
      const savedLang = localStorage.getItem('mathworld.language');
      if (savedLang && isValidLanguage(savedLang)) {
        return savedLang.toLowerCase();
      }
    } catch (e) {
      console.warn('localStorage not available:', e);
    }

    // Check URL parameter second: ?lang=sv
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam && isValidLanguage(langParam)) {
      return langParam.toLowerCase();
    }

    // Fall back to browser language (e.g., 'en-US' -> 'en')
    const browserLang = navigator.language || navigator.userLanguage;
    const lang = browserLang.split('-')[0].toLowerCase();
    
    // If browser language is valid, use it; otherwise default to English
    return isValidLanguage(lang) ? lang : 'en';
  }

  /**
   * Check if language code is supported
   * @param {string} lang - Language code to validate
   * @returns {boolean} True if language is supported
   */
  function isValidLanguage(lang) {
    const supportedLanguages = ['en', 'sv'];
    return supportedLanguages.includes(lang.toLowerCase());
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
      // Determine if we're in the frontend root or a subfolder
      const currentPath = window.location.pathname;
      const isInSubfolder = currentPath.includes('/worlds/') || currentPath.includes('/frontend/worlds/');
      
      // Build relative path: if in worlds/, go up one level; otherwise stay in same level
      const localesPath = isInSubfolder 
        ? `../locales/${lang}.json`
        : `locales/${lang}.json`;
      
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
      currentTranslations = translations; // Store for programmatic access
      applyTranslations(translations);
      
      // Store current language for reference
      document.documentElement.lang = lang;
      
      // Update language switcher if present
      updateLanguageSwitcher(lang);
      
      // Resolve the ready promise
      if (resolveTranslations) {
        resolveTranslations();
      }
      
    } catch (error) {
      console.error('Error loading translations:', error);
      // If even English fails, we'll just show the default HTML content
      // Still resolve the promise so dependent code doesn't hang
      if (resolveTranslations) {
        resolveTranslations();
      }
    }
  }

  /**
   * Update language switcher dropdown to reflect current language
   * @param {string} lang - Current language code
   */
  function updateLanguageSwitcher(lang) {
    const switcher = document.getElementById('language-switcher');
    if (switcher && switcher.value !== lang) {
      switcher.value = lang;
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
    // Create the ready promise
    translationsReady = new Promise((resolve) => {
      resolveTranslations = resolve;
    });
    
    const lang = getLanguage();
    loadTranslations(lang);
    initLanguageSwitcher();
  }

  /**
   * Initialize language switcher UI
   */
  function initLanguageSwitcher() {
    const switcher = document.getElementById('language-switcher');
    if (!switcher) return;

    // Set current language in switcher
    const currentLang = getCurrentLanguage();
    switcher.value = currentLang;

    // Add change event listener
    switcher.addEventListener('change', (event) => {
      const newLang = event.target.value;
      setLanguage(newLang);
    });
  }

  /**
   * Set language and reload translations
   * @param {string} lang - Language code to switch to
   */
  function setLanguage(lang) {
    try {
      localStorage.setItem('mathworld.language', lang);
    } catch (e) {
      console.warn('Could not save language to localStorage:', e);
    }
    loadTranslations(lang);
  }

  /**
   * Get current language
   * @returns {string} Current language code
   */
  function getCurrentLanguage() {
    return document.documentElement.lang || getLanguage();
  }

  /**
   * Get translation for a key with optional variable replacement
   * @param {string} key - Translation key in dot notation (e.g., 'castleExercise.congratulations')
   * @param {Object} vars - Optional variables to replace in the translation
   * @returns {string} Translated string or the key itself if not found
   */
  function t(key, vars = {}) {
    const translation = getNestedProperty(currentTranslations, key);
    if (translation === undefined) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return replacePlaceholders(translation, vars);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose API for language switcher and programmatic translation
  window.i18n = {
    setLanguage,
    getCurrentLanguage,
    getLanguage,
    t,  // Translation function
    ready: () => translationsReady  // Promise that resolves when translations are loaded
  };

})();
