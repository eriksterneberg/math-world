# UI Contract: Station Graphics

**Date**: 2025-10-25  
**Feature**: 004-addition-forest-redesign  
**Purpose**: Define the SVG structure and CSS styling contract for the 10 themed station graphics

## Overview

This contract specifies the exact SVG structure, CSS classes, and visual requirements for each of the 10 themed stations in the Addition Forest map. All stations follow a consistent pattern to ensure maintainability and accessibility.

## SVG Structure Template

Each station follows this template structure:

```svg
<!-- Station N: {Theme Name} -->
<g 
  id="station-{N}" 
  class="map-spot station-{N} {state-class}" 
  transform="translate({X}, {Y})"
  role="button"
  tabindex="0"
  aria-label="{localized description with state}"
  data-station-id="{N}"
  data-theme="{theme-slug}"
>
  <!-- Glow effect (visible when active) -->
  <circle class="spot-glow" r="50" opacity="0"/>
  
  <!-- Station graphic container -->
  <g class="station-graphic" transform="translate(0, 0)">
    <!-- Theme-specific SVG shapes here -->
    <!-- Keep total shapes ≤ 15 per station -->
  </g>
  
  <!-- Station number indicator -->
  <text class="spot-number" x="0" y="55" text-anchor="middle" font-size="20" font-weight="bold">
    {N}
  </text>
  
  <!-- Completion indicator (hidden by default) -->
  <g class="completion-indicator" opacity="0" transform="translate(30, -40)">
    <circle r="12" fill="#4CAF50" stroke="#2E7D32" stroke-width="2"/>
    <path d="M -5,-2 L -2,5 L 8,-5" stroke="#FFF" stroke-width="3" fill="none" stroke-linecap="round"/>
  </g>
  
  <!-- Hover/focus ring -->
  <circle class="interaction-ring" r="55" fill="none" stroke="transparent" stroke-width="3" opacity="0"/>
</g>
```

### Position Calculations

- **X coordinates**: Station N is at X = N × 100 (stations 1-10: 100, 200, 300, ..., 1000)
- **Y coordinate**: All stations at Y = 150 (centered vertically in 1000×300 viewBox)
- **Transform origin**: Each station's `<g>` is positioned at its center for easy rotation/scaling

## CSS Class Contract

### Base Station Classes

```css
/* Base station styling - applies to all stations */
.map-spot {
  cursor: pointer;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

/* State classes - mutually exclusive */
.map-spot.locked {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
}

.map-spot.active {
  /* Highlighted, interactive */
  filter: drop-shadow(0 0 8px rgba(255, 213, 79, 0.8));
}

.map-spot.completed {
  opacity: 1;
  cursor: default;
}

/* State-specific sub-elements */
.map-spot.active .spot-glow {
  opacity: 0.5;
  animation: glow-pulse 2s ease-in-out infinite;
}

.map-spot.completed .completion-indicator {
  opacity: 1;
  animation: pop-in 0.5s ease-out;
}

/* Hover/focus states (only for unlocked stations) */
.map-spot.active:hover .interaction-ring,
.map-spot.active:focus-visible .interaction-ring {
  stroke: #FFD54F;
  opacity: 1;
}

/* Keyboard focus indicator */
.map-spot:focus-visible {
  outline: 3px solid #4A90E2;
  outline-offset: 5px;
  border-radius: 50%;
}
```

### Animation Keyframes

```css
/* Glow pulse for active station */
@keyframes glow-pulse {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.1);
  }
}

/* Completion indicator pop-in */
@keyframes pop-in {
  0% {
    opacity: 0;
    transform: translate(30, -40) scale(0);
  }
  60% {
    transform: translate(30, -40) scale(1.2);
  }
  100% {
    opacity: 1;
    transform: translate(30, -40) scale(1);
  }
}

/* Unlock animation (when station becomes active) */
@keyframes unlock-glow {
  0% { opacity: 0; }
  50% { opacity: 0.8; }
  100% { opacity: 0.5; }
}

/* Reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  .map-spot { transition: none; }
  .spot-glow { animation: none !important; }
  .completion-indicator { animation: none !important; }
}
```

## Station Themes Specifications

### 1. Castle (Position: 100, 150)

**Visual Description**: Stone castle with two towers, door, and windows

