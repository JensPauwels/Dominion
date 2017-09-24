<template>
  <section class='login'>

    <form v-on:submit="login" action="#" autocomplete="off">
      <h1> Dominion</h1>
      <input type="email" v-model="loginDetails.name" name="name" placeholder="Email">
      <input type="password" v-model="loginDetails.password" name="secondName" placeholder="password">
      <input type="submit" value="Login">
      <a href="#/register" class="specialBtn">Register</a>
    </form>
  </section>
</template>

<script>
/* eslint-disable */

  export default {
    name: 'Login',
    data() {
      return {
        loginDetails: {},
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
<style media="screen">
  background-image: url('/src/images/castle.jpg');
</style>
