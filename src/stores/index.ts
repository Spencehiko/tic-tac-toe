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
    }),
    getters: {
        getBoard: (state) => state.board,
        getTurn: (state) => state.turn,
        getWinner: (state) => state.winner,
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
    },
});
