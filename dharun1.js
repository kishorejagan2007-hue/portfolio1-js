async function getWeather() {
    const city = document.getElementById("city").value;
    const result = document.getElementById("result");

    if(city === ""){
        result.innerHTML = "Enter a city name";
        return;
    }

    try {
        const geoUrl =
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;

        const geoResponse = await fetch(geoUrl);
        const geoData = await geoResponse.json();

        if(!geoData.results){
            result.innerHTML = "City not found";
            return;
        }

        const lat = geoData.results[0].latitude;
        const lon = geoData.results[0].longitude;

        const weatherUrl =
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`;

        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        result.innerHTML = `
            <h2>${city}</h2>
            <p>Temperature: ${weatherData.current.temperature_2m} °C</p>
            <p>Humidity: ${weatherData.current.relative_humidity_2m}%</p>
            <p>Wind Speed: ${weatherData.current.wind_speed_10m} km/h</p>
        `;
    }
    catch(error){
        result.innerHTML = "Error fetching weather data";
    }
}