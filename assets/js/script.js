const empty = "";
var searchList = document.querySelector(".search-history");

$("#search-btn").click(function() {

    // API key: A2mD7VganlN2FLWzfesMPmEdQm8etbxpl9ApyKhFC_k
    var geoLocationUrl = "https://geocode.search.hereapi.com/v1/geocode?q=" + $("#user-search").val() + "&apiKey=A2mD7VganlN2FLWzfesMPmEdQm8etbxpl9ApyKhFC_k";

    if ($("#user-search").val() !== "") {
        var newBtnEl = document.createElement("button");
        newBtnEl.classList = "btn-primary btn-sm btn-block list-group-item-dark mb-2";
        newBtnEl.textContent = $("#user-search").val();
        searchList.appendChild(newBtnEl);
        $("#user-search").val(empty);
        fetch(geoLocationUrl).then(function(response) {
            if (response.ok) {

                response.json().then(function(data) {
                    getCurrentWeather(data);

                })
                return;

            } else {
                alert("Something went wrong with api");
            }
        })


    } else {
        return;
    }

});

var getCurrentWeather = function(data) {

    // Api key: 229ca32802b237bb05e7ab6cfdfacd0c
    var weatherApiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.items[0].position.lat + "&lon=" + (data.items[0].position.lng) + "&appid=229ca32802b237bb05e7ab6cfdfacd0c";
    fetch(weatherApiUrl).then(function(response) {
        if (response.ok) {

            response.json().then(function(data) {
                console.log(data.current);

            })

        } else {
            alert("Something went wrong with api");
        }
    })
}