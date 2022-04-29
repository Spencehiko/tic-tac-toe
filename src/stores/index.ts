import { defineStore } from "pinia";

export const useStore = defineStore({
    id: "tictactoe",
    state: () => ({
        board: [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
        ] as string[][],
        turn: "X" as "X" | "O",
        winner: null as null | string,
        gameType: 2 as number,
        switchButtonText: "HARD MODE" as
            | "HARD MODE"
            | "TWO PLAYERS"
            | "EASY MODE",
        isMoveMade: false as boolean,
    }),
    getters: {
        getBoard: (state) => state.board,
        getTurn: (state) => state.turn,
        getWinner: (state) => state.winner,
        getGameType: (state) =>
            state.gameType === 2 ? "MULTIPLAYER" : "SINGLEPLAYER",
    },
    actions: {
        resetGame() {
            this.board = [
                ["", "", ""],
                ["", "", ""],
                ["", "", ""],
            ];
            this.turn = "X";
            this.winner = null;
        },
        handleClick(row: number, col: number) {
            if (this.winner) return;
            if (this.board[row][col] !== "") return;
            this.board[row][col] = this.turn;
            this.turn = this.turn === "X" ? "O" : "X";
            this.checkWinner();
            if (this.gameType === 1) {
                this.playAI();
            } else if (this.gameType === 3) {
                this.playImpossibleAI();
            }
        },
        playAI() {
            if (this.winner) return;
            const possibleMoves = [];
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (this.board[i][j] === "") {
                        possibleMoves.push({ row: i, col: j });
                    }
                }
            }
            const randomMove =
                possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
            this.board[randomMove.row][randomMove.col] = this.turn;
            this.turn = this.turn === "X" ? "O" : "X";
            this.checkWinner();
        },
        playImpossibleAI() {
            if (this.winner) return;
            const possibleMoves = [];
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (this.board[i][j] === "") {
                        possibleMoves.push({ row: i, col: j });
                    }
                }
            }
            if (possibleMoves.length === 8) {
                if (this.isCenterEmpty()) {
                    this.board[1][1] = this.turn;
                } else {
                    this.board[Math.floor(Math.random() * 2) * 2][
                        Math.floor(Math.random() * 2) * 2
                    ] = this.turn;
                }
            } else if (
                possibleMoves.length === 6 ||
                possibleMoves.length === 4 ||
                possibleMoves.length === 2
            ) {
                this.isMoveMade = false;
                this.makeWinningMove();
                if (this.isMoveMade) return;
                this.blockWinningMove();
                if (this.isMoveMade) return;
                this.makeRandomMove();
            }
            this.turn = this.turn === "X" ? "O" : "X";
        },
        isCenterEmpty() {
            if (this.board[1][1] === "") return true;
            return false;
        },
        isEdgeEmpty() {
            if (this.board[0][0] === "") return true;
            if (this.board[0][2] === "") return true;
            if (this.board[2][0] === "") return true;
            if (this.board[2][2] === "") return true;
            return false;
        },
        isSideEmpty() {
            if (this.board[0][1] === "") return true;
            if (this.board[1][0] === "") return true;
            if (this.board[2][1] === "") return true;
            if (this.board[1][2] === "") return true;
            return false;
        },
        makeWinningMove() {
            const possibleMoves = [];
            // 0,0
            if (
                ((this.board[0][1] === "O" && this.board[0][2] === "O") ||
                    (this.board[1][0] === "O" && this.board[2][0] === "O") ||
                    (this.board[1][1] === "O" && this.board[2][2] === "O")) &&
                this.board[0][0] === ""
            ) {
                possibleMoves.push({ row: 0, col: 0 });
            }
            // 0,1
            if (
                ((this.board[0][0] === "O" && this.board[0][2] === "O") ||
                    (this.board[1][1] === "O" && this.board[2][1] === "O")) &&
                this.board[0][1] === ""
            ) {
                possibleMoves.push({ row: 0, col: 1 });
            }
            // 0,2
            if (
                ((this.board[0][0] === "O" && this.board[0][1] === "O") ||
                    (this.board[1][2] === "O" && this.board[2][2] === "O") ||
                    (this.board[1][1] === "O" && this.board[2][0] === "O")) &&
                this.board[0][2] === ""
            ) {
                possibleMoves.push({ row: 0, col: 2 });
            }
            // 1,0
            if (
                ((this.board[0][0] === "O" && this.board[2][0] === "O") ||
                    (this.board[1][1] === "O" && this.board[1][2] === "O")) &&
                this.board[1][0] === ""
            ) {
                possibleMoves.push({ row: 1, col: 0 });
            }
            // 1,1
            if (
                ((this.board[0][1] === "O" && this.board[2][1] === "O") ||
                    (this.board[1][0] === "O" && this.board[1][2] === "O") ||
                    (this.board[0][0] === "O" && this.board[2][2] === "O") ||
                    (this.board[0][2] === "O" && this.board[2][0] === "O")) &&
                this.board[1][1] === ""
            ) {
                possibleMoves.push({ row: 1, col: 1 });
            }
            // 1,2
            if (
                ((this.board[0][2] === "O" && this.board[2][2] === "O") ||
                    (this.board[1][0] === "O" && this.board[1][1] === "O")) &&
                this.board[1][2] === ""
            ) {
                possibleMoves.push({ row: 1, col: 2 });
            }
            // 2,0
            if (
                ((this.board[0][0] === "O" && this.board[1][0] === "O") ||
                    (this.board[2][1] === "O" && this.board[2][2] === "O") ||
                    (this.board[1][1] === "O" && this.board[0][2] === "O")) &&
                this.board[2][0] === ""
            ) {
                possibleMoves.push({ row: 2, col: 0 });
            }
            // 2,1
            if (
                ((this.board[0][1] === "O" && this.board[1][1] === "O") ||
                    (this.board[2][0] === "O" && this.board[2][2] === "O")) &&
                this.board[2][1] === ""
            ) {
                possibleMoves.push({ row: 2, col: 1 });
            }
            // 2,2
            if (
                ((this.board[0][2] === "O" && this.board[1][2] === "O") ||
                    (this.board[0][0] === "O" && this.board[1][1] === "O") ||
                    (this.board[2][0] === "O" && this.board[2][1] === "O")) &&
                this.board[2][2] === ""
            ) {
                possibleMoves.push({ row: 2, col: 2 });
            }
            if (possibleMoves.length > 0) {
                this.board[possibleMoves[0].row][possibleMoves[0].col] = "O";
                this.isMoveMade = true;
                this.turn = this.turn === "X" ? "O" : "X";
                this.checkWinner();
            }
        },
        blockWinningMove() {
            const possibleMoves = [];
            // 0,0
            if (
                ((this.board[0][1] === "X" && this.board[0][2] === "X") ||
                    (this.board[1][0] === "X" && this.board[2][0] === "X") ||
                    (this.board[1][1] === "X" && this.board[2][2] === "X")) &&
                this.board[0][0] === ""
            ) {
                possibleMoves.push({ row: 0, col: 0 });
            }
            // 0,1
            if (
                ((this.board[0][0] === "X" && this.board[0][2] === "X") ||
                    (this.board[1][1] === "X" && this.board[2][1] === "X")) &&
                this.board[0][1] === ""
            ) {
                possibleMoves.push({ row: 0, col: 1 });
            }
            // 0,2
            if (
                ((this.board[0][0] === "X" && this.board[0][1] === "X") ||
                    (this.board[1][2] === "X" && this.board[2][2] === "X") ||
                    (this.board[1][1] === "X" && this.board[2][0] === "X")) &&
                this.board[0][2] === ""
            ) {
                possibleMoves.push({ row: 0, col: 2 });
            }
            // 1,0
            if (
                ((this.board[0][0] === "X" && this.board[2][0] === "X") ||
                    (this.board[1][1] === "X" && this.board[1][2] === "X")) &&
                this.board[1][0] === ""
            ) {
                possibleMoves.push({ row: 1, col: 0 });
            }
            // 1,1
            if (
                ((this.board[0][1] === "X" && this.board[2][1] === "X") ||
                    (this.board[1][0] === "X" && this.board[1][2] === "X") ||
                    (this.board[0][0] === "X" && this.board[2][2] === "X") ||
                    (this.board[0][2] === "X" && this.board[2][0] === "X")) &&
                this.board[1][1] === ""
            ) {
                possibleMoves.push({ row: 1, col: 1 });
            }
            // 1,2
            if (
                ((this.board[0][2] === "X" && this.board[2][2] === "X") ||
                    (this.board[1][0] === "X" && this.board[1][1] === "X")) &&
                this.board[1][2] === ""
            ) {
                possibleMoves.push({ row: 1, col: 2 });
            }
            // 2,0
            if (
                ((this.board[0][0] === "X" && this.board[1][0] === "X") ||
                    (this.board[2][1] === "X" && this.board[2][2] === "X") ||
                    (this.board[1][1] === "X" && this.board[0][2] === "X")) &&
                this.board[2][0] === ""
            ) {
                possibleMoves.push({ row: 2, col: 0 });
            }
            // 2,1
            if (
                ((this.board[0][1] === "X" && this.board[1][1] === "X") ||
                    (this.board[2][0] === "X" && this.board[2][2] === "X")) &&
                this.board[2][1] === ""
            ) {
                possibleMoves.push({ row: 2, col: 1 });
            }
            // 2,2
            if (
                ((this.board[0][2] === "X" && this.board[1][2] === "X") ||
                    (this.board[0][0] === "X" && this.board[1][1] === "X") ||
                    (this.board[2][0] === "X" && this.board[2][1] === "X")) &&
                this.board[2][2] === ""
            ) {
                possibleMoves.push({ row: 2, col: 2 });
            }
            if (possibleMoves.length > 0) {
                this.board[possibleMoves[0].row][possibleMoves[0].col] = "O";
                this.isMoveMade = true;
                this.turn = this.turn === "X" ? "O" : "X";
                this.checkWinner();
            }
        },
        makeRandomMove() {
            const random = Math.floor(Math.random() * 9);
            if (this.board[Math.floor(random / 3)][random % 3] === "") {
                this.board[Math.floor(random / 3)][random % 3] = this.turn;
            } else {
                this.makeRandomMove();
            }
        },
        checkWinner() {
            const board = this.board;
            const winner =
                board[0][0] === board[0][1] &&
                board[0][0] === board[0][2] &&
                board[0][0] !== ""
                    ? board[0][0]
                    : board[1][0] === board[1][1] &&
                      board[1][0] === board[1][2] &&
                      board[1][0] !== ""
                    ? board[1][0]
                    : board[2][0] === board[2][1] &&
                      board[2][0] === board[2][2] &&
                      board[2][0] !== ""
                    ? board[2][0]
                    : board[0][0] === board[1][0] &&
                      board[0][0] === board[2][0] &&
                      board[0][0] !== ""
                    ? board[0][0]
                    : board[0][1] === board[1][1] &&
                      board[0][1] === board[2][1] &&
                      board[0][1] !== ""
                    ? board[0][1]
                    : board[0][2] === board[1][2] &&
                      board[0][2] === board[2][2] &&
                      board[0][2] !== ""
                    ? board[0][2]
                    : board[0][0] === board[1][1] &&
                      board[0][0] === board[2][2] &&
                      board[0][0] !== ""
                    ? board[0][0]
                    : board[0][2] === board[1][1] &&
                      board[0][2] === board[2][0] &&
                      board[0][2] !== ""
                    ? board[0][2]
                    : null;
            this.winner = winner;
        },
        changeGameType() {
            if (this.gameType === 1) {
                this.gameType = 2;
                this.switchButtonText = "HARD MODE";
            } else if (this.gameType === 2) {
                this.gameType = 3;
                this.switchButtonText = "EASY MODE";
            } else {
                this.gameType = 1;
                this.switchButtonText = "TWO PLAYERS";
            }
            this.resetGame();
        },
    },
});
