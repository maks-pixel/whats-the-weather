// search city input
// display api call info here
// 5 day forcast
// side bar search history
var cityInput = document.querySelector("#city");
var submitBtn = document.querySelector("#submit");
var citySubmition = function(event){
    event.preventDefault();
    var city = cityInput.value.trim();
    
    if (city){
        getCityWeather(city);
    }else{
        alert('Please enter a city!')
    }

}

var getCityWeather = function(city){
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + apiKey;
    //get api key sorted
    //get request url
    fetch(apiUrl).then(function(response){
        console.log(response);
        response.json().then(function(data) {
            console.log(data);
          });
    })
}


submitBtn.addEventListener('click', citySubmition);