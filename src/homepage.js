import getWeatherData from "./weatherDisplay";

function initalize() {
    initalizeSearchbar();
}

function initalizeSearchbar() {
    const content = document.getElementById("content");
    const searchBar = document.createElement("input");
    const button = document.createElement("button");

    searchBar.type = "text";
    searchBar.placeholder = "Enter a location";
    searchBar.setAttribute("id", "search");
    button.textContent = "Search";
    button.addEventListener("click", () => search());

    content.appendChild(searchBar);
    content.appendChild(button);
}

function search() {
    const input = document.getElementById("search").value;
    getWeatherData(input);
}

export default initalize;