// Responsible for rendering the UI: board, messages, tile colors, and cursor

export function createBoard() {
    const board = document.getElementById("game-board"); // Get game board element
    board.innerHTML = ""; // Clear old board
    for (let i = 0; i < 6; i++) { // 6 rows
        const row = document.createElement("div"); // Create new row
        row.className = "row"; // Assign class "row"
        for (let j = 0; j < 5; j++) { // 5 columns
            const tile = document.createElement("div"); // Create new tile
            tile.className = "tile"; // Assign class "tile"
            row.appendChild(tile); // Add tile to row
        }
        board.appendChild(row); // Add row to board
    }
}

export function updateActiveTile() {
    // Remove any existing active tile highlights
    document.querySelectorAll('.tile.active').forEach(tile => tile.classList.remove('active'));

    // Highlight the current active tile
    if (!window.gameState.gameOver && window.gameState.currentTile < 5) {
        const row = document.getElementsByClassName("row")[window.gameState.currentRow];
        const tile = row.children[window.gameState.currentTile];
        tile.classList.add("active");
    }
}

export function showMessage(text) {
    const container = document.getElementById("message-container");
    if (!container) return;

    const message = document.createElement("div");
    message.className = "message";
    message.textContent = text;

    container.appendChild(message);

    // Automatically remove the message after 3 seconds
    setTimeout(() => {
        message.style.opacity = '0';
        setTimeout(() => container.removeChild(message), 500);
    }, 3000);
}

export function colorTiles(guess, solution, currentRow) {
    const row = document.getElementsByClassName("row")[currentRow]; // Get current row
    const solutionArray = solution.split(""); // Split solution into characters
    const guessArray = guess.split(""); // Split guess into characters
    const colors = Array(5).fill("grey"); // Default color for all tiles

    // Set green for correct letters in correct positions
    for (let i = 0; i < 5; i++) {
        if (guessArray[i] === solutionArray[i]) {
            colors[i] = "green";
            solutionArray[i] = null; // Prevent reuse
        }
    }

    // Set yellow for correct letters in wrong positions
    for (let i = 0; i < 5; i++) {
        if (colors[i] !== "green") {
            const index = solutionArray.indexOf(guessArray[i]);
            if (index !== -1) {
                colors[i] = "yellow";
                solutionArray[index] = null;
            }
        }
    }

    // Apply the tile colors
    for (let i = 0; i < 5; i++) {
        const tile = row.children[i];
        tile.style.backgroundColor = colors[i];
        tile.style.color = "white";
        tile.style.border = "1px solid #999";
    }
}

const letterStatuses = {}; // Q: default, G: green, Y: yellow, X: grey

export function updateKeyboard(guess, solution) { //no usage --> fix
    const guessArray = guess.split("");
    const solutionArray = solution.split("");

    for (let i = 0; i < guessArray.length; i++) {
        const letter = guessArray[i];
        const key = document.getElementById(`key-${letter}`);
        if (!key) continue;

        if (letter === solutionArray[i]) {
            letterStatuses[letter] = "green";
        } else if (solution.includes(letter)) {
            if (letterStatuses[letter] !== "green") {
                letterStatuses[letter] = "yellow";
            }
        } else {
            if (!letterStatuses[letter]) {
                letterStatuses[letter] = "grey";
            }
        }

        key.classList.remove("grey", "yellow", "green");
        key.classList.add(letterStatuses[letter]);
    }
}

export function createKeyboard() {
    const keyboard = document.getElementById("keyboard");
    keyboard.innerHTML = "";

    const letters = "QWERTYUIOPASDFGHJKLZXCVBNM".split("");
    letters.forEach(letter => {
        const key = document.createElement("button");
        key.className = "key";
        key.id = `key-${letter}`;
        key.textContent = letter;
        keyboard.appendChild(key);
    });
}
