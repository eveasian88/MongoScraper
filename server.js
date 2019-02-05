// TOOLS
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const exphbs = require("express-handlebars"); // Handlebars module

// ROUTES
const htmlRoutes = require("./routes/htmlRoutes");
const apiRoutes = require("./routes/apiRoutes");
const PORT = process.env.PORT || 3000;


// Import Router Objects

// DATABASE TOOLS
const mongoose = require("mongoose");

// const DATABASE_URL = process.env.MONGODB_URI || "mongodb://localhost/populate";

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/populate";
console.log(MONGODB_URI);
// Configure mongoose with MongoDB
// mongoose.connect( DATABASE_URL, { useNewUrlParser: true, useCreateIndex: true } );

mongoose.connect(MONGODB_URI)
const conn = mongoose.connection

conn.on("error", error => console.log( "Mongoose Error" ))
conn.once("open", error => console.log( "Mongoose Connection Successful" ))

// Initialize App
const app = express();

// Configure Middleware for Web Server
app.use( logger( "dev" ) );   // enable and configure logger
app.use( bodyParser.urlencoded({ extended: true })); // configure bodyparser for url encoded data
app.use( bodyParser.json() ); // configure body parser for json formatted data

// configure public folder
app.use( express.static("public") );

// configure handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// Use HTML routes first
app.use('/', htmlRoutes );
// Use API routes next
app.use( '/api', apiRoutes );

app.listen( PORT, () => console.log( "App is listening on " + PORT + "!" ));





// server -> router -> controller -> api function || handlebars file


//mongodb://heroku_72blqkgt:h7m20em0uue3vg2o2datj0i3vh@ds221435.mlab.com:21435/heroku_72blqkgt