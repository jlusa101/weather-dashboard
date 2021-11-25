const empty = "";
var searchList = document.querySelector(".search-history");

$("#search-btn").click(function() {

    var searchCity = $("#user-search").val();
    // API key: A2mD7VganlN2FLWzfesMPmEdQm8etbxpl9ApyKhFC_k
    var geoLocationUrl = "https://geocode.search.hereapi.com/v1/geocode?q=" + searchCity + "&apiKey=A2mD7VganlN2FLWzfesMPmEdQm8etbxpl9ApyKhFC_k";

    if (searchCity !== "") {
        var newBtnEl = document.createElement("button");
        newBtnEl.classList = "btn-primary btn-sm btn-block list-group-item-dark mb-2";
        newBtnEl.textContent = searchCity;
        searchList.appendChild(newBtnEl);
        $(searchCity).val(empty);
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
                console.log(data.current);
                console.log(search);
                console.log(data.current.temp);
                console.log(data.current.wind_speed);
                console.log(data.current.humidity);
                console.log(data.current.uvi);


            })

            return;

        } else {
            alert("Something went wrong with api");
            return;
        }
    })
}