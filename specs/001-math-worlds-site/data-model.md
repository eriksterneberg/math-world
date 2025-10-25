# Data Model: Math Planet Learning Site

**Feature**: 001-math-worlds-site  
**Date**: October 25, 2025  
**Note**: This is a static frontend feature with no database or backend. Data structures represent UI state and localization content only.

## Overview

Since this is a pure static HTML/CSS site (FR-019: no data persistence), there is no traditional data model with entities, relationships, or persistence. However, we document the logical structure of UI components and localization data for consistency and future backend integration.

## Localization Data Structure

### Locale File Schema

**File**: `frontend/locales/{lang}.json`

**Purpose**: Store all user-facing strings for internationalization per Constitution IV

**Schema**:
```json
{
  "title": "string",           // Main site title
  "worlds": {
    "additionForest": "string",         // World name
    "subtractionMountain": "string",    // World name
    "multiplicationDesert": "string",   // World name
    "divisionOcean": "string"          // World name
  },
  "comingSoon": "string",      // Inactive world message
  "map": {
    "title": "string",         // Map page title
    "spot": "string"           // Template for spot labels (e.g., "Spot {number}")
  },
  "accessibility": {
    "worldCardLabel": "string",          // Screen reader label template
    "inactiveWorldLabel": "string",      // Screen reader for disabled cards
    "mapSpotLabel": "string"             // Screen reader for map spots
  }
}
```

**Example** (`en.json`):
```json
{
  "title": "Math Planet",
  "worlds": {
    "additionForest": "Addition Forest",
    "subtractionMountain": "Subtraction Mountain",
    "multiplicationDesert": "Multiplication Desert",
    "divisionOcean": "Division Ocean"
  },
  "comingSoon": "Coming soon",
  "map": {
    "title": "Addition Forest Map",
    "spot": "Spot {number}"
  },
  "accessibility": {
    "worldCardLabel": "Enter {world} to start learning",
    "inactiveWorldLabel": "{world} - Coming soon",
    "mapSpotLabel": "Learning spot {number} - Not yet available"
  }
}
```

**Validation Rules**:
- All keys must exist in every locale file
- String values cannot be empty
- Placeholder syntax: `{variableName}` for interpolation
- Fallback to English (`en.json`) if key missing in selected locale

**State Transitions**: N/A (static content, no state changes)

---

## UI Component Models

These represent the logical structure of UI elements, not database entities.

### World Entity

**Description**: Represents one of four mathematical operation worlds

**Properties**:
| Property | Type | Description | Source |
|----------|------|-------------|--------|
| `id` | string | Unique identifier (e.g., "addition-forest") | Hardcoded in HTML |
| `nameKey` | string | Localization key for world name | Locale JSON |
| `theme` | string | Color theme (e.g., "green", "white", "yellow", "blue") | CSS classes |
| `sceneryType` | string | Type of scenery (forest, mountain, desert, ocean) | SVG inline |
| `isActive` | boolean | Whether world is accessible | HTML structure |
| `hasAnimation` | boolean | Whether hover animation exists | CSS classes |
| `navigationTarget` | string | URL for active worlds (e.g., "worlds/addition-forest-map.html") | HTML href |

**Relationships**: None (flat structure)

**Validation Rules**:
- `id` must be kebab-case, unique across all worlds
- `isActive` = true requires `navigationTarget`
- `isActive` = false requires "coming soon" text
- `hasAnimation` = true only if `isActive` = true (per FR-012)

**Example Instance** (Addition Forest):
```javascript
{
  id: "addition-forest",
  nameKey: "worlds.additionForest",
  theme: "green",
  sceneryType: "forest",
  isActive: true,
  hasAnimation: true,
  navigationTarget: "worlds/addition-forest-map.html"
}
```

---

### World Card Entity

**Description**: Visual card component on home page

**Properties**:
| Property | Type | Description | Derived From |
|----------|------|-------------|--------------|
| `worldId` | string | Reference to World.id | World entity |
| `displayName` | string | Localized world name | Locale JSON |
| `svgScenery` | SVG | Inline SVG scenery illustration | HTML inline |
| `colorScheme` | object | CSS custom properties for theme | CSS variables |
| `status` | enum | "active" or "inactive" | World.isActive |
| `interactionType` | enum | "clickable", "disabled" | World.isActive |

