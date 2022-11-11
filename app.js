'use strict';

// Connect to SQL Server
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root", // your user id 
    password: "*******", // your password!
    database: "mydb" // your database, if you have one Or create new one !
});

// the following will query the Sql 
// need to be corrected 

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO pet_names (name, pet_name) VALUES ?";
    var values = ['CompanyjInc', 'Highwayf'];
    con.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("Database created");
    });
});


// EXPRESS JS API to responsd to the request !