**SVG Structure** (simplified - actual implementation will have full details):
```svg
<g class="station-graphic castle-graphic">
  <!-- Main castle body -->
  <rect x="-25" y="-30" width="50" height="60" fill="#B0B0B0" stroke="#808080" stroke-width="2"/>
  
  <!-- Roof -->
  <polygon points="-30,-30 30,-30 25,-45 -25,-45" fill="#909090"/>
  
  <!-- Towers -->
  <rect x="-30" y="-45" width="15" height="25" fill="#B0B0B0"/>
  <rect x="15" y="-45" width="15" height="25" fill="#B0B0B0"/>
  
  <!-- Tower tops -->
  <polygon points="-30,-45 -22.5,-55 -15,-45" fill="#909090"/>
  <polygon points="15,-45 22.5,-55 30,-45" fill="#909090"/>
  
  <!-- Door -->
  <rect x="-10" y="5" width="20" height="25" fill="#654321" stroke="#4A3219" stroke-width="1"/>
  
  <!-- Windows -->
  <rect x="-18" y="-15" width="10" height="10" fill="#FFE87C" stroke="#D4AF37" stroke-width="1"/>
  <rect x="8" y="-15" width="10" height="10" fill="#FFE87C" stroke="#D4AF37" stroke-width="1"/>
</g>
```

**Color Palette**:
- Stone gray: `#B0B0B0`
- Dark stone: `#808080`
- Door brown: `#654321`
- Window gold: `#FFE87C`

**Locked State**: Desaturate to `#D0D0D0`, opacity 0.4

### 2. Tree House (Position: 200, 150)

**Visual Description**: Wooden platform in tree with ladder

**SVG Structure**:
```svg
<g class="station-graphic treehouse-graphic">
  <!-- Tree trunk -->
  <rect x="-8" y="-10" width="16" height="60" fill="#8D6E63" stroke="#5D4037" stroke-width="2"/>
  
  <!-- Platform -->
  <rect x="-30" y="-15" width="60" height="8" fill="#A1887F" stroke="#6D4C41" stroke-width="2"/>
  
  <!-- House walls -->
  <rect x="-25" y="-45" width="50" height="30" fill="#BCAAA4" stroke="#8D6E63" stroke-width="2"/>
  
  <!-- Roof -->
  <polygon points="-30,-45 30,-45 0,-60" fill="#6D4C41" stroke="#4E342E" stroke-width="2"/>
  
  <!-- Window -->
  <rect x="-10" y="-35" width="20" height="15" fill="#FFE87C" stroke="#D4AF37" stroke-width="1"/>
  
  <!-- Ladder (simplified) -->
  <line x1="-35" y1="-15" x2="-35" y2="30" stroke="#8D6E63" stroke-width="2"/>
  <line x1="-32" y1="-15" x2="-32" y2="30" stroke="#8D6E63" stroke-width="2"/>
</g>
```

**Color Palette**:
- Brown wood: `#8D6E63`, `#A1887F`, `#6D4C41`
- Window gold: `#FFE87C`

### 3. Fountain (Position: 300, 150)

**Visual Description**: Decorative fountain with water basin and streams

**SVG Structure**:
```svg
<g class="station-graphic fountain-graphic">
  <!-- Base -->
  <ellipse cx="0" cy="20" rx="35" ry="10" fill="#90A4AE" stroke="#607D8B" stroke-width="2"/>
  
  <!-- Water in base -->
  <ellipse cx="0" cy="18" rx="30" ry="8" fill="#42A5F5" opacity="0.6"/>
  
  <!-- Middle tier -->
  <ellipse cx="0" cy="0" rx="25" ry="8" fill="#90A4AE" stroke="#607D8B" stroke-width="2"/>
  
  <!-- Water in middle -->
  <ellipse cx="0" cy="-2" rx="20" ry="6" fill="#42A5F5" opacity="0.6"/>
  
  <!-- Top tier -->
  <ellipse cx="0" cy="-20" rx="15" ry="6" fill="#90A4AE" stroke="#607D8B" stroke-width="2"/>
  
  <!-- Water streams (animated separately if desired) -->
  <path d="M 0,-20 Q -5,-10 -10,0" stroke="#42A5F5" stroke-width="2" fill="none" opacity="0.7"/>
  <path d="M 0,-20 Q 5,-10 10,0" stroke="#42A5F5" stroke-width="2" fill="none" opacity="0.7"/>
</g>
```

