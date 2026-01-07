# Claude.md - AI Assistant Guide for Typer

## Project Overview

**Typer** is a browser-based typing practice application designed specifically for split/ergonomic keyboard users. It helps users improve typing speed and accuracy with real-time feedback and visual key highlighting.

### Key Value Proposition
- No installation required - runs directly in the browser
- Visual split keyboard layout showing hand assignments
- Real-time WPM and accuracy tracking
- Progressive difficulty levels

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        index.html                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │   Header    │  │    Stats    │  │   Practice Area     │ │
│  │  (Title)    │  │ WPM/Acc/Time│  │  Text + Input       │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
│  ┌─────────────┐  ┌─────────────────────────────────────┐  │
│  │  Controls   │  │         Keyboard Visual             │  │
│  │ Btns/Select │  │    Left Hand    │    Right Hand     │  │
│  └─────────────┘  └─────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
         │                              │
         ▼                              ▼
    style.css                        app.js
   (Presentation)                  (Logic/State)
```

### File Responsibilities

| File | Purpose |
|------|---------|
| `index.html` | DOM structure, UI elements, keyboard layout |
| `style.css` | Visual styling, animations, responsive design |
| `app.js` | Game logic, state management, event handling |

## Core Functionality

### Game Flow
1. Page loads → `init()` called → random text loaded
2. User starts typing → timer begins on first keystroke
3. Each keystroke → update display, calculate stats, highlight next key
4. Text completed → show final results

### State Variables
```javascript
currentText     // String: The target text to type
userInputValue  // String: What user has typed so far
startTime       // Date: When typing began (null until first key)
timerInterval   // ID: setInterval reference for timer updates
errors          // Number: Count of incorrect characters
currentIndex    // Number: Current position in text
```

### Key Functions

| Function | Purpose |
|----------|---------|
| `init()` | Bootstrap the application |
| `loadNewText()` | Select random text based on difficulty |
| `displayText()` | Render text as individual character spans |
| `handleInput()` | Process each keystroke |
| `updateDisplay()` | Apply correct/incorrect styling |
| `highlightNextKey()` | Show which key to press next |
| `calculateWPM()` | Words per minute calculation |
| `calculateAccuracy()` | Percentage of correct characters |
| `resetGame()` | Clear state for new attempt |

## Styling Conventions

### Color Palette
- Primary: `#667eea` (purple-blue)
- Secondary: `#764ba2` (purple)
- Success: `#28a745` (green)
- Error: `#dc3545` (red)
- Background: `#f8f9fa` (light gray)

### Visual States
- `.correct` - Green text for correctly typed characters
- `.incorrect` - Red text with pink background for errors
- `.current` - Purple background highlighting current position
- `.active` - Purple key highlight for next key to press
- `.pressed` - Green flash animation on successful keypress

## Development Guidelines

### Adding Features
When adding new functionality:
1. Keep the vanilla JS approach - no frameworks
2. Follow existing patterns for state management
3. Cache DOM references at module level
4. Use event delegation where sensible
5. Maintain mobile responsiveness

### Modifying Text Samples
The `textSamples` object in `app.js` contains arrays for each difficulty:
- **Easy**: Short pangrams and simple sentences
- **Medium**: Programming quotes and longer sentences
- **Hard**: Complex vocabulary and technical content

### Keyboard Customization
The keyboard visual is pure HTML/CSS:
- Each key has a `data-key` attribute matching the character
- JavaScript uses `querySelector` with `data-key` for highlighting
- Layout changes require HTML structure updates

## Potential Enhancements

These are ideas for future development:

1. **Persistence**: Save high scores to localStorage
2. **Custom Text**: Allow users to input their own practice text
3. **Themes**: Dark mode and color customization
4. **Sound Effects**: Optional audio feedback
5. **Progress Tracking**: Charts showing improvement over time
6. **Lesson Mode**: Structured typing lessons for beginners
7. **Multiplayer**: Real-time typing races
8. **More Layouts**: Support for different keyboard layouts (Dvorak, Colemak)

## Common Issues & Solutions

### Timer doesn't start
- Check that `handleInput` is properly attached to the input element
- Verify `startTime` is null before first keystroke

### Key highlighting not working
- Ensure `data-key` attributes match lowercase characters
- Check for special characters that may need escaping

### Accuracy seems wrong
- Verify error counting in `updateDisplay()`
- Check that errors are reset on `resetGame()`

## Testing Approach

Currently no automated tests. Manual testing checklist:
- [ ] Text loads on page open
- [ ] Timer starts on first keystroke
- [ ] Correct characters show green
- [ ] Incorrect characters show red
- [ ] WPM updates in real-time
- [ ] Accuracy percentage is correct
- [ ] Reset button clears all state
- [ ] New Text button loads different text
- [ ] Difficulty selector changes text complexity
- [ ] Keyboard highlights next key
- [ ] Completion alert shows final stats
- [ ] Responsive design works on mobile

## Working with This Codebase

### Quick Start
1. Open `index.html` in a browser
2. Start typing to test functionality
3. Use browser DevTools for debugging

### Making Changes
1. Edit files directly - no build step needed
2. Refresh browser to see changes
3. Use DevTools console for JavaScript debugging
4. Use DevTools Elements panel for CSS inspection

### Code Style
- ES6+ JavaScript features
- Descriptive variable/function names
- Comments for complex logic
- Consistent indentation (4 spaces)
- No semicolon style variations - use semicolons consistently

## Questions to Ask Before Major Changes

1. Does this maintain the "no build tools" philosophy?
2. Will this work in all modern browsers?
3. Is this accessible to keyboard and screen reader users?
4. Does this maintain mobile responsiveness?
5. Is the code complexity justified by the feature value?

