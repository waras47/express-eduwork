const mysql = require('mysql');

const connection = mysql.createConnection({
    host : 'localhost',
    user :  'root',
    password: 'wahyu',
    database : 'eduwork-crud'
});


module.exports = connection;