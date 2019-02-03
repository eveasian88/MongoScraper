var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");


var PORT = process.env.PORT || 3000;

// require models
var db = require("./models");

// initialize express
var app = express();

// configure middleware
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// connect to mongoDB
mongoose.connect("mongodb://localhost/populate", {
    useNewUrlParser: true });

var conn = mongoose.connection;

conn.on('error', function(err) {
    console.log("Moongoose Error");
})
conn.once('open', function(err) {
    console.log("Mongoose Connection Successful");
})

// routes
// require("./routes/apiRoutes")(app);

const routes = require("./routes/apiRoutes");

app.use(routes);


// start the server
app.listen(PORT, function() {
    console.log("App is listening on port " + PORT + "!");
});

// module.exports = app; 