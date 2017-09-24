import Vue from 'vue';
import Router from 'vue-router';
import VueSocketio from 'vue-socket.io';
import VueSessionStorage from 'vue-sessionstorage';
import Login from '@/components/Login';
import GameField from '@/components/GameField';
import Lobby from '@/components/Lobby';
import Registration from '@/components/Register';

Vue.use(VueSessionStorage);
Vue.use(Router);
Vue.use(VueSocketio, 'http://localhost:9999/');
// Vue.use(VueSocketio, 'http://nodeprojects.me/');

const Route = function (path, name, component, validation) {
  return {
    path,
    name,
    component,
    meta: {
      acces: validation,
    },
  };
};

export default new Router({
  routes: [
    Route('/', 'default', Login, false),
    Route('/login', 'login', Login, false),
    Route('/Register', 'register', Registration, false),
    Route('/gameField', 'gamefield', GameField, true),
    Route('/lobby', 'lobby', Lobby, true),

  ],
});
