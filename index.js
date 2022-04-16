var cityInput = document.querySelector('#city');
var aside = document.querySelector('.search-container')
var historyBtns = document.createElement('div');
aside.append(historyBtns)
var submitBtn = document.querySelector("#submit");
var pastPlace = JSON.parse(localStorage.getItem("pastPlace")) || [];
var city = '';
var todayDate = function(){
    var date = document.querySelector(".date");
    date.textContent += moment().format("MM-DD-YYYY")
};

//search for cities
var citySearch = function(event){
    event.preventDefault();
    city = cityInput.value.trim();
    console.log (city);
    pastPlace.push(city);
    localStorage.setItem('pastPlace', JSON.stringify(pastPlace));
   console.log(pastPlace);
   if (city){
       var cityButton = document.createElement('button');
       cityButton.textContent = city;
       historyBtns.append(cityButton);
     coordinates(city);  
   }
   
}


//add a city history button
var oldBtns = function(){
    pastPlace.forEach( element =>{
        var cityButton = document.createElement('button');
        cityButton.textContent = element;
        historyBtns.append(cityButton)
    });
}
//finding the coordinates for the city
var coordinates = function(city){
    var cityApiUrl= "https://api.opencagedata.com/geocode/v1/json?q=" + city + "&key=95fc79dbc2e94afaaae185ad4617f846";
    fetch(cityApiUrl).then(function(response){
        console.log(response);
        response.json().then(function (data) {
            console.log(data);
            var lat = data.results[1].geometry.lat
            var lon = data.results[1].geometry.lng
            console.log(lat, lon);
            getCityWeather(lat, lon);
        })
    });
}
//
var getCityWeather = function (lat, lon) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon +"&exclude=hourly,minutely&APPID=46b66bbc7a7a2a16414a5f99510f4b75&units=metric";
    //get api key sorted
    //get request url
    fetch(apiUrl).then(function (response) {
        console.log(response);
        response.json().then(function (data) {
            console.log(data);
            // climate = data;
            // displayCurrentWeather(climate);
            // displayDailyforcast(climate);
        });
    });
}

todayDate();
oldBtns();
submitBtn.addEventListener('click', citySearch);
