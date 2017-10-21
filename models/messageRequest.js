// make a model to do all of the database stuff for handling requests
// make model to handle database stuff for managing users api keys
var db = require('../Utilities/db');

// the user object
var MessageRequest = function (theme, type) {
    var messageRequest = {
        theme: theme,
        type: type,
        add: function (cb) {
            let query = {};
            db.get().collection('messages');
        },
        getRandom: function (cb) {
            let query = [{
                    $sample: {
                        size: 1
                    }
                },
                {
                    $match: {
                        "type": this.type
                    }
                },
                {
                    $match: {
                        "theme": this.theme
                    }
                }
            ];
            db.get().collection('messages').aggregate(query, function (err, result) {
                if (err) throw err;
                return cb(err, result);
            });
        },
        querySuccess: function (user, cb) {
            // run this when a query was successful and store it in the calls collection
            // collection will be { _id: mongoid, apikey: userapi key, timestamp: time it was ran}
            var doc = {
                apiKey: user.apiKey,
                timestamp: Date.now()
            }
            db.get().collection('calls').insertOne(doc, function (err, res) {
                if (err) throw err;
                console.log("1 document inserted");
            });
        }
    }
    return messageRequest
}

module.exports = MessageRequest;