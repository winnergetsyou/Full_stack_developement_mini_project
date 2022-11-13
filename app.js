'use strict';
var debug = require('debug');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);




// HOME PAGE
app.get('/home', (req, res) => {
    // That's all you need to do! If you pass a string to `res.send()`,
    // Express sets the response-type header to `text/html`
    res.sendFile('Page1.html', { root: __dirname });
});

// Get request handling 
app.get('/store', (req, res) => {
    // That's all you need to do! If you pass a string to `res.send()`,
    // Express sets the response-type header to `text/html`
    res.send('sucessfully_sent');

});
// Post Request Handling
app.post('/store', (req, res) => {
    const { fname, lname } = req.body;
    const json = req.body;
    //const json = '{ "fruit": "pineapple", "fingers": 10 }';
    const obj = JSON.stringify(json);
    const obj_string = JSON.parse(obj);
    const obj_string1 = JSON.parse(obj);
    //console.log(obj.fruit, obj.fingers);
    res.send(obj_string1.Name);
    //res.send(go);
    //res.send('Sucessfully_uploaded', fname, lname);

    // SQL
    var mysql = require('mysql');

    var con = mysql.createConnection({
        host: "127.0.0.1",
        user: "root",
        password: "Potato52*",
        database: "mydb"
    });

    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        //var sql = "INSERT INTO names (Name,Petname) VALUES('ajith','thala')";
        var sql = "INSERT INTO names (Name, Petname) VALUES ?";
        var values =
            [[obj_string.Name, obj_string.Petname]];

        con.query(sql, [values], function (err, result) {
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows);
        });
    });

    /*con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    
    
        var sql = "INSERT INTO names (Name,Petname) VALUES('ajith','thala')";
    
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Database appended");
        });
    });*/



        // Read post data submitted via form.
    //CommonManager.getPostData(req, res, function (data) {
    //res.render('index', { txtName: data.Name });
    });
   
 

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});
