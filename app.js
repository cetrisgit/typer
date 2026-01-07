// Text samples for different difficulty levels
const textSamples = {
    easy: [
        "the quick brown fox jumps over the lazy dog",
        "pack my box with five dozen liquor jugs",
        "how vexingly quick daft zebras jump",
        "the five boxing wizards jump quickly",
        "sphinx of black quartz judge my vow"
    ],
    medium: [
        "Programming is the art of telling another human what one wants the computer to do.",
        "The best way to predict the future is to invent it.",
        "Code is like humor. When you have to explain it, it's bad.",
        "First, solve the problem. Then, write the code.",
        "Any fool can write code that a computer can understand. Good programmers write code that humans can understand."
    ],
    hard: [
        "The cryptocurrency market's volatility necessitates comprehensive risk management strategies.",
        "Quantum entanglement's non-locality challenges our fundamental understanding of causality.",
        "Neuroplasticity demonstrates the brain's extraordinary capacity for reorganization throughout life.",
        "Epistemological frameworks influence how we construct and validate knowledge claims.",
        "The algorithmic complexity of distributed systems requires sophisticated synchronization mechanisms."
    ]
};

// Default key layout (QWERTY) - maps position to character
const defaultKeyLayout = {
    // Left hand - 5 rows, 5 keys each (left to right)
    'left-0-0': '1', 'left-0-1': '2', 'left-0-2': '3', 'left-0-3': '4', 'left-0-4': '5',
    'left-1-0': 'q', 'left-1-1': 'w', 'left-1-2': 'e', 'left-1-3': 'r', 'left-1-4': 't',
    'left-2-0': 'a', 'left-2-1': 's', 'left-2-2': 'd', 'left-2-3': 'f', 'left-2-4': 'g',
    'left-3-0': 'z', 'left-3-1': 'x', 'left-3-2': 'c', 'left-3-3': 'v', 'left-3-4': 'b',
    'left-4-0': '`', 'left-4-1': 'tab', 'left-4-2': 'caps', 'left-4-3': 'lshift', 'left-4-4': 'lctrl',
    // Right hand - 5 rows, 5 keys each (displayed left to right, calibration right to left)
    'right-0-0': '6', 'right-0-1': '7', 'right-0-2': '8', 'right-0-3': '9', 'right-0-4': '0',
    'right-1-0': 'y', 'right-1-1': 'u', 'right-1-2': 'i', 'right-1-3': 'o', 'right-1-4': 'p',
    'right-2-0': 'h', 'right-2-1': 'j', 'right-2-2': 'k', 'right-2-3': 'l', 'right-2-4': ';',
    'right-3-0': 'n', 'right-3-1': 'm', 'right-3-2': ',', 'right-3-3': '.', 'right-3-4': '/',
    'right-4-0': '-', 'right-4-1': '=', 'right-4-2': '[', 'right-4-3': ']', 'right-4-4': '\\'
};

// Finger mapping - which finger to use for each column
// For split keyboards: pinky=0, ring=1, middle=2, index=3-4 (left hand)
//                      index=0-1, middle=2, ring=3, pinky=4 (right hand)
const fingerMapping = {
    // Left hand
    'left-pinky': ['left-0-0', 'left-1-0', 'left-2-0', 'left-3-0', 'left-4-0'],
    'left-ring': ['left-0-1', 'left-1-1', 'left-2-1', 'left-3-1', 'left-4-1'],
    'left-middle': ['left-0-2', 'left-1-2', 'left-2-2', 'left-3-2', 'left-4-2'],
    'left-index': ['left-0-3', 'left-1-3', 'left-2-3', 'left-3-3', 'left-4-3',
                   'left-0-4', 'left-1-4', 'left-2-4', 'left-3-4', 'left-4-4'],
    // Right hand
    'right-index': ['right-0-0', 'right-1-0', 'right-2-0', 'right-3-0', 'right-4-0',
                    'right-0-1', 'right-1-1', 'right-2-1', 'right-3-1', 'right-4-1'],
    'right-middle': ['right-0-2', 'right-1-2', 'right-2-2', 'right-3-2', 'right-4-2'],
    'right-ring': ['right-0-3', 'right-1-3', 'right-2-3', 'right-3-3', 'right-4-3'],
    'right-pinky': ['right-0-4', 'right-1-4', 'right-2-4', 'right-3-4', 'right-4-4']
};