**Relationships**: 
- Belongs to one World
- Displayed in grid of 4 cards on home page

**Validation Rules**:
- `status` = "active" → `interactionType` = "clickable"
- `status` = "inactive" → `interactionType` = "disabled", must show "coming soon" text
- `svgScenery` must be valid SVG matching World.sceneryType
- `colorScheme` must align with World.theme

**CSS Color Schemes**:
```css
/* Addition Forest */
--world-primary: #4CAF50;
--world-secondary: #81C784;
--world-accent: #2E7D32;

/* Subtraction Mountain */
--world-primary: #EEEEEE;
--world-secondary: #BDBDBD;
--world-accent: #757575;

/* Multiplication Desert */
--world-primary: #FFD54F;
--world-secondary: #FFE082;
--world-accent: #F57F17;

/* Division Ocean */
--world-primary: #42A5F5;
--world-secondary: #90CAF9;
--world-accent: #1565C0;
```

---

### Map Spot Entity

**Description**: Learning location on Addition Forest map

**Properties**:
| Property | Type | Description | Source |
|----------|------|-------------|--------|
| `id` | string | Unique identifier (e.g., "spot-1") | HTML id attribute |
| `number` | integer | Display number (1-5) | HTML content |
| `position` | object | {x, y} coordinates on map | SVG positioning |
| `isHighlighted` | boolean | Visual highlight state | CSS classes |
| `isClickable` | boolean | Whether spot can be activated | HTML structure |
| `labelKey` | string | Localization key for accessibility | Locale JSON |

**Relationships**: 
- Part of Addition Forest Map
- Sequential progression (spot 1 → 2 → 3 → 4 → 5)

**Validation Rules**:
- `number` must be 1-5 (per FR-015)
- `isHighlighted` = true only for spot 1 (per FR-016)
- `isClickable` = false for all spots in this feature (per FR-017)
- Position must be within map SVG viewBox

**Example Instance** (Spot 1):
```javascript
{
  id: "spot-1",
  number: 1,
  position: { x: 100, y: 150 },
  isHighlighted: true,
  isClickable: false,
  labelKey: "map.spot"
}
```

---

## Data Flow

Since this is a static site, there is no traditional data flow with servers or databases. However, we document the client-side data flow:

```
1. Browser loads HTML page
   ↓
2. Browser parses inline CSS and SVG
   ↓
3. JavaScript i18n loader executes
   ↓
4. Fetch locale JSON based on navigator.language (default: en)
   ↓
5. Replace all [data-i18n] element content with localized strings
   ↓
6. CSS animations ready (paused state)
   ↓
7. User hovers over Addition Forest card
   ↓
8. CSS :hover pseudo-class triggers animation-play-state: running
   ↓
9. User clicks Addition Forest card
   ↓
10. Browser navigates to worlds/addition-forest-map.html
    ↓
11. Repeat steps 1-6 for map page
```

**No data persistence** (per FR-019): All state resets on page navigation or refresh.

---

## Future Backend Integration Notes

When backend is added in future features, this logical structure can map to:

**Worlds** → Database table or API endpoint returning world configuration  
**Map Spots** → Database table with spot metadata and challenge references  
**User Progress** → New entity tracking which spots completed, scores, etc.  
**Localization** → API endpoint serving translations or build-time bundling

The current file-based JSON localization can remain for static strings, with dynamic content (e.g., challenge text) served from backend.

---

## Validation Summary

| Entity | Key Validation | Enforced By |
|--------|---------------|-------------|
| Locale JSON | All keys present in every language file | CI/CD lint check (future) |
| World | Active worlds have navigation targets | Manual HTML review |
| World Card | Inactive cards show "coming soon" | HTML structure + CSS |
| Map Spot | Exactly 5 spots, first highlighted | HTML structure + CSS |

**Testing**: While frontend testing is not required per Constitution III, manual testing against functional requirements (FR-001 through FR-020) is necessary before deployment.
