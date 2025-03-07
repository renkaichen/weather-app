async function getWeatherData(location) {
    const response = await fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Shanghai?unitGroup=us&include=current&key=ECD428Y2SW62PXFBMX24NXTQ8&contentType=json", {mode: "cors"});
    const cityData = await response.json();
    loadWeatherData(cityData);
    return cityData;
    // const {address, timeZone, tzoffset, resolvedAddress, currentConditions} = cityData;
    // console.log(currentConditions);
}

function loadWeatherData(data) {
    const currentConditions = data.currentConditions;
    const content = document.getElementById("content");

    const city = document.createElement("h1");
    city.textContent = data.address; 

    const temp = document.createElement("h1");
    temp.textContent = currentConditions.temp;

    const conditions = document.createElement("h2");
    conditions.textContent = currentConditions.conditions;

    const feelsLike = document.createElement("h2");
    feelsLike.textContent = currentConditions.feelslike;

    console.log(data.days);
    
    const high = document.createElement("h2");
    high.textContent = `High: ${data.days[0].tempmax}`;

    const low = document.createElement("h2");
    low.textContent = `Low: ${data.days[0].tempmin}`;

    content.append(city, temp, conditions, feelsLike, high, low);
}

function initalize() {
    getWeatherData();
}

export default initalize;