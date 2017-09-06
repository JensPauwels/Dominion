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
        currentUser: {},
        userList: []
      };
    },
    sockets: {
      init(currentUser){
        this.currentUser = currentUser;
      },
      updateUserList(userList) {
        if (userList !== undefined) this.userList = userList;
      },
      invite(obj){
        declineInvite(this, obj);
        //acceptInvite(this, obj);
      },
      redirectToGameField(gameId){
        this.$session.set('gameId', gameId);
        window.location.href = '#/gameField';
      },
    },
    methods: {
      logout() {
        this.$socket.emit('logout');
        window.location.href = '#/login';
      },
      updateSelected(obj) {
        this.$socket.emit('invite', obj.UID);
      },
    },
    created() {
      const user = this.$session.get('user');
      /*setTimeout(function () {
        if (Object.keys(this.currentUser).length === 0 ) this.$socket.emit('init', user);
      }, 50);*/
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
