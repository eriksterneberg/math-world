# Quickstart: Addition Forest Visual Redesign

**Date**: 2025-10-25  
**Feature**: 004-addition-forest-redesign  
**Purpose**: Quick reference guide for developers implementing the 10-station linear progression map

## 5-Minute Overview

**What**: Replace the winding treasure map with a horizontal linear progression of 10 themed stations.

**Why**: Current map is confusing for children; linear left-to-right layout is more intuitive.

**How**: Update SVG structure in `addition-forest-map.html` with 10 evenly-spaced stations, simplify CSS for linear layout, extend localStorage to support 10 stations.

## Quick Reference

### Files to Modify

| File | Change Type | Description |
|------|-------------|-------------|
| `frontend/worlds/addition-forest-map.html` | **MAJOR** | Replace entire SVG map structure with 10 linear stations |
| `frontend/styles/map.css` | **MAJOR** | Simplify layout for horizontal progression, update animations |
| `frontend/styles/animations.css` | **MINOR** | Add station unlock/completion transitions |
| `frontend/scripts/castle-exercise.js` | **MINOR** | Verify compatibility with 10 stations |
| `frontend/scripts/exercise-state.js` | **REVIEW** | Ensure handles 10-station arrays |
| `frontend/locales/en.json` | **UPDATE** | Add station names and ARIA labels for stations 2-10 |
| `frontend/locales/sv.json` | **UPDATE** | Add Swedish translations for stations 2-10 |

### Key Changes Summary

1. **SVG viewBox**: Change from `800x600` to `1000x300` (wider, shorter)
2. **Station count**: 5 → 10 stations
3. **Layout**: Winding path → horizontal line at Y=150
4. **Position formula**: Station N at X = N × 100 (100, 200, ..., 1000)
5. **Themes**: Add 9 new themed graphics (see contracts for details)

## Implementation Checklist

### Phase 1: Update HTML Structure (2-3 hours)

- [ ] Open `frontend/worlds/addition-forest-map.html`
- [ ] Change SVG viewBox from `viewBox="0 0 800 600"` to `viewBox="0 0 1000 300"`
- [ ] Replace winding path with horizontal line: `<line x1="50" y1="150" x2="1050" y2="150" .../>`
- [ ] Keep existing castle (station 1) at position `translate(100, 150)`
- [ ] Add 9 new station `<g>` elements at positions 200, 300, ..., 1000 (all Y=150)
- [ ] For each new station, copy SVG structure from `contracts/ui-station-graphics.md`
- [ ] Update station numbers (1-10) in `<text class="spot-number">` elements
- [ ] Add/update ARIA labels for all 10 stations
- [ ] Remove old decorative elements (trees, bushes at old positions)
- [ ] Add new decorative elements that fit 1000×300 layout

**Validation**: Load page in browser, verify 10 stations visible in horizontal line

### Phase 2: Update CSS Styles (1-2 hours)

- [ ] Open `frontend/styles/map.css`
- [ ] Update `.treasure-map` max-width if needed (currently 900px, may increase to 1200px)
- [ ] Verify `.map-spot` base styles work with linear layout
- [ ] Update `.map-path` styles for horizontal line (remove complex path animations)
- [ ] Test responsive breakpoints with new aspect ratio (1000×300 vs 800×600)
- [ ] Add horizontal scroll fallback for mobile: `overflow-x: auto` on `.treasure-map`
- [ ] Open `frontend/styles/animations.css`
- [ ] Add `@keyframes unlock-glow` for new station activation (see contract)
- [ ] Add `@keyframes pop-in` for completion indicator (see contract)
- [ ] Ensure `@media (prefers-reduced-motion)` covers new animations

**Validation**: Check all 3 states (locked, active, completed) render correctly with proper styles

### Phase 3: Update Localizations (30 minutes)

