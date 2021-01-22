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
  var queryURL = "api.openweathermap.org/data/2.5/weather?q=" + cityname + "&units=imperial&appid=d202bea0172cc5628ace1f64febee1fe";

  var response = await $.ajax({
    url: queryURL,
    method: "GET"
  })
  console.log(response);

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
