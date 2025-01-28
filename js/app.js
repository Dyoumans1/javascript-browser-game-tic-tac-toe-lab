



//1) Define the required variables used to track the state of the game.

//2) Store cached element references.

//3) Upon loading, the game state should be initialized, and a function should 
//   be called to render this game state.

//4) The state of the game should be rendered to the user.

//5) Define the required constants.

//6) Handle a player clicking a square with a `handleClick` function.

//7) Create Reset functionality.


/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [2, 5, 8],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
];


/*---------------------------- Variables (state) ----------------------------*/
let board;
let turn;
let winner;
let tie;


/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr');
// console.log(squareEls)
const messageEl = document.querySelector('#message');
// console.log(messageEl)
const resetbtnEl = document.querySelector('#reset')
/*-------------------------------- Functions --------------------------------*/
const render = () => {
updateBoard();
updateMessage();
};

const updateBoard = () => {
    board.forEach((slot, idx) => {
        if (slot === 'X') {
            squareEls[idx].textContent = 'X';
        } else if (slot === 'O') {
            squareEls[idx].textContent = 'O';
        } else {
            squareEls[idx].textContent = '';
        }
        
    });

};

const updateMessage = () => {
if (winner === false && tie === false){
    if (turn === 'X') {
        messageEl.textContent = "Turn: Player One"
    } else {
        messageEl.textContent = "Turn: Player Two"
    }
} else {
    if (winner === 'X') {
        messageEl.textContent = " Player One: Wins!"
    } else if (winner === 'O') {
        messageEl.textContent = "Player Two: Wins!"
    } else if (tie === true) {
        messageEl.textContent = "Tie!"
    }
}
};

const handleClick = (event) => {
    const squareIndex = event.target.id;
    const squareTaken = board[squareIndex] !== '';
    if (squareTaken || winner){
        return;
    }


   placePiece(squareIndex);
   checkForWinner();
   checkForTie();
   switchPlayerTurn();
   render();

};

const placePiece = (idx) => {
    board[idx] = turn;
    
};

const checkForWinner = () => {
    winningCombos.forEach((winningCombo) => {
        if (board[winningCombo[0]] !== '' &&
            board[winningCombo[0]] === board[winningCombo[1]] &&
            board[winningCombo[0]] === board[winningCombo[2]] ) {
                winner = board[winningCombo[0]];
            }

    });
};

const checkForTie = () => {
    console.log(board);
    if (winner === true) {
        return;
    } if (!board.includes('')) {
        tie = true;
      }
    // if (board === '') {
        
    //     tie = false;
    // } else {
    //     tie = true;
    // }
};

const switchPlayerTurn = () => {
    if (winner) {
        return;
    }
        if (turn === 'X') {
            turn = 'O';
        } else {
            turn = 'X';
        }
};

const init = () => {
board = ['', '', '', '', '', '', '', '', ''];
turn = "X";
winner = false;
tie = false;
render();
};

init();


/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach((square) => {
    square.addEventListener('click', handleClick)
})
resetbtnEl.addEventListener('click', init);


