const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const currentWeatherBox = document.getElementById("currentWeather");
const forecastBox = document.getElementById("forecast");
const errorText = document.getElementById("error");
const weatherIcon = document.getElementById("weatherIcon");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");

// Map weather conditions to icons
const weatherIconMap = {
    'clear': '<i class="fas fa-sun fa-4x"></i>',
    'clouds': '<i class="fas fa-cloud fa-4x"></i>',
    'rain': '<i class="fas fa-cloud-rain fa-4x"></i>',
    'thunderstorm': '<i class="fas fa-bolt fa-4x"></i>',
    'snow': '<i class="fas fa-snowflake fa-4x"></i>',
    'mist': '<i class="fas fa-smog fa-4x"></i>',
    'drizzle': '<i class="fas fa-cloud-rain fa-4x"></i>'
};

function getWeatherIcon(condition) {
    const cond = condition.toLowerCase();
    for (let key in weatherIconMap) {
        if (cond.includes(key)) {
            return weatherIconMap[key];
        }
    }
    return '<i class="fas fa-cloud-sun fa-4x"></i>';
}

function showWeather() {
    currentWeatherBox.classList.remove("d-none");
    currentWeatherBox.classList.add("animate__animated", "animate__fadeInUp");
    cityName.innerText = state.city;
    temperature.innerText = state.currentWeather.main.temp.toFixed(1) + " °C";
    condition.innerText = state.currentWeather.weather[0].description.charAt(0).toUpperCase() + 
                         state.currentWeather.weather[0].description.slice(1);
    
    // Set weather icon
    const iconContainer = currentWeatherBox.querySelector('.weather-icon');
    if (iconContainer) {
        const iconHTML = getWeatherIcon(state.currentWeather.weather[0].main);
        iconContainer.innerHTML = `<div class="animate__animated animate__heartBeat" style="color: #ffc107;">${iconHTML}</div>`;
    }
    
    // Set additional weather details
    if (humidity) humidity.innerText = state.currentWeather.main.humidity + "%";
    if (windSpeed) windSpeed.innerText = state.currentWeather.wind.speed.toFixed(1) + " m/s";
}

function showForecast() {
    forecastBox.innerHTML = "";

    for (let i = 0; i < state.forecast.list.length; i += 8) {
        const day = state.forecast.list[i];
        const date = new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

        const card = document.createElement("div");
        card.className = "card shadow-sm text-center forecast-card animate__animated animate__fadeInUp";
        card.style.animationDelay = (i / 8) * 0.1 + 's';
        
        const iconHTML = getWeatherIcon(day.weather[0].main);

        card.innerHTML = `
            <div class="card-body">
                <h6 class="mb-2">📅 ${date}</h6>
                <div class="mb-2" style="font-size: 1.8rem; color: #ffc107;">${iconHTML}</div>
                <h5 class="text-primary mb-2">🌡️ ${day.main.temp.toFixed(1)} °C</h5>
                <p class="mb-2">${day.weather[0].main}</p>
                <small class="text-secondary">💨 ${day.wind.speed.toFixed(1)} m/s</small>
            </div>
        `;

        forecastBox.appendChild(card);
    }
}


function showError(msg) {
    errorText.innerText = msg;
    errorText.classList.add("show", "animate__animated", "animate__shakeX");
    errorText.style.animation = 'none';
    setTimeout(() => {
        errorText.classList.remove("animate__shakeX");
        errorText.classList.add("animate__shakeX");
    }, 10);
}


const favList = document.getElementById("favList");

function showFavorites() {
    favList.innerHTML = "";

    if (state.favorites.length === 0) {
        favList.innerHTML = `<li class="list-group-item text-center" style="border: none; background: transparent;">
            <i class="fas fa-inbox fa-2x mb-2" style="opacity: 0.3;"></i>
            <p>No favorites added yet</p>
        </li>`;
        return;
    }

    state.favorites.forEach((city, index) => {
        const li = document.createElement("li");
        li.className = "favorite-item animate__animated animate__fadeInLeft";
        li.style.animationDelay = (index * 0.1) + 's';
        li.style.listStyle = 'none';

        li.innerHTML = `
            <div class="favorite-city">
                📍 ${city}
            </div>

            <div class="favorite-actions">
                <button class="btn-view" title="View weather">👁</button>
                <button class="btn-remove" title="Remove favorite">🗑</button>
            </div>
        `;

        // View button
        li.querySelector(".btn-view").onclick = () => {
            loadFavoriteCity(city);
        };

        // Remove button
        li.querySelector(".btn-remove").onclick = () => {
            removeFavorite(city);
        };

        favList.appendChild(li);
    });
}

