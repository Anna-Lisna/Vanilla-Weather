function firstLetterCapitalize(string) {
  return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
}

function showDate() {
  let day = document.querySelector(".day");
  let month = document.querySelector(".month");
  let date = document.querySelector(".date");
  let data = new Date();

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
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  date.innerHTML = `${data.getDate()}th`;
  month.innerHTML = months[data.getMonth()];
  day.innerHTML = days[data.getDay()];
}

showDate();

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

function showCelsius() {
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");

  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = ((temperature.textContent - 32) * 5) / 9;
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsius);

function showFahrenheit() {
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");

  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = (temperature.textContent * 9) / 5 + 32;
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit);

getApi("Kyiv");
