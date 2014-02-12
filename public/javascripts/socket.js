//Connecting to Node.js Server
io = io.connect('/');

//ping pong server communication testing
//1 send ping event with data to server
console.log( "socket: browser says ping (1)" )
io.emit('ping', { some: 'data' } );

// (4): When the browser receives a pong event
// console log a message and the events data
io.on('pong', function (data) {
    console.log( 'socket: browser receives pong (4)', data );
});