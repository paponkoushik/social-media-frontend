<template>
  <aside class="main-left-sidebar">
    <div class="logo">
      <img src="../../assets/logo.png" alt="Twitter Logo">
    </div>
    <div class="sidebar-items">
      <div v-for="item in sidebarItems" :key="item.id" class="sidebar-item">
        <i :class="item.icon"></i>
        {{ item.label }}
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
        { id: 1, label: 'Home', icon: 'fas fa-home' },
        { id: 2, label: 'Explore', icon: 'fas fa-hashtag' },
        { id: 3, label: 'Notifications', icon: 'fas fa-bell' },
        { id: 4, label: 'Messages', icon: 'fas fa-envelope' },
        { id: 5, label: 'Bookmarks', icon: 'fas fa-bookmark' },
        { id: 6, label: 'Lists', icon: 'fas fa-list-alt' },
        { id: 7, label: 'Profile', icon: 'fas fa-user-alt' },
        { id: 8, label: 'More', icon: 'fas fa-ellipsis-h' },
      ],
    };
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