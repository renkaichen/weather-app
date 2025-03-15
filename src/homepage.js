import getWeatherData from "./weatherDisplay";


let favoriteLocations = [];
let currentFavoriteIndex = null;

function loadSavedData() {
    if (localStorage.getItem('favoriteLocations') != undefined) {
        favoriteLocations = JSON.parse(localStorage.getItem('favoriteLocations'));
    }
}

function initalize() {
    loadSavedData();
    initalizeSearchbar();
    initalizeFavorites();
}

function search() {
    const input = document.getElementById("search").value;
    console.log(input);
    document.getElementById("search").value = '';
    document.getElementById("search").style.backgroundColor = "rgba(0,0,0,0%)";
    document.getElementById("favorite").style.display = "none";
    getWeatherData(input);
}

function initalizeSearchbar() {
    const content = document.getElementById("content");
    const input = document.createElement("input");
    const button = document.createElement("div");
    const searchbar = document.createElement("div");

    
    input.type = "text";
    input.placeholder = "Enter a location";
    input.setAttribute("id", "search");
    input.addEventListener("keypress", (event) => {
        if (event.key == "Enter") {
            search()}
        }
    );

    button.addEventListener("click", () => search());

    searchbar.setAttribute("id", "searchbar");
    searchbar.appendChild(input);
    searchbar.appendChild(button);

    content.prepend(searchbar);
}

function initalizeFavorites() {
    const content = document.getElementById("content");
    const favorite = document.createElement("div");
    favorite.setAttribute("id", "favorite");

    const location = document.createElement("h4");

    favorite.append(location);
    content.prepend(favorite);

    if (favoriteLocations.length == 0) {
        location.textContent = "No Favorites Yet"
    } else {
        currentFavoriteIndex = 0;

        if (favoriteLocations.length != 1) {
            const rightButton = document.createElement("div");
            rightButton.setAttribute("id","rightButton");
            rightButton.addEventListener("click",() => nextFavorite());

            const leftButton = document.createElement("div");
            leftButton.setAttribute("id","leftButton");
            leftButton.addEventListener("click",() => prevFavorite());
            
            content.parentElement.appendChild(rightButton);
            content.parentElement.appendChild(leftButton);
        }
        displayFavorite(currentFavoriteIndex);
    }
}

function displayFavorite(index) {
    getWeatherData(favoriteLocations[index], true);
}

export function addFavorite(location) {
    favoriteLocations.push(location);
    localStorage.setItem('favoriteLocations', JSON.stringify(favoriteLocations));
}

export function unfavorite(location) {
    favoriteLocations.splice(favoriteLocations.indexOf(location), 1);
    localStorage.setItem('favoriteLocations', JSON.stringify(favoriteLocations));
    if (document.getElementById("favorite").style.display != "none") {
        if (favoriteLocations.length == 1) {
            nextFavorite();
            const background = document.getElementById("background");
            background.removeChild(document.getElementById("rightButton"));
            background.removeChild(document.getElementById("leftButton"));
        } else if (favoriteLocations.length != 0) {
            nextFavorite();
        } else {
            document.getElementById("favorite").innerHTML = '';
            const text = document.createElement("h4");
            text.textContent = "No Favorites Yet";
            document.getElementById("favorite").appendChild(text);
        }
    }
}

export function checkFavorites(location) {
    if (favoriteLocations.includes(location)) {
        return true;
    } else {
        return false;
    }
}

function nextFavorite() {
    currentFavoriteIndex = (currentFavoriteIndex + 1) % favoriteLocations.length;
    const favoriteHolder = document.getElementById("favorite");
    favoriteHolder.innerHTML = '';
    displayFavorite(currentFavoriteIndex);
}

function prevFavorite() {
    currentFavoriteIndex--;
    if (currentFavoriteIndex < 0) {
        currentFavoriteIndex = favoriteLocations.length - 1;
    }
    const favoriteHolder = document.getElementById("favorite");
    favoriteHolder.innerHTML = '';
    displayFavorite(currentFavoriteIndex);
}


export default initalize;