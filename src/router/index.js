import Login from "../components/Auth/Login";
import store from "../store/index"
import Home from "../components/Social/Home.vue";
import Profile from "../components/Social/Profile.vue";
import Followers from "../components/Social/Followers.vue";
import Following from "../components/Social/Following.vue";

export const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (store.getters['Auth/authenticated']) {
        return next({
          name: 'home'
        });
      }
      next();
    }
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    beforeEnter: (to, from, next) => {
      if (!store.getters['Auth/authenticated']) {
        return next({
          name: 'login'
        });
      }
      next();
    }
  },
  {
    path: '/profile/:id?',
    name: 'profile',
    component: Profile,
    props:true,
    beforeEnter: (to, from, next) => {
      if (!store.getters['Auth/authenticated']) {
        return next({
          name: 'login'
        });
      }
      next();
    }
  },
  {
    path: '/followers/:id?',
    name: 'followers',
    component: Followers,
    props:true,
    beforeEnter: (to, from, next) => {
      if (!store.getters['Auth/authenticated']) {
        return next({
          name: 'login'
        });
      }
      next();
    }
  },
  {
    path: '/following/:id?',
    name: 'following',
    component: Following,
    props:true,
    beforeEnter: (to, from, next) => {
      if (!store.getters['Auth/authenticated']) {
        return next({
          name: 'login'
        });
      }
      next();
    }
  },
]