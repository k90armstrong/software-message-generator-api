// make model to handle database stuff for managing users api keys
var db = require('../Utilities/db');

// the user object
var User = function (email, apiKey) {
    var user = {
        email: email,
        apiKey: apiKey,
        add: function () {
            // function to add to database
        }
    }
}