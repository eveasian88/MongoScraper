$.getJSON("/api/articles", function (data) {
    // For each one
    console.log(data)
    for (var i = 0; i < data.length; i++) {
        $("#articles").append("<div class='col-lg-4 col-md-6 mb-4'><div class='card' data-id=" + data[i]._id + "><img class='card-img-top' src='" + data[i].image + "' alt=''><div class='card-body'><a href='" + data[i].link + "'><h4 class='card-title'>" + data[i].title + "</h4></a><p class='card-text'></p></div><div class='card-footer'><a data-id=" + data[i]._id + " class='save-btn btn btn-secondary'>Save Article</a></div></div></div>");
    }
});

$.getJSON("/api/saved", function (data) {
    // For each one
    console.log(data)
    for (var i = 0; i < data.length; i++) {
        $("#saved-articles").append("<div class='col-lg-4 col-md-6 mb-4'><div class='card' data-id=" + data[i]._id + "><img class='card-img-top' src='" + data[i].image + "' alt=''><div class='card-body'><a href='" + data[i].link + "'><h4 class='card-title'>" + data[i].title + "</h4></a><p class='card-text'></p></div><div class='card-footer'><a data-id=" + data[i]._id + " class='text-white del-save-btn btn btn-secondary'>Delete From Saved</a></div></div></div>");
    }
});