// Build reverse mapping: position -> finger
const positionToFinger = {};
for (const [finger, positions] of Object.entries(fingerMapping)) {
    for (const pos of positions) {
        positionToFinger[pos] = finger;
    }
}

// Finger display names
const fingerNames = {
    'left-pinky': 'Pinky',
    'left-ring': 'Ring',
    'left-middle': 'Middle',
    'left-index': 'Index',
    'left-thumb': 'Thumb',
    'right-pinky': 'Pinky',
    'right-ring': 'Ring',
    'right-middle': 'Middle',
    'right-index': 'Index',
    'right-thumb': 'Thumb'
};

// Calibration order - positions in the order they should be pressed
// Left hand: left to right, top to bottom
// Right hand: right to left, top to bottom
const calibrationOrder = [
    // Left hand - Row 1 to Row 5 (left to right)
    'left-0-0', 'left-0-1', 'left-0-2', 'left-0-3', 'left-0-4',
    'left-1-0', 'left-1-1', 'left-1-2', 'left-1-3', 'left-1-4',
    'left-2-0', 'left-2-1', 'left-2-2', 'left-2-3', 'left-2-4',
    'left-3-0', 'left-3-1', 'left-3-2', 'left-3-3', 'left-3-4',
    'left-4-0', 'left-4-1', 'left-4-2', 'left-4-3', 'left-4-4',
    // Right hand - Row 1 to Row 5 (right to left)
    'right-0-4', 'right-0-3', 'right-0-2', 'right-0-1', 'right-0-0',
    'right-1-4', 'right-1-3', 'right-1-2', 'right-1-1', 'right-1-0',
    'right-2-4', 'right-2-3', 'right-2-2', 'right-2-1', 'right-2-0',
    'right-3-4', 'right-3-3', 'right-3-2', 'right-3-1', 'right-3-0',
    'right-4-4', 'right-4-3', 'right-4-2', 'right-4-1', 'right-4-0'
];

// Game state
let currentText = '';
let userInputValue = '';
let startTime = null;
let timerInterval = null;
let errors = 0;
let currentIndex = 0;

// Key mapping state
let keyMapping = {}; // Maps physical key code to position
let reverseKeyMapping = {}; // Maps position to physical key code
let isCalibrating = false;
let calibrationIndex = 0;
let calibratedKeys = {}; // Temporarily store during calibration

// DOM elements
const textToType = document.getElementById('textToType');
const userInput = document.getElementById('userInput');
const wpmDisplay = document.getElementById('wpm');
const accuracyDisplay = document.getElementById('accuracy');
const timerDisplay = document.getElementById('timer');
const newTextBtn = document.getElementById('newTextBtn');
const resetBtn = document.getElementById('resetBtn');
const difficultySelect = document.getElementById('difficulty');
const calibrateBtn = document.getElementById('calibrateBtn');
const calibrationModal = document.getElementById('calibrationModal');
const calibrationProgress = document.getElementById('calibrationProgress');
const calibrationProgressText = document.getElementById('calibrationProgressText');
const handIndicator = document.getElementById('handIndicator');
const rowIndicator = document.getElementById('rowIndicator');
const keyPosition = document.getElementById('keyPosition');
const skipCalibrationBtn = document.getElementById('skipCalibrationBtn');
const resetCalibrationBtn = document.getElementById('resetCalibrationBtn');
const calibrationKeyboard = document.getElementById('calibrationKeyboard');

// Finger indicator elements
const fingerIndicator = document.getElementById('fingerIndicator');
const fingerHand = document.getElementById('fingerHand');
const fingerHandName = document.getElementById('fingerHandName');
const fingerNameDisplay = document.getElementById('fingerName');
const leftHandDiagram = document.getElementById('leftHandDiagram');
const rightHandDiagram = document.getElementById('rightHandDiagram');

// Initialize
function init() {
    loadKeyMapping();
    setupEventListeners();
    applyFingerColorsToKeys();
    
    // Check if we need to calibrate
    if (!hasKeyMapping()) {
        showCalibrationModal();
    } else {
        loadNewText();
    }
}

