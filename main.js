const apiKey = "877b1583e21ff2f73e4eb9163a02abec";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const cityName = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

const checkWeather = async (city) => {
    try {
        // ✅ Append the city name to the API URL
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();

        // ✅ Check if elements exist before updating
        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
        document.querySelector('.wind').innerHTML = data.wind.speed + " km/h";

        if (data.weather[0].main == "Clouds") weatherIcon.src = "images/clouds.png";
        else if (data.weather[0].main == "Clear") weatherIcon.src = "images/clear.png";
        else if (data.weather[0].main == "Rain") weatherIcon.src = "images/rain.png";
        else if (data.weather[0].main == "Drizzle") weatherIcon.src = "images/drizzle.png";
        else if (data.weather[0].main == "Mist") weatherIcon.src = "images/mist.png";

        document.querySelector(".weather").style.display = "block"

    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
};

// ✅ Ensure a valid city name is entered before making the request
searchBtn.addEventListener("click", () => {
    const city = cityName.value.trim();
    if (city) {
        checkWeather(city);
    } else {
        alert("Please enter a city name!");
    }
});