**Color Palette**:
- Stone gray: `#90A4AE`, `#607D8B`
- Water blue: `#42A5F5`

### 4. Flower Garden (Position: 400, 150)

**Visual Description**: Colorful flowers and grass patch

**SVG Structure**:
```svg
<g class="station-graphic garden-graphic">
  <!-- Grass base -->
  <ellipse cx="0" cy="25" rx="40" ry="12" fill="#81C784" stroke="#66BB6A" stroke-width="2"/>
  
  <!-- Flowers (5 different colors) -->
  <!-- Flower 1 - Pink -->
  <circle cx="-20" cy="10" r="6" fill="#F48FB1"/>
  <circle cx="-18" cy="8" r="4" fill="#FCE4EC"/>
  <line x1="-20" y1="10" x2="-20" y2="25" stroke="#66BB6A" stroke-width="2"/>
  
  <!-- Flower 2 - Yellow -->
  <circle cx="-5" cy="5" r="7" fill="#FFD54F"/>
  <circle cx="-3" cy="3" r="4" fill="#FFF9C4"/>
  <line x1="-5" y1="5" x2="-5" y2="25" stroke="#66BB6A" stroke-width="2"/>
  
  <!-- Flower 3 - Purple -->
  <circle cx="10" cy="8" r="6" fill="#CE93D8"/>
  <circle cx="12" cy="6" r="4" fill="#F3E5F5"/>
  <line x1="10" y1="8" x2="10" y2="25" stroke="#66BB6A" stroke-width="2"/>
  
  <!-- Flower 4 - Red -->
  <circle cx="25" cy="12" r="5" fill="#EF5350"/>
  <circle cx="26" cy="11" r="3" fill="#FFEBEE"/>
  <line x1="25" y1="12" x2="25" y2="25" stroke="#66BB6A" stroke-width="2"/>
  
  <!-- Additional grass blades for detail -->
  <path d="M -35,25 Q -35,15 -33,10" stroke="#66BB6A" stroke-width="2" fill="none"/>
  <path d="M 35,25 Q 35,15 33,10" stroke="#66BB6A" stroke-width="2" fill="none"/>
</g>
```

**Color Palette**:
- Grass green: `#81C784`, `#66BB6A`
- Flowers: Pink `#F48FB1`, Yellow `#FFD54F`, Purple `#CE93D8`, Red `#EF5350`

### 5. Bridge (Position: 500, 150)

**Visual Description**: Arched stone bridge over implied water

**SVG Structure**:
```svg
<g class="station-graphic bridge-graphic">
  <!-- Bridge deck -->
  <rect x="-40" y="-5" width="80" height="10" fill="#8D6E63" stroke="#6D4C41" stroke-width="2"/>
  
  <!-- Arch -->
  <path d="M -35,5 Q 0,-25 35,5" stroke="#8D6E63" stroke-width="8" fill="none"/>
  <path d="M -35,5 Q 0,-20 35,5" stroke="#A1887F" stroke-width="4" fill="none"/>
  
  <!-- Stone blocks texture (simplified) -->
  <line x1="-20" y1="-5" x2="-20" y2="5" stroke="#6D4C41" stroke-width="1"/>
  <line x1="0" y1="-5" x2="0" y2="5" stroke="#6D4C41" stroke-width="1"/>
  <line x1="20" y1="-5" x2="20" y2="5" stroke="#6D4C41" stroke-width="1"/>
  
  <!-- Support pillars -->
  <rect x="-38" y="5" width="8" height="25" fill="#8D6E63" stroke="#6D4C41" stroke-width="2"/>
  <rect x="30" y="5" width="8" height="25" fill="#8D6E63" stroke="#6D4C41" stroke-width="2"/>
  
  <!-- Water indication (below bridge) -->
  <ellipse cx="0" cy="30" rx="50" ry="8" fill="#42A5F5" opacity="0.5"/>
</g>
```

**Color Palette**:
- Stone brown: `#8D6E63`, `#A1887F`, `#6D4C41`
- Water blue: `#42A5F5`

### 6. Windmill (Position: 600, 150)

**Visual Description**: Traditional windmill with rotating blades

