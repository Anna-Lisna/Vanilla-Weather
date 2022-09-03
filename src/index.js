function firstLetterCapitalize(string) {
  return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
}

function showDate() {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = document.querySelector(".day");
  let month = document.querySelector(".month");
  let date = document.querySelector(".date");
  let data = new Date();

  date.innerHTML = `${data.getDate()}th`;
  month.innerHTML = months[data.getMonth()];
  day.innerHTML = days[data.getDay()];
}

showDate();

function forecastCoordinates(coordinates) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timesstamp) {
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let data = new Date(timesstamp * 1000);
  let date = data.getDate();
  let day = days[data.getDay()];
  let month = months[data.getMonth()];
  return `${day} <br \> ${month}, ${date}th`;
}

function showTemp(response) {
  let nameCity = document.querySelector(".name-weather");
  let temperature = document.querySelector("#temperature");
  let description = document.querySelector(".description");
  let wind = document.querySelector(".wind");
  let humidity = document.querySelector(".humidity");
  let icon = document.querySelector(".icon");
  nameCity.innerHTML = response.data.name;
  temperature.innerHTML = Math.round(response.data.main.temp);
  description.innerHTML = response.data.weather[0].description;
  wind.innerHTML = Math.round(response.data.wind.speed);
  humidity.innerHTML = response.data.main.humidity;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  forecastCoordinates(response.data.coord);
}

function displayForecast(response) {
  let forecast = response.data.daily.slice(1, 7);
  let forecastElement = document.querySelector(".container-temperature");
  let htmlForecast = "";
  forecast.forEach(function (day, index) {
    if (index % 2) {
      htmlForecast += `
        <div class="card">
          <div class="image">
            <img src="http://openweathermap.org/img/wn/${
              day.weather[0].icon
            }@2x.png"/>
          </div>
          <div class="information">
            <h5>
              ${formatDay(day.dt)}
            </h5>
            <p class="temparute-info">${Math.round(
              day.temp.min
            )} ... ${Math.round(day.temp.max)}<sup>o</sup>C</p>
          </div>
        </div>
    `;
    } else {
      htmlForecast += `
        <div class="card card-light">
          <div class="image">
            <img src="http://openweathermap.org/img/wn/${
              day.weather[0].icon
            }@2x.png"/>
          </div>
          <div class="information">
            <h5>
              ${formatDay(day.dt)}
            </h5>
            <p class="temparute-info">${Math.round(
              day.temp.min
            )} ... ${Math.round(day.temp.max)}<sup>o</sup>C</p>
          </div>
        </div>
    `;
    }
  });
  forecastElement.innerHTML = htmlForecast;
}

function getApi(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=f1bb6d8310b835cbba9945c33c7dcf54`;
  axios.get(apiUrl).then(showTemp);
}

function getCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#city-input").value;
  getApi(inputCity);
}

let searchForm = document.querySelector("#search-city");
searchForm.addEventListener("submit", getCity);

getApi("Kyiv");
