var cityList = [];
var cityname;

initCityList();
initWeather();

function renderCities() {
  $("#cityList").empty();
  $("#cityInput").val("");

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

}

function storeCityArray() {

}

async function displayWeather() {
  // CURRENT WEATHER API
  var queryURL = "api.openweathermap.org/data/2.5/weather?q=" + cityname + "&units=imperial&appid=d202bea0172cc5628ace1f64febee1fe";

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
  var uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=49f0c9f2f3643047ff38e9feb907e820&lat=" + getLat + "&lon=" + getLong;
  var uvResponse = await $.ajax({
    url: uvURL,
    method: "GET"
  })
  

}

async function displayFiveDayForecast () {

}

function historyDisplayWeather() {

}
