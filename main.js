
const beginButton = document.querySelector('#begin-button');



function gameBoard() {
    let board = [["+","+","+"],["+","+","+"],["+","+","+"]]
    const place = (row, col, sign) => {
       board[row][col] = sign
    }

    const clearBoard = () => {
        board = [["+","+","+"],["+","+","+"],["+","+","+"]]
    }

    const getBoard = () => {
        return board
    }

    return {place, clearBoard, getBoard}
}

function displayController() {
    const displayBoard = (board) => {
        let temp = ""
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 2; j++){
                    temp  += `${board[i][j]}|`;

            }
            temp += `${board[i][2]}`
            if(i != 2){
                temp += `\n-----\n`
            }
        }
        console.log(temp)
    }

    return displayBoard
}

function player() {
    let score = 0

}

function game () {
    const checkWinner = (board) => {
        for (let i = 0; i < 3; i++){
            if (board[i][0] === board[i][1] && board[i][0] === board[i][2]){
                if (board[i][0] === "X"){
                    return "player"
                }

                else if (board[i][0] === "0"){
                    return "bot"
                }   
            }

            else if (board[0][i] === board[1][i] && board[0][i] === board[2][i]){
                 if (board[0][i] === "X"){
                    return "player"
                }

                else if (board[0][i] === "0"){
                    return "bot"
                }
            }
        }

        if (board[0][0] === board[1][1] && board[0][0] === board[2][2]){
            if (board[0][0] === "X"){
                    return "player"
                }

            else if (board[0][0] === "0"){
                return "bot"
            }
        }

        else if (board[0][2] === board[1][1] && board[0][2] === board[2][0]){
            if (board[0][2] === "X"){
                    return "player"
                }

            else if (board[0][2] === "0"){
                return "bot"
            }
        }

        return ""
    }

    return checkWinner
}


let newBoard = gameBoard()

displayController.displayBoard(newBoard.getBoard())
newBoard.place(0,0,'X')
newBoard.place(1,1,'X')
newBoard.place(2,2,'X')
displayController.displayBoard(newBoard.getBoard())
console.log(game.checkWinner(newBoard.getBoard()))


