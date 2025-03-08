import getWeatherData from "./weatherDisplay";

function initalize() {
    initalizeSearchbar();
}

function search() {
    const input = document.getElementById("search").value;
    getWeatherData(input);
}

function initalizeSearchbar() {
    const content = document.getElementById("content");
    const input = document.createElement("input");
    const button = document.createElement("button");
    const searchbar = document.createElement("div");

    
    input.type = "text";
    input.placeholder = "Enter a location";
    input.setAttribute("id", "search");

    button.textContent = "Search";
    button.addEventListener("click", () => search());

    searchbar.setAttribute("id", "searchbar");
    searchbar.appendChild(input);
    searchbar.appendChild(button);

    content.prepend(searchbar);
}

export default initalize;