var searchList = document.querySelector(".search-history");
var empty = "";

$("#search-btn").click(function() {;

    if ($("#user-search").val() !== "") {
        var newListBtnEl = document.createElement("button");
        newListBtnEl.classList = "btn-sm btn-block list-group-item-dark mb-2";
        newListBtnEl.textContent = $("#user-search").val();
        searchList.appendChild(newListBtnEl);
        $("#user-search").val(empty);

    } else {
        return;
    }


});