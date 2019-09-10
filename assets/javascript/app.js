topics = ["dog", "cat", "parrot"];

for (var i = 0; i < topics.length; i++) {
    $("#buttons").append($('<button/>').text(topics[i]).addClass("button"));
}

$(".button").on('click', function () {
    var q = $(this).text();
    console.log(q)
    var queryURL = `https://api.giphy.com/v1/gifs/search?q=${q}&limit=10&api_key=7diNMvkB3SH15EgXNqytuN3Tyg5lGTDp`;
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response)
        appendResult(response);
    });
});

const appendResult = function(r) {
    for (let i = 0; i < r.data.length; i++) {
        $("#animals").append(`<img src=${r.data[i].images["480w_still"].url} >`)
    }
}





