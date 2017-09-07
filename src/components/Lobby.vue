<template>
  <div class="lobby">
  <h1>{{ title }}</h1>
  <h2>current user: {{currentUser}}</h2>
  <div class="userInfo"  v-for="user in userList" v-on:click="updateSelected(user)">
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
        console.log(userList);
        if (userList !== undefined) this.userList = userList;
      },
      invite(obj){
        declineInvite(this, obj);
        //acceptInvite(this, obj);
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
      updateSelected(obj) {
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
