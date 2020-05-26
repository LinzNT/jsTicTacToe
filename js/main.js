//constant
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//app's state (variables)

let board;
let turn = 'X';
let win;

//cached element references

const squares = Array.from(document.querySelectorAll('#board div'));
console.log(squares);

const messages = document.querySelector('h2');

//event listeners
document.getElementById('board').addEventListener('click', handleTurn);

document.getElementById('reset-button').addEventListener('click', initBoard);

//functions

function getWinner() {

    let winner = null;

    winningCombos.forEach((combo, index) => {
        if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) {
            winner = board[combo[0]];
        }
    });

    return winner ? winner : board.includes('') ? null : 'T';
}

function handleTurn(event) {
    let idX = squares.findIndex(square => square === event.target);
    board[idX] = turn;
    turn = turn === 'X' ? 'O' : 'X';
    win = getWinner();
    render();
    document.getElementById('turn').innerHTML = `${turn} it's your turn`;
};


function initBoard() {
    board = [
        '', '', '',
        '', '', '',
        '', '', '',
    ];
    //render() created bellow
    render();
};

function render() {
    //moves the value of the board item into the squares[idx]  
    board.forEach((mark, index) => squares[index].textContent = mark);
    messages.textContent = win === 'T' ? `That's a tie, queen!` : win ? `${win} wins the game!` : `It's ${turn}'s turn!`;
};

initBoard();