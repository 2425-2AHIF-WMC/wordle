let users = [];
let currentUser = null;


export async function createUser() {
    const UserInput = document.getElementById('createUser');
    const username =  UserInput.value.trim();
    let bool = true;

    if (username === "") {
        alert("Please enter a username");
        return;
    }
    if (users && users.length !== 0) {
        for (let i = 0; i < users.length; i++) {

            if (users[i].username === username) {
                alert("Username already exists!");
                bool = false;
                return;
            }
        }
    }

    const NewUser = {
        username: username,
        wins: 0
    }

    users.push(NewUser);

    if (bool === true) {
        await AddNewUserToJson(NewUser);
        console.log(NewUser);
        LoadUser();
        localStorage.setItem("selectedUser", NewUser.username);
        alert("new User added!");
    }

}


async function AddNewUserToJson(NewUser) {

    const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(NewUser)
    })

    return response.json();
}

export async function GetUserFromJson() {
    const response = await fetch("http://localhost:3001/users")
        const data = await response.json();
        return data;

}

export async function LoadUser (){
    users = await GetUserFromJson();
    console.log(users);
    return users;
}


export function ProfileButtonClick() {
    document.getElementById("user").addEventListener("click", () => {

        if (users && users.length > 0) {
            window.location.href = "./profile.html";
        } else {
            alert("Please create a user");
        }
    })
}

export async function AddWinsToJson() {
    let user;
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === currentUser) {
            user = users[i];
            break;
        }
    }

        const response = await fetch(`http://localhost:3001/users/${user.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            wins: user.wins +1,
        })
    } )

}

export function LoadSavedUser () {
    const savedUser = localStorage.getItem("selectedUser");

    if (savedUser) {
        currentUser = savedUser;
        console.log(currentUser);
    }
}

export function DisplayUsername (){
    const unsername = document.getElementById("unsername");
    username.textContent = currentUser;
}

