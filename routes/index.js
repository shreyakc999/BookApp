var express = require('express');
var books = require('../resources/books');
var router = express.Router();
let Books = require('../models/books');

/* GET home page. Using callback */

// router.get('/', function(req, res, next) {
//   Books.find({}, function(err, books) {
//     if (!err) {
//       res.render('index', { title: 'Book App', bookList: books });
//     } else {
//       console.log('error', err);
//     }
//   })
// });

/* GET home page. Using async await */
router.get('/', async function(req, res, next) {
  let books = await Books.find() 
  res.render('index', { title: 'Book App', bookList: books });
});

module.exports = router;