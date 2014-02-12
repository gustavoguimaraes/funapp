
/**
 * Module dependencies.
 */

// 1. Express requires these dependencies
var express = require('express');
var routes = require('./routes');
var logfmt= require("logfmt");
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// 2.  Configure application
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// 3. Configure error handling
app.configure('development', function(){
  app.use(express.errorHandler());
});

//4. Setup Routes
app.get('/', routes.index);
app.get('/users', user.list);

// 5. Enable Socket.io
var server = http.createServer(app).listen( app.get('port') );
var io = require('socket.io').listen(server, function() {
  console.log("Express server listening on port " + app.get('port'));
});

// A user connects to the server (opens a socket)
io.sockets.on('connection', function (socket) {

    // (2): The server recieves a ping event
    // from the browser on this socket
    socket.on('ping', function ( data ) {
  
    console.log('socket: server receives ping (2)');

    // (3): Return a pong event to the browser
    // echoing back the data from the ping event 
    io.sockets.emit( 'pong', data );   

    console.log('socket: server sends pong to all (3)');

    // socket.on( 'drawCircle', function(data, session) {
    //   //testing if server received browser's data
    //   // console.log ("session " + session + " drew:");
    //   // console.log(data);
    //   //actual sending of the circle starts here
    //   socket.broadcast.emit( 'drawCircle', data );
    // })

    socket.on( 'drawCircle', function( data, session ) {
    socket.broadcast.emit( 'drawCircle', data );
})

    });
});
