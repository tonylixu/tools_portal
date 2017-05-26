// Top-Level Router
// Mounts all the individual routes on a single router that the app can then use

var router = require('express').Router();

// Note: Each 'sub-router' should go below and use the following convention:
// router.use(<PATH>, require(<MODULE>));
// Where PATH = sub-path of main router
// Where MODULE = the module containing the exported sub-router

// Mount the 'news' router onto the API Router
// URL will look like this: '.../api/news/...'
router.use('/news', require('./news'));

// !IMPORTANT! We need to export the router so our app can use the router
module.exports = router;