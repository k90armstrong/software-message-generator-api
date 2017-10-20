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
            let newKey = apikey();  // generates 40 char base64 encoded key
            db.get().collection('api_keys').insertOne({
                "key": newKey, "email": this.email
            }, function (err, results) {
                return cb(err, {apiKey: results.ops[0].key});
            });

        },
        retrieve: function(cb) {
            db.get().collection('api_keys').findOne({
                "key": this.apiKey
              }, function (err, result) {
                  return cb(err, result)
              });
        }
    }
    return user
}

module.exports = User;