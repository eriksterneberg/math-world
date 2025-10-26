# Data Model: Addition Forest Visual Redesign

**Date**: 2025-10-25  
**Feature**: 004-addition-forest-redesign  
**Purpose**: Define the data structures and state transitions for the 10-station linear progression map

## Core Entities

### Station

Represents a single learning spot on the Addition Forest map.

**Attributes**:
- `id` (number): Unique identifier, range 1-10
- `theme` (string): Visual design category (castle, tree-house, fountain, flower-garden, bridge, windmill, lighthouse, pond, tower, treasure-chest)
- `position` (object): SVG coordinates
  - `x` (number): Horizontal position in SVG viewBox (100, 200, 300, ..., 1000)
  - `y` (number): Vertical position in SVG viewBox (constant 150 for all stations)
- `state` (enum): Current status [locked, active, completed]
- `name` (object): Localized display names
  - `en` (string): English name
  - `sv` (string): Swedish name
- `ariaLabel` (object): Localized screen reader descriptions
  - `en` (string): English ARIA label with state
  - `sv` (string): Swedish ARIA label with state

**Validation Rules**:
- `id` must be unique within map (1-10)
- `position.x` must be evenly spaced: `id * 100`
- `position.y` must be 150 (centered vertically)
- `state` can only transition: locked → active → completed (one-way progression)
- Only one station can have `state = active` at a time

**Relationships**:
- A Station has a ProgressState (1:1 relationship with localStorage persistence)
- A Station precedes/follows other Stations (1:N ordered sequence)
- A Station triggers ExerciseSession when clicked (if active)

**State Transitions**:
```
[locked] → (previous station completed) → [active] → (exercise completed) → [completed]
```

### ProgressState

Represents the user's overall progress through all stations. Persisted in browser localStorage.

**Attributes**:
- `currentStation` (number): ID of the active station (1-10)
- `completedStations` (array of numbers): IDs of completed stations [1, 2, 3, ...]
- `totalStations` (number): Always 10 (constant for this implementation)
- `lastUpdated` (timestamp): ISO 8601 date-time of last progress change

**Validation Rules**:
- `currentStation` must be one more than highest value in `completedStations`
- `completedStations` must be a contiguous sequence starting from 1: [1], [1,2], [1,2,3], etc.
- `completedStations.length` must be < `totalStations` (if all complete, currentStation = null)
- `lastUpdated` must be valid ISO 8601 format

**Storage Format** (localStorage key: `mathworld.additionforest.progress`):
```json
{
  "currentStation": 3,
  "completedStations": [1, 2],
  "totalStations": 10,
  "lastUpdated": "2025-10-25T14:30:00.000Z"
}
```

**Relationships**:
- ProgressState contains multiple Station states (1:N)
- ProgressState is loaded/saved by ExerciseStateManager (managed by existing exercise-state.js)

### StationGraphic

Represents the SVG visual elements for a single station theme.

**Attributes**:
- `stationId` (number): Links to Station.id (1-10)
- `theme` (string): Matches Station.theme
- `svgElements` (array of SVG objects): Collection of shapes that compose the graphic
  - Each element has: `type` (rect, circle, path, polygon), `attributes` (fill, stroke, dimensions), `cssClass` (for styling)
- `boundingBox` (object): Size constraints
  - `width` (number): Maximum width in SVG units (~80 units)
  - `height` (number): Maximum height in SVG units (~80 units)
  - `centerX` (number): Always 0 (relative to `<g transform>`)
  - `centerY` (number): Always 0 (relative to `<g transform>`)
- `completionIndicator` (object): Graphic shown when completed
  - `type` (string): checkmark, star, or custom
  - `position` (object): Offset from station center {x, y}

**Validation Rules**:
- `boundingBox` dimensions must fit within 100-unit station spacing (with margins)
- `svgElements` should be optimized (≤15 shapes per station for performance)
- All colors must meet WCAG AA contrast requirements against background

