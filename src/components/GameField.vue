<template>
  <div class="gameField">
    <h1>{{ title }}</h1>
    <div id="game">

      <div>
        <h4>You: {{ player }}</h4>
        <div v-for="user in users" v-if="user.username === player">
          <p>Victory Points: {{user.victoryPoints}}</p>
        </div>
        <h4>Opponent: {{ opponent }}</h4>
        <div v-for="user in users" v-if="user.username === opponent">
          <p>Victory Points: {{ user.victoryPoints }}</p>
        </div>
      </div>
      <card v-for="card in passiveCards" :card="card"></card>
<!--TODO Components maken!
        kaarten naast elkaar zetten met een fancy achtergrondje op klikbaar maken!-->
    <!-- <ul v-for="user in users" v-if="user.username == player" id="yourHand">
      <li v-for="card in user.hand">
        <a href='#'>{{ card.name }}</a>
        <span>{{ card.value }}</span>
        <span>{{ card.amount }}</span>
      </li>
    </ul> -->
    <div v-for="user in users" v-if="user.username == player">
      <card v-for="card in user.hand" :card="card"></card>
    </div>

    </div>
    <button href="#" v-on:click='endTurn'>End turn</button>
    <a href="/login">Login</a>
  </div>
</template>


<script>
  /* eslint-disable */

  //RandomNumber config
  let rn = require('random-number');
  let gen = rn.generator({
    min : 0,
    max : 1,
    integer: true
  });

  import data from '../api.json';
  import card from './Card';

  const changeUser = (activePlayer, users) => {
    //TODO ipv op mijn scherm user te veranderen alle veranderde data doorsturen naar de server.
    return users.find(player => player.username !== activePlayer).username;
  }

  const userStart = (rn, users) => {
    console.log(rn);
    return users[rn].username;
  }

  export default {
    name: 'GameField',
    data() {
      return {
        name: '',
        player : "Tiziano",
        opponent : "Jens",
        title : 'Game',
        users : data.users,
        passiveCards : data.passiveCards
      }
    },
    components: {
      card
    },
    sockets: {
    },
    methods: {
      sendName: function () {
        this.$socket.emit('test', this.name);
      },
      endTurn: function(e) {
        e.preventDefault();
        this.player = changeUser(this.player, this.users);
        this.opponent = changeUser(this.opponent, this.users);
        console.log(`it's ${this.player} his turn`);
      },
    },
    created: function() {
      this.player = userStart(gen(), data.users);
      this.opponent = changeUser(this.player, this.users)
      console.log(`${this.player} will be the starting player.`);
    }
  }
</script>

<style scoped>
#card {
  display: flex;
  justify-content: center;
  cursor: pointer;
}
</style>
