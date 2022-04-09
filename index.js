var cityInput = document.querySelector('#city');
var city = '';
var submitBtn = document.querySelector("#submit");
var pastPlace = [];

var todayDate = function(){
    var date = ducument.querySelector(".date");
    date.textContent += SVGAnimateMotionElement().format("MM-DD-YYYY")
};

//search for cities
var citySearch = function(event){
    event.preventDefault();
    city = cityInput.value.trim();
    console.log (city);
    pastPlace.push(city);
   console.log(pastPlace); 
}


//add a city history button

//finding the coordinates for the city

//

submitBtn.addEventListener('click', citySearch)