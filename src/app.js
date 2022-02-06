

function formatDate(timestamp){
let date = new Date(timestamp);
let hours = date.getHours();
let minutes = date.getMinutes();
if(hours<10){
    hours= `0${hours}`;
}
if(minutes<10){
    minutes= `0${minutes}`;
}
let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let day = days[date.getDay()];
return`${day} ${hours}:${minutes}`;
}

function formatDay(timestamp){
let date = new Date(timestamp *1000);
let day = date.getDay();
let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

return days[day];
}

function displayForecast(response){
let forecast = response.data.daily;

let forecastElement = document.querySelector("#forecast");

let forecastHTML = `<div class="row">`;

forecast.forEach(function(forecastDay, index){
    if (index<6) {
    forecastHTML = forecastHTML + `
    <div class="col-2">
      <div class="weather-forecast-day">
    ${formatDay(forecastDay.dt)}
    </div>
    <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="42"/>
    
    <div class="westher-forecast-temperature">
    <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temp.max)}°</span>
    <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)}°</span>
    </div>
    </div>
   `;}
});

forecastHTML=forecastHTML +`</div>`;
forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  
    let apiKey ="220e37eed186a27e272ac52b9c9a702c"; 
    let tempetureUnits = "metric";
    let apiUrl= `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${tempetureUnits}`;

    console.log(apiUrl);
    axios.get(apiUrl).then(displayForecast);
}


function displayTemperature(response){
    let temperatureElement = document.querySelector ("#temperature");
    let cityElement = document.querySelector ("#city");
    let descriptionElement = document.querySelector ("#description");
    let humidityElement = document.querySelector ("#humidity");
    let windElement = document.querySelector ("#wind");
    let dateElement = document. querySelector ("#date");
    let iconElement = document. querySelector ("#icon");
    
 
    celsiusTemperature = response.data.main.temp;

    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = response.data.wind.speed;
    dateElement.innerHTML=formatDate(response.data.dt * 1000);
    iconElement.setAttribute ("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`); 
    iconElement.setAttribute ("alt",response.data.weather[0].discription); 

    getForecast(response.data.coord);
}

function search(city){
let apiKey ="220e37eed186a27e272ac52b9c9a702c"; 
let tempetureUnits = "metric";
let endpointUrl = "https://api.openweathermap.org/data/2.5/weather?";
let weatherUrl = `${endpointUrl}&q=${city}&appid=${apiKey}&units=${tempetureUnits}`;
axios.get(weatherUrl).then(displayTemperature);
}

function handleSubmit(event){
event.preventDefault();
let cityInputElement = document.querySelector ("#city-input");
search(cityInputElement.value);
}

function getLocation(position) {
    let apiKey ="220e37eed186a27e272ac52b9c9a702c"; 
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    
    axios.get(apiUrl).then(displayTemperature);
}

function showPosition(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(getLocation);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let currentButton = document.querySelector("#location");
currentButton.addEventListener("click", showPosition);
search("New York");