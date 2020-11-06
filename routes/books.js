const { Router } = require('express');
var express = require('express');
var router = express.Router();
var books = require('../resources/books');
var Books = require('../models/books');

router.get('/add', function(req, res, next){
    res.render('addBooks', {
        title: 'Add book',
    });
})

router.post('/save', function(req, res){
    // books.push({...req.body, _id: `00${books.length + 1}`});
    const book = new Books(req.body);
    let promise = book.save();
    promise.then(()=>{
        console.log("Book added");
        res.redirect('/');
    })
})

router.get('/remove/:_id', function(req,res){
    console.log(req.params._id);
    Books.remove({ _id: req.params._id }, function() {
        res.redirect('/');
    })
})

router.get('/edit/:_id', function(req,res){
    // console.log(req.params._id);
    // const book = books.find((book)=>book._id === req.params._id);
    // res.render('editBooks',{
    //     title:"Edit Book",
    //     book
    // })
    Books.findOne({_id: req.params._id}, function(err, book){
        res.render('editBooks',{title:'Edit Books', book: book});
    })
})

router.post('/saveEdited/:_id', function(req,res){
    // let currIndex = books.findIndex(book => book._id === req.params._id);
    // books.splice(currIndex, 1, {...req.body, _id: req.params._id});
    // res.redirect('/');
    let promise = Books.findOneAndUpdate({_id: req.params._id}, {$set:{...req.body}})
    promise.then(()=>{
        console.log("Book Edited");
        res.redirect('/');
    })
    console.log(req.params._id);
})

module.exports = router;
