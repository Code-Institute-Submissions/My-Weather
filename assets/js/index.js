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

let forecast_API_URL = "https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=" +weatherAPIKey;

// array for images
let weatherImages = [
    {
        url: "images/clear-sky.png",
        ids: [800],
    },
    {
        url: "images/broken-clouds.png",
        ids: [803, 804],
    },
    {
        url: "images/few-clouds.png",
        ids: [801],
    },
    {
        url: "images/mist.png",
        ids: [701, 711, 721, 731, 741, 751, 761, 762, 771, 781],
    },
    {
        url: "images/rain.png",
        ids: [500, 501, 502, 503, 504],
    },
    {
        url: "images/scattered-clouds.png",
        ids: [802],
    },
    {
        url: "images/shower-rain.png",
        ids: [520, 521, 522, 531, 300, 301, 302, 310, 311, 312, 313, 314, 321],
    },
    {
        url: "images/snow.png",
        ids: [511, 600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622],
    },
    {
        url: "images/thunderstorm.png",
        ids: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232],
    },
];

//  API Connection for weathet today seaction
let getWeatherByCityName = async (cityString) => {
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
        alert("No known city");
        return;
    }
    let weather = await response.json();
    return weather;
};


//  API Connection for forecast seaction
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

  // API Connection for search Imput
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
        wind.textContent = windInfo(data);

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