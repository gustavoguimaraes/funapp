tool.maxDistance = 50;

function randomColor(){
  return {
    red: Math.random(),
    green: Math.random(),
    blue: Math.random(),
    alpha: 0.5
  };
}

// every time the user drags their mouse
// this function will be executed
function onMouseDrag(event) {
    // Take the click/touch position as the centre of our circle
    var x = event.middlePoint.x;
    var y = event.middlePoint.y;
    // The faster the movement, the bigger the circle
    var radius = event.delta.length + 2;
    // Generate our random color
    var color = randomColor();
    // Draw the circle 
    drawCircle( x, y, radius, color );
    // Pass the data for this circle
    // to a special function for later
    emitCircle( x, y, radius, color );
} 
 
function drawCircle( x, y, radius, color ) {
    // Render the circle with Paper.js
    var circle = new Path.Circle( new Point( x, y ), radius );
    circle.fillColor = new RgbColor( color.red, color.green, color.blue, color.alpha );
    // Refresh the view, so we always get an update, even if the tab is not in focus
    view.draw();
} 

//this function sends data for a circle to the server
//server broadcasts it to every user 
function emitCircle( x, y, radius, color ) {
    var sessionId = io.socket.sessionid;
    //An object to describe the circle's draw data
    var data = {
      x: x,
      y: y,
      radius: radius,
      color: color
    };
  //send a 'drawCircle' event with data and session to the server
  io.emit('drawCircle', data, sessionId)

  console.log(data)

}

//listen for 'drawCircle events'
  io.on('drawCircle', function(data){
    console.log( data);

    //draw the circle using the data sent  from another user
    drawCircle( data.x, data.y, data.radius, data.color);
  })

