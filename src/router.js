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
        title: 'demo & project'
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
      path: '/svg',
      name: 'svg',
      component: () => import('./views/svg.vue'),
      meta: {
        title: 'svg测试'
      }
    },
    {
      path: '/404',
      name: '404',
      component: () => import('./views/404.vue'),
      meta: {
        title: '404 Page not found'
      }
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
});
