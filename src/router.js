import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import(/* webpackChunkName: "index" */ './views/index.vue')
    },
    {
      path: '/nest',
      name: 'nest',
      component: () => import('./views/nest.vue')
    },
    {
      path: '/bumping',
      name: 'bumping',
      component: () => import('./views/bumping.vue')
    },
    {
      path: '/mapswiper',
      name: 'mapswiper',
      component: () => import('./views/mapswiper.vue')
    },
    {
      path: '/solarsystem',
      name: 'solarsystem',
      component: () => import('./views/solarsystem.vue')
    },
    {
      path: '/clock',
      name: 'clock',
      component: () => import('./views/clock.vue')
    }
  ]
});