**Relationships**:
- StationGraphic is rendered for each Station (1:1)
- StationGraphic appearance changes based on Station.state (conditional rendering/styling)

### ProgressionLine

Represents the visual path connecting all stations.

**Attributes**:
- `startPoint` (object): Beginning coordinates {x: 50, y: 150}
- `endPoint` (object): Ending coordinates {x: 1050, y: 150}
- `style` (object): Visual properties
  - `strokeColor` (string): CSS color for path
  - `strokeWidth` (number): Line thickness in SVG units
  - `strokeDasharray` (string): Dash pattern (e.g., "10 5")
  - `opacity` (number): 0-1 transparency
- `waypoints` (array of objects): Station connection points [{x: 100, y: 150}, {x: 200, y: 150}, ...]

**Validation Rules**:
- `startPoint.y` and `endPoint.y` must equal 150 (horizontal line)
- `waypoints` must align with Station positions
- `strokeColor` must have sufficient contrast with background (WCAG AA)

**Relationships**:
- ProgressionLine visually connects all Stations (1:N)
- ProgressionLine is a static visual element (no state changes)

### BackgroundElement

Represents decorative forest-themed graphics that enhance visual appeal.

**Attributes**:
- `id` (string): Unique identifier (e.g., "tree-left-1", "bush-right-2")
- `type` (enum): Element category [tree, bush, flower, cloud, grass, animal]
- `position` (object): SVG coordinates {x, y}
- `size` (object): Dimensions {width, height}
- `opacity` (number): 0-1, typically 0.2-0.4 for background elements
- `zIndex` (number): Layer order (-1 for background, 0 for path, 1 for stations)

**Validation Rules**:
- Must not overlap or obscure any Station (check bounding boxes)
- Combined count of all BackgroundElements ≤ 30 (performance constraint)
- `opacity` must be low enough to not distract from stations (≤ 0.5)

**Relationships**:
- BackgroundElements are independent of Stations (no logical relationship)
- Multiple BackgroundElements compose the visual environment (N:1 to map)

## State Transition Diagram

```
Initial Load
    ↓
Load ProgressState from localStorage
    ↓
Determine current station (default: 1 if no progress)
    ↓
    ├─→ For each station 1 to 10:
    │   ├─→ If station.id < currentStation: state = "completed"
    │   ├─→ If station.id === currentStation: state = "active"
    │   └─→ If station.id > currentStation: state = "locked"
    ↓
Render map with 10 stations in calculated states
    ↓
User clicks active station
    ↓
Open exercise interface (existing castle-exercise.js)
    ↓
User completes exercise
    ↓
Update ProgressState:
    - Add currentStation to completedStations
    - Increment currentStation
    - Update lastUpdated timestamp
    - Save to localStorage
    ↓
Re-render map with new states:
    - Previous active station → completed (show checkmark)
    - Next station → active (highlight/glow)
    - Animation transition (0.3s ease)
    ↓
If all 10 stations completed:
    - Show celebration animation
    - currentStation = null
    - Display "All completed" badge
```

## Data Flow

### Loading Flow

```
1. Page Load (addition-forest-map.html)
   ↓
2. exercise-state.js loads ProgressState from localStorage
   ↓
3. Map rendering logic reads ProgressState.currentStation and ProgressState.completedStations
   ↓
4. For each Station ID (1-10):
   - Determine state based on ProgressState
   - Apply CSS classes: .locked, .active, or .completed
   - Set ARIA attributes based on state
   ↓
5. Render SVG with:
   - BackgroundElements (layer -1)
   - ProgressionLine (layer 0)
   - 10 StationGraphics (layer 1) with state-specific styles
```

### Interaction Flow

