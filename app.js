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

// Game state
let currentText = '';
let userInputValue = '';
let startTime = null;
let timerInterval = null;
let errors = 0;
let currentIndex = 0;

// DOM elements
const textToType = document.getElementById('textToType');
const userInput = document.getElementById('userInput');
const wpmDisplay = document.getElementById('wpm');
const accuracyDisplay = document.getElementById('accuracy');
const timerDisplay = document.getElementById('timer');
const newTextBtn = document.getElementById('newTextBtn');
const resetBtn = document.getElementById('resetBtn');
const difficultySelect = document.getElementById('difficulty');

// Initialize
function init() {
    loadNewText();
    setupEventListeners();
}

// Setup event listeners
function setupEventListeners() {
    userInput.addEventListener('input', handleInput);
    newTextBtn.addEventListener('click', loadNewText);
    resetBtn.addEventListener('click', resetGame);
    difficultySelect.addEventListener('change', loadNewText);
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
                animateKey(currentText[index].toLowerCase(), 'pressed');
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
    document.querySelectorAll('.key').forEach(key => {
        key.classList.remove('active');
    });

    if (currentIndex < currentText.length) {
        const nextChar = currentText[currentIndex].toLowerCase();
        const keyElement = document.querySelector(`.key[data-key="${nextChar}"]`);
        if (keyElement) {
            keyElement.classList.add('active');
        }
    }
}

// Animate key press
function animateKey(char, className) {
    const keyElement = document.querySelector(`.key[data-key="${char}"]`);
    if (keyElement) {
        keyElement.classList.add(className);
        setTimeout(() => {
            keyElement.classList.remove(className);
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
    document.querySelectorAll('.key').forEach(key => {
        key.classList.remove('active', 'pressed');
    });

    userInput.focus();
}

// Initialize the app
init();
