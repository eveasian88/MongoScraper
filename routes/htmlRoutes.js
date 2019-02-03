var db = require("../models");
var mongoose = require("mongoose");
var mongojs = require("mongojs")

var request = require("request");
var cheerio = require("cheerio");

// module.exports = app => {
//     app.get("/", (req, res) => {
//         res.render("index", { user: req.user });
//     });

app.get("/index", (req, res) => {
    res.render("index");
});