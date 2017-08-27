<template>
  <div class="login">
    <h1> {{title}}</h1>
    <form v-on:submit="login" action="#">
      <input type="text" v-model="loginDetails.name" name="name" placeholder="Name">
      <input type="password" v-model="loginDetails.password" name="secondName" placeholder="password">
      <input type="submit" value="Login">
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
        title: 'Login',
      };
    },
    methods: {
      login: function (e) {
        e.preventDefault();
        const username = this.loginDetails.name;
        const password = this.loginDetails.password;
        this.$session.set('user', {username, password});
        if (username !== undefined) this.$socket.emit('login', username);
        document.location.href = '#/lobby';
      },
    },
    created: function(){
      this.title = 'Login screen';
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
