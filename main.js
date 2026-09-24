
const beginButton = document.querySelector('#begin-button');
const inputContainer = document.querySelector('.input-container');
const gridContainer = document.querySelector('.grid-container');

let board, playerOne, playerTwo, activePlayer, gameOver;


function setColor(cell, sign) {
    cell.style.color = sign === 'X' ? 'blue' : 'red'
}

beginButton.addEventListener("click", () => {
    const playerOneName = document.querySelector('#player_one').value.trim();
    const playerTwoName = document.querySelector('#player_two').value.trim();

    if (!playerOneName || !playerTwoName) {
        alert('Please enter both names')
        return
    }

    inputContainer.hidden = true; 

    board = gameBoard()
    playerOne = player(playerOneName, 'X')
    playerTwo = player(playerTwoName, 'O')
    activePlayer = playerOne;
    gameOver = false

    gridContainer.querySelectorAll('div').forEach(cell => {
        cell.textContent = ''
        cell.style.color = ''
    })

})

// Made with the help of deepseek
function handleCellClick(cell) {
    if (!activePlayer || gameOver || cell.textContent !== '') return

    const index = Number(cell.dataset.index)
    const row = Math.floor(index / 3)
    const col = index % 3;

    const sign = activePlayer.getSign()

    board.place(row, col, sign)
    cell.textContent = sign
    setColor(cell, sign)

    const winner = checkWinner(board.getBoard());
    if (winner) {
        gameOver = true
        activePlayer.addPoint();
        setTimeout(() => alert(`${activePlayer.getName()} wins!`), 0);
        return;
    }

    if (isBoardFull(board.getBoard())) {
        gameOver = true
        alert("It's a draw!")
        return
    }


    activePlayer = activePlayer === playerOne ? playerTwo : playerOne
}

gridContainer.addEventListener('click', (event) => {
    if (!event.target.matches('.grid-container > div')) return
    handleCellClick(event.target)
});



function gameBoard() {
    let board = [["", "", ""], ["", "", ""], ["", "", ""]]
    const place = (row, col, sign) => {
       board[row][col] = sign
    }

    const clearBoard = () => {
        board = [["", "", ""], ["", "", ""], ["", "", ""]]
    }

    const getBoard = () => {
        return board
    }

    return {place, clearBoard, getBoard}

}

function player(name ,sign) {
    let playerName = name
    let playerSign = sign

    const setName = (name) => {
        playerName  = name
    }

    const getName = () => {
        return playerName
    }

    const getSign = () => {
        return playerSign
    }

    return {setName, getName, getSign}

}

function checkWinner(board) {
        for (let i = 0; i < 3; i++){
            if (board[i][0] && board[i][0] === board[i][1] && board[i][0] === board[i][2]){
                return board[i][0]   
            }

            else if (board[0][i] && board[0][i] === board[1][i] && board[0][i] === board[2][i]){
                 return board[0][i]
            }
        }

        if (board[0][0] && board[0][0] === board[1][1] && board[0][0] === board[2][2]){
            return board[0][0]
        }

        else if (board[0][2] && board[0][2] === board[1][1] && board[0][2] === board[2][0]){
            return board[0][2]
        }

        return null
}

function isBoardFull(board) {
    for (let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            if (board[i][j] === ""){
                return false
            }
        }
    }

    return true
}