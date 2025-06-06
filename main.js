// Main entry file – runs when the page is loaded

// Import functions from other modules
import { createBoard, updateActiveTile, createKeyboard } from "./ui.js";
import { getRandomWordFromLocalServer } from "./word.js";
import { handleKeyPress } from "./input.js";
import { resetGame } from "./game.js";

// Wait for the HTML DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
    createBoard();                // Set up the game board in the DOM
    createKeyboard();             // Create the on-screen keyboard
    updateActiveTile();           // Visually highlight the first tile
    getRandomWordFromLocalServer(); // Fetch a new random word from the local server
});

// Handle key presses from the user's keyboard
document.addEventListener("keydown", handleKeyPress);

// Handle the reset button click to start a new game
document.getElementById("reset-button").addEventListener("click", resetGame);
