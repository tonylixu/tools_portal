var ip = require('ip');
var NewsItem = require('../models/NewsItem');
var logger = require('../utils/logger');
var validation = require('../validation');

/* Create (GUARDED) */

/**
 * Function for creating a new news item in the DB
 * @param req The request object sent over from the route.
 * @param req The response object sent over from the route.
 */
exports.createNewsItem = function (req, res) {
  // Get the title and contents from the request body
  var title = req.body.tite;
  var contents = req.body.contents;

  // Check that valid params were supplied
  var valid = validation.validateNewsItem(res, {title: title, contents: contents});

  // If so, continue
  if (valid) {
    // Make a new NewsItem object with the given info
    var newNews = new NewsItem({
      title: title,
      contents: contents
    });

    // Save the new news item in the DB
    newNews.save(function (err) {
      // If there was an error while saving
      if (err) {
        logger.info("[" + ip.address() + "] New news item creation failed.");
        res.status(422).send({created: false, errors: err});
      }

      // Otherwise, new item was added successfully
      else {
        logger.info("[" + ip.address() + "] New news item creation succeeded.");
        res.status(201).send({created: true});
      }
    })
  }
};

/* Read (UNGUARDED) */

/**
 * Function for getting all news items from the DB.
 * @param req The request object sent over from the route.
 * @param res The response object sent over from the route.
 */
exports.getAll = function (req, res) {
  // Find all news item, but 
}