import { LoadUser } from "./users.js";
let currentUser = null;
let user;

document.addEventListener("DOMContentLoaded", async () => {
    user = await LoadUser();

    DropdownSelect(user);

    LoadSavedUser();

    const select = document.getElementById("userSelect");
    select.addEventListener("change", PlayerSelect)



    const button = document.getElementById("backToGame");
    button.addEventListener("click", BackToGameButton);

    DisplayUsername();
    DisplayWins();
})


function DropdownSelect(user) {
    const select = document.getElementById("userSelect");

    user.forEach(users => {
        const option = document.createElement("option");
        option.value = users.username;
        option.textContent = users.username;
        select.appendChild(option);
    })


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