import Login from "../components/Auth/Login";
import store from "../store/index"

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
  }
]