$('#scrape-btn').on('click', function () {
    $.ajax({
        method: "GET",
        url: "/api/scrape"
    })
        .then(function (data) {
            console.log(data);
            location.reload();
        });
})

$('#articles').on("click", '.save-btn', function () {
    // var thisId = $(this).closest('div.card').attr("data-id");
    var thisId = this.dataset.id.trim();
    var thisCard = $(this).closest('div.card');
    console.log(thisId);

    $.ajax({
        method: "PUT",
        url: "/api/articles/" + thisId + "/save",
    })
        .then(function (data) {
            console.log(data);
            location.reload();
        });

});

$('#saved-articles').on("click", '.del-save-btn', function () {
    console.log('working')
    var thisId = $(this).closest('div.card').attr("data-id");

    $.ajax({
        method: "PUT",
        url: "/api/unsaved/" + thisId + "/unsave",
    })
        .then(function (data) {
            console.log(data);
            location.reload();
        });

});

$('#saved-toggle').click(function () {
    $('#saved-articles').slideToggle();
})

$('#show-toggle').click(function () {
    $('#articles').slideToggle();
})