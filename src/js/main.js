const gameBoard = document.querySelector('.game-board');
const cells = document.querySelectorAll('.cell');
const status = document.querySelector('.status');
const resetButton = document.querySelector('.reset-btn');
const winningMessage = document.querySelector('.winning-message');
const winningMessageText = document.querySelector('.winning-message div');

let gameActive = true;
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const winningMessageTexts = {
    X: 'Player X Wins!',
    O: 'Player O Wins!',
    draw: 'Game ended in a draw!'
};

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase());
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        winningMessageText.textContent = winningMessageTexts[currentPlayer];
        winningMessage.classList.add('show');
        gameActive = false;
        return;
    }

    const roundDraw = !gameState.includes('');
    if (roundDraw) {
        winningMessageText.textContent = winningMessageTexts.draw;
        winningMessage.classList.add('show');
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
}

function handleResetGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    status.textContent = `Player ${currentPlayer}'s turn`;
    winningMessage.classList.remove('show');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', handleResetGame); 