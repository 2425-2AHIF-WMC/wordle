import { LoadUser } from "./users.js";

let currentUser = null;
let chosenPicture = null;
let user;

document.addEventListener("DOMContentLoaded", async () => {
    user = await LoadUser();
    DropdownSelect(user);
    LoadSavedUser();
    DisplayUsername();
    DisplayWins();

    const select = document.getElementById("userSelect");
    select.addEventListener("change", PlayerSelect);

    const button = document.getElementById("backToGame");
    button.addEventListener("click", BackToGameButton);


    //When "change profile" button is clicked, show the popup
    const changeButton = document.getElementById("changeProfileButton");
    changeButton.addEventListener("click", function() {
        const popup = document.getElementById("changeProfilePopup");
        popup.style.display = "block";
    });

    // When you click on a picture, remember which one you picked
    const picture1 = document.querySelector('[data-pic="1"]');
    const picture2 = document.querySelector('[data-pic="2"]');
    const picture3 = document.querySelector('[data-pic="3"]');
    const picture4 = document.querySelector('[data-pic="4"]');
    const picture5 = document.querySelector('[data-pic="5"]');

    picture1.addEventListener("click", function() {
        RemoveAllHighlights();
        picture1.classList.add("selected");
        chosenPicture = "bilder/2_2.jpeg";
    });

    picture2.addEventListener("click", function() {
        RemoveAllHighlights();
        picture2.classList.add("selected");
        chosenPicture = "bilder/download.jpeg";
    });

    picture3.addEventListener("click", function() {
        RemoveAllHighlights();
        picture3.classList.add("selected");
        chosenPicture = "bilder/nonut 🍩 (@nonounno) on X.jpeg";
    });

    picture4.addEventListener("click", function() {
        RemoveAllHighlights();
        picture4.classList.add("selected");
        chosenPicture = "bilder/40l3clajii9a1.jpeg";
    });

    picture5.addEventListener("click", function() {
        RemoveAllHighlights();
        picture5.classList.add("selected");
        chosenPicture = "bilder/──★ ˙🍓 ̟ !!.jpeg";
    });

    // When "Save" button is clicked, save the picture
    const saveButton = document.getElementById("savePictureOption");
    saveButton.addEventListener("click", function() {

        // Check if user picked a picture
        if (chosenPicture === null) {
            alert("Please pick a picture first!");
            return;
        }

        // Check if user is selected
        if (currentUser === null) {
            alert("Please select a user first!");
            return;
        }

        // Change the main profile picture
        const mainProfilePicture = document.getElementById("profileImg");
        mainProfilePicture.src = chosenPicture;

        // Save it so it remembers next time
        const saveKey = "profilePicture_" + currentUser;
        localStorage.setItem(saveKey, chosenPicture);

        // Close the popup
        const popup = document.getElementById("changeProfilePopup");
        popup.style.display = "none";

        // Reset everything
        RemoveAllHighlights();
        chosenPicture = null;

    });

    // Load saved picture when page loads
    LoadUsersPicture();
});

// Helper function to remove highlights from all pictures
function RemoveAllHighlights() {
    const picture1 = document.querySelector('[data-pic="1"]');
    const picture2 = document.querySelector('[data-pic="2"]');
    const picture3 = document.querySelector('[data-pic="3"]');
    const picture4 = document.querySelector('[data-pic="4"]');
    const picture5 = document.querySelector('[data-pic="5"]');

    picture1.classList.remove("selected");
    picture2.classList.remove("selected");
    picture3.classList.remove("selected");
    picture4.classList.remove("selected");
    picture5.classList.remove("selected");
}

// Function to load the user's saved picture
// Function to load the user's saved picture
function LoadUsersPicture() {
    if (currentUser !== null) {
        const saveKey = "profilePicture_" + currentUser;
        const savedPicture = localStorage.getItem(saveKey);

        if (savedPicture !== null) {
            const mainProfilePicture = document.getElementById("profileImg");
            mainProfilePicture.src = savedPicture;
        }
    }
}

function DropdownSelect(user) {
    const select = document.getElementById("userSelect");

    user.forEach(users => {
        const option = document.createElement("option");
        option.value = users.username;
        option.textContent = users.username;
        select.appendChild(option);
    });
}

function PlayerSelect (){
    const select = document.getElementById("userSelect");
    const selectUser = select.value;

    if (selectUser) {
        currentUser = selectUser;
        localStorage.setItem("selectedUser", selectUser);
        console.log(selectUser);
        location.reload();
    }
    else{
        currentUser = null;
    }
}

export function LoadSavedUser () {
    const savedUser = localStorage.getItem("selectedUser");

    if (savedUser) {
        currentUser = savedUser;
        const select = document.getElementById("userSelect");
        select.value = savedUser;
        console.log(currentUser);
    }
}

function BackToGameButton () {
    window.location.href = "./index.html";
}

function DisplayUsername (){
    const name = document.getElementById("usernameProfile");
    name.textContent = currentUser;
}

function DisplayWins () {
    const wins = document.getElementById("winAmount");

    for (let i = 0; i < user.length; i++) {
        if (currentUser === user[i].username) {
            wins.textContent = `${user[i].wins}`;
        }
    }
}