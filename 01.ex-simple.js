// get the client
const mysql = require('mysql2');

const connectionUrl = 'mysql://root:aabold@localhost:3306/x4mspp0ssyvlauv8'

// create the connection to database
const connection = mysql.createConnection({
  uri: connectionUrl
});

// simple query
connection.query(
  'SELECT * FROM `product`',
  function(err, results, fields) {
    console.log(results); // results contains rows returned by server
    // console.log(fields); // fields contains extra meta data about results, if available
  	connection.end()
});



