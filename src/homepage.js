import getWeatherData from "./weatherDisplay";
let favoriteLocations = [];

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
    const currentTemp = document.createElement("h1");
    const currentCondition = document.createElement("h2");

    favorite.append(location,currentTemp, currentCondition);
    content.prepend(favorite);

    if (favoriteLocations.length == 0) {
        location.textContent = "No Favorites Yet"
    } else {
        displayFavorite(0);
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
}

export function checkFavorites(location) {
    if (favoriteLocations.includes(location)) {
        return true;
    } else {
        return false;
    }
}

export default initalize;