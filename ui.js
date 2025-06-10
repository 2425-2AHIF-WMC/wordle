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
    const row = document.getElementsByClassName("row")[currentRow];
    const solutionArray = solution.split("");
    const guessArray = guess.split("");
    const colors = Array(5).fill("grey");

    // Green pass
    for (let i = 0; i < 5; i++) {
        if (guessArray[i] === solutionArray[i]) {
            colors[i] = "#67b05a";
            solutionArray[i] = null;
        }
    }

    // Yellow pass
    for (let i = 0; i < 5; i++) {
        if (colors[i] !== "#67b05a") {
            const index = solutionArray.indexOf(guessArray[i]);
            if (index !== -1) {
                colors[i] = "#ebd067";
                solutionArray[index] = null;
            }
        }
    }

    for (let i = 0; i < 5; i++) {
        const tile = row.children[i];

        setTimeout(() => {
            tile.classList.add("flip-half");

            // In der Mitte der Flip (nach 250ms), Farbe setzen
            setTimeout(() => {
                tile.style.backgroundColor = colors[i];
                tile.style.color = "white";
                tile.style.border = "1px solid #999";

                tile.classList.remove("flip-half");
                tile.classList.add("flip-back");
            }, 250); // Hälfte der Animationsdauer (0.5s gesamt)
        }, i * 300);
    }
}

const letterStatuses = {}; // globaler Status pro Buchstabe

export function updateKeyboard(guess, solution) {
    const guessArray = guess.toUpperCase().split("");
    const solutionArray = solution.toUpperCase().split("");

    for (let i = 0; i < guessArray.length; i++) {
        const letter = guessArray[i];
        const correctLetter = solutionArray[i];

        let newStatus = "grey";

        if (letter === correctLetter) {
            newStatus = "green";
            solutionArray[i] = null; // Verhindert doppelte Gelb-Treffer
        } else if (solutionArray.includes(letter)) {
            if (letterStatuses[letter] !== "green") {
                newStatus = "yellow";
            }
        }

        // Höhere Priorität: grün > gelb > grau
        const currentStatus = letterStatuses[letter];
        const priority = { grey: 0, yellow: 1, green: 2 };

        if (!currentStatus || priority[newStatus] > priority[currentStatus]) {
            letterStatuses[letter] = newStatus;

            const button = document.querySelector(
                `#keyboard-container button[data-key="${letter.toLowerCase()}"]`
            );

            if (button) {
                button.classList.remove("grey", "yellow", "green");
                button.classList.add(newStatus);
            }
        }
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