// Apply finger color classes to keyboard keys
function applyFingerColorsToKeys() {
    document.querySelectorAll('.keyboard-visual .key[data-position]').forEach(key => {
        const position = key.dataset.position;
        const finger = positionToFinger[position];
        if (finger) {
            const fingerType = finger.split('-')[1]; // pinky, ring, middle, index
            key.classList.add(`finger-${fingerType}`);
        }
    });
}

// Check if key mapping exists
function hasKeyMapping() {
    return Object.keys(keyMapping).length > 0;
}

// Load key mapping from localStorage
function loadKeyMapping() {
    const saved = localStorage.getItem('typer-key-mapping');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            keyMapping = data.keyMapping || {};
            reverseKeyMapping = data.reverseKeyMapping || {};
        } catch (e) {
            console.error('Failed to load key mapping:', e);
            keyMapping = {};
            reverseKeyMapping = {};
        }
    }
}

// Save key mapping to localStorage
function saveKeyMapping() {
    const data = {
        keyMapping: keyMapping,
        reverseKeyMapping: reverseKeyMapping
    };
    localStorage.setItem('typer-key-mapping', JSON.stringify(data));
}

// Use default QWERTY mapping
function useDefaultMapping() {
    keyMapping = {};
    reverseKeyMapping = {};
    
    // Create a simple mapping assuming standard QWERTY
    // Map common KeyboardEvent.code values to positions
    const codeToPosition = {
        'Digit1': 'left-0-0', 'Digit2': 'left-0-1', 'Digit3': 'left-0-2', 'Digit4': 'left-0-3', 'Digit5': 'left-0-4',
        'KeyQ': 'left-1-0', 'KeyW': 'left-1-1', 'KeyE': 'left-1-2', 'KeyR': 'left-1-3', 'KeyT': 'left-1-4',
        'KeyA': 'left-2-0', 'KeyS': 'left-2-1', 'KeyD': 'left-2-2', 'KeyF': 'left-2-3', 'KeyG': 'left-2-4',
        'KeyZ': 'left-3-0', 'KeyX': 'left-3-1', 'KeyC': 'left-3-2', 'KeyV': 'left-3-3', 'KeyB': 'left-3-4',
        'Backquote': 'left-4-0', 'Tab': 'left-4-1', 'CapsLock': 'left-4-2', 'ShiftLeft': 'left-4-3', 'ControlLeft': 'left-4-4',
        'Digit6': 'right-0-0', 'Digit7': 'right-0-1', 'Digit8': 'right-0-2', 'Digit9': 'right-0-3', 'Digit0': 'right-0-4',
        'KeyY': 'right-1-0', 'KeyU': 'right-1-1', 'KeyI': 'right-1-2', 'KeyO': 'right-1-3', 'KeyP': 'right-1-4',
        'KeyH': 'right-2-0', 'KeyJ': 'right-2-1', 'KeyK': 'right-2-2', 'KeyL': 'right-2-3', 'Semicolon': 'right-2-4',
        'KeyN': 'right-3-0', 'KeyM': 'right-3-1', 'Comma': 'right-3-2', 'Period': 'right-3-3', 'Slash': 'right-3-4',
        'Minus': 'right-4-0', 'Equal': 'right-4-1', 'BracketLeft': 'right-4-2', 'BracketRight': 'right-4-3', 'Backslash': 'right-4-4'
    };
    
    for (const [code, position] of Object.entries(codeToPosition)) {
        keyMapping[code] = position;
        reverseKeyMapping[position] = code;
    }
    
    saveKeyMapping();
}

// Setup event listeners
function setupEventListeners() {
    userInput.addEventListener('input', handleInput);
    newTextBtn.addEventListener('click', loadNewText);
    resetBtn.addEventListener('click', resetGame);
    difficultySelect.addEventListener('change', loadNewText);
    calibrateBtn.addEventListener('click', showCalibrationModal);
    skipCalibrationBtn.addEventListener('click', skipCalibration);
    resetCalibrationBtn.addEventListener('click', restartCalibration);
    
    // Global keydown listener for calibration and key visualization
    document.addEventListener('keydown', handleGlobalKeyDown);
    document.addEventListener('keyup', handleGlobalKeyUp);
}

