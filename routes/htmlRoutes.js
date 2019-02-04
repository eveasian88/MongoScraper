const express = require("express"); // Import whole express library
const router = express.Router();  // Create instance of a Router object

const db = require("../models");
const Article = db.Article;

// Index Route
router.get('/', ( req, res ) => {
  Article.find({})
    .then( articles => {
      return res.render('index', { articles: articles }); // Render index.handlebars
    })
})

// export router to the rest of the project.
module.exports = router;
