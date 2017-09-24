<template>
  <div class="lobby">
  <h1>{{ title }}</h1>
  <span>current user: {{currentUser}}</span>

  <h2>Active users</h2>
  <div class="userInfo"  v-for="user in userList" v-on:click="inviteGame(user)">
    <p>{{user}}</p>
  </div>
  <button v-on:click="logout">logout</button>
  </div>
</template>

<script>
/* eslint-disable */

  const acceptInvite = function (instance, obj) {
    instance.$socket.emit('acceptingInvite', obj);
  };

  const declineInvite = function (instance, obj) {
    obj.msg = "decline";
    instance.$socket.emit('declineInvite', obj);
  };

  export default {
    name: 'Lobby',
    data() {
      return {
        title: 'Lobby',
        currentUser: '',
        userList: []
      };
    },
    sockets: {
      init(currentUser){
        this.currentUser = currentUser;
      },
      validated(bool){
        if (!bool) window.location.href = "#/login";
      },
      updateUserList(userList) {
        console.log(userList, "userlist");
        if (userList !== undefined) this.userList = userList;
      },
      invite(obj){
        console.log(obj);
        if (window.confirm(`${obj.sender} wants to play a game`)) acceptInvite(this, obj);
        else declineInvite(this, obj);
      },
      redirectToGameField (gameId) {
        this.$session.set('gameId', gameId);
        window.location.href = '#/gameField';
      },
    },
    methods: {
      logout() {
        this.$socket.emit('logout', this.$session.get('token'));
        window.location.href = '#/login';
      },
      inviteGame(obj) {
        this.$socket.emit('invite', obj);
      },
    },
    created() {
      const token = this.$session.get('token');
      if (token !== undefined ) {
        this.$socket.emit('validate', token);
        if (this.currentUser === '') this.currentUser = token.email;
      }
      else window.location.href = "#/login";
    },
  };

</script>
