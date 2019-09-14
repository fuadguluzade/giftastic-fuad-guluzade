var topics = ["dog", "cat", "parrot", "hamster"];
var titles = [];
var animatedGIF = [];
var staticImgs = [];
var ratings = [];
var importTime = [];
var queryWord;
var limit = 10;
var offset = 0;
var animalsShow = true;
var favoritesShow = false;
$(".favorites").hide();

$(document).ready(function () {
    //Adds default .gif request buttons to page
    for (var i = 0; i < topics.length; i++) {
        $("#buttons").append($('<button/>').text(topics[i]).addClass("button btn btn-success mr-3 mt-3"));
    }
    $("#additional-button").hide();
});


//Event listener for .gif buttons
$("#buttons").on('click', '.button', function () {
    if (!animalsShow) {
        $(".animals").show();
        animalsShow = true;
        $(".favorites").hide();
        favoritesShow = false;
    }
    resetVars();
    queryWord = $(this).text();
    var queryURL = `https://api.giphy.com/v1/gifs/search?q=${queryWord}&limit=${limit}&offset=${offset}&api_key=7diNMvkB3SH15EgXNqytuN3Tyg5lGTDp`;
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response);
        for (var i = 0; i < response.data.length; i++) {
            titles[i] = response.data[i].title;
            animatedGIF[i] = response.data[i].images.fixed_height.url;
            ratings[i] = response.data[i].rating;
            staticImgs[i] = response.data[i].images["480w_still"].url;
            importTime[i] = response.data[i].import_datetime;
        }
        appendResult();
        $("#additional-button").show();
    });
});

// "Get 10 more" button handler
$("#additional-button").on('click', function () {
    event.preventDefault();

    limit += 10;
    offset += 10;
    var queryURL = `https://api.giphy.com/v1/gifs/search?q=${queryWord}&limit=${limit}&offset=${offset}&api_key=7diNMvkB3SH15EgXNqytuN3Tyg5lGTDp`;
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response);
        for (var i = offset; i < limit; i++) {
            titles[i] = response.data[i].title;
            animatedGIF[i] = response.data[i].images.fixed_height.url;
            ratings[i] = response.data[i].rating;
            staticImgs[i] = response.data[i].images["480w_still"].url;
            importTime[i] = response.data[i].import_datetime;
            trendingTime[i] = response.data[i].trending_datetime;
            $(".cc-animals").append(getCardItem(i));
        }
    });
});

// Turn on/off .gifs
$(".animals").on('click', ".gif", function () {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr('src', animatedGIF[$(this).attr("data-index")]);
        $(this).attr("data-state", "animated");
    } else {
        $(this).attr('src', staticImgs[$(this).attr("data-index")]);
        $(this).attr("data-state", "still");
    }
});


// Adds custom .gif buttons to button list
$("#animal-button").on('click', function () {
    event.preventDefault();
    if ($("#animal-input").val()) {
        $("#buttons").append($('<button/>').text($("#animal-input").val()).addClass("button btn btn-success mr-3 mt-3"));
    }
    $("#animal-input").val("");
});

// Appends .gifs to its <div>
const appendResult = function () {
    $(".cc-animals").empty();
    for (let i = 0; i < staticImgs.length; i++) {
        $(".cc-animals").append(getCardItem(i));
    }
}

const getCardItem = function (index) {
    var $cardItem = $(`<div class="card" style="width: 15rem;"></div>`);
    $cardItem.append(`<img class="card-img-top gif mb-3" src=${staticImgs[index]} data-state = still data-index = ${index}>`);

    var $cardBody = $(`<div class="card-body"></div>`);
    $cardBody.append(`<h5 class="card-title">Title: ${titles[index]}</h5>`);
    $cardBody.append(`<p class="card-text">Click on image to play gif</p>`);
    $cardItem.append($cardBody);

    var $list = $(`<ul class="list-group list-group-flush"></ul>`);
    $list.append(`<li class="list-group-item">Rating: ${ratings[index]}</span></li>`);
    $list.append(`<li class="list-group-item">Import date-time: ${importTime[index]}</span></li>`);
    $cardItem.append($list);

    return $cardItem;
};


//reset variables
const resetVars = function () {
    titles = [];
    animatedGIF = [];
    staticImgs = [];
    ratings = [];
    importTime = [];
    trendingTime = [];
    limit = 10;
    offset = 0;
}




