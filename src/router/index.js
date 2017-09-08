import Vue from 'vue';
import Router from 'vue-router';
import VueSocketio from 'vue-socket.io';
import VueSessionStorage from 'vue-sessionstorage';
import Login from '@/components/Login';
import GameField from '@/components/GameField';
import Lobby from '@/components/Lobby';

Vue.use(VueSessionStorage);
Vue.use(Router);
Vue.use(VueSocketio, 'http://localhost:9999/');
// Vue.use(VueSocketio, 'http://nodeprojects.me/');

const Route = function (path, name, component) {
  return {
    path,
    name,
    component,
  };
};

export default new Router({
  routes: [
    Route('/', 'default', Login),
    Route('/login', 'login', Login),
    Route('/gameField', 'gamefield', GameField),
    Route('/lobby', 'lobby', Lobby),
  ],
});
