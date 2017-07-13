const socket = io.connect('http://localhost:9999/');

socket.on('loginStatus', (data) => {
  if (!data.status) alert(`user doens't exists`);
  else alert(`logged in`);
  console.log(data);
});

const login = (e) => {
  e.preventDefault();
  const data = {
    username: $('#username').val(),
    password: $('#password').val()
  };
  if(data.username === '' || data.password === '') alert('both fields are required');
  else socket.emit('login', data);

};

$(() => {
  $('#sendMessage').on('submit', login);
});
