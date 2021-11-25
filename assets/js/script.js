const empty = "";
const low = 3;
const moderate = 8;
const high = 11;
var todaysDate = moment().toDate();
todaysDate = moment(todaysDate).format("DD/MM/YYYY");
var currentWeather = document.querySelector("#current");
var searchList = document.querySelector(".search-history");

$("#search-btn").click(function() {

    var searchCity = $("#user-search").val();
    // API key: mj4KYckuw8lalUVDqTRMUGr_21lA1l9lyXnpdHRvl7o
    var geoLocationUrl = "https://geocode.search.hereapi.com/v1/geocode?q=" + searchCity + "&apiKey=mj4KYckuw8lalUVDqTRMUGr_21lA1l9lyXnpdHRvl7o";

    if (searchCity !== "") {
        var newBtnEl = document.createElement("button");
        newBtnEl.classList = "btn-primary btn-sm btn-block list-group-item-dark mb-2";
        newBtnEl.textContent = searchCity;
        searchList.appendChild(newBtnEl);
        $("#user-search").val(empty);
        fetch(geoLocationUrl).then(function(response) {
            if (response.ok) {

                response.json().then(function(data) {
                    getCurrentWeather(searchCity, data);

                })

            } else {
                alert("Something went wrong with api");
            }
        })


    } else {
        return;
    }

});

var getCurrentWeather = function(search, data) {

    // Api key: 229ca32802b237bb05e7ab6cfdfacd0c
    var weatherApiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.items[0].position.lat + "&lon=" + (data.items[0].position.lng) + "&units=metric&appid=229ca32802b237bb05e7ab6cfdfacd0c";
    fetch(weatherApiUrl).then(function(response) {
        if (response.ok) {

            response.json().then(function(data) {

                addCurrWeathertoSite(search, data);
            })

            return;

        } else {
            alert("Something went wrong with api");
            return;
        }
    })
}

var addCurrWeathertoSite = function(city, data) {
    var headerEl = document.createElement("h3");
    headerEl.textContent = city + " (" + todaysDate + ")";
    currentWeather.appendChild(headerEl);

    var tempEL = document.createElement("p");
    tempEL.textContent = "Temp: " + data.current.temp + " ℃";
    currentWeather.appendChild(tempEL);

    var windEl = document.createElement("p");
    windEl.textContent = "Wind: " + data.current.wind_speed + " KMH";
    currentWeather.appendChild(windEl);

    var humEl = document.createElement("p");
    humEl.textContent = "Humidity: " + data.current.humidity + " %";
    currentWeather.appendChild(humEl);

    var uviEl = document.createElement("p");

    uviEl.textContent = "UV Index: ";
    var spanEl = document.createElement("span");
    if (data.current.uvi >= 0 && data.current.uvi < low) {
        spanEl.setAttribute("style", "color: white; padding: 5px; background-color: green");
        spanEl.textContent = data.current.uvi;
    } else if (data.current.uvi >= low && data.current.uvi < moderate) {
        spanEl.setAttribute("style", "color: white; padding: 5px; background-color: orange");
        spanEl.textContent = data.current.uvi;
    } else if (data.current.uvi >= moderate && data.current.uvi < high) {
        spanEl.setAttribute("style", "color: white; padding: 5px; background-color: red");
        spanEl.textContent = data.current.uvi;
    }

    uviEl.appendChild(spanEl);
    currentWeather.appendChild(uviEl);



}