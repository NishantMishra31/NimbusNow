const apiKey = "your_openweathermap_api_key_here";

const defaultCities = [
  "New York",
  "London",
  "Tokyo",
  "Paris",
  "Mumbai",
  "Sydney",
  "Cairo",
  "Moscow",
];
const container = document.getElementById("weather-cards-container");
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");

window.addEventListener("DOMContentLoaded", () => {
  defaultCities.forEach((city) => getWeather(city));
});

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city, true);
    cityInput.value = "";
  }
});

async function getWeather(city, isUserSearch = false) {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&appid=${apiKey}&units=metric`;
  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) {
      console.error("API Error:", data);
      throw new Error(data.message || "City not found");
    }

    const weatherCard = createWeatherCard(data);
    if (isUserSearch) {
      container.prepend(weatherCard);
    } else {
      container.appendChild(weatherCard);
    }
  } catch (err) {
    alert(`Error: ${err.message}`);
  }
}

function createWeatherCard(data) {
  const {
    name,
    main: { temp, humidity },
    weather,
    wind: { speed },
  } = data;

  const description = weather[0].description;

  const card = document.createElement("article");
  card.className = "weather-card";
  card.innerHTML = `
    <h2 class="city-name">${name}</h2>
    <div class="weather-info">
      <p class="temperature">${Math.round(temp)}°C</p>
      <p class="weather-description">${capitalize(description)}</p>
      <p class="humidity">Humidity: ${humidity}%</p>
      <p class="wind-speed">Wind: ${speed} km/h</p>
    </div>
  `;
  return card;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