```
1. User clicks Station (keyboard: focus + Enter/Space)
   ↓
2. Check Station.state:
   - If locked: No action (visual shake animation)
   - If completed: Optional recap/review (future enhancement)
   - If active: Proceed to exercise
   ↓
3. If active, castle-exercise.js handles exercise logic
   ↓
4. On exercise completion:
   - castle-exercise.js calls exercise-state.js.markStationComplete(stationId)
   ↓
5. exercise-state.js updates ProgressState:
   - completedStations.push(currentStation)
   - currentStation += 1
   - lastUpdated = new Date().toISOString()
   - localStorage.setItem('mathworld.additionforest.progress', JSON.stringify(state))
   ↓
6. Map re-renders (or listens to storage event):
   - Update CSS classes on affected stations
   - Trigger completion animation on newly completed station
   - Trigger unlock animation on newly active station
```

## Integration Points

### With Existing Systems

**exercise-state.js** (existing):
- **Current**: Handles 5 stations
- **Required Changes**: 
  - Update `totalStations` constant from 5 to 10
  - Ensure `validateState()` function handles 10-station arrays
  - Confirm `completedStations` array can hold up to 10 values
- **Interface**: No breaking changes expected

**castle-exercise.js** (existing):
- **Current**: Generates questions, validates answers, updates progress
- **Required Changes**: 
  - Verify it reads correct station ID from DOM or passed parameter
  - May need to update princess message for stations 2-10 if different
- **Interface**: No breaking changes expected

**i18n.js** (existing):
- **Current**: Loads locale files, translates UI text
- **Required Changes**:
  - Add keys for 10 station names (currently only has castle/spot 1-5)
  - Add keys for 10 ARIA labels with state variants
- **Interface**: No breaking changes expected

**locales/en.json, locales/sv.json**:
- **Required Additions**:
```json
{
  "additionForest": {
    "stations": {
      "1": { "name": "Castle", "ariaLocked": "Station 1: Castle - Locked", ... },
      "2": { "name": "Tree House", "ariaLocked": "Station 2: Tree House - Locked", ... },
      ...
      "10": { "name": "Treasure Chest", ... }
    }
  }
}
```

## Assumptions & Constraints

### Assumptions
1. Browser localStorage has at least 5MB available (typical minimum)
2. Users access the site from the same browser/device to maintain progress
3. SVG is supported in target browsers (all modern browsers support SVG 1.1)
4. JavaScript is enabled (map functionality requires JS for interactivity)

### Constraints
1. **Station count fixed at 10**: Design is optimized for exactly 10 stations (not configurable)
2. **Linear progression only**: Users cannot skip ahead or go backward (enforced by state validation)
3. **Single active station**: Only one station can be active at a time (no parallel exercises)
4. **Viewport minimum**: Map requires minimum 320px width (smallest mobile devices)
5. **Performance target**: Map must render in <2 seconds on mobile, maintain 60fps animations

### Edge Cases

| Scenario | Handling |
|----------|----------|
| localStorage full or disabled | Graceful degradation: all stations locked except #1, show warning message |
| Invalid progress data in localStorage | Reset to initial state (station 1 active, rest locked) |
| User completes station but navigates away before save | Progress lost; exercise must be repeated (acceptable tradeoff) |
| User manually edits localStorage to unlock all | Validation on load detects non-contiguous sequence, resets to valid state |
| Multiple tabs open with same page | Storage events sync state across tabs (browser built-in) |
| Very narrow viewport (<320px) | Enable horizontal scroll, maintain minimum tap target size |
| Screen reader navigating stations | Tab order follows left-to-right, ARIA labels announce state changes |
| User with reduced motion preference | Disable animations via CSS `@media (prefers-reduced-motion: reduce)` |

## Summary

This data model supports a linear progression through 10 themed stations with clear state management, localStorage persistence, and integration with existing systems. The design prioritizes:
- **Simplicity**: Stations are just ID, theme, position, and state
- **Extensibility**: Easy to add station 11 by extending arrays
- **Accessibility**: State information available to screen readers via ARIA
- **Performance**: Minimal data structures, efficient SVG rendering
- **Maintainability**: Clear separation between data (ProgressState), presentation (StationGraphic), and logic (existing JS modules)
