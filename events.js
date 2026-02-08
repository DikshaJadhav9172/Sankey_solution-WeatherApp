const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const favBtn = document.getElementById("favBtn");

searchBtn.addEventListener("click", searchWeather);
if (favBtn) favBtn.addEventListener("click", addToFavorite);

// Enter key to search
cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchWeather();
    }
});

// Add loading animation
function showLoading() {
    const msg = document.getElementById("weatherMsg");
    msg.innerHTML = '<i class="fas fa-spinner fa-spin fa-2x animate__animated animate__spin"></i> <br> Loading...';
    msg.style.color = 'white';
    msg.classList.add("animate__animated", "animate__fadeIn");
}

async function searchWeather() {
    const city = cityInput.value.trim();
    if (!city) {
        showError("Please enter a city name!");
        return;
    }

    try {
        showLoading();
        errorText.innerText = "";
        errorText.classList.remove("show");
        state.city = city;

        console.log("Fetching weather for:", city);
        state.currentWeather = await getWeather(city);
        console.log("Current weather:", state.currentWeather);
        
        state.forecast = await getForecast(city);
        console.log("Forecast:", state.forecast);

        document.getElementById("weatherMsg").innerHTML = '<i class="fas fa-check-circle fa-2x" style="color: #4caf50;"></i> <br> Weather loaded successfully!';
        document.getElementById("weatherMsg").classList.add("animate__animated", "animate__bounceIn");
        showWeather();
        showForecast();
        setTimeout(() => {
            document.getElementById("weatherMsg").innerText = "";
            document.getElementById("weatherMsg").classList.remove("animate__bounceIn");
        }, 2000);
        goWeather(); // Navigate to weather screen
        cityInput.value = ""; // Clear input
    } catch (error) {
        console.error("Search error:", error);
        showError("❌ City not found! Try again.");
    }
}

function addToFavorite() {
    if (!state.city) {
        showError("🔍 Please search for a city first!");
        return;
    }
    
    if (!state.favorites.includes(state.city)) {
        state.favorites.push(state.city);
        localStorage.setItem("favorites", JSON.stringify(state.favorites));
        showFavorites(); // refresh UI
        
        // Visual feedback
        favBtn.innerHTML = '<i class="fas fa-star"></i> Added to Favorites!';
        favBtn.style.background = 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)';
        favBtn.classList.add("animate__animated", "animate__pulse");
        setTimeout(() => {
            favBtn.innerHTML = '<i class="fas fa-star"></i> Add to Favorites';
            favBtn.style.background = '';
            favBtn.classList.remove("animate__pulse");
        }, 2000);
    } else {
        showError("Already in favorites!");
    }
}


async function loadFavoriteCity(city) {
    try {
        showLoading();
        errorText.innerText = "";
        errorText.classList.remove("show");
        state.city = city;

        state.currentWeather = await getWeather(city);
        state.forecast = await getForecast(city);

        const msg = document.getElementById("weatherMsg");
        msg.classList.add("animate__animated", "animate__bounceIn");

        showWeather();
        showForecast();
        goWeather(); // Navigate immediately

        setTimeout(() => {
            msg.innerText = "";
            msg.classList.remove("animate__bounceIn");
        }, 2000);

    } catch (e) {
        showError("❌ Cannot load city!");
    }
}


function removeFavorite(city) {
    state.favorites = state.favorites.filter(c => c !== city);
    localStorage.setItem("favorites", JSON.stringify(state.favorites));
    showFavorites();
    showError("✓ Removed from favorites!");
}
