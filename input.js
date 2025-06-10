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

// Event Listener für alle Keyboard-Buttons hinzufügen
export function setupKeyboard() {
    const keyboardButtons = document.querySelectorAll("#keyboard-container button");
    keyboardButtons.forEach(button => {
        button.addEventListener("click", () => {
            const key = button.getAttribute("data-key");

            if (key === "enter") {
                checkWord();  // eigene Funktion, die den aktuellen Guess abschließt
            } else if (key === "del") {
                deleteLetter();  // Funktion, die den letzten Buchstaben löscht
            } else {
                addLetter(key.toUpperCase());  // Buchstaben hinzufügen, immer Großbuchstaben
            }
        });
    });
}

