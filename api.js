const API_KEY = "32fe577236f9af632129c8b909d1ced6";

async function getWeather(city) {
    try {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );

        if (!res.ok) throw new Error("City not found");

        return await res.json();
    } catch (error) {
        console.error("Weather API Error:", error);
        throw error;
    }
}

async function getForecast(city) {
    try {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
        );

        if (!res.ok) throw new Error("Forecast not found");

        return await res.json();
    } catch (error) {
        console.error("Forecast API Error:", error);
        throw error;
    }
}
