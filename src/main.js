import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');


router.beforeEach((to, from, next) => {
  // to and from are both route objects
  document.title = to.meta.title;
  next();
});