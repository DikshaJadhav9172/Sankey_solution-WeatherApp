// This file stores app data in one place

const state = {
    city: "",
    currentWeather: null,
    forecast: [],
    favorites: JSON.parse(localStorage.getItem("favorites")) || []
};
