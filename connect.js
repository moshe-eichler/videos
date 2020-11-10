const mysql = require('mysql');
const pg = require('pg');

exports.create_connect = function(){
    let connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'movies',
    });
    
    connection.connect();
    
    return connection
}
