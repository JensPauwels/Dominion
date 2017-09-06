<template>
  <div class="login">
    <h1> {{title}}</h1>
    <form v-on:submit="login" action="#">
      <input type="email" v-model="loginDetails.name" name="name" placeholder="Email">
      <input type="password" v-model="loginDetails.password" name="secondName" placeholder="password">
      <input type="submit" value="Login">
      <a href="#/register">Register</a>
    </form>
  </div>
</template>

<script>
/* eslint-disable */

  export default {
    name: 'Login',
    data() {
      return {
        loginDetails: {},
        title: 'Login Screen',
      };
    },
    sockets: {
      loginAccepted: function (data) {
        console.log(data);
        console.log('login accepted');
      },
      loginDeclined: function (data) {
        console.log(data);
        console.log('login declined');
      },
    },
    methods: {
      login: function (e) {
        e.preventDefault();
        const username = this.loginDetails.name;
        const password = this.loginDetails.password;
        this.$session.set('user', {username, password});
        if (username !== undefined) this.$socket.emit('login', {username, password});
        //welse // TODO: error inputfields
      },
    },
    created: function(){
    },
  };
</script>

<style scoped>
  .login{
    text-align: center;
  }

  .login ul {
    list-style: none;
  }

</style>