**SVG Structure**:
```svg
<g class="station-graphic windmill-graphic">
  <!-- Windmill body (tapered cylinder) -->
  <path d="M -20,30 L -15,-20 L 15,-20 L 20,30 Z" fill="#BCAAA4" stroke="#8D6E63" stroke-width="2"/>
  
  <!-- Door -->
  <rect x="-8" y="15" width="16" height="15" fill="#6D4C41" stroke="#4E342E" stroke-width="1"/>
  
  <!-- Window -->
  <circle cx="0" cy="-5" r="5" fill="#FFE87C" stroke="#D4AF37" stroke-width="1"/>
  
  <!-- Roof/cap -->
  <polygon points="-15,-20 15,-20 0,-30" fill="#5D4037" stroke="#4E342E" stroke-width="2"/>
  
  <!-- Windmill blades (4 blades in X pattern) -->
  <g class="windmill-blades" transform="translate(0, -5)">
    <!-- Blade 1 (top) -->
    <path d="M 0,-8 L -5,-35 L 0,-30 L 5,-35 Z" fill="#E0E0E0" stroke="#BDBDBD" stroke-width="1"/>
    <!-- Blade 2 (right) -->
    <path d="M 8,0 L 35,-5 L 30,0 L 35,5 Z" fill="#E0E0E0" stroke="#BDBDBD" stroke-width="1"/>
    <!-- Blade 3 (bottom) -->
    <path d="M 0,8 L 5,35 L 0,30 L -5,35 Z" fill="#E0E0E0" stroke="#BDBDBD" stroke-width="1"/>
    <!-- Blade 4 (left) -->
    <path d="M -8,0 L -35,5 L -30,0 L -35,-5 Z" fill="#E0E0E0" stroke="#BDBDBD" stroke-width="1"/>
    
    <!-- Center hub -->
    <circle cx="0" cy="0" r="6" fill="#6D4C41" stroke="#4E342E" stroke-width="2"/>
  </g>
</g>
```

**Color Palette**:
- Body tan: `#BCAAA4`, `#8D6E63`
- Roof brown: `#5D4037`
- Blades white: `#E0E0E0`, `#BDBDBD`
- Window gold: `#FFE87C`

**Note**: Windmill blades could have optional slow rotation animation (CSS `transform: rotate()` on `.windmill-blades`)

### 7. Lighthouse (Position: 700, 150)

**Visual Description**: Tall striped lighthouse with beacon light

**SVG Structure**:
```svg
<g class="station-graphic lighthouse-graphic">
  <!-- Base -->
  <rect x="-15" y="20" width="30" height="10" fill="#90A4AE" stroke="#607D8B" stroke-width="2"/>
  
  <!-- Tower (tapered) -->
  <path d="M -12,20 L -8,-30 L 8,-30 L 12,20 Z" fill="#FFFFFF" stroke="#607D8B" stroke-width="2"/>
  
  <!-- Red stripes -->
  <rect x="-12" y="10" width="24" height="6" fill="#E53935" opacity="0.9"/>
  <rect x="-11" y="-5" width="22" height="6" fill="#E53935" opacity="0.9"/>
  <rect x="-10" y="-20" width="20" height="6" fill="#E53935" opacity="0.9"/>
  
  <!-- Beacon house -->
  <rect x="-10" y="-35" width="20" height="5" fill="#607D8B" stroke="#455A64" stroke-width="1"/>
  
  <!-- Beacon light -->
  <circle cx="0" cy="-32" r="4" fill="#FFD700" stroke="#FFC107" stroke-width="1"/>
  
  <!-- Light rays (optional, can be animated) -->
  <g class="beacon-rays" opacity="0.6">
    <path d="M 0,-32 L -15,-45" stroke="#FFD700" stroke-width="2"/>
    <path d="M 0,-32 L 15,-45" stroke="#FFD700" stroke-width="2"/>
    <path d="M 0,-32 L -20,-32" stroke="#FFD700" stroke-width="2"/>
    <path d="M 0,-32 L 20,-32" stroke="#FFD700" stroke-width="2"/>
  </g>
  
  <!-- Door -->
  <rect x="-5" y="15" width="10" height="5" fill="#455A64" stroke="#37474F" stroke-width="1"/>
</g>
```

**Color Palette**:
- White tower: `#FFFFFF`
- Red stripes: `#E53935`
- Gray accents: `#90A4AE`, `#607D8B`, `#455A64`
- Beacon gold: `#FFD700`, `#FFC107`

