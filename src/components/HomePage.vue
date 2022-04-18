<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useStore } from "../stores/index";

const store = useStore();
const { board, turn, winner } = storeToRefs(store);
const { resetGame, handleClick } = store;
</script>
<template>
    <div class="home-page">
        <h1 class="turn">{{ "TURN: " + turn }}</h1>
        <div class="board">
            <div class="row" v-for="row in [0, 1, 2]" :key="row">
                <div
                    class="cell"
                    v-for="cell in [0, 1, 2]"
                    :key="cell"
                    @click="handleClick(row, cell)"
                >
                    <span :class="{ visible: board[row][cell] !== '' }">{{
                        board[row][cell] || turn
                    }}</span>
                </div>
            </div>
        </div>
        <h1 class="winner" v-if="winner">{{ winner + " WON THE GAME!" }}</h1>
        <div class="buttons">
            <button class="button" v-on:click="resetGame">RESET</button>
        </div>
    </div>
</template>
<style lang="less" scoped>
.home-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
    .turn {
        margin-bottom: 30px;
    }
    .board {
        display: flex;
        flex-direction: column;
        table tr:first-child td {
            border-top: 0;
        }
        table tr td:first-child {
            border-left: 0;
        }
        table tr:last-child td {
            border-bottom: 0;
        }
        table tr td:last-child {
            border-right: 0;
        }
        .row {
            display: flex;
            .cell {
                flex: 1;
                text-align: center;
                border: 5px solid var(--vt-c-text-dark-2);
                cursor: pointer;
                height: 150px;
                width: 150px;
                font-weight: 700;
                line-height: 150px;
                -webkit-tap-highlight-color: transparent;
                -webkit-touch-callout: none;
                -webkit-user-select: none;
                -khtml-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
                &:focus {
                    outline: none;
                }
                @media (hover: hover) {
                    &:hover {
                        span {
                            opacity: 1;
                            font-size: 75px;
                        }
                    }
                }
                span {
                    opacity: 0;
                    font-size: 50px;
                    transition: opacity 0.8s, font-size 0.8s;
                    &.visible {
                        opacity: 1;
                        font-size: 125px;
                    }
                }
                &:first-child {
                    border-left: 0;
                }
                &:last-child {
                    border-right: 0;
                }
            }
            &:first-child {
                .cell {
                    border-top: none;
                }
            }
            &:last-child {
                .cell {
                    border-bottom: none;
                }
            }
        }
    }
    .winner {
        margin-top: 30px;
    }
    .buttons {
        display: flex;
        margin-top: 30px;
        .button {
            flex: 1;
            margin: 10px;
            font-size: 30px;
            font-weight: 700;
            cursor: pointer;
            outline: none;
            border: none;
            border-radius: 6px;
            padding: 10px;
            color: #000;
            background-color: var(--vt-c-text-dark-2);
            -webkit-tap-highlight-color: transparent;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            @media (hover: hover) {
                &:hover {
                    color: var(--vt-c-text-dark-2);
                    background-color: #000;
                }
            }
            &:focus {
                outline: none;
            }
        }
    }
}
@media screen and (max-width: 768px) {
    .home-page {
        .board {
            .row {
                .cell {
                    height: 100px;
                    width: 100px;
                    line-height: 100px;
                    span.visible {
                        font-size: 70px;
                    }
                }
            }
        }
    }
}
</style>
