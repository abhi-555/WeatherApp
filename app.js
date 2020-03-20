var searchButton = document.querySelector('button');
var searchCity = document.querySelector('#city');

var loadingText = document.querySelector('#load');
var weatherBox = document.querySelector('#weather');

var weatherCity = document.querySelector('#weatherCity');
var weatherDescription = document.querySelector('#weatherDescription');
var weatherTemperature = document.querySelector('#weatherTemperature');


//weather constructor
function Weather(cityName, description) {
    
    this.cityName = cityName;
    this.description = description;
    this._temperature = '';
}

//adding a property 'temperature' to the weather prototype.
Object.defineProperty(Weather.prototype, 'temperature', {
    get: function() {
        
        return this._temperature;
    },
    set: function(value) {
        
        this._temperature = value + 'C.';
    }
});

//event listener on button click
searchButton.addEventListener('click', searchWeather);

function searchWeather() {
    
    loadingText.style.display = 'block';
    weatherBox.style.display = 'none';
    var cityName = searchCity.value;
    if (cityName.trim().length == 0) {
        
        return alert('Please enter a City Name');
    }

    //preparing a GET request to fetch the weather data.
    var http = new XMLHttpRequest();
    var apiKey = '03401e28a6a814a8d06c4dbd2e435d93';
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=metric&appid=' + apiKey;
    var method = 'GET';

    http.open(method, url);
    http.onreadystatechange = function() {
        
        if (http.readyState == XMLHttpRequest.DONE && http.status === 200) {
            
            var data = JSON.parse(http.responseText);
            var weatherData = new Weather(cityName, data.weather[0].description.toUpperCase());
            weatherData.temperature = data.main.temp;
            updateWeather(weatherData);
        } 
        else if (http.readyState === XMLHttpRequest.DONE) {
            
            alert('Something went wrong!');
        }
    };
    http.send();
}

//updating the html data.
function updateWeather(weatherData) {
    
    weatherCity.textContent = weatherData.cityName;
    weatherDescription.textContent = weatherData.description;
    weatherTemperature.textContent = weatherData.temperature;
    loadingText.style.display = 'none';
    weatherBox.style.display = 'block';
}