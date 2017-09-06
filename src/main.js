import Vue from 'vue';
import vueResource from 'vue-resource';
import App from './App';
import router from './router/routes';

Vue.use(vueResource);
Vue.config.productionTip = false;

/* eslint-disable */

const validation = true;

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.acces === false)) next();
  else {
    if (validation) next();
    else next('/login')
  };
});

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
