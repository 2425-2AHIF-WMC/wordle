// Manages the core game state and logic: guess grid, tile navigation, reset

import { getRandomWordFromLocalServer } from "./word.js";

export let gameState = {
    guessGrid: Array(6).fill("").map(() => Array(5).fill("")), // 6 rows, 5 tiles each
    currentRow: 0, // current row index
    currentTile: 0, // current tile index
    solution: "", // solution word
    gameOver: false, // game over flag
};

window.gameState = gameState; // Expose to other modules

export function resetGame() {
    const rows = document.getElementsByClassName("row"); // Get all rows
    for (let i = 0; i < rows.length; i++) {
        const tiles = rows[i].children; // Get all tiles in the row
        for (let j = 0; j < tiles.length; j++) {
            tiles[j].textContent = ""; // Clear tile content
            tiles[j].style.backgroundColor = ""; // Clear background color
            tiles[j].style.color = ""; // Reset text color
            tiles[j].style.border = "1px solid #ccc"; // Reset border color
        }
    }

    gameState.guessGrid = Array(6).fill("").map(() => Array(5).fill("")); // Reset grid
    gameState.currentRow = 0;
    gameState.currentTile = 0;
    gameState.gameOver = false;

    getRandomWordFromLocalServer(); // Load a new word
}
