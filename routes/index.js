var express = require('express');
var router = express.Router();
var db = require('../Utilities/db');
var Stopwatch = require('../Utilities/stopwatch');
var stopWatch = new Stopwatch();
var mongo = require('mongodb')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});


router.get('/api/:type/random/theme/:theme/apikey/:apiKey', function (req, res, next) {
  // with this route, we will be getting a random loading message based on a theme
  let query = [
    {$sample: { size: 1 }},
    {$match:{"type":req.params.type}},
    {$match:{"theme":req.params.theme}}
  ];
  db.get().collection('api_keys').findOne({
    "key": req.params.apiKey
  }, function (err, result) {
    console.log(result);
    // check if the request has a valid apikey
    // if the request is not valid send a 403 and a message that they don't have permissions
    // if they do have a valid key then find a random message
    // change this to actually pull a random one...
    if (result) {
      db.get().collection('messages').aggregate(query, function (err, result) {
        if (err) throw err;
        console.log(result);
        // if there is no result, there should be a default message...
        res.status(200).send(result);
      });
    } else {
      // send an error message
      res.status(403).send('Not a valid API key');
    }
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