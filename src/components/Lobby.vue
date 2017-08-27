<template>
  <div class="lobby">
  <h1>{{ title }}</h1>
  <h2>current user: {{currentUser.username}} uid: {{currentUser.UID}}</h2>
  <div class="userInfo"  v-for="user in userList" v-on:click="updateSelected(user)">
    <p>{{user.username}} id: {{user.UID}}</p>
  </div>
  <button v-on:click="logout">logout</button>
  </div>
</template>

<script>
/* eslint-disable */

  const acceptInvite = function (instance, obj) {
    console.log('accepting');
    instance.$socket.emit('acceptingInvite', obj);
  };

  export default {
    name: 'Lobby',
    data() {
      return {
        title: 'Lobby',
        currentUser: {},
        userList: []
      };
    },
    sockets: {
      init(currentUser){
        console.log(currentUser);
        this.currentUser = currentUser;
      },
      updateUserList(userList) {
        console.log(userList);
        if (userList !== undefined) this.userList = userList;
      },
      invite(obj){
        // TODO: pop up met modal waarbij je on close niet accepteerd en zend dat je declined
        // TODO: on accept naar gamefield gaan met die andere speler
        console.log(obj);
        acceptInvite(this, obj);
      },
      redirectToGameField(gameId){

        this.$session.set('gameId', gameId);
        window.location.href = '#/gameField';
      },
    },
    methods: {
      logout() {
        console.log('loggout');
        this.$socket.emit('logout');
        window.location.href = '#/login';
      },
      updateSelected(obj) {
        this.$socket.emit('invite', obj.UID);
      },
    },
    created() {
      console.log('reloading');
      const id = this.$session.get('user');
      this.$socket.emit('update');
    },
  };

</script>

<style scoped>
  .lobby{
    margin: 0 auto;
    text-align: center;
  }
  .userInfo{
    margin: 0 auto;
    text-align: center;
    background: #eee;
    width: 200px;
  }
</style>
