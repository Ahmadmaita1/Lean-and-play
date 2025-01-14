// Game logic for the matching cards game
const gameBoard = document.getElementById('game-board');

// Card data
const cards = [
    { id: 1, label: 'HTML' },
    { id: 2, label: 'CSS' },
    { id: 3, label: 'JS' },
    { id: 4, label: 'Python' },
    { id: 5, label: 'Java' },
    { id: 6, label: 'Ruby' },
    { id: 1, label: 'HTML' },
    { id: 2, label: 'CSS' },
    { id: 3, label: 'JS' },
    { id: 4, label: 'Python' },
    { id: 5, label: 'Java' },
    { id: 6, label: 'Ruby' },
    { id: 7, label: 'C++' },
    { id: 8, label: 'C++' }
];

// Shuffle cards
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Initialize the game
function initGame() {
    const shuffledCards = shuffle(cards);
    shuffledCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.id = card.id;
        cardElement.textContent = '?';
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

let firstCard = null;
let secondCard = null;
let lockBoard = false;

// Handle card flip
function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.textContent = cards.find(card => card.id == this.dataset.id).label;

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        checkForMatch();
    }
}

// Check for a match
function checkForMatch() {
    if (firstCard.dataset.id === secondCard.dataset.id) {
        disableCards();
    } else {
        unflipCards();
    }
}

// Disable matched cards
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

// Unflip unmatched cards
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.textContent = '?';
        secondCard.textContent = '?';
        resetBoard();
    }, 1000);
}

// Reset the board state
function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Start the game
initGame();
