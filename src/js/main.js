// Função para mostrar mensagem
function showMessage(message) {
    console.log('Mensagem:', message);
}

// Função para adicionar classe ao botão
function addButtonClass(button, className) {
    button.classList.add(className);
}

// Evento de clique no botão
document.querySelector('.button').addEventListener('click', function() {
    showMessage('Botão clicado!');
    addButtonClass(this, 'clicked');
});

class TicTacToe {
    constructor() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
            [0, 4, 8], [2, 4, 6]             // Diagonais
        ];
        
        this.initializeGame();
    }

    initializeGame() {
        this.cells = document.querySelectorAll('[data-cell]');
        this.currentPlayerElement = document.getElementById('current-player');
        this.winningMessageElement = document.getElementById('winning-message');
        this.winningMessageTextElement = document.querySelector('[data-winning-message-text]');
        this.restartButton = document.getElementById('restart-button');
        this.resetButton = document.getElementById('reset-game');

        this.cells.forEach(cell => {
            cell.addEventListener('click', this.handleClick.bind(this));
        });

        this.restartButton.addEventListener('click', this.startGame.bind(this));
        this.resetButton.addEventListener('click', this.startGame.bind(this));

        this.updateStatus();
    }

    handleClick(e) {
        const cell = e.target;
        const cellIndex = Array.from(this.cells).indexOf(cell);

        if (this.board[cellIndex] !== '' || !this.gameActive) return;

        this.board[cellIndex] = this.currentPlayer;
        cell.classList.add(this.currentPlayer.toLowerCase());
        cell.textContent = this.currentPlayer;

        if (this.checkWin()) {
            this.endGame(false);
        } else if (this.isDraw()) {
            this.endGame(true);
        } else {
            this.switchPlayer();
            this.updateStatus();
        }
    }

    checkWin() {
        return this.winningCombinations.some(combination => {
            return combination.every(index => {
                return this.board[index] === this.currentPlayer;
            });
        });
    }

    isDraw() {
        return this.board.every(cell => cell !== '');
    }

    endGame(draw) {
        this.gameActive = false;
        this.winningMessageTextElement.textContent = draw ? 'Empate!' : `Jogador ${this.currentPlayer} Venceu!`;
        this.winningMessageElement.classList.add('show');
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }

    updateStatus() {
        this.currentPlayerElement.textContent = this.currentPlayer;
    }

    startGame() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.winningMessageElement.classList.remove('show');

        this.cells.forEach(cell => {
            cell.classList.remove('x', 'o');
            cell.textContent = '';
        });

        this.updateStatus();
    }
}

// Inicializa o jogo quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
}); 