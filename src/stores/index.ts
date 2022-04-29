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
        switchButtonText: "TRY IMPOSSIBLE" as
            | "TRY IMPOSSIBLE"
            | "PLAY MULTIPLAYER"
            | "PLAY EASY MODE",
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
            } else if (possibleMoves.length === 6) {
                console.log("second move");
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
                this.switchButtonText = "PLAY MULTIPLAYER";
            } else if (this.gameType === 2) {
                this.gameType = 3;
                this.switchButtonText = "PLAY EASY MODE";
            } else {
                this.gameType = 1;
                this.switchButtonText = "TRY IMPOSSIBLE";
            }
            this.resetGame();
        },
    },
});