### 8. Pond (Position: 800, 150)

**Visual Description**: Tranquil pond with lily pads and reeds

**SVG Structure**:
```svg
<g class="station-graphic pond-graphic">
  <!-- Pond water -->
  <ellipse cx="0" cy="10" rx="45" ry="25" fill="#42A5F5" stroke="#1976D2" stroke-width="2"/>
  <ellipse cx="0" cy="8" rx="40" ry="20" fill="#64B5F6" opacity="0.6"/>
  
  <!-- Lily pads -->
  <ellipse cx="-20" cy="5" rx="12" ry="8" fill="#66BB6A" stroke="#388E3C" stroke-width="1"/>
  <ellipse cx="15" cy="10" rx="10" ry="7" fill="#66BB6A" stroke="#388E3C" stroke-width="1"/>
  <ellipse cx="0" cy="15" rx="11" ry="7" fill="#66BB6A" stroke="#388E3C" stroke-width="1"/>
  
  <!-- Lily pad cuts (V-shape) -->
  <path d="M -20,5 L -18,0" stroke="#388E3C" stroke-width="1"/>
  <path d="M 15,10 L 17,5" stroke="#388E3C" stroke-width="1"/>
  
  <!-- Flowers on pads -->
  <circle cx="-20" cy="5" r="3" fill="#F48FB1"/>
  <circle cx="15" cy="10" r="3" fill="#FFD54F"/>
  
  <!-- Reeds (left side) -->
  <line x1="-45" y1="25" x2="-45" y2="-10" stroke="#558B2F" stroke-width="2"/>
  <ellipse cx="-45" cy="-12" rx="3" ry="6" fill="#689F38"/>
  
  <line x1="-50" y1="25" x2="-48" y2="0" stroke="#558B2F" stroke-width="2"/>
  <ellipse cx="-48" cy="-2" rx="3" ry="6" fill="#689F38"/>
  
  <!-- Reeds (right side) -->
  <line x1="45" y1="25" x2="45" y2="-5" stroke="#558B2F" stroke-width="2"/>
  <ellipse cx="45" cy="-7" rx="3" ry="6" fill="#689F38"/>
</g>
```

**Color Palette**:
- Water blue: `#42A5F5`, `#64B5F6`, `#1976D2`
- Lily pads green: `#66BB6A`, `#388E3C`
- Reeds green: `#558B2F`, `#689F38`
- Flowers: Pink `#F48FB1`, Yellow `#FFD54F`

### 9. Tower (Position: 900, 150)

**Visual Description**: Tall stone tower reaching upward

**SVG Structure**:
```svg
<g class="station-graphic tower-graphic">
  <!-- Tower base -->
  <rect x="-20" y="20" width="40" height="10" fill="#90A4AE" stroke="#607D8B" stroke-width="2"/>
  
  <!-- Tower main body (3 sections for depth) -->
  <rect x="-18" y="-40" width="36" height="60" fill="#B0BEC5" stroke="#78909C" stroke-width="2"/>
  
  <!-- Stone texture lines -->
  <line x1="-18" y1="0" x2="18" y2="0" stroke="#78909C" stroke-width="1"/>
  <line x1="-18" y1="-20" x2="18" y2="-20" stroke="#78909C" stroke-width="1"/>
  
  <!-- Windows at different levels -->
  <rect x="-8" y="-10" width="6" height="8" fill="#FFE87C" stroke="#D4AF37" stroke-width="1"/>
  <rect x="2" y="-10" width="6" height="8" fill="#FFE87C" stroke="#D4AF37" stroke-width="1"/>
  
  <rect x="-8" y="-30" width="6" height="8" fill="#FFE87C" stroke="#D4AF37" stroke-width="1"/>
  <rect x="2" y="-30" width="6" height="8" fill="#FFE87C" stroke="#D4AF37" stroke-width="1"/>
  
  <!-- Tower top / battlements -->
  <rect x="-20" y="-45" width="8" height="5" fill="#90A4AE" stroke="#607D8B" stroke-width="1"/>
  <rect x="-8" y="-45" width="8" height="5" fill="#90A4AE" stroke="#607D8B" stroke-width="1"/>
  <rect x="4" y="-45" width="8" height="5" fill="#90A4AE" stroke="#607D8B" stroke-width="1"/>
  <rect x="16" y="-45" width="8" height="5" fill="#90A4AE" stroke="#607D8B" stroke-width="1"/>
  
  <!-- Flag on top -->
  <line x1="0" y1="-45" x2="0" y2="-60" stroke="#6D4C41" stroke-width="2"/>
  <path d="M 0,-60 L 15,-55 L 0,-50 Z" fill="#E53935"/>
  
  <!-- Door at base -->
  <rect x="-8" y="12" width="16" height="8" fill="#6D4C41" stroke="#5D4037" stroke-width="1"/>
</g>
```