- [ ] Open `frontend/locales/en.json`
- [ ] Add keys under `additionForest.stations`:
  ```json
  "stations": {
    "2": { "name": "Tree House", "ariaLocked": "Station 2: Tree House - Locked", ... },
    "3": { "name": "Fountain", ... },
    ... (through 10)
  }
  ```
- [ ] Open `frontend/locales/sv.json`
- [ ] Add Swedish translations:
  ```json
  "stations": {
    "2": { "name": "Trädkoja", "ariaLocked": "Station 2: Trädkoja - Låst", ... },
    ...
  }
  ```

**Validation**: Switch language, verify all station names display correctly

### Phase 4: Verify JavaScript Compatibility (30 minutes)

- [ ] Open `frontend/scripts/exercise-state.js`
- [ ] Find `totalStations` constant (or similar), verify it's 5
- [ ] Update to 10 or make it dynamic based on actual stations in DOM
- [ ] Check `validateState()` function handles arrays up to length 10
- [ ] Open `frontend/scripts/castle-exercise.js`
- [ ] Verify it correctly reads station ID from clicked element
- [ ] Test that completion updates the correct station in localStorage

**Validation**: Complete station 1, verify station 2 unlocks. Repeat for several stations.

### Phase 5: Test Thoroughly (1-2 hours)

#### Visual Tests
- [ ] Desktop (1920px): All stations visible, proper spacing
- [ ] Tablet (768px): Stations scale down, still distinguishable
- [ ] Mobile (320px): Horizontal scroll works, stations tappable

#### Interaction Tests
- [ ] Click station 1 (active): Opens exercise
- [ ] Click station 2 (locked): No action or visual feedback
- [ ] Complete exercise: Station 1 shows checkmark, station 2 becomes active
- [ ] Hover over active station: Glow/highlight appears
- [ ] Tab through stations: Focus order is left-to-right

#### Accessibility Tests
- [ ] Screen reader (VoiceOver/NVDA): Announces all station names and states
- [ ] Keyboard only: Can navigate and activate with Tab + Enter
- [ ] Color contrast: Use browser dev tools, verify WCAG AA compliance
- [ ] Reduced motion: Enable in OS, verify animations disabled

#### Performance Tests
- [ ] Lighthouse: Score ≥ 90 on Performance
- [ ] Network throttling (Slow 3G): Page loads in < 2 seconds
- [ ] Mobile device: Animations run smoothly at 60fps

**Validation**: All tests pass, no regressions in existing functionality

## Common Pitfalls

### SVG Positioning Mistakes
- **Problem**: Stations appear bunched or misaligned
- **Solution**: Verify each `<g transform="translate(X, 150)">` uses X = stationId × 100
- **Check**: Station 5 should be at exact center (500, 150)

### CSS State Classes
- **Problem**: Locked stations still clickable or active stations not highlighted
- **Solution**: Verify mutually exclusive classes: `.locked`, `.active`, `.completed`
- **Check**: Inspect element in dev tools, should have exactly one state class

### localStorage Compatibility
- **Problem**: Completing stations doesn't unlock next
- **Solution**: Verify `exercise-state.js` saves array of up to 10 station IDs
- **Check**: Open dev tools → Application → Local Storage, inspect `mathworld.additionforest.progress`

### Mobile Responsiveness
- **Problem**: Stations cut off or overlap on narrow screens
- **Solution**: Ensure `.treasure-map { overflow-x: auto; }` on mobile breakpoints
- **Check**: Test on actual device or responsive mode at 320px width

### Localization Missing
- **Problem**: Station names show keys like `additionForest.stations.3.name`
- **Solution**: Verify i18n.js loaded and locale files contain all 10 stations
- **Check**: View page source, ensure `<script src="../scripts/i18n.js" defer></script>` present

## Quick Commands

