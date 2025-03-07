async function getWeatherData(location) {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&include=current&key=ECD428Y2SW62PXFBMX24NXTQ8&contentType=json`, {mode: "cors"});
    const cityData = await response.json();
    displayWeatherData(cityData);
}

function displayWeatherData(data) {
    const currentConditions = data.currentConditions;
    const weatherContent = document.getElementById("weatherContent");
    weatherContent.innerHTML = '';

    const city = document.createElement("h1");
    city.textContent = data.resolvedAddress; 

    const temp = document.createElement("h1");
    temp.textContent = currentConditions.temp;

    const conditions = document.createElement("h2");
    conditions.textContent = currentConditions.conditions;

    const feelsLike = document.createElement("h2");
    feelsLike.textContent = currentConditions.feelslike;

    const high = document.createElement("h2");
    high.textContent = `High: ${data.days[0].tempmax}`;

    const low = document.createElement("h2");
    low.textContent = `Low: ${data.days[0].tempmin}`;

    weatherContent.append(city, temp, conditions, feelsLike, high, low);
}

export default getWeatherData;