import clearNight from "../icons/clearNight.svg";
import cloudyDay from "../icons/cloudyDay.svg";
import cloudyNight from "../icons/cloudyNight.svg";
import clearDay from "../icons/sunny.svg";
import overcast from "../icons/overcast.svg";
import rainy from "../icons/rainy.svg";
import snow from "../icons/snow.svg";
import forecast from "../icons/forecast.svg";
import wind from "../icons/wind.svg";
import precipIcon from "../icons/precip.svg";

async function getWeatherData(location) {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&include=current&key=ECD428Y2SW62PXFBMX24NXTQ8&contentType=json&elements=%2Baqius`, {mode: "cors"});
    const cityData = await response.json();
    displayWeatherData(cityData);
}

function displayWeatherData(data) {
    const weatherContent = document.getElementById("weatherContent");
    weatherContent.innerHTML = '';
    displayCurrent(data);
    displayWeek(data);
    displayWind(data);
    displayAirQuality(data);
    displayPrecip(data);
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

    const icon = new Image(100,100);
    icon.src = getIcon(data);

    const div = document.createElement("div");
    div.style.display = "flex";
    div.style.alignItems = "center";
    div.style.width = "fit-content";

    div.appendChild(temp);
    div.appendChild(icon);

    tempHolder.appendChild(div);
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

    const card = document.createElement("div");
    card.setAttribute("id", "weekCard");
    const header = document.createElement("div");
    header.textContent = "Forecast";
    const forecastIcon = new Image(22, 22);
    forecastIcon.src = forecast;
    forecastIcon.style.marginLeft = "3px";
    header.append(forecastIcon);

    card.appendChild(header);

    for (let i = 1; i < 15; i++) {
        const day = document.createElement("div");
        day.classList.add("day");

        const date = document.createElement("p");
        date.textContent = formatDate(weekConditions[i].datetime);
        
        const icon = new Image(25,25);
        icon.src = getForecastIcon(data, i);

        const high = document.createElement("p");
        high.textContent = weekConditions[i].tempmax + "\u00b0  /";

        const low = document.createElement("p");
        low.textContent = weekConditions[i].tempmin + "\u00b0";

        day.append(date,icon,high,low);
        card.appendChild(day);
    }

    weatherContent.appendChild(card);
}

function displayWind(data) {
    const weatherContent = document.getElementById("weatherContent");
    const currentConditions = data.currentConditions;

    const card = document.createElement("div");
    card.setAttribute("id", "windCard");
    const header = document.createElement("div");
    header.textContent = "Wind";

    const windIcon = new Image(22, 22);
    windIcon.src = wind;
    windIcon.style.marginLeft = "3px";
    header.appendChild(windIcon);

    const speed = document.createElement("p");
    speed.textContent = `Speed: ${currentConditions.windspeed} mph`;
    speed.classList.add("windData");

    const gust = document.createElement("p");
    gust.textContent = `Gust: ${currentConditions.windgust} mph`;
    gust.classList.add("windData");

    const dir = document.createElement("p");
    dir.textContent = `Direction: ${currentConditions.winddir}\u00b0`;
    dir.classList.add("windData");

    card.append(header, speed, gust, dir)
    weatherContent.appendChild(card);
}

function displayAirQuality(data) {
    const weatherContent = document.getElementById("weatherContent"); 
    
    const card = document.createElement("div");
    card.setAttribute("id", "aqCard");

    const header = document.createElement("div");
    header.textContent = "Air Quality";

    const aq = document.createElement("h1");
    aq.textContent = data.currentConditions.aqius;

    const meter = document.createElement("meter");
    meter.value = data.currentConditions.aqius;
    meter.optimum = "0";
    meter.low = "50";
    meter.high = "200";
    meter.min = "0";
    meter.max = "500";

    card.append(header, aq, meter);
    weatherContent.appendChild(card);
}

function displayPrecip(data) {
    const weatherContent = document.getElementById("weatherContent"); 
    
    const card = document.createElement("div");
    card.setAttribute("id", "precipCard");

    const header = document.createElement("div");
    header.textContent = "Precipitation";

    const icon = new Image(20, 20);
    icon.src = precipIcon;
    icon.style.marginLeft = "5px";
    header.appendChild(icon);
    
    const precip = document.createElement("h1");
    precip.textContent = `${data.currentConditions.precipprob}%`;

    card.append(header, precip);
    weatherContent.appendChild(card);
}

function getIcon(data) {
    if (data.currentConditions.conditions.includes("Rain") || data.currentConditions.conditions.includes("Drizzle")) {
        return rainy;
    }

    if (data.currentConditions.conditions.includes("Snow")) {
        return snow;
    }

    switch(data.currentConditions.conditions) {
        case "Partially cloudy": 
            return isNight(data) ? cloudyNight : cloudyDay;
        case "Clear":
            return isNight(data) ? clearNight : clearDay;
        case "Overcast":
            return overcast;
    }
}

function getForecastIcon(data, day) {
    if (data.days[day].conditions.includes("Rain") || data.days[day].conditions.includes("Drizzle")) {
        return rainy;
    }

    if (data.days[day].conditions.includes("Snow")) {
        return snow;
    }
    switch(data.days[day].conditions) {
        case "Partially cloudy": 
            return cloudyDay;
        case "Clear":
            return clearDay;
        case "Overcast":
            return overcast;
    }
}

function isNight(data) {
    const current = new Date(data.currentConditions.datetime);
    const sunset = new Date(data.currentConditions.sunset);
    return current > sunset;
}

function formatDate(date) {
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const d = new Date(date);
    return `${weekdays[d.getDay()]}, ${d.getMonth() + 1}/${d.getDate()}`;
}

export default getWeatherData;