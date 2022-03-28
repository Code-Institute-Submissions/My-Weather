// SELECT ELEMENTS
const searchInput = document.querySelector(".weatherSearch");
const city = document.querySelector(".weatherCityName");
const day = document.querySelector(".weatherCurrentDay");
const calendar = document.querySelector(".weatherDate");
const humidity = document.querySelector(".currentWeatherHumidity");
const wind = document.querySelector(".wind_value");
const pressure = document.querySelector(".pressure_value");
const image = document.querySelector(".weather_image");
const temperaature = document.querySelector(".temperature-value");
const forecastFiveDay = document.querySelector(".weather_forecast");
const suggestions = document.querySelector("#suggestions");

// API variable
let weatherAPIKey = "4616b16851daa77e0e064e1b87acd6da";
let current_weather_API_URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=" +weatherAPIKey;
let cityBaseEndpoint = "https://api.teleport.org/api/cities/?search=";
let forecast_API_URL = "https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=" +weatherAPIKey;

// array for images
let weatherImages = [
    {
        url: "assets/images/clear-sky.png",
        ids: [800],
    },
    {
        url: "assets/images/broken-clouds.png",
        ids: [803, 804],
    },
    {
        url: "assets/images/few-clouds.png",
        ids: [801],
    },
    {
        url: "assets/images/mist.png",
        ids: [701, 711, 721, 731, 741, 751, 761, 762, 771, 781],
    },
    {
        url: "assets/images/rain.png",
        ids: [500, 501, 502, 503, 504],
    },
    {
        url: "assets/images/scattered-clouds.png",
        ids: [802],
    },
    {
        url: "assets/images/shower-rain.png",
        ids: [520, 521, 522, 531, 300, 301, 302, 310, 311, 312, 313, 314, 321],
    },
    {
        url: "assets/images/snow.png",
        ids: [511, 600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622],
    },
    {
        url: "assets/images/thunderstorm.png",
        ids: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232],
    },
];

//  API Connection for weathet today seaction
let getWeatherByCityName = async (cityString) => { //move to a func
    let city;
    if (cityString.includes(",")) {
        city =
        cityString.substring(0, cityString.indexOf(",")) +
        cityString.substring(cityString.lastIndexOf(","));
    } else {
        city = cityString;
    }
    let endpoint = current_weather_API_URL + "&q=" + city;
    let response = await fetch(endpoint);
    if (response.status !== 200) {
        alert("No known city"); //remove alert
        return;
    }
    let weather = await response.json();
    return weather;
};


//  API Connection for forecast section
let getForecastByCityID = async (id) => {
    let endpoint = forecast_API_URL + "&id=" + id;
    let result = await fetch(endpoint);
    let forecast = await result.json();
    let forecastList = forecast.list;
    let daily = [];

forecastList.forEach((day) => {
    let date = new Date(day.dt_txt.replace(" ", "T"));
    let hours = date.getHours();
        if (hours === 12) {
            daily.push(day);
        }
        }); //close for
    return daily;
};

let weatherForCity = async (city) => {
    let weather = await getWeatherByCityName(city);
    if (!weather) {
        return;
    }
    let cityID = weather.id;
    updateCurrentWeather(weather);
    let forecast = await getForecastByCityID(cityID);
    updateForecast(forecast);
};
  //  set city weather info
    searchInput.addEventListener("keydown", async (e) => {
    if (e.keyCode === 13) {
        weatherForCity(searchInput.value);
    }
    });

  // API Connection for search Input
searchInput.addEventListener("input", async () => {
    let endpoint = cityBaseEndpoint + searchInput.value;
    let result = await (await fetch(endpoint)).json();
    suggestions.innerHTML = "";
    let cities = result._embedded["city:search-results"];
    let length = cities.length > 5 ? 5 : cities.length;
    for (let i = 0; i < length; i++) {
        let option = document.createElement("option");
        option.value = cities[i].matching_full_name;
        suggestions.appendChild(option);
    }
});

  // update weather details
    let updateCurrentWeather = (data) => {
        city.textContent = data.name + ", " + data.sys.country;
        day.textContent = dayOfWeek();
        calendar.textContent = calenderInfo();
        humidity.textContent = data.main.humidity;
        pressure.textContent = data.main.pressure;
        wind.textContent = getWindInfo(data);

        temperaature.textContent = data.main.temp > 0
        ? "+" + Math.round(data.main.temp)
        : Math.round(data.main.temp);

        let imgID = data.weather[0].id;
        weatherImages.forEach((obj) => {
            if (obj.ids.includes(imgID)) {
                image.src = obj.url;
            }
    });
};


// update forecast weather details
let updateForecast = (forecast) => {
    forecastFiveDay.innerHTML = "";
    forecast.forEach((day) => {
        let iconUrl = "http://openweathermap.org/img/wn/" + day.weather[0].icon + "@2x.png";
        let dayName = dayOfWeek(day.dt * 1000);
        let temperature =
            day.main.temp > 0
            ? "+" + Math.round(day.main.temp) : Math.round(day.main.temp);
            let forecatItem = `
                <article class="weather__forecast__item">
                    <img src="${iconUrl}" alt="${day.weather[0].description}" class="weather__forecast__icon">
                    <h3 class="weather__forecast__day">${dayName}</h3>
                    <p class="weather__forecast__temperature"><span class="value">${temperature}</span> &deg;C</p>
                </article>
            `;
            forecastFiveDay.insertAdjacentHTML("beforeend", forecatItem);
        });
    };

// get day info
let dayOfWeek = (dt = new Date().getTime()) => {
    return new Date(dt).toLocaleDateString("en-EN", { weekday: "long" });
};

  // get calender info
let calenderInfo = () => {
    return new Date().toLocaleDateString("en-EN", { calendar: "long" });
};

// get wind info
let getWindInfo = (data) => {
    let windDirection;
    let degree = data.wind.deg;

    if (degree > 45 && degree <= 135) {
        windDirection = "East";
    } else if (degree > 135 && degree <= 225) {
        windDirection = "South";
    } else if (degree > 225 && degree <= 315) {
        windDirection = "West";
    } else {
        windDirection = "North";
    }
    return windDirection + ", " + data.wind.speed;
};

    //Set initial city to London
let initialState = () => {
    weatherForCity("London").then(() => (document.body.style.filter = "blur(0)"));
};

initialState();