// Show calibration modal
function showCalibrationModal() {
    isCalibrating = true;
    calibrationIndex = 0;
    calibratedKeys = {};
    calibrationModal.classList.add('active');
    userInput.blur();
    buildCalibrationKeyboard();
    updateCalibrationDisplay();
}

// Hide calibration modal
function hideCalibrationModal() {
    isCalibrating = false;
    calibrationModal.classList.remove('active');
    userInput.focus();
}

// Skip calibration and use defaults
function skipCalibration() {
    useDefaultMapping();
    hideCalibrationModal();
    loadNewText();
}

// Restart calibration
function restartCalibration() {
    calibrationIndex = 0;
    calibratedKeys = {};
    buildCalibrationKeyboard();
    updateCalibrationDisplay();
}

// Build the visual keyboard in calibration modal
function buildCalibrationKeyboard() {
    calibrationKeyboard.innerHTML = '';
    
    // Build left hand
    const leftLabel = document.createElement('div');
    leftLabel.className = 'calibration-section-label';
    leftLabel.textContent = 'Left Hand';
    leftLabel.style.cssText = 'width: 100%; text-align: center; font-weight: bold; color: #667eea; margin-bottom: 10px;';
    calibrationKeyboard.appendChild(leftLabel);
    
    for (let row = 0; row < 5; row++) {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'keyboard-row';
        for (let col = 0; col < 5; col++) {
            const position = `left-${row}-${col}`;
            const keyDiv = document.createElement('div');
            keyDiv.className = 'key';
            keyDiv.dataset.position = position;
            keyDiv.textContent = defaultKeyLayout[position]?.toUpperCase() || '?';
            rowDiv.appendChild(keyDiv);
        }
        calibrationKeyboard.appendChild(rowDiv);
    }
    
    // Spacer
    const spacer = document.createElement('div');
    spacer.style.height = '20px';
    calibrationKeyboard.appendChild(spacer);
    
    // Build right hand
    const rightLabel = document.createElement('div');
    rightLabel.className = 'calibration-section-label';
    rightLabel.textContent = 'Right Hand';
    rightLabel.style.cssText = 'width: 100%; text-align: center; font-weight: bold; color: #764ba2; margin-bottom: 10px;';
    calibrationKeyboard.appendChild(rightLabel);
    
    for (let row = 0; row < 5; row++) {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'keyboard-row';
        for (let col = 0; col < 5; col++) {
            const position = `right-${row}-${col}`;
            const keyDiv = document.createElement('div');
            keyDiv.className = 'key';
            keyDiv.dataset.position = position;
            keyDiv.textContent = defaultKeyLayout[position]?.toUpperCase() || '?';
            rowDiv.appendChild(keyDiv);
        }
        calibrationKeyboard.appendChild(rowDiv);
    }
}

// Update calibration display
function updateCalibrationDisplay() {
    const totalKeys = calibrationOrder.length;
    const progress = (calibrationIndex / totalKeys) * 100;
    
    calibrationProgress.style.width = `${progress}%`;
    calibrationProgressText.textContent = `${calibrationIndex} / ${totalKeys}`;
    
    if (calibrationIndex < totalKeys) {
        const currentPosition = calibrationOrder[calibrationIndex];
        const [hand, row, col] = currentPosition.split('-');
        
        handIndicator.textContent = hand === 'left' ? 'Left Hand' : 'Right Hand';
        rowIndicator.textContent = `Row ${parseInt(row) + 1}`;
        keyPosition.textContent = `Key ${parseInt(col) + 1}`;
        
        // Highlight current key in calibration keyboard
        calibrationKeyboard.querySelectorAll('.key').forEach(key => {
            key.classList.remove('calibrating', 'calibrated');
            const pos = key.dataset.position;
            if (pos === currentPosition) {
                key.classList.add('calibrating');
            } else if (calibratedKeys[pos]) {
                key.classList.add('calibrated');
            }
        });
    }
}

// Handle global key down (for calibration and key visualization)
function handleGlobalKeyDown(e) {
    if (isCalibrating) {
        handleCalibrationKeyPress(e);
        return;
    }
    
    // Show which key is being pressed during typing
    highlightPressedKey(e.code, true);
}

// Handle global key up
function handleGlobalKeyUp(e) {
    if (isCalibrating) return;
    
    // Remove pressed key highlight
    highlightPressedKey(e.code, false);
}

