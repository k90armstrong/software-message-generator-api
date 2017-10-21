// make model to handle database stuff for managing users api keys
var db = require('../Utilities/db');
var apikey = require('apikeygen').apikey;

// the user object
var User = function (email, apiKey) {
    var user = {
        email: email,
        apiKey: apiKey,
        add: function (cb) {
            // function to add to database
            let newKey = apikey(); // generates 40 char base64 encoded key
            db.get().collection('api_keys').insertOne({
                "key": newKey,
                "email": this.email
            }, function (err, results) {
                return cb(err, {
                    apiKey: results.ops[0].key
                });
            });

        },
        retrieve: function (cb) {
            db.get().collection('api_keys').findOne({
                "key": this.apiKey
            }, function (err, result) {
                return cb(err, result)
            });
        },
        getUserCallsToday: function (cb) {
            // this method is used to check how many api calls an api has
            // it will run the cb with callsToday as a number and err as the arguments
            let start = new Date();
            start.setHours(0, 0, 0, 0);
            let startMs = start.getTime();
            let end = new Date();
            end.setHours(23, 59, 59, 999);
            let endMs = end.getTime();
            // build query to get the count of docs with the users api and for today
            let query = {
                $and: [{
                    apiKey: this.apiKey
                }, {
                    timestamp: {
                        $lte: endMs
                    }
                }, {
                    timestamp: {
                        $gte: startMs
                    }
                }]
            }
            db.get().collection('calls').find(query).count(function (err, result) {
                var callsToday;
                if (!err) {
                    callsToday = result;
                }
                return cb(callsToday, err)
            });
        }
    }
    return user
}

module.exports = User;