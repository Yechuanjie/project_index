import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import(/* webpackChunkName: "index" */ './views/index.vue'),
      meta: {
        title: 'projects'
      }
    },
    {
      path: '/nest',
      name: 'nest',
      component: () => import('./views/nest.vue'),
      meta: {
        title: 'nest粒子效果'
      }
    },
    {
      path: '/bumping',
      name: 'bumping',
      component: () => import('./views/bumping.vue'),
      meta: {
        title: '碰壁反弹'
      }
    },
    {
      path: '/mapswiper',
      name: 'mapswiper',
      component: () => import('./views/mapswiper.vue'),
      meta: {
        title: '粒子图轮播'
      }
    },
    {
      path: '/404',
      name: '404',
      component: () => import('./views/404.vue'),
      meta: {
        title: 'Page not found'
      }
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
});
