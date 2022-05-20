// Game Module containing all code except for two event listeners at bottom
// All variables and functions private except for the 2 called by event listeners

'use strict';
// all module code here
// variables
const gameStatusMessage = document.getElementById('game-status');
let gameActive = true;
const player1_Symbol = '🍅';
const player2_Symbol = '🌵';
let currentPlayer = player1_Symbol;
const clearBoard = ['', '', '', '', '', '', '', '', ''];
let gameBoard = clearBoard.slice();

const winningMessage = () => `${currentPlayer} wins!`;
const tieMessage = "It's a tie";
const currentPlayerTurn = () => `${currentPlayer}'s turn`;
gameStatusMessage.innerText = currentPlayerTurn();

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// main public function for gameplay
const handleClick = (e) => {
  console.log(e);
  const clickedSquare = e.target;
  const clickedSquareNumber = parseInt(
    clickedSquare.getAttribute('box-number')
  );

  if (gameBoard[clickedSquareNumber] !== '' || !gameActive) {
    return;
  }

  handlePlay(clickedSquare, clickedSquareNumber);
  handleResult();
};
// private function if player chooses valid square
const handlePlay = (clickedElement, squareIndex) => {
  gameBoard[squareIndex] = currentPlayer;
  clickedElement.innerText = currentPlayer;
  //switch
  if (currentPlayer === player1_Symbol) {
    clickedElement.style.color = '#A090DC';
  } else {
    clickedElement.style.color = '#0B05A0';
  }
};
// private function to check if game is finished and transition player turns
const handleResult = () => {
  let gameWon = false;
  for (let i = 0; i <= 7; i++) {
    let a = gameBoard[winningCombos[i][0]];
    let b = gameBoard[winningCombos[i][1]];
    let c = gameBoard[winningCombos[i][2]];

    if (!a || !b || !c) {
      continue;
    }
    if (a === b && b === c) {
      gameWon = true;
      break;
    }
  }
  if (gameWon) {
    gameStatusMessage.innerText = winningMessage();
    changeMessageColor('004466');
    gameActive = false;
    return;
  }
  let tieGame = !gameBoard.includes('');
  if (tieGame) {
    gameStatusMessage.innerText = tieMessage;
    changeMessageColor('004466');
    gameActive = false;
    return;
  }
  changePlayer();
};
// update message color to correspond with upcoming player turn
const changeMessageColor = (color) => {
  gameStatusMessage.style.color = '#' + color;
};
// change to next player's turn after move
const changePlayer = () => {
  currentPlayer =
    currentPlayer === player1_Symbol ? player2_Symbol : player1_Symbol;
  gameStatusMessage.innerText = currentPlayerTurn();
  if (currentPlayer === player1_Symbol) {
    changeMessageColor('A090DC');
  } else {
    changeMessageColor('0B05A0');
  }
};

const restartGame = () => {
  gameBoard = clearBoard.slice();
  document
    .querySelectorAll('.board-square')
    .forEach((square) => (square.innerText = ''));
  gameActive = true;
  currentPlayer = player1_Symbol;
  gameStatusMessage.innerText = currentPlayerTurn();
};

//
document
  .querySelectorAll('.board-square')
  .forEach((square) => square.addEventListener('click', handleClick));
document.getElementById('restart-game').addEventListener('click', restartGame);
