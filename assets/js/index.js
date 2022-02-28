/*const location_element = document.getElementById('location_input');
const api_key = "4616b16851daa77e0e064e1b87acd6da";




function getLocationInput(){
    let getLocationInput = document.getElementById('location_input').value;
    console.log(getLocationInput);
}

*/
//let lat, long;
const x = document.getElementById("demo");


function getCoords_button(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }else{
        x.innerHTML = "Geolocation not working";
    }
}





/*
function showPosition(position){
    x.innerHTML = "lat" + position.coords.latitude + "<br> Longitude "+
    position.coords.longitude;
}
*/