### View Current Progress (Browser Console)
```javascript
// Check current progress state
JSON.parse(localStorage.getItem('mathworld.additionforest.progress'))

// Reset progress (start over)
localStorage.removeItem('mathworld.additionforest.progress')
location.reload()

// Simulate completing first 5 stations
localStorage.setItem('mathworld.additionforest.progress', JSON.stringify({
  currentStation: 6,
  completedStations: [1, 2, 3, 4, 5],
  totalStations: 10,
  lastUpdated: new Date().toISOString()
}))
location.reload()
```

### Test Accessibility
```bash
# Open page with screen reader
# macOS: Enable VoiceOver (Cmd+F5)
# Then navigate with VO+Right Arrow

# Check color contrast (browser dev tools)
# Chrome: DevTools → Elements → Accessibility → Contrast ratio

# Test keyboard navigation
# Tab through stations, Enter to activate
```

### Measure Performance
```bash
# Run Lighthouse audit (Chrome DevTools)
# DevTools → Lighthouse → Generate report

# Check frame rate during animations
# DevTools → Performance → Record → Interact with map → Stop
# Look for sustained 60fps during state transitions
```

## Development Workflow

### Recommended Order

1. **Start with HTML**: Get all 10 stations rendering visually (don't worry about themes yet)
2. **Add simple themes**: Use basic shapes (circles, rectangles) for initial 9 themes
3. **Test interactions**: Verify click, unlock, complete cycle works
4. **Polish themes**: Replace simple shapes with detailed graphics from contract
5. **Responsive design**: Test and fix mobile layouts
6. **Accessibility**: Add ARIA labels, test keyboard/screen reader
7. **Performance**: Optimize SVG, check animation performance
8. **Localization**: Add all translations last (easy to update strings)

### Git Workflow

```bash
# Create feature branch (already done)
git checkout 004-addition-forest-redesign

# Make changes, commit frequently
git add frontend/worlds/addition-forest-map.html
git commit -m "feat: add 10-station linear layout structure"

git add frontend/styles/map.css
git commit -m "feat: update CSS for horizontal progression"

# Test before pushing
# Open addition-forest-map.html in browser, run through checklist

# Push when complete
git push origin 004-addition-forest-redesign

# Create pull request on GitHub
```

## Need Help?

### Reference Documents

- **Full specifications**: `specs/004-addition-forest-redesign/spec.md`
- **Research decisions**: `specs/004-addition-forest-redesign/research.md`
- **Data models**: `specs/004-addition-forest-redesign/data-model.md`
- **SVG contracts**: `specs/004-addition-forest-redesign/contracts/ui-station-graphics.md`
- **Implementation plan**: `specs/004-addition-forest-redesign/plan.md`

### Debugging Tips

1. **SVG not rendering**: Check browser console for errors, verify viewBox dimensions
2. **Stations in wrong positions**: Log `transform` attribute values, should match formula
3. **Styles not applying**: Check CSS specificity, use `!important` temporarily to test
4. **localStorage not working**: Check browser privacy settings, may block in incognito mode
5. **Animations janky**: Reduce complexity, limit to 3 simultaneous animations

### Testing Shortcuts

```javascript
// Jump to station 5 (for testing later stations)
localStorage.setItem('mathworld.additionforest.progress', JSON.stringify({
  currentStation: 5,
  completedStations: [1, 2, 3, 4],
  totalStations: 10,
  lastUpdated: new Date().toISOString()
}))
location.reload()

// Simulate all completed (for testing celebration)
localStorage.setItem('mathworld.additionforest.progress', JSON.stringify({
  currentStation: null,
  completedStations: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  totalStations: 10,
  lastUpdated: new Date().toISOString()
}))
location.reload()
```

## Estimated Time

- **Minimum viable**: 4-6 hours (basic 10 stations with simple graphics)
- **Full implementation**: 8-12 hours (detailed themed graphics, polish, testing)
- **With localization & accessibility**: 10-14 hours (complete feature)

Start with the checklist above and work through each phase systematically. Commit early and often!
