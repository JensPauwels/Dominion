<template>
  <div class="gameField">
    <h1>{{ title }}</h1>
    <input type="text" v-model="name">
    <button v-on:click="sendName"></button>
    <a href="/login">Login</a>
  </div>
</template>


<script>
  /* eslint-disable */
  export default {
    name: 'GameField',
    data() {
      return {
        game: {},
        name: '',
        title: 'GameField'
      }
    },
    sockets: {
    },
    methods: {
      sendName: function () {
        this.$socket.emit('test', this.name);
      }
    },
    created: function() {
      const gameId = this.$session.get('gameId');
      const id = this.$session.get('user');
    }
  }
</script>
