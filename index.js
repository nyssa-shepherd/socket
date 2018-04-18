var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  io.emit('connect message', 'Another user has connected.');

  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });

  io.on('connection', function(socket){
    socket.on('chat message', function(msg){
      io.emit('chat message', msg);
    });

    socket.on('typing', user => {
      io.emit('typing', user);
    });
  
    socket.on('done typing', user => {
      io.emit('done typing', user);
    });

    socket.on('disconnect', () => {
      io.emit('disconnect message', 'The user disconnected');
    });
  });



});

http.listen(3000, function(){
  console.log('listening on *:3000');
});