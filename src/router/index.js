import Vue from 'vue';
import Router from 'vue-router';

import Home from '../Views/Home';
import Wishes from '../Views/Wishes';
import Users from '../Views/Users';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/wishes',
      name: 'Wishes',
      component: Wishes,
    },
    {
      path: '/users',
      name: 'Users',
      component: Users,
    },
  ],
});
