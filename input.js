// Handles key input: adding, deleting, and submitting guesses

import { gameState } from "./game.js";
import { addLetter, deleteLetter, checkWord } from "./play.js";

export function handleKeyPress(event) {
    if (gameState.gameOver) return; // Do nothing if game is over

    const key = event.key;

    if (key === "Backspace") {
        deleteLetter();
    } else if (key === "Enter") {
        checkWord();
    } else if (key.length === 1 && key.match(/[a-z]/i) && gameState.currentTile < 5) {
        addLetter(key.toUpperCase());
    }
}
