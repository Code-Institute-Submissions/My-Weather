// SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");
const locationPressureElement = document.querySelector(".location_pressure p");
const locationTempMin = document.querySelector(".location_temp-min");
const locationTempMax = document.querySelector(".location_temp-max");

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

