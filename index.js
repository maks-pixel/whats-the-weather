var cityInput = document.querySelector('#city');
var aside = document.querySelector('.search-container')
var historyBtns = document.querySelector('.history-btns');
var submitBtn = document.querySelector("#submit");
var pastPlace = JSON.parse(localStorage.getItem("pastPlace")) || [];
var week = document.querySelector(".week");
var future = document.createElement("div");
var title = document.querySelector('.city-name')
future.classList.add("forcast"); 
week.append(future);
var city = '';
var cityBtn =  document.querySelector("cityBtn");
var todayDate = ()=>{
    var date = document.querySelector(".date");
    date.textContent += moment().format("MM-DD-YYYY")
};

//search for cities
var citySearch =(event)=>{
    event.preventDefault();
    city = cityInput.value.trim();
    console.log (city);
    pastPlace.push(city);
    localStorage.setItem('pastPlace', JSON.stringify(pastPlace));
   console.log(pastPlace);
   if (city){
       var cityButton = document.createElement('button');
       cityButton.textContent = city;
       title.textContent = city; 
       cityButton.classList.add("cityBtn")
       cityButton.value = city;
       historyBtns.append(cityButton);
     coordinates(city);  
   } else {
    alert('Please enter a city!')
    } 
    console.log(pastPlace);
}

//add a city history button
var oldBtns = ()=>{
    console.log(pastPlace);
    for(let index = 0; index < pastPlace.length; index++){
        var cityButton = document.createElement('button');
        cityButton.classList.add("btn", "cityBtn");
        cityButton.setAttribute("id", pastPlace[index]);
        cityButton.textContent = pastPlace[index];
        cityButton.value = pastPlace[index];
        historyBtns.append(cityButton);
    }
    // pastPlace.forEach( element =>{
    //     var cityButton = document.createElement('button');
    //     cityButton.textContent = city;
    //     cityButton.classList.add("cityBtn")
    //     cityButton.value = city;
    //     historyBtns.append(cityButton)
    // });
}

//making the buttons work
var btnWork=(event)=>{
    event.preventDefault();
 console.log(event.target.id);
 city =  event.target.id;
 title.textContent = event.target.id;
 coordinates(city);
}
//finding the coordinates for the city
var coordinates = (city)=>{
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
            var climate = data;
            todaysWeather(climate);
            weeksWeather(climate);
            // displayCurrentWeather(climate);
            // displayDailyforcast(climate);
        });
    });
}


//past buttons

//current weather
var todaysWeather= (climate)=>{
    if(climate){
        //todays temperature
        var temp= document.querySelector('.temp');
        temp.textContent = "Temperature: "+ climate.current.temp;

        // todays wind speed
        var wind = document.querySelector(".wind");
        wind.textContent = "Wind Speed: " + climate.current.wind_speed;

        //todays humidity
        var humidity = document.querySelector(".humidity");
        humidity.textContent = "Humidity: " + climate.current.humidity;

        //todays UV Index
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

//weekly forcast
var weeksWeather =  function(climate){
    future.innerHTML='';
    for (let i =1 ; i <= 5; i++) {
        //container
        var daily = document.createElement("div");
        daily.classList.add("card");

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
        pic.classList.add("img-container")
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
todayDate();
 oldBtns();

submitBtn.addEventListener('click', citySearch);
historyBtns.addEventListener('click', btnWork);