import Vue from 'vue';
import vueResource from 'vue-resource';
import App from './App';
import router from './router';

Vue.use(vueResource);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
