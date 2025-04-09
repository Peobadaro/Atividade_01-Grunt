const gameBoard = document.querySelector('.game-board');
const cells = document.querySelectorAll('.cell');
const status = document.querySelector('.status');
const resetButton = document.querySelector('.reset-btn');
const winningMessage = document.querySelector('.winning-message');
const winningMessageText = document.querySelector('.winning-message div');
const difficultySelect = document.getElementById('difficulty');
const playerXScore = document.querySelector('.player:first-child .score');
const playerOScore = document.querySelector('.player:last-child .score');

let gameActive = true;
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let scores = {
    X: 0,
    O: 0
};

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
    
    if (checkWin()) {
        handleWin();
    } else if (checkDraw()) {
        handleDraw();
    } else {
        handlePlayerChange();
        if (currentPlayer === 'O') {
            setTimeout(makeComputerMove, 500);
        }
    }
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase());
}

function checkWin() {
    return winningConditions.some(condition => {
        return condition.every(index => {
            return gameState[index] === currentPlayer;
        });
    });
}

function checkDraw() {
    return gameState.every(cell => cell !== '');
}

function handleWin() {
    winningMessageText.textContent = winningMessageTexts[currentPlayer];
    winningMessage.classList.add('show');
    gameActive = false;
    scores[currentPlayer]++;
    updateScoreDisplay();
}

function handleDraw() {
    winningMessageText.textContent = winningMessageTexts.draw;
    winningMessage.classList.add('show');
    gameActive = false;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
}

function updateScoreDisplay() {
    playerXScore.textContent = scores.X;
    playerOScore.textContent = scores.O;
}

function makeComputerMove() {
    if (!gameActive || currentPlayer === 'X') return;

    const difficulty = difficultySelect.value;
    let move;

    switch(difficulty) {
        case 'hard':
            move = getBestMove();
            break;
        case 'medium':
            move = Math.random() < 0.7 ? getBestMove() : getRandomMove();
            break;
        default:
            move = getRandomMove();
    }

    const cell = cells[move];
    handleCellPlayed(cell, move);
    
    if (checkWin()) {
        handleWin();
    } else if (checkDraw()) {
        handleDraw();
    } else {
        handlePlayerChange();
    }
}

function getRandomMove() {
    const availableMoves = gameState
        .map((cell, index) => cell === '' ? index : null)
        .filter(cell => cell !== null);
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}

function getBestMove() {
    let bestScore = -Infinity;
    let bestMove;

    for (let i = 0; i < gameState.length; i++) {
        if (gameState[i] === '') {
            gameState[i] = 'O';
            let score = minimax(gameState, 0, false);
            gameState[i] = '';
            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }

    return bestMove;
}

function minimax(board, depth, isMaximizing) {
    if (checkWinForPlayer('O')) return 1;
    if (checkWinForPlayer('X')) return -1;
    if (checkDraw()) return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = 'O';
                let score = minimax(board, depth + 1, false);
                board[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = 'X';
                let score = minimax(board, depth + 1, true);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function checkWinForPlayer(player) {
    return winningConditions.some(condition => {
        return condition.every(index => {
            return gameState[index] === player;
        });
    });
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
    
    if (currentPlayer === 'O') {
        setTimeout(makeComputerMove, 500);
    }
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', handleResetGame);

difficultySelect.addEventListener('change', handleResetGame);

handleResetGame(); 