var cityList = [];
var cityname;

initCityList();
initWeather();

function renderCities() {
  $("#cityList").empty();
  $("#search-value").val("");

  for (i=0; i<cityList.length; i++) {
    var a = $("<a>");
    a.addClass("list-group-item list-group-item-action list-group-item-primary city");
    a.attr("data-name", cityList[i]);
    a.text(cityList[i]);
    $("#cityList").prepend(a);
  }
}


function initCityList() {
  var storedCities = JSON.parse(localStorage.getItem("cities"));

  if (storedCities !== null) {
    cityList = storedCities;
  }

  renderCities();
}


function initWeather() {
  var storedWeather = JSON.parse(localStorage.getItem("currentCity"));

  if(storedWeather !== null) {
    cityname = storedWeather;

    displayWeather();
    displayFiveDayForecast();
  }
}


function storeCityArray() {
  localStorage.setItem("cities", JSON.stringify(cityList));
}


function storeCurrentCity() {
  localStorage.setItem("currentCity", JSON.stringify(cityname));
}

function clearCityStorage () {
  window.localStorage.clear();
  location.reload();
}


$("#search-button").on("click", function(event){
  event.preventDefault();

  cityname = $("#search-value").val().trim();
  if(cityname === "") {
    alert("Please enter a city")

  }else if (cityList.length >= 5) {
    cityList.shift();
    cityList.push(cityname);
  }else{
    cityList.push(cityname);
  }
  storeCurrentCity();
  storeCityArray();
  renderCities();
  displayWeather();
  displayFiveDayForecast();
});

$("#search-value").keypress(function(e){
  if (e.which === 13){
    $("#search-button").click();
  }
})

async function displayWeather() {
  // CURRENT WEATHER API
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&units=imperial&appid=d202bea0172cc5628ace1f64febee1fe";

  var response = await $.ajax({
    url: queryURL,
    method: "GET"
  })
  console.log(response);

  var currentWeatherDiv = $("<div class='coard-body' id='currentWeather'>");
  var getCurrentCity = response.name;
  var date = new Date();
  var val = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
  var getCurrentWeatherIcon = response.weather[0].icon;
  var displayCurrentWeatherIcon = $("<img src = http://openweathermap.org/img/wn/" + getCurrentWeatherIcon + "@2x.png />");
  var currentCityEl = $("<h3 class = 'cardbody'>").text(getCurrentCity + "(" + val +")");
  currentCityEl.append(displayCurrentWeatherIcon);
  currentWeatherDiv.append(currentCityEl);
  var getTemp = response.main.temp.toFixed(1);
  var tempEl = $("<p class = 'card-text'>").text("Temperature: " + getTemp + "° F");
  currentWeatherDiv.append(tempEl);
  var getHumidity = response.main.humidity;
  var humidityEl = $("<p class = 'card-text'>").text("Humidity: " + getHumidity + "%");
  currentWeatherDiv.append(humidityEl);
  var getWindSpeed = response.wind.speed.toFixed(1);
  var windSpeedEl = $("<p class = 'card-text'>").text("Wind Speed: " + getWindSpeed + " mph");
  currentWeatherDiv.append(windSpeedEl);
  var getLong = response.coord.lon;
  var getLat = response.coord.lat;


  // UV API
  var uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid=49f0c9f2f3643047ff38e9feb907e820&lat=" + getLat + "&lon=" + getLong;
  var uvResponse = await $.ajax({
    url: uvURL,
    method: "GET"
  })
  
  // adds classes to UV index based on level
  var getUVIndex = uvResponse.value;
  var uvNumber = $("<span>");
  if (getUVIndex > 0 && getUVIndex <= 2.99) {
    uvNumber.addClass("low");
  }else if(getUVIndex >= 3 && getUVIndex <= 5.99) {
    uvNumber.addClass("moderate");
  }else if(getUVIndex >= 6 && getUVIndex <= 7.99) {
    uvNumber.addClass("high");
  }else if(getUVIndex >= 8 && getUVIndex <= 10.99) {
    uvNumber.addClass("vhigh");
  }else{
    uvNumber.addClass("extreme");
  }
  uvNumber.text(getUVIndex);
  var uvIndexEl = $("<p class = 'card-text'>").text("UV Index: ");
  uvNumber.appendTo(uvIndexEl);
  currentWeatherDiv.append(uvIndexEl);
  $("#weatherContainer").html(currentWeatherDiv);

}

async function displayFiveDayForecast () {

  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityname + "&units=imperial&appid=e380bf05f66de537690972a12823d83f";

  var response = await $.ajax({
    url: queryURL,
    method: "GET"
  })
  var forecastDiv = $("<div id = 'fiveDayForecast'>");
  var forecastHeader = $("<h5 class = 'card-header border-secondary'>").text("5 Day Forecast");
  forecastDiv.append(forecastHeader);
  var cardDeck = $("<div class = 'card-deck'>");
  forecastDiv.append(cardDeck);
  console.log(response);

  for (i = 0; i < 5; i++) {
    var forecastCard = $("<div class = 'card mb-3 mt-3'>");
    var cardBody = $("<div class = 'card-body'>");
    var date = new Date();
    var val = (date.getMonth() + 1) + "/" + (date.getDate() + i + 1) + "/" + date.getFullYear();
    var forecastDate = $("<h5 class = 'card-title'>").text(val);

    cardBody.append(forecastDate);
    var getCurrentWEatherIcon = response.list[i].weather[0].icon;
    console.log(getCurrentWEatherIcon);
    var displayWeatherIcon = $("<img src = http://openweathermap.org/img/wn/" + getCurrentWEatherIcon + ".png />");
    cardBody.append(displayWeatherIcon);
    var getTemp = response.list[i].main.temp;
    var tempEl = $("<p class = 'card-text'>").text("Temp: " + getTemp + "° F");
    cardBody.append(tempEl);
    var getHumidity = response.list[i].main.humidity;
    var humidityEl = $("<p class = 'card-text'>").text("Humidity: " + getHumidity + "%");
    cardBody.append(humidityEl);
    forecastCard.append(cardBody);
    cardDeck.append(forecastCard);
  }
  $("#forecastContainer").html(forecastDiv);

}

function historyDisplayWeather() {
  cityname = $(this).attr("data-name");
  displayWeather();
  displayFiveDayForecast();
  console.log(cityname);
}

$(document).on("click", ".city", historyDisplayWeather);
$("#clearLocal").on("click", clearCityStorage);