// Handle key press during calibration
function handleCalibrationKeyPress(e) {
    e.preventDefault();
    
    // Ignore modifier-only presses or repeated keys
    if (e.repeat) return;
    
    const keyCode = e.code;
    const currentPosition = calibrationOrder[calibrationIndex];
    
    // Map this physical key to the current position
    calibratedKeys[currentPosition] = keyCode;
    
    // Move to next key
    calibrationIndex++;
    
    if (calibrationIndex >= calibrationOrder.length) {
        // Calibration complete
        finishCalibration();
    } else {
        updateCalibrationDisplay();
    }
}

// Finish calibration
function finishCalibration() {
    // Build the key mapping from calibrated keys
    keyMapping = {};
    reverseKeyMapping = {};
    
    for (const [position, code] of Object.entries(calibratedKeys)) {
        keyMapping[code] = position;
        reverseKeyMapping[position] = code;
    }
    
    saveKeyMapping();
    hideCalibrationModal();
    loadNewText();
}

// Highlight pressed key on the visual keyboard
function highlightPressedKey(keyCode, isPressed) {
    const position = keyMapping[keyCode];
    if (!position) return;
    
    const keyElement = document.querySelector(`.keyboard-visual .key[data-position="${position}"]`);
    if (keyElement) {
        if (isPressed) {
            keyElement.classList.add('held');
        } else {
            keyElement.classList.remove('held');
        }
    }
}

// Load new text based on difficulty
function loadNewText() {
    const difficulty = difficultySelect.value;
    const samples = textSamples[difficulty];
    currentText = samples[Math.floor(Math.random() * samples.length)];

    resetGame();
    displayText();
}

// Display text with character spans
function displayText() {
    textToType.innerHTML = '';
    for (let i = 0; i < currentText.length; i++) {
        const charSpan = document.createElement('span');
        charSpan.classList.add('char');
        charSpan.textContent = currentText[i];
        textToType.appendChild(charSpan);
    }
    updateCurrentCharacter();
    highlightNextKey();
}

// Handle user input
function handleInput(e) {
    userInputValue = e.target.value;

    // Start timer on first input
    if (!startTime && userInputValue.length === 1) {
        startTimer();
    }

    currentIndex = userInputValue.length;
    updateDisplay();
    highlightNextKey();

    // Check if completed
    if (userInputValue === currentText) {
        completeGame();
    }
}

// Update display with correct/incorrect characters
function updateDisplay() {
    const chars = textToType.querySelectorAll('.char');
    errors = 0;

    chars.forEach((char, index) => {
        char.classList.remove('correct', 'incorrect', 'current');

        if (index < userInputValue.length) {
            if (userInputValue[index] === currentText[index]) {
                char.classList.add('correct');
            } else {
                char.classList.add('incorrect');
                errors++;
            }
        }
    });

    updateCurrentCharacter();
    updateStats();
}

// Update current character highlight
function updateCurrentCharacter() {
    const chars = textToType.querySelectorAll('.char');
    if (currentIndex < chars.length) {
        chars[currentIndex].classList.add('current');
    }
}

// Highlight next key to press
function highlightNextKey() {
    // Remove all active keys
    document.querySelectorAll('.keyboard-visual .key').forEach(key => {
        key.classList.remove('active');
    });

    if (currentIndex < currentText.length) {
        const nextChar = currentText[currentIndex].toLowerCase();
        const keyElement = document.querySelector(`.keyboard-visual .key[data-key="${nextChar}"]`);
        if (keyElement) {
            keyElement.classList.add('active');
            // Update finger indicator
            const position = keyElement.dataset.position;
            updateFingerIndicator(position);
        } else {
            // Handle space or other keys not on visual keyboard
            if (nextChar === ' ') {
                updateFingerIndicator('thumb');
            } else {
                clearFingerIndicator();
            }
        }
    } else {
        clearFingerIndicator();
    }
}

