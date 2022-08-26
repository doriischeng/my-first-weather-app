function formattedDate(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = days[now.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayForecast(response) {
  let forecastElement =
    document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
            <div
              class="col-2"
              id="display-forecast"
            >
              <div class="forecast-date">${day}</div>
              <img
                src="http://openweathermap.org/img/wn/10d@2x.png"
                width="64px"
              />
              <span class="forecast-temp-max"
                >18</span
              >
              <span class="forecast-temp-min"
                >12</span
              >
            </div>
`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "4a57d92459ebaebf0556db5aa7e8c670";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector(
    "#temperature"
  );
  temperatureElement.innerHTML = Math.round(
    response.data.main.temp
  );
  let cityElement =
    document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let humidityElement =
    document.querySelector("#humidity");
  humidityElement.innerHTML =
    response.data.main.humidity;

  let windElement =
    document.querySelector("#wind");
  windElement.innerHTML = Math.round(
    response.data.wind.speed
  );

  let descriptionElement = document.querySelector(
    "#description"
  );
  descriptionElement.innerHTML =
    response.data.weather[0].description;

  let iconElement =
    document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  let dateElement =
    document.querySelector("#date");
  dateElement.innerHTML = formattedDate(
    response.data.dt * 1000
  );

  celsiusTemp = response.data.main.temp;

  getForecast(response.data.coord);
}

function matchCity(city) {
  let apiKey = "4a57d92459ebaebf0556db5aa7e8c670";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayTemperature);
}

function search(event) {
  event.preventDefault();
  let cityInputElement =
    document.querySelector("#cityInput");
  matchCity(cityInputElement.value);
}

function showFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector(
    "#temperature"
  );
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(
    fahrenheitTemp
  );
}

function showCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector(
    "#temperature"
  );
  temperatureElement.innerHTML =
    Math.round(celsiusTemp);
}

let celsiusTemp = null;

let form = document.querySelector("#searchCity");
form.addEventListener("submit", search);

let fahrenheitLink = document.querySelector(
  "#fahrenheit-link"
);
fahrenheitLink.addEventListener(
  "click",
  showFahrenheit
);

let celsiusLink = document.querySelector(
  "#celsius-link"
);
celsiusLink.addEventListener(
  "click",
  showCelsius
);

matchCity("Hong Kong");
