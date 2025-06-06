// Responsible for retrieving the solution word and validating guesses

import { gameState } from "./game.js";

export function checkIfWordExists(word) {
    return fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`)
        .then(response => response.ok)
        .catch(() => false);
}

export function getRandomWordFromLocalServer() {
    // Command to run local server: json-server --watch db.json --port 3000
    fetch("http://localhost:3000/words")
        .then(response => response.json())
        .then(words => {
            const randomIndex = Math.floor(Math.random() * words.length);
            gameState.solution = words[randomIndex].word.toUpperCase();
            console.log("Solution:", gameState.solution);
        })
        .catch(error => {
            console.error("Error fetching words:", error);
        });
}
