// Main entry file – runs when the page is loaded

// Import functions from other modules
import { createBoard, updateActiveTile, createKeyboard } from "./ui.js";
import { getRandomWordFromLocalServer } from "./word.js";
import { handleKeyPress, setupKeyboard} from "./input.js";
import { resetGame } from "./game.js";
import { createUser, GetUserFromJson, LoadUser, ProfileButtonClick ,LoadSavedUser, DisplayUsername } from "./users.js";
let isPopupOpen = false;


// Wait for the HTML DOM to fully load
document.addEventListener("DOMContentLoaded", async () => {
    createBoard();                // Set up the game board in the DOM
    updateActiveTile();
    setupKeyboard();// Visually highlight the first tile
    getRandomWordFromLocalServer(); // Fetch a new random word from the local server
    document.getElementById("saveUser").addEventListener("click", () => {
        createUser();
    });
    GetUserFromJson();
    await LoadUser();
    ProfileButtonClick();
    LoadSavedUser();
    DisplayUsername();

    document.getElementById("AddNewUserButton").addEventListener("click", () => {
        document.getElementById("makeNewUserPopup").style.display = "block";
        isPopupOpen = true;

        const activeTile = document.querySelector('.tile.active');
        if (activeTile) {
            activeTile.style.boxShadow = 'inset 0 0 0 1000px rgba(0, 0, 0, 0.5)';
        }
    })



    document.getElementById("closeNewUserPopup").addEventListener("click", () => {
        document.getElementById("makeNewUserPopup").style.display = "none";
        isPopupOpen = false;

        const activeTileClose = document.querySelector('.tile.active');
        if (activeTileClose) {
            activeTileClose.style.boxShadow = '';
        }

        location.reload();
    })

    document.getElementById("reset").addEventListener("click", () => {
        location.reload();
    })

});


// Handle key presses from the user's keyboard
document.addEventListener("keydown", (event) => {
    if (isPopupOpen) {
        return;
    }

    handleKeyPress(event);
});

// Handle the reset button click to start a new game
document.getElementById("reset-button").addEventListener("click", () => {
    resetGame();
    updateActiveTile();
});

