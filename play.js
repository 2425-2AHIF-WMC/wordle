// Responsible for gameplay actions: entering letters, validating guess, feedback

import { gameState } from "./game.js";
import { updateActiveTile, showMessage, colorTiles } from "./ui.js";
import { checkIfWordExists } from "./word.js";

export function addLetter(letter) {
    const row = document.getElementsByClassName("row")[gameState.currentRow];
    const tile = row.children[gameState.currentTile];
    tile.textContent = letter;
    gameState.guessGrid[gameState.currentRow][gameState.currentTile] = letter;
    gameState.currentTile++;
    updateActiveTile();
}

export function deleteLetter() {
    if (gameState.currentTile > 0) {
        gameState.currentTile--;
        const row = document.getElementsByClassName("row")[gameState.currentRow];
        const tile = row.children[gameState.currentTile];
        tile.textContent = "";
        gameState.guessGrid[gameState.currentRow][gameState.currentTile] = "";
        updateActiveTile();
    }
}

export function checkWord() {
    const guess = gameState.guessGrid[gameState.currentRow].join("").toUpperCase();

    if (guess.length !== 5) {
        showMessage("❗ Please enter a word with 5 letters.");
        return;
    }

    if (!gameState.solution) {
        showMessage("❗ Game loading! Please wait a moment.");
        return;
    }

    checkIfWordExists(guess).then(isValid => {
        if (!isValid) {
            showMessage("❌ This word doesn't exist!");
            return;
        }

        if (guess === gameState.solution) {
            colorTiles(guess, gameState.solution, gameState.currentRow);
            showMessage("🎉 Correct!");
            gameState.gameOver = true;
        } else {
            colorTiles(guess, gameState.solution, gameState.currentRow);
            gameState.currentRow++;
            gameState.currentTile = 0;

            if (gameState.currentRow === 6) {
                showMessage("❌ You lost! The word was: " + gameState.solution);
                gameState.gameOver = true;
            } else {
                updateActiveTile();
            }
        }
    });
}
