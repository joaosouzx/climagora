const apiKey = "c513fce94bcc9767a59e5531b4b39a64";
// const apiCountryURL = "https://countryflagsapi.com/png/";
const apiCountryURL = "https://flagsapi.com/";

const cityInput = document.getElementById("city");
const searchBtn = document.getElementById("search");

const citySpan = document.getElementById("city-span");
const temp = document.querySelector("#temperature span");
const desc = document.getElementById("description");
const weatherIcon = document.getElementById("weather-icon");
const country = document.getElementById("country");
const umidity = document.querySelector("#umidity span");
const wind = document.querySelector("#wind span");

const weatherData = document.querySelector(".weather-data");
const errorMessage = document.getElementById("error-message");

const getWeatherData = async (city) => {
  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

  const res = await fetch(apiWeatherURL);
  const data = await res.json();

  console.log(data);
  return data;
};

const showWeatherData = async (city) => {
  const data = await getWeatherData(city);
  errorMessage.setAttribute("class", "hide");
  weatherData.removeAttribute("class", "hide");

  if (data.cod == 404) {
    errorMessage.removeAttribute("class", "hide");
    weatherData.setAttribute("class", "hide");
  }

  citySpan.innerText = data.name;
  temp.innerText = parseInt(data.main.temp);
  desc.innerText = data.weather[0].description;
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
  );
  country.setAttribute(
    "src",
    apiCountryURL + data.sys.country + "/flat/32.png"
  );
  umidity.innerText = `${data.main.humidity}%`;
  wind.innerText = `${data.wind.speed}km/h`;
};

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const city = cityInput.value;

  showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    const city = e.target.value;

    showWeatherData(city);
  }
});
