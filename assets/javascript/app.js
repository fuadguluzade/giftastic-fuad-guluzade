var topics = ["dog", "cat", "parrot", "hamster"];
var animatedGIF = [];
var staticImgs = [];
var ratings = [];

for (var i = 0; i < topics.length; i++) {
    $("#buttons").append($('<button/>').text(topics[i]).addClass("button"));
}

$("#buttons").on('click', '.button', function () {
    var q = $(this).text();
    var queryURL = `https://api.giphy.com/v1/gifs/search?q=${q}&limit=10&api_key=7diNMvkB3SH15EgXNqytuN3Tyg5lGTDp`;
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response);
        for (var i = 0; i < response.data.length; i++) {
            animatedGIF[i] = response.data[i].images.fixed_height.url;
            ratings[i] = response.data[i].rating;
            staticImgs[i] = response.data[i].images["480w_still"].url;
        }
        appendResult();
    });
});

$("#animals").on('click', ".gif", function () {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr('src', animatedGIF[$(this).index() / 2]);
        $(this).attr("data-state", "animated");
    } else {
        $(this).attr('src', staticImgs[$(this).index() / 2]);
        $(this).attr("data-state", "still");
    }
    

});

$("#animal-button").on('click', function () {
    event.preventDefault();
    $("#buttons").append($('<button/>').text($("#animal-input").val()).addClass("button"));
});

const appendResult = function () {
    $("#animals").empty();
    for (let i = 0; i < staticImgs.length; i++) {
        $("#animals").append(`<img class="gif" src=${staticImgs[i]} data-state = still>`);
        $("#animals").append(`<p>Rating: ${ratings[i]}</p>`);
    }
}





