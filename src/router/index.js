import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Administrar from '../views/Administrar.vue'
import Editar from '../views/Editar.vue'
import Login from '../views/Login.vue'

import firebase from "firebase/compat/app";

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    props:true,
    meta: { login: true },
  },
  {
    path: '/administrar',
    name: 'administrar',
    component: Administrar,
    meta: { login: true },
  },
  {
    path: '/editar',
    name: 'editar',
    props: true,
    component: Editar,
    meta: { login: true },
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    redirect: 'login'
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  let user = firebase.auth().currentUser
  console.log(user);
  let authRequired = to.matched.some(route => route.meta.login);
  if (!user && authRequired) {
    next('login');
  } else if (user && !authRequired) {
    next('home');
  } else {
    next();
  }
});

export default router