// Update the finger indicator display
function updateFingerIndicator(position) {
    // Handle space (thumb)
    if (position === 'thumb') {
        fingerHandName.textContent = 'Either Hand';
        fingerNameDisplay.textContent = 'Thumb';
        fingerHand.classList.remove('right-hand');
        
        // Highlight both thumbs
        clearFingerHighlights();
        leftHandDiagram.classList.add('active-hand');
        rightHandDiagram.classList.add('active-hand');
        document.querySelectorAll('.thumb').forEach(t => t.classList.add('active'));
        return;
    }
    
    const finger = positionToFinger[position];
    if (!finger) {
        clearFingerIndicator();
        return;
    }
    
    const [hand, fingerType] = finger.split('-');
    const handName = hand === 'left' ? 'Left Hand' : 'Right Hand';
    const displayName = fingerNames[finger] || fingerType;
    
    // Update text displays
    fingerHandName.textContent = handName;
    fingerNameDisplay.textContent = displayName;
    
    // Update hand icon orientation
    if (hand === 'right') {
        fingerHand.classList.add('right-hand');
    } else {
        fingerHand.classList.remove('right-hand');
    }
    
    // Update finger diagram highlights
    clearFingerHighlights();
    
    if (hand === 'left') {
        leftHandDiagram.classList.add('active-hand');
        rightHandDiagram.classList.remove('active-hand');
    } else {
        rightHandDiagram.classList.add('active-hand');
        leftHandDiagram.classList.remove('active-hand');
    }
    
    // Highlight the specific finger
    const fingerElement = document.querySelector(`.finger[data-finger="${finger}"]`);
    if (fingerElement) {
        fingerElement.classList.add('active');
    }
}

// Clear finger indicator highlights
function clearFingerHighlights() {
    document.querySelectorAll('.hand-diagram .finger, .hand-diagram .thumb').forEach(f => {
        f.classList.remove('active');
    });
    leftHandDiagram.classList.remove('active-hand');
    rightHandDiagram.classList.remove('active-hand');
}

// Clear finger indicator completely
function clearFingerIndicator() {
    fingerHandName.textContent = '-';
    fingerNameDisplay.textContent = '-';
    fingerHand.classList.remove('right-hand');
    clearFingerHighlights();
}

// Animate key press (green flash for correct key)
function animateKeyPress(char) {
    const keyElement = document.querySelector(`.keyboard-visual .key[data-key="${char}"]`);
    if (keyElement) {
        keyElement.classList.add('pressed');
        setTimeout(() => {
            keyElement.classList.remove('pressed');
        }, 200);
    }
}

// Start timer
function startTimer() {
    startTime = new Date();
    timerInterval = setInterval(updateTimer, 100);
}

// Update timer display
function updateTimer() {
    if (startTime) {
        const elapsed = Math.floor((new Date() - startTime) / 1000);
        timerDisplay.textContent = elapsed + 's';
    }
}

// Calculate WPM
function calculateWPM() {
    if (!startTime) return 0;

    const timeElapsed = (new Date() - startTime) / 1000 / 60; // in minutes
    const wordsTyped = userInputValue.trim().split(/\s+/).length;
    const wpm = Math.round(wordsTyped / timeElapsed);

    return wpm > 0 ? wpm : 0;
}

// Calculate accuracy
function calculateAccuracy() {
    if (userInputValue.length === 0) return 100;

    const correctChars = userInputValue.length - errors;
    const accuracy = Math.round((correctChars / userInputValue.length) * 100);

    return accuracy;
}

// Update stats display
function updateStats() {
    wpmDisplay.textContent = calculateWPM();
    accuracyDisplay.textContent = calculateAccuracy() + '%';
}

// Complete game
function completeGame() {
    clearInterval(timerInterval);

    const finalWPM = calculateWPM();
    const finalAccuracy = calculateAccuracy();

    setTimeout(() => {
        alert(`Completed!\n\nWPM: ${finalWPM}\nAccuracy: ${finalAccuracy}%\n\nGreat job!`);
    }, 100);
}

// Reset game
function resetGame() {
    clearInterval(timerInterval);
    startTime = null;
    userInputValue = '';
    currentIndex = 0;
    errors = 0;
    userInput.value = '';

    wpmDisplay.textContent = '0';
    accuracyDisplay.textContent = '100%';
    timerDisplay.textContent = '0s';

    // Remove all key highlights
    document.querySelectorAll('.keyboard-visual .key').forEach(key => {
        key.classList.remove('active', 'pressed', 'held');
    });

    userInput.focus();
}

// Initialize the app
init();
