function player(xyz, activeplayerch) {
    return { name: xyz, ch: activeplayerch };
}

const ply1 = player('Harsh', 'X');
const ply2 = player('Dahiya', 'O');

function grid() {
    const board = [
        ['.', '.', '.'],
        ['.', '.', '.'],
        ['.', '.', '.']
    ];

    const printboard = () => {
        console.log(board.map(row => row.join(' ')).join('\n'));
        console.log("\n");
    };

    const move = (row, col, activeplayerch) => {
        if (board[row][col] === '.') {
            board[row][col] = activeplayerch;
            return true;
        } else {
            console.log("Invalid move! Try again.");
            return false;
        }
    };

    const checkWin = (activeplayerch) => {
        // Check Rows and Columns
        for (let i = 0; i < 3; i++) {
            if (board[i][0] === activeplayerch && board[i][1] === activeplayerch && board[i][2] === activeplayerch) return true; // Row win
            if (board[0][i] === activeplayerch && board[1][i] === activeplayerch && board[2][i] === activeplayerch) return true; // Column win
        }

        // Check Diagonals
        if (board[0][0] === activeplayerch && board[1][1] === activeplayerch && board[2][2] === activeplayerch) return true; // Main diagonal
        if (board[0][2] === activeplayerch && board[1][1] === activeplayerch && board[2][0] === activeplayerch) return true; // Opposite diagonal

        return false;
    };

    return { board, printboard, move, checkWin };
}

function play() {
    const players = [ply1, ply2];
    let activeplayer = players[0];
    const gameBoard = grid();
    let gameOver = false;

    const switchturn = () => {
        activeplayer = activeplayer === players[0] ? players[1] : players[0];
    };

    const printNewRound = () => {
        console.log(`${activeplayer.name}'s turn (${activeplayer.ch})`);
    };

    const playRound = (row, col) => {
        if (gameOver) {
            console.log("Game over! Start a new game.");
            return;
        }

        if (gameBoard.move(row, col, activeplayer.ch)) {
            gameBoard.printboard();
            if (gameBoard.checkWin(activeplayer.ch)) {
                console.log(`${activeplayer.name} wins! 🎉`);
                gameOver = true;
                return;
            }
            switchturn();
            printNewRound();
        }
    };

    return { printNewRound, playRound };
}

// Start a new game
const game = play();
game.printNewRound();






