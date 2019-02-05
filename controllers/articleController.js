var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");

var PAGE_URL = "https://www.thoughtco.com/languages-4133094";

const articleController = {
    scrape: function (req, res) {
        console.log('Beginning Scrape...');
        axios.get(PAGE_URL)
            .then(response => {
                console.log('scraping complete');
                let $ = cheerio.load(response.data);

                $(".g-item").children('a').each(function (i, element) {
                    var result = {};

                    result.title = $(this)
                        .find(".block-title")
                        .text();

                    result.link = $(this)
                        .attr("href");

                    result.image = $(this)
                        .find("img")
                        .attr('data-src');


                    db.Article.create(result)
                        .then(function (dbArticle) {
                            console.log(dbArticle);
                            console.log('Saved Article.');
                            // res.send();
                        })
                        .catch(function (err) {
                            console.log('Error :: ', err);
                            // return res.json(err);
                        });
                });
                res.json({ success: true });
            })
            .catch(error => {
                console.log('Scraping Error :: ', error);
                res.json({ success: false })
            })
    },

    getAll: function (req, res) {
        db.Article.find({})
            .then(function (dbArticle) {
                res.json(dbArticle);
            }).catch(function (err) {
                res.json(err);
            })
    },
    getById: function (req, res) {
        const articleId = req.params.id;

        db.Article.find({ _id: articleId })
            .populate('articles')
            .then(function (dbArticle) {
                res.json(dbArticle);
            }).catch(function (err) {
                res.json(err);
            })
    },
    create: function (req, res) {
        db.Article.create(req.body)
            .then(function (dbArticle) {
                res.json(dbArticle)
            })
            .catch(function (err) {
                res.json(err);
            })
    },
    save: function (req, res) {
      const articleId = req.params.id
        db.Article.update(
          { _id: articleId },
          {
            $set: {
              saved: true
            }
          }
        )
        .then(function(dbArticle){
          res.json(dbArticle)
        })
        .catch(function(err){
          res.json(err);
        })
    },
    delete: function (req, res) {
        const articleId = req.params.id
        db.Article.delete(
            { _id: articleId },
            {
                $set: {
                    saved: true
                }
            }
        )
        .then(function(dbArticle){
            res.json(dbArticle)
        })
        .catch(function(err){
            res.json(err);
        })
    },
};

module.exports = articleController;




// app.post("/api/articles/:id", function(req, res) {

//   db.Article.create(req.body)
//     .then(function(dbArticle){
//       return db.Article.findOneAndUpdate({},{
//         $push: {
//           articles: req.params.id
//         }},
//         {
//           new: true
//         });
//     }).then(function(dbArticle){
//       res.json(dbArticle)
//     }).catch(function(err){
//       res.json(err);
//     })
// });
// };