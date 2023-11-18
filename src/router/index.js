import Login from "../components/Auth/Login";
import store from "../store/index"
import Home from "../components/Social/Home.vue";

export const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (store.getters['Auth/authenticated']) {
        return next({
          name: 'products'
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
]