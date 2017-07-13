const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const connection = require('./mysql');
const users = [];


server.listen(process.env.PORT || 9999);
console.log('Server running...');

io.sockets.on('connection', (socket) => {

  socket.on('login', (obj) => {
    connection.getUser(obj.username,obj.password,(loggedIn) => {
      let objToReturn = {};
      if (!loggedIn) objToReturn = {status: loggedIn};
      else {
        users.push({username: obj.username,socket});
        objToReturn = {
          username: obj.username,
          status: 'online'
        };
      }
      socket.emit('loginStatus', objToReturn);
    });
  });


  socket.on('disconnect', () => {
    let indexToRemove = '';
    users.forEach((user, index) => {
      if (user.socket === socket) indexToRemove = index;
    });
    users.splice(indexToRemove,1);
  });
});
