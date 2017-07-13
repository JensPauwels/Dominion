const socket = io.connect('http://localhost:9999/');

const addMesasge = (data) => {
  console.log(data);
  $('#messasges').append(`${data.username}: ${data.message}<br>`);
};

socket.on('newMessage', (data) => {
  addMesasge(data);
});

const addMessage = (e) => {
  e.preventDefault();
  const data = {
    username: $('#username').val(),
    message: $('#message').val(),
  };


  socket.emit('sendMessage', data);
  addMesasge(data);
};

$(() => {
  $('#sendMessage').on('submit', addMessage);
});
