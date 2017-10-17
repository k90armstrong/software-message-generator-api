var express = require('express');
var router = express.Router();
var db = require('../Utilities/db');
var Stopwatch = require('../Utilities/stopwatch');
var stopWatch = new Stopwatch();
var infoMath = require('../Utilities/infoMath');
var mongo = require('mongodb')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});


// Below are just examples

// router.post('/api/update/edit', function(req, res, next) {

//   db.get().collection('tasks').updateOne(query, {$set:newValues}, function (err, results) {
//     if (!err){
//       res.sendStatus(200);
//       console.log("modified node");

//     }
//   });

// });

// router.get('/api/tasks', function(req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//     db.get().collection('tasks').find({}).toArray(function (err, results){
//       if (!err) {
//         console.log("returning all nodes");
//         res.status(200).send(JSON.stringify({tasks: results}));
//       }
//       else {
//         res.sendStatus(500);
//       }
//     });

// });
module.exports = router;