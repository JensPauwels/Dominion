const socket = io.connect('http://nodeprojects.me:80/');

const displayLoginScreen = function () {

};

const displayUserList = function (userList) {
  let newUsers = '';
  userList.forEach(user => newUsers += `<p>${user}</p>`);
  $('html #userList').html(newUsers);
};

const loadLobbyPage = function (userList) {
  $.get('./lobbyScreen.html',(htmlData) => {
    $('main').html(htmlData);
    displayUserList(userList);
  });
};

socket.on('updateUserList', (data) => {
  if(data !== undefined){
    displayUserList(data);
  };
});

socket.on('loginStatus', (data) => {
  console.log(data);
  if (data.status) {
    if (data.userList !== undefined) loadLobbyPage(data.userList);
  ;}
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

const logout = function (e) {
  e.preventDefault();
  socket.emit('logout');
  loadLogin();
};

const loadLogin = function () {
  console.log('hmmm');
  $.get('./login.html',(htmlData) => {
    console.log('is this happening');
    $('main').html(htmlData);
  });
};

$(() => {
  console.log('wtf is happening');
  loadLogin();
  $('body').on('click','#loginBtn', login);
  $('body').on('click','#logout',logout);
});
