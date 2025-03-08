async function getWeatherData(location) {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&include=current&key=ECD428Y2SW62PXFBMX24NXTQ8&contentType=json`, {mode: "cors"});
    const cityData = await response.json();
    displayWeatherData(cityData);
}

function displayWeatherData(data) {
    const weatherContent = document.getElementById("weatherContent");
    weatherContent.innerHTML = '';
    displayCurrent(data);
    displayWeek(data);
    // const currentConditions = data.currentConditions;

    // const city = document.createElement("h1");
    // city.textContent = data.resolvedAddress; 

    // const temp = document.createElement("h1");
    // temp.textContent = currentConditions.temp;

    // const conditions = document.createElement("h2");
    // conditions.textContent = currentConditions.conditions;

    // const feelsLike = document.createElement("h2");
    // feelsLike.textContent = currentConditions.feelslike;

    // const high = document.createElement("h2");
    // high.textContent = `High: ${data.days[0].tempmax}`;

    // const low = document.createElement("h2");
    // low.textContent = `Low: ${data.days[0].tempmin}`;

    // weatherContent.append(city, temp, conditions, feelsLike, high, low);
}

function displayCurrent(data) {
    const weatherContent = document.getElementById("weatherContent");
    const currentConditions = data.currentConditions;

    const card = document.createElement("div");
    card.setAttribute("id", "currentCard");

    const timePlace = document.createElement("div");
    timePlace.setAttribute("id", "timePlace");
    const location = document.createElement("p");
    const time = document.createElement("p");
    time.textContent = `Updated ${currentConditions.datetime}`;
    location.textContent = data.resolvedAddress;
    
    timePlace.appendChild(location);
    timePlace.appendChild(time);

    const tempMarker = document.createElement("h2");
    tempMarker.textContent = "F";
    tempMarker.setAttribute("id", "tempMarker");

    const weather = document.createElement("div");
    weather.setAttribute("id", "weather");
    const tempHolder = document.createElement("div");
    tempHolder.setAttribute("id", "tempHolder");

    const temp = document.createElement("h1");
    temp.textContent = currentConditions.temp + "\u00b0";
   
    tempHolder.appendChild(temp);
    tempHolder.appendChild(tempMarker);

    const conditions = document.createElement("h1");
    conditions.textContent = currentConditions.conditions;

    weather.appendChild(tempHolder);
    weather.appendChild(conditions);


    card.appendChild(timePlace);
    card.appendChild(weather);
    weatherContent.appendChild(card);
}

function displayWeek(data) {
    const weatherContent = document.getElementById("weatherContent");
    const weekConditions = data.days;
    console.log(weekConditions);

    const card = document.createElement("div");
    card.setAttribute("id", "weekCard");
    const header = document.createElement("h2");
    header.textContent = "Next Week";

    card.appendChild(header);

    for (let i = 1; i < 11; i++) {
        const day = document.createElement("div");
        day.classList.add("day");

        const date = document.createElement("p");
        date.textContent = weekConditions[i].datetime;
        
        const high = document.createElement("p");
        high.textContent = weekConditions[i].tempmax + "\u00b0";

        const low = document.createElement("p");
        low.textContent = weekConditions[i].tempmin + "\u00b0";

        day.append(date,high,low);
        card.appendChild(day);
    }

    weatherContent.appendChild(card);
}


export default getWeatherData;