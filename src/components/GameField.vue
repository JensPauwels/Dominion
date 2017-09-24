<template>
  <div class="gameField">
    <h1>{{ title }}</h1>
    <input type="text" v-model="name">
    <button v-on:click="updateGame">Update!</button>
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
      updateGame: function (obj) {
        console.log(obj);
      },
    },
    methods: {
      updateGame: function () {
        this.$socket.emit('updateGame', {
          gameId: this.$session.get('gameId'),
          name: this.name
        });
      }
    },
    created: function() {
      const gameId = this.$session.get('gameId');
    }
  }
</script>
