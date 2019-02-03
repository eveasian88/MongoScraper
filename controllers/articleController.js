var db = require("../models");
// var mongoose = require("mongoose");
// var mongojs = require("mongojs")

// var request = require("request");
var cheerio = require("cheerio");
var axios = require("axios");

module.exports = {
    getArticles: function (req, res) {
        db.Article.find({})
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
            .catch(function (err) {
                res.json(err);
            });
    },
    getArticle: function (req, res) {
        db.Article.findOne({ _id: req.params.id })
            .populate("note")
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
            .catch(function (err) {
                res.json(err);
            });
    },
    createArticle: function (req, res) {
        db.Note.create(req.body)
            .then(function (dbNote) {
                return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
            })
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
            .catch(function (err) {
                res.json(err);
            });
    },
    scrapeArticles: function (req, res) {
        axios.get("https://www.thoughtco.com/languages-4133094").then(function (response) {
            
        var $ = cheerio.load(response.data);

        $(".g-item").children('a').each(function(i, element) {
            result.title = $(this)
            .find(".block-title")
            .text();

            result.link = $(this)
            .attr("href");

            result.image = $(this)
            .find("img")
            .attr('data-src');

            db.Article.create(result)
            .then(function(dbArticle) {
                console.log(dbArticle);
                res.send();
            })
            .catch(function(err) {
                return res.jon(err);
            })
        })
    }