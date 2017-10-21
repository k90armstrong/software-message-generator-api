var express = require('express');
var router = express.Router();
var db = require('../Utilities/db');
var Stopwatch = require('../Utilities/stopwatch');
var stopWatch = new Stopwatch();
var mongo = require('mongodb')
var User = require('../models/user')
var MessageRequest = require('../models/messageRequest')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('Welcome to the message api');
});

// kyles key i1ug3bhDXnGXvXEi38Uh5MU2iYOgf6LHjfCBOyzB
router.get('/api/random', function (req, res, next) {
  // with this route, we will be getting a random message based on a theme and a type
  // the theme and type are passed as query parameters see the example below
  // http://localhost:2525/api/random?type=loading&apiKey=i1ug3bhDXnGXvXEi38Uh5MU2iYOgf6LHjfCBOyzB&theme=funny
  var user = new User(null, req.query.apiKey)
  user.retrieve(function (err, result) {
    console.log(result);
    // check if the request has a valid apikey
    if (result) {
      // check if user has met their quota
      user.getUserCallsToday(function (calls, callsErr) {
        if (calls < 100) { // TODO set this limit to some variable not hardcoded
          let theme = req.query.theme;
          let type = req.query.type;
          var messageRequest = new MessageRequest(theme, type);
          // if they do have a valid key then find a random message
          messageRequest.getRandom(function (err, result) {
            messageRequest.querySuccess(user); // run this to add to the calls db to track apikey usage
            res.status(200).send(result);
          });
        } else {
          res.status(200).send({
            message: 'You have reached your limit today with this API key.'
          });
        }
      });
    } else {
      // send an error message
      res.status(403).send({
        message: 'Not a valid API key'
      });
    }
  });
});

router.get('/api/newKey', function (req, res, next) {
  // TODO figure out how to not allow anyone to use this API
  // with this route, we will be getting a random loading message based on a theme
  // url should be like the following /api/newKey?email=someemail@email.com
  var user = new User(req.query.email, null);
  user.add(function (err, result) {
    console.log(result);
    // check if the request has a valid apikey
    // if the request is not valid send a 403 and a message that they don't have permissions
    // if they do have a valid key then find a random message
    // change this to actually pull a random one...

    if (result) {
      res.status(200).send(result);
    } else {
      // send an error message
      res.status(403).send({
        message: 'Failed to create new API key'
      });
    }
  });
});

module.exports = router;