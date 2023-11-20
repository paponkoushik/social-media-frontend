<template>
  <aside v-if="store.getters['Auth/authenticated']" class="main-left-sidebar">
    <div class="logo">
      <img src="../../assets/logo.png" alt="Twitter Logo">
    </div>
    <div class="sidebar-items">
      <div v-for="item in sidebarItems" :key="item.id" class="sidebar-item">
        <i :class="item.icon"></i>
        <router-link :to="item.url">
          {{ item.label }}
        </router-link>
      </div>
    </div>
    <button @click.prevent="logout" class="logout-button">Logout</button>
  </aside>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "LeftSideBar",
  data() {
    return {
      sidebarItems: [
        { id: 1, label: 'Home', icon: 'fas fa-home', url: '/home'},
        { id: 7, label: 'Profile', icon: 'fas fa-user-alt', url: '/profile'},
      ],
    };
  },
  computed: {
    store() {
      return this.$store;
    },
  },
  methods: {
    ...mapActions({
      logoutAction: 'Auth/logout'
    }),

    logout() {
      this.logoutAction().then(() => {
        this.$router.replace({
          name: 'login'
        })
      });
    }
  }
}
</script>

<style scoped>
.main-left-sidebar {
  width: 280px;
  background-color: #fff;
  padding: 10px;
  border-right: 1px solid #e1e8ed;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  position: fixed;
  top: 0;
  overflow-y: auto;
}

.logo img {
  height: 30px;
}

.sidebar-items {
  margin-top: 20px;
  width: 100%;
}

.sidebar-item {
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.sidebar-item i {
  margin-right: 10px;
}

.sidebar-item:hover {
  background-color: #e6f5ff;
}

.logout-button {
  margin-top: 20px;
  padding: 10px;
  background-color: #1da1f2;
  color: #fff;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
}
</style>