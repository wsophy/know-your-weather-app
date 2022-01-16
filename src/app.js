function displayTemperature(response){
    console.log(response.data.wind.speed);
    let temperatureElement = document.querySelector ("#temperature");
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    let cityElement = document.querySelector ("#city");
    cityElement.innerHTML = response.data.name;
    let descriptionElement = document.querySelector ("#description");
    descriptionElement.innerHTML = response.data.weather[0].description;
    let humidityElement = document.querySelector ("#humidity");
    humidityElement.innerHTML = response.data.main.humidity;
    let windElement = document.querySelector ("#wind");
    windElement.innerHTML = response.data.wind.speed;
}


let endpointUrl = "https://api.openweathermap.org/data/2.5/weather?";
let tempetureUnits = "metric";
let apiKey ="220e37eed186a27e272ac52b9c9a702c"; 
let weatherUrl = `${endpointUrl}&q=New York&appid=${apiKey}&units=${tempetureUnits}`;

axios.get(weatherUrl).then(displayTemperature);

let now = new date();
