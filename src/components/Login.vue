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
        this.$session.set('token', data);
        window.location.href = '#/lobby';
      },
      loginDeclined: function (err) {
        console.log(err);

      },
    },
    methods: {
      login: function (e) {
        e.preventDefault();
        const username = this.loginDetails.name;
        const password = this.loginDetails.password;
        if (username !== undefined) this.$socket.emit('login', {username, password});
        //else // TODO: error inputfields
      },
    },
    created: function(){

    },
  };
</script>
