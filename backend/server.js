const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const users = [];

server.listen(process.env.PORT || 9999);
console.log('Server running...');
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

io.sockets.on('connection', (socket) => {
  console.log(socket);
  console.log(`${socket} is connected`);

  socket.on('sendMessage', (obj) => {
    console.log(obj);
    socket.broadcast.emit('newMessage', obj);
  });
});
