const api = {
    key:  "5d31f242e3941700605447fec83284af",
    baseurl: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value);
        console.log(searchbox.value)
    }
}

function getResults (query) {
    fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);   
}


function displayResults (weather) {
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerHTML = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date')
    date.innerHTML = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerHTML = weather.weather[0].main;

    let hilow = document.querySelector('.high-low');
    hilow.innerHTML = `🌡️${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

    let humidity = document.querySelector('.hum');
    humidity.innerHTML = `🌧️${weather.main.humidity}%`;

    let wind = document.querySelector('.wind');
    wind.innerHTML = `💨${weather.wind.speed} m/s`;

}

function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Octomber", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`


}


function getGeolocation() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      // Call the getWeatherByCoordinates function with latitude and longitude
      getWeatherByCoordinates(latitude, longitude);
    }, (error) => {
      console.error('Error getting geolocation:', error);
      alert('Could not get your location. Please try again.');
    });
  } else {
    console.error('Geolocation is not available in this browser.');
    alert('Geolocation is not available in this browser.');
  }
}

// Function to get weather data by coordinates
function getWeatherByCoordinates(latitude, longitude) {
  fetch(`${api.baseurl}weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}

// ... Existing JavaScript code ...

// Automatically get the user's location when the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
  getGeolocation();
});