**Color Palette**:
- Stone gray: `#B0BEC5`, `#90A4AE`, `#78909C`, `#607D8B`
- Windows gold: `#FFE87C`, `#D4AF37`
- Door brown: `#6D4C41`, `#5D4037`
- Flag red: `#E53935`

### 10. Treasure Chest (Position: 1000, 150)

**Visual Description**: Open treasure chest overflowing with gems and gold

**SVG Structure**:
```svg
<g class="station-graphic treasure-graphic">
  <!-- Chest base -->
  <rect x="-25" y="10" width="50" height="20" fill="#8D6E63" stroke="#6D4C41" stroke-width="2"/>
  
  <!-- Chest front panel decoration -->
  <rect x="-22" y="12" width="44" height="16" fill="#A1887F" stroke="#8D6E63" stroke-width="1"/>
  
  <!-- Metal bands -->
  <rect x="-25" y="15" width="50" height="2" fill="#FFD700"/>
  <rect x="-25" y="23" width="50" height="2" fill="#FFD700"/>
  
  <!-- Lock -->
  <rect x="-4" y="18" width="8" height="6" fill="#FFD700" stroke="#FFC107" stroke-width="1"/>
  <circle cx="0" cy="21" r="2" fill="#6D4C41"/>
  
  <!-- Chest lid (open) -->
  <path d="M -25,10 L -25,-10 Q -25,-15 -20,-15 L 20,-15 Q 25,-15 25,-10 L 25,10" 
        fill="#8D6E63" stroke="#6D4C41" stroke-width="2"/>
  <path d="M -22,-12 L 22,-12" stroke="#FFD700" stroke-width="2"/>
  
  <!-- Treasure contents -->
  <!-- Gold coins -->
  <circle cx="-15" cy="5" r="4" fill="#FFD700" stroke="#FFC107" stroke-width="1"/>
  <circle cx="-8" cy="8" r="4" fill="#FFD700" stroke="#FFC107" stroke-width="1"/>
  <circle cx="0" cy="5" r="4" fill="#FFD700" stroke="#FFC107" stroke-width="1"/>
  <circle cx="8" cy="7" r="4" fill="#FFD700" stroke="#FFC107" stroke-width="1"/>
  <circle cx="15" cy="5" r="4" fill="#FFD700" stroke="#FFC107" stroke-width="1"/>
  
  <!-- Gems (various colors) -->
  <polygon points="-10,0 -8,-5 -6,0 -8,2" fill="#E53935" stroke="#C62828" stroke-width="1"/> <!-- Ruby -->
  <polygon points="5,-2 7,-7 9,-2 7,0" fill="#42A5F5" stroke="#1976D2" stroke-width="1"/> <!-- Sapphire -->
  <polygon points="12,-5 14,-10 16,-5 14,-3" fill="#66BB6A" stroke="#388E3C" stroke-width="1"/> <!-- Emerald -->
  
  <!-- Sparkles -->
  <path d="M -20,-8 L -18,-8 M -19,-9 L -19,-7" stroke="#FFD700" stroke-width="1.5" opacity="0.8"/>
  <path d="M 20,-5 L 22,-5 M 21,-6 L 21,-4" stroke="#FFD700" stroke-width="1.5" opacity="0.8"/>
  <path d="M 0,-12 L 2,-12 M 1,-13 L 1,-11" stroke="#FFD700" stroke-width="1.5" opacity="0.8"/>
</g>
```

**Color Palette**:
- Chest brown: `#8D6E63`, `#A1887F`, `#6D4C41`
- Gold: `#FFD700`, `#FFC107`
- Gems: Ruby `#E53935`, Sapphire `#42A5F5`, Emerald `#66BB6A`

## Progression Line Contract

The line connecting all stations:

```svg
<!-- Horizontal progression line -->
<line 
  id="progression-line"
  class="map-path"
  x1="50" 
  y1="150" 
  x2="1050" 
  y2="150"
  stroke="#8D6E63"
  stroke-width="6"
  stroke-dasharray="12 4"
  stroke-linecap="round"
  opacity="0.6"
/>
```

**CSS Animation** (optional dash movement):
```css
.map-path {
  animation: path-flow 30s linear infinite;
}

@keyframes path-flow {
  to {
    stroke-dashoffset: -200;
  }
}
```

## Accessibility Requirements

### ARIA Labels

Each station must have dynamic ARIA labels that reflect current state:

```javascript
// Example label generation
function getStationAriaLabel(stationId, theme, state, locale) {
  const stateText = {
    locked: locale === 'en' ? 'Locked' : 'Låst',
    active: locale === 'en' ? 'Ready to start' : 'Redo att börja',
    completed: locale === 'en' ? 'Completed' : 'Slutförd'
  };
  
  const themeName = i18n.t(`additionForest.stations.${stationId}.name`);
  
  return `${locale === 'en' ? 'Station' : 'Station'} ${stationId}: ${themeName} - ${stateText[state]}`;
}
```

### Keyboard Navigation

- **Tab order**: Stations 1-10 in sequence (left to right)
- **Activation**: Enter or Space key on focused station
- **Focus indicator**: Visible outline (see CSS contract above)
- **Skip link**: Optional "Skip to active station" link for efficiency

### Screen Reader Announcements

Use ARIA live regions for state changes:

```html
<div role="status" aria-live="polite" aria-atomic="true" class="sr-only" id="map-status">
  <!-- JavaScript updates this when station state changes -->
</div>
```

Example announcements:
- "Station 3 unlocked. Fountain is now ready to start."
- "Station 2 completed. Moving to station 3."

## Performance Requirements

### SVG Optimization

- **Total shapes per station**: ≤ 15 shapes
- **Path complexity**: Prefer simple shapes (rect, circle, ellipse) over complex paths
- **Reuse patterns**: Use `<defs>` and `<use>` for repeated elements (e.g., grass blades)
- **File size target**: Final HTML with inline SVG ≤ 150 KB

### Animation Performance

- **Animated properties**: Only `transform`, `opacity`, `stroke-dashoffset` (GPU-accelerated)
- **Avoid animating**: `fill`, `stroke`, `filter` (causes repaints)
- **Frame rate**: Maintain 60fps on mobile devices
- **Animation count**: Maximum 3 simultaneous animations (active glow, path flow, one transition)

## Testing Checklist

### Visual Testing

- [ ] All 10 stations render correctly at 320px, 768px, 1920px widths
- [ ] Each theme is visually distinct and recognizable
- [ ] Color contrast meets WCAG AA (use browser dev tools)
- [ ] Locked stations are clearly differentiated (40% opacity)
- [ ] Active station has visible glow/highlight
- [ ] Completed stations show checkmark indicator
- [ ] Animations are smooth (60fps) without jank

### Interaction Testing

- [ ] Clicking active station opens exercise
- [ ] Clicking locked station has no effect (or shows shake animation)
- [ ] Clicking completed station has appropriate behavior (none or review)
- [ ] Hover effects work on desktop
- [ ] Focus states visible for keyboard navigation
- [ ] Tab order follows left-to-right sequence

### Accessibility Testing

- [ ] Screen reader announces all station names and states
- [ ] Keyboard navigation works (Tab, Enter, Space)
- [ ] Color contrast ratios verified with tools
- [ ] Reduced motion preference respected (animations disabled)
- [ ] ARIA labels dynamically update with state changes

### Performance Testing

- [ ] Page loads in < 2 seconds on 3G connection
- [ ] Animations maintain 60fps on mobile devices
- [ ] No visual jank during state transitions
- [ ] SVG scales smoothly at different viewport sizes

## Summary

This contract provides:
- **Consistent structure**: All stations follow same SVG template
- **Clear styling**: CSS classes define state-based appearance
- **Accessibility**: ARIA labels, keyboard navigation, high contrast
- **Performance**: Optimized shapes, GPU-accelerated animations
- **Maintainability**: Well-documented SVG for each theme

Developers implementing this contract should refer to this document for exact specifications and test against the checklist to ensure compliance.
