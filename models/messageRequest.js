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
        getRandom: function(cb) {
            let query = [
                {$sample: { size: 1 }},
                {$match:{"type":this.type}},
                {$match:{"theme":this.theme}}
              ];
            db.get().collection('messages').aggregate(query, function (err, result) {
                if (err) throw err;
                return cb(err, result);
              });
        }
    }
    return messageRequest
}

module.exports = MessageRequest;