// search city input
// display api call info here
// 5 day forcast
// side bar search history
var cityInput = document.querySelector("#city");
var submitBtn = document.querySelector("#submit");
var buttonContainer = document.querySelector('.history')
var future = document.querySelector(".forcast")
var weather = '';
var lat = '';
var lon = '';
var places = JSON.parse(localStorage.getItem("places")) || [];
var city = '';

var todayDate = function () {
    var date = document.querySelector(".date");
    date.textContent += moment().format("MM-DD-YYYY")
};

var citySubmition = function (event) {
    event.preventDefault();
    city = cityInput.value.trim();
    places.push(city);
    localStorage.setItem('places', JSON.stringify(places));
    if (city) {
        var oldCity = document.createElement('BUTTON');
         oldCity.classList.add("btn", "btn-secondary", "place");
         oldCity.setAttribute("id", city);
         oldCity.textContent = city;
         buttonContainer.append(oldCity);
        coordinates(city);
    } else {
        alert('Please enter a city!')
    }
    console.log(places);
};

var cityHistory = function (){
    console.log(places);
    for (let index = 0; index < places.length; index++) {
         var oldCity = document.createElement('BUTTON');
         oldCity.classList.add("btn", "btn-secondary", "place");
         oldCity.setAttribute("id", places[index]);
         oldCity.textContent= places[index];
        buttonContainer.append(oldCity);
    }
};

var historyBtn = function (event){
    event.preventDefault();
    console.log(event.target.id);
    city = event.target.id;
    coordinates(city);
}

var coordinates = function(city){
    var cityApiUrl= "https://api.opencagedata.com/geocode/v1/json?q=" + city + "&key=95fc79dbc2e94afaaae185ad4617f846";
    fetch(cityApiUrl).then(function(response){
        console.log(response);
        response.json().then(function (data) {
            console.log(data);
            lat = data.results[1].geometry.lat
            lon = data.results[1].geometry.lng
            console.log(lat, lon);
            getCityWeather(lat, lon);
        })
    });
}

var getCityWeather = function (lat, lon) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon +"&exclude=hourly,minutely&APPID=46b66bbc7a7a2a16414a5f99510f4b75&units=metric";
    //get api key sorted
    //get request url
    fetch(apiUrl).then(function (response) {
        console.log(response);
        response.json().then(function (data) {
            console.log(data);
            weather = data;
            displayCurrentWeather(weather);
            displayDailyforcast(weather);
        });
    });
}

var displayCurrentWeather = function (weather) {
    if (weather) {
        //temperature
        var temp = document.querySelector(".temp");
        temp.textContent = "Temprature: " + weather.current.temp;

        //wind speed
        var wind = document.querySelector(".wind");
        wind.textContent = "Wind Speed: " + weather.current.wind_speed;

        //humidity
        var humidity = document.querySelector(".humidity");
        humidity.textContent = "Humidity: " + weather.current.humidity;

        //UV Index
        var uvIndex = document.querySelector(".uvi");
        uvIndex.textContent = "UV Index: " + weather.current.uvi;

    }
}

var displayDailyforcast =  function(weather){
    for (let i =0 ; i <= 4; i++) {
        var daily = document.createElement("div");
        daily.classList.add("card", "col-3");
        var date = document.createElement("h5");
        date.classList.add("card-header", "date");

        var info = document.createElement("div");
        info.classList.add("card-body");
        var temp = document.createElement("p");
        temp.textContent = "Temprature: " + weather.daily[i].temp.day;
        var wind = document.createElement("p");
        wind.textContent = "Wind Speed: " + weather.daily[i].wind_speed;
        var humid = document.createElement("p");
        humid.textContent = "Humidity: " + weather.daily[i].humidity;

        info.append(temp, wind, humid);
        daily.append(date, info);
        future.append(daily);
    }
}

cityHistory();
todayDate();
submitBtn.addEventListener('click', citySubmition);
buttonContainer.addEventListener('click', historyBtn);