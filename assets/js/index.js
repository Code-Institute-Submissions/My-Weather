const inputValue = document.querySelector('.location_input');
const main = document.querySelector('.location_box');
const curr_temp = document.querySelector('current_temp');
const description_weather = document.querySelector('.weather_description');
const  button = document.querySelector('.submit');
const api_key = '4616b16851daa77e0e064e1b87acd6da';

button.addEventListener('click', function(name){
    fetch('api.openweathermap.org/data/2.5/weather?q='+input.value+'&appid='+api_key)
        .then(response => response.json())
        .then(data =>{
            var currentTemperatureValue = data['main', 'temp'];
            var nameValue = data['name'];
            var descriptionValue = data['weather'][0]['description'];

            main.innerHTML = nameValue;
            description.innerHTML = "Description - "+descriptionValue;
            curr_temp.innerHTML = "Temperature -"+currentTemperatureValue;
            input.value="";
        }).catch(error => alert("You entered an incorrect city name"));
})










//let lat, long;
//const x = document.getElementById("demo");

/*
function getCoords_button(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }else{
        x.innerHTML = "Geolocation not working";
    }
}
function showPosition(position){
    x.innerHTML = "lat" + position.coords.latitude + "<br> Longitude "+
    position.coords.longitude;
}
*/