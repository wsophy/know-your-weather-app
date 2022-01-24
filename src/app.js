

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

function displayForecast(){
let forecastElement = document.querySelector("#forecast");

let days =["Mon","Tue","Wed","Thu","Fri"];

let forecastHTML = `<div class="row">`;

days.forEach(function(day){
    forecastHTML = forecastHTML + `
    <div class="col-2">
      <div class="weather-forecast-day">
    ${day}
    </div>
    <img src="http://openweathermap.org/img/wn/50n@2x.png" alt="" width="42"/>
    
    <div class="westher-forecast-temperature">
    <span class="weather-forecast-temperature-max">18°</span>
    <span class="weather-forecast-temperature-min">12°</span>
    </div>
    </div>
   `;
});

forecastHTML=forecastHTML +`</div>`
forecastElement.innerHTML = forecastHTML;

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

function showFahrenheitTempeture (event) {
event.preventDefault();
let temperatureElement = document.querySelector ("#temperature");
celsiusLink.classList.remove("active");
fahrenheitLink.classList.add("active");
let fahrenheitTempeture = (celsiusTemperature * 9) / 5 + 32;

temperatureElement.innerHTML = Math.round(fahrenheitTempeture);
}


function showCelsiusTempeture (event) {
event.preventDefault();
let temperatureElement = document.querySelector ("#temperature");
let celsiusTempeture = celsiusTemperature;
celsiusLink.classList.add("active");
fahrenheitLink.classList.remove("active");
temperatureElement.innerHTML = Math.round(celsiusTempeture);
}


let celsiusTemperature = null;

displayForecast();

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);


let fahrenheitLink = document.querySelector ("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTempeture);

let celsiusLink = document.querySelector ("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTempeture);


search("New York");