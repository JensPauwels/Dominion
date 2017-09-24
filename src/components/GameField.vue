<template>
  <div class="gameField">
    <h1>{{ title }}</h1>
    <user v-for="user in users" :user="user"></user>
    <div id="game">
      <div class="passiveCards">
        <card @cardClick="cardEvent" v-for="card in cardsLeft" :card="card" v-on:click=""></card>
      </div>

      <div v-for="user in users" v-if="user.username === player">
        <card v-for="card in user.hand" :card="card" v-on:click=""></card>
      </div>

    </div>
    <button href="#" v-on:click='endTurn'>End {{ action }} round.</button>
    <a href="/login">Login</a>
  </div>
</template>


<script>
  /* eslint-disable */
  import card from './Card';
  import user from './Users';

  export default {
    name: 'GameField',
    data() {
      return {
        name: '',
        player : '',
        opponent : '',
        title : 'Game',
        users : [],
        cardsLeft : [],
        action: 'action'
      }
    },
    components: {
      card,
      user
    },
    sockets: {
      startGameInfo: function (gameInfo) {
        console.log(gameInfo);
        gameInfo.users.forEach(user => {
          this.users.push(user);
        })
        this.player = "Frank";
        this.cardsLeft = gameInfo.cardsLeft;
      }
    },
    methods: {
      sendName: function () {
        this.$socket.emit('test', this.name);
      },
      endTurn: function(e) {
        e.preventDefault();
        //Dit nog naar de server verplaatsen.
        if (this.action === 'buy') this.action = 'turn';
        else if (this.action === 'turn') this.$socket.emit('endTurn', this);
        else this.action = 'buy';
      },
      cardEvent: function (card) {
        console.log(card.action, card.location);
        this.$socket.emit('cardPlayed', card); //Hier zat ik.
      }
    },
    created: function() {
      this.$socket.emit('startGame');
    }
  }
</script>

<style scoped>
#card {
  display: flex;
  justify-content: center;
  cursor: pointer;
}
#card:hover {
  color: red;
}
</style>
