let today = document.querySelector("#today");
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
today.innerHTML = `${day} ${hours}:${minutes}`;
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}
function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
            <img
              src="https://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt="weather-icon"
              width="50"
            />
            <div class="weather-forecast-date">${formatDay(
              forecastDay.dt
            )}</div>
            <div class="weather-forecast-temperatures">
              <span class="forecast-max-temperature">${Math.round(
                forecastDay.temp.max
              )}°</span>
              <span class="forecast-min-temperature">${Math.round(
                forecastDay.temp.min
              )}°</span>
            </div>
      </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "caa883a4a60d93878755b08a933f74ea";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios(apiUrl).then(displayForecast);
}
function displayTemperature(response) {
  console.log(response.data);
  let currentTemp = document.querySelector("#degrees");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let condition = document.querySelector("#description");
  let icon = document.querySelector("#icon");
  celsiusTemperature = response.data.main.temp;
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  currentTemp.innerHTML = Math.round(celsiusTemperature);
  humidity.innerHTML = Math.round(response.data.main.humidity);
  wind.innerHTML = Math.round(response.data.wind.speed);
  condition.innerHTML = response.data.weather[0].description;
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", "icon");

  getForecast(response.data.coord);
}
function search(city) {
  let apiKey = "e96362f7a3e49741bc7f62bcb18d316c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
function handleInput(event) {
  event.preventDefault();
  let h1 = document.querySelector("h1");
  let cityInput = document.querySelector("#searchCity");
  h1.innerHTML = `${cityInput.value}`;
  search(cityInput.value);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleInput);

function here(response) {
  console.log(response.data);
  let currentPlace = response.data.name;
  console.log(currentPlace);
  let h1 = document.querySelector("h1");
  h1.innerHTML = currentPlace;
  let currentTemp = document.querySelector("#degrees");
  currentTemp.innerHTML = Math.round(response.data.main.temp);
  let condition = document.querySelector("#description");
  let icon = document.querySelector("#icon");
  condition.innerHTML = response.data.weather[0].description;
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", "icon");
}
function showPosition(position) {
  console.log(position.coords.latitude);
  let lat = position.coords.latitude;
  console.log(position.coords.longitude);
  let lon = position.coords.longitude;
  let apiKey = "caa883a4a60d93878755b08a933f74ea";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(here);
}
function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentLoc = document.querySelector("#currentLocationButton");
currentLoc.addEventListener("click", currentLocation);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let degrees = document.querySelector("#degrees");
  degrees.innerHTML = Math.round(fahrenheitTemperature);
  celsiusLink.classList.remove("active");
  celsiusLink.classList.add("inactive");
  fahrenheitLink.classList.add("active");
}
let fahrenheitLink = document.querySelector("#fahrenheitLink");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let degrees = document.querySelector("#degrees");
  degrees.innerHTML = Math.round(celsiusTemperature);
  fahrenheitLink.classList.remove("active");
  fahrenheitLink.classList.add("inactive");
  celsiusLink.classList.add("active");
}
let celsiusLink = document.querySelector("#celsiusLink");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let celsiusTemperature = null;

search("Koksijde");
