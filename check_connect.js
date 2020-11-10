const connect = require('./connect');

exports.connect = function(req, callback){
    let cookie = req.cookies.LoggedIn;
    if (!cookie) {
        callback(null, false);
    } else {        
        let connection = connect.create_connect();
        
        let query = "SELECT `uid` FROM `sessions` WHERE `sid` = '"+ cookie + "' AND `logged_out` = '0'";
        
        connection.query(query, (err, response) => {

            callback(err, response[0]);

        });
    }
}

