const empty = "";
const low = 3;
const moderate = 8;
const high = 11;
const numOfElInCards = 25;
var todaysDate = moment().toDate();
todaysDate = moment(todaysDate).format("DD/MM/YYYY");
var currentWeather = document.querySelector("#current");
var searchList = document.querySelector(".search-history");

var searchId = 0;
var searchHistoryArray = [];
var searchHistoryObj = {
    history: "",
    id: "",
}

// function that gets triggered when user clicks the search button
$("#search-btn").click(function() {

    var searchCity = $("#user-search").val();

    var geoLocationUrl = "https://geocode.search.hereapi.com/v1/geocode?q=" + searchCity + "&apiKey=mj4KYckuw8lalUVDqTRMUGr_21lA1l9lyXnpdHRvl7o";

    if (searchCity !== "") {

        // Adding the recent search to the search history
        searchHistory(searchCity);

        // searchHistoryObj.history = searchCity;
        // searchHistoryObj.id = searchId;
        // searchHistoryArray.push(searchHistoryObj);
        // searchId++;
        // saveHistory();

        $("#user-search").val(empty);
        fetch(geoLocationUrl).then(function(response) {
                if (response.ok) {

                    response.json().then(function(data) {
                        getCurrentWeather(searchCity, data);
                        return;
                    })
                }

            })
            .catch(function(error) {

                alert("Unable to connect to GeoCode");
            })
    }


});

var searchHistory = function(search) {
    var newBtnEl = document.createElement("button");
    newBtnEl.classList = "btn-sm btn-block list-group-item-dark mb-2";
    newBtnEl.textContent = search;
    searchList.appendChild(newBtnEl);
    return;
}

var getCurrentWeather = function(search, data) {

    var weatherApiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.items[0].position.lat + "&lon=" + (data.items[0].position.lng) + "&units=metric&appid=229ca32802b237bb05e7ab6cfdfacd0c";
    fetch(weatherApiUrl).then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    addCurrWeathertoSite(search, data);
                })

                return;

            }

        })
        .catch(function(error) {

            alert("Unable to connect to OpenWeather");
        })
}


var addCurrWeathertoSite = function(city, data) {

    if (document.getElementById("holder")) {
        document.getElementById("holder").remove();
    }

    var newContainer = document.createElement("div");
    newContainer.setAttribute("id", "holder");
    currentWeather.appendChild(newContainer);

    var headerEl = document.createElement("h3");
    headerEl.textContent = city + " (" + todaysDate + ")";
    newContainer.appendChild(headerEl);

    var iconCode = data.current.weather[0].icon;
    var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png";
    var imgEl = document.createElement("img");
    imgEl.setAttribute("src", iconUrl);
    imgEl.setAttribute("alt", "Weather Icon");
    headerEl.appendChild(imgEl);

    var tempEL = document.createElement("p");
    tempEL.textContent = "Temp: " + Math.round(data.current.temp) + " ℃";

    newContainer.appendChild(tempEL);

    var windEl = document.createElement("p");
    windEl.textContent = "Wind: " + Math.round((data.current.wind_speed * 3.6)) + " km/h";
    newContainer.appendChild(windEl);

    var humEl = document.createElement("p");
    humEl.textContent = "Humidity: " + data.current.humidity + " %";
    newContainer.appendChild(humEl);

    var uviEl = document.createElement("p");

    uviEl.textContent = "UV Index: ";
    var spanEl = document.createElement("span");
    if (data.current.uvi >= 0 && data.current.uvi < low) {
        spanEl.setAttribute("style", "color: white; padding: 5px 10px 5px 10px; background-color: green");
    } else if (data.current.uvi >= low && data.current.uvi < moderate) {
        spanEl.setAttribute("style", "color: white; padding: 5px 10px 5px 10px; background-color: orange");
    } else if (data.current.uvi >= moderate && data.current.uvi < high) {
        spanEl.setAttribute("style", "color: white; padding: 5px 10px 5px 10px; background-color: red");
    }

    spanEl.className = "rounded-lg";
    spanEl.textContent = data.current.uvi;
    uviEl.appendChild(spanEl);
    newContainer.appendChild(uviEl);

    if (document.querySelector("#future-data")) {
        for (var j = 0; j < numOfElInCards; j++) {
            document.querySelector("#future-data").remove();
        }
    }

    for (var i = 1; i < 6; i++) {

        var card = document.querySelector("#f-date-" + i);
        var futureDate = document.createElement("h4");
        futureDate.setAttribute("id", "future-data");
        futureDate.textContent = moment().add(i, 'days').format("DD/MM/YYYY");

        card.setAttribute("style", "background-color:#000067; color: #f0f0ff");

        var futImg = document.createElement("img");
        var futIcon = data.daily[i - 1].weather[0].icon;
        var futIconUrl = "http://openweathermap.org/img/wn/" + futIcon + ".png";
        futImg.setAttribute("src", futIconUrl);
        futImg.setAttribute("alt", "Weather Icon");
        futImg.setAttribute("id", "future-data");

        var futTemp = document.createElement("p");
        futTemp.textContent = "Temp: " + Math.round(data.daily[i - 1].temp.day) + " ℃";
        futTemp.setAttribute("id", "future-data");

        var futWind = document.createElement("p");
        futWind.textContent = "Wind: " + Math.round((data.daily[i - 1].wind_speed * 3.6)) + " km/h";
        futWind.setAttribute("id", "future-data");

        var futHumidity = document.createElement("p");
        futHumidity.textContent = "Humidity: " + data.daily[i - 1].humidity + " %";
        futHumidity.setAttribute("id", "future-data");

        card.appendChild(futureDate);
        card.appendChild(futImg);
        card.appendChild(futTemp);
        card.appendChild(futWind);
        card.appendChild(futHumidity);
    }
}

var saveHistory = function() {
    localStorage.setItem("search-history", JSON.stringify(searchHistoryArray));
}