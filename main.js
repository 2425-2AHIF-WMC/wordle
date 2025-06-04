let currentRow = 0; // current row
let currentTile = 0; // current tile
let guessGrid = Array(6).fill("").map(() => Array(5).fill("")); // creates an array with 6 rows and 5 columns

let solution = ""; // solution word

let gameOver = false; // game over flag

document.addEventListener("DOMContentLoaded", () => {
    createBoard();
    updateActiveTile();
    getRandomWordFromLocalServer();
});

const board = document.getElementById("game-board"); // get the game board

function createBoard() {
    board.innerHTML = ""; // delete old board
    for (let i = 0; i < 6; i++) { // 6 rows
        const row = document.createElement("div"); // create a new row
        row.className = "row"; // give row the class row
        for (let j = 0; j < 5; j++) { // 5 columns
            const tile = document.createElement("div"); // create a new tile
            tile.className = "tile"; //give tile the class tile
            row.appendChild(tile); // Add tile to row
        }
        board.appendChild(row); // Add row to board
    }
}

document.addEventListener("keydown", handleKeyPress); // Listen for key presses

function handleKeyPress(event) {
    if (gameOver) return; // if game is over, do nothing

    const key = event.key; // get the key pressed

    if (key === "Backspace") { // if backspace is pressed
       deleteLetter(); // delete letter
    }
    else if (key === "Enter") { // if enter is pressed
        checkWord(); // check word
    }
    else if (key.length === 1 && key.match(/[a-z]/i) && currentTile < 5) { // if a letter is pressed
        addLetter(key.toUpperCase()); // add letter
    }
}

function addLetter(letter) {
    const row = document.getElementsByClassName("row")[currentRow]; // get the current row
    const tile = row.children[currentTile]; // get the current tile
    tile.textContent = letter; // set the tile text to the letter
    guessGrid[currentRow][currentTile] = letter; // set the guess grid to the letter
    currentTile++; // move to the next tile
    updateActiveTile(); // update cursor
}

function deleteLetter() {
    if (currentTile > 0) { // if current tile isn't the first tile
        currentTile--; // move to the previous tile
        const row = document.getElementsByClassName("row")[currentRow]; // get the current row
        const tile = row.children[currentTile]; // get the current tile
        tile.textContent = ""; // set the tile text to empty
        guessGrid[currentRow][currentTile] = ""; // set the guess grid to empty
        updateActiveTile(); // update cursor
    }
}

function checkWord() {
    const guess = guessGrid[currentRow].join("").toUpperCase(); // join the guess grid to a string

    if (guess.length !== 5) { // if the guess isn't 5 letters long
        showMessage("❗ Please enter a word with 5 letters."); // alert the user
        return; // exit the function
    }

    if (!solution) {
        showMessage("❗ Game loading! Please wait a moment.");
        return;
    }

    checkIfWordExists(guess).then(isValid => {
        if (!isValid) { // if the word doesn't exist
            showMessage("❌ This word doesn't exist!"); // alert the user
            return; // exit the function
        }

        if (guess === solution) { // if the guess is correct
            colorTiles(guess); // color the tiles
            showMessage("🎉 Correct!"); // alert the user
            gameOver = true;
        } else { // if the guess is incorrect
            colorTiles(guess); // color the tiles
            currentRow++; // move to the next row
            currentTile = 0; // reset the current tile

            if (currentRow === 6) { // if the user has used all their guesses
                showMessage("❌ You lost! The word was: " + solution); // alert the user
                gameOver = true; // set game over flag
            }
        }
    });
}

function checkIfWordExists(word) {
    return fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`) // fetch the word from the dictionary API
    .then(response => { 
      if (!response.ok) { // if the response is not ok
        return false; // word doesn't exist
      }
      return true; // word exists
    })
    .catch(() => { // handle error
      return false; // word doesn't exist
    });
}

function getRandomWordFromLocalServer() { // command for json-server start: json-server --watch db.json --port 3000
    fetch ("http://localhost:3000/words") // fetch the words from the local server
    .then(response => response.json()) // convert the response to json
    .then(words => {
        const randomIndex = Math.floor(Math.random() * words.length); // get a random index
        solution = words[randomIndex].word.toUpperCase();// get the random word
        console.log("Solution:", solution); // log the solution
    })
    .catch(error => {
        console.error("Error fetching words:", error); // log the error
    })
}

function colorTiles(guess) {
    const row = document.getElementsByClassName("row")[currentRow]; // get the current row
    const solutionArray = solution.split(""); // split the solution into an array
    const guessArray = guess.split(""); // split the guess into an array
    const colors = Array(5).fill("grey"); // standard color for all tiles

    for (let i = 0; i < 5; i++) { // loop through the guess
        if (guessArray[i] === solutionArray[i]) { // if the letter is in the correct position
            colors[i] = "green"; // set the color to green
            solutionArray[i] = null; // remove the letter from the solution array
        }
    }

    for (let i = 0; i < 5; i++) { // loop through the guess
        if (colors[i] !== "green") {
            const index = solutionArray.indexOf(guessArray[i]); // get the index of the letter in the solution array
            if (index !== -1) { // if the letter is in the solution array
                colors[i] = "yellow"; // set the color to yellow
                solutionArray[index] = null; // remove the letter from the solution array
            }
        }
    }

    for (let i = 0; i < 5; i++) { // loop through the guess
        const tile = row.children[i]; // get the current tile
        tile.style.backgroundColor = colors[i]; // set the tile color
        tile.style.color = "white"; // set the text color to white
        tile.style.border = "1px solid #999"; // set the border color
    }
}

document.getElementById("reset-button").addEventListener("click", resetGame); // Listen for reset button click

function resetGame() {
    const rows = document.getElementsByClassName("row"); // get all the rows
    for (let i = 0; i < rows.length; i++) { // loop through the rows
        const tiles = rows[i].children; // get all the tiles in the row
        for (let j = 0; j < tiles.length; j++) { // loop through the tiles
            tiles[j].textContent = ""; // set the tile text to empty
            tiles[j].style.backgroundColor = ""; // set the tile color to empty
            tiles[j].style.color = ""; // set the text color to empty
            tiles[j].style.border = "1px solid #ccc"; // set the border color to empty
        }
    }

    guessGrid = Array(6).fill("").map(() => Array(5).fill("")); // reset the guess grid
    currentRow = 0; // reset the current row
    currentTile = 0; // reset the current tile
    gameOver = false; // reset the game over flag

    getRandomWordFromLocalServer();
}

function updateActiveTile() {
    // delete old .active
    document.querySelectorAll('.tile.active').forEach(tile => tile.classList.remove('active'));

    // set new active cursor
    if (!gameOver && currentTile < 5) {
        const row = document.getElementsByClassName("row")[currentRow];
        const tile = row.children[currentTile];
        tile.classList.add("active");
    }
}

function showMessage(text) {
    const container = document.getElementById("message-container");
    if (!container) return;

    const message = document.createElement("div");
    message.className = "message";
    message.textContent = text;

    container.appendChild(message);

    // Delete after 3 seconds
    setTimeout(() => {
        message.style.opacity = '0';
        setTimeout(() => container.removeChild(message), 500);
    }, 3000);
}
