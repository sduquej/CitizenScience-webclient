/**
 * Created by sduquej on 09/02/2015.
 */
// dependencies
var restify = require('restify');
var mongojs = require('mongojs');
var morgan = require('morgan');

// database config
var db = mongojs('simpleFormApp', ['appUsers']);

// REST server
var server = restify.createServer();
// request parsing
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
// logger
server.use(morgan('dev'));

// Cross Origin Request Sharing - CORS
server.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

server.listen(process.env.PORT || 9804, function() {
    console.log("Server started @ ",process.env.PORT || 9804);
});

var manageUsers = require('./manageUser')(server, db);