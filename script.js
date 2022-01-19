// search city input
// display api call info here
// 5 day forcast
// side bar search history
var cityInput = document.querySelector("#city");
var submitBtn = document.querySelector("#submit");
var buttonContainer = document.querySelector('.history')
var stuff = document.querySelector('.stuff');
var future = document.createElement("div");
future.classList.add("forcats"); 
stuff.append(future);
var climate = '';
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

var newFuture = function(){
    var future = document.createElement("div");
    future.classList.add("forcats"); 
    stuff.append(future);
};

var getCityWeather = function (lat, lon) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon +"&exclude=hourly,minutely&APPID=46b66bbc7a7a2a16414a5f99510f4b75&units=metric";
    //get api key sorted
    //get request url
    fetch(apiUrl).then(function (response) {
        console.log(response);
        response.json().then(function (data) {
            console.log(data);
            climate = data;
            displayCurrentWeather(climate);
            displayDailyforcast(climate);
        });
    });
}



var displayCurrentWeather = function (climate) {
    
    if (climate) {
        //temperature
        var temp = document.querySelector(".temp");
        temp.textContent = "Temprature: " + climate.current.temp;

        //wind speed
        var wind = document.querySelector(".wind");
        wind.textContent = "Wind Speed: " + climate.current.wind_speed;

        //humidity
        var humidity = document.querySelector(".humidity");
        humidity.textContent = "Humidity: " + climate.current.humidity;

        //UV Index
        var uvIndex = document.querySelector(".uvi");
        uvIndex.textContent = "UV Index: " + climate.current.uvi;

       if (2 >= climate.current.uvi){
           uvIndex.style.backgroundColor = "green"
       } else if (6 <= climate.current.uvi){
        uvIndex.style.backgroundColor = "red"
       } else {
        uvIndex.style.backgroundColor = "yellow"
       }
    }
}

var displayDailyforcast =  function(climate){
    for (let i =1 ; i <= 5; i++) {
        //container
        var daily = document.createElement("div");
        daily.classList.add("card", "col-3");

        //date
        var date = document.createElement("h5");
        date.classList.add("card-header", "date");
        date.textContent = moment().add( i , 'days').format("MM-DD-YYYY")

        //information
        var info = document.createElement("div");
        info.classList.add("card-body");
        
        //icon
        var picture =  climate.daily[i].weather[0].icon
        console.log(picture)
        var image = "http://openweathermap.org/img/wn/" + picture + "@2x.png"
        var pic = document.createElement("img");
        pic.setAttribute("src", image );
        
        //weather info
        var temp = document.createElement("p");
        temp.textContent = "Temprature: " + climate.daily[i].temp.day;
        var wind = document.createElement("p");
        wind.textContent = "Wind Speed: " + climate.daily[i].wind_speed;
        var humid = document.createElement("p");
        humid.textContent = "Humidity: " + climate.daily[i].humidity;

        info.append(pic, temp, wind, humid);
        daily.append(date, info);
        future.append(daily);
    }
}

cityHistory();
todayDate();
submitBtn.addEventListener('click', citySubmition);
buttonContainer.addEventListener('click', historyBtn);