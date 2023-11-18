<template>
  <div id="app">
    <left-side-bar />
    <main class="main-content">
      <router-view />
    </main>
    <right-side-bar />
  </div>
</template>

<script>
import LeftSideBar from "./components/Layouts/LeftSideBar.vue";
import RightSideBar from "./components/Layouts/RightSideBar.vue";

export default {
  name: 'App',
  components: {
    RightSideBar,
    LeftSideBar
  }
}
</script>
<style scoped>
#app {
  display: flex;
  flex-direction: column;
}

.main-content {
  margin-left: 280px;
  margin-right: 280px;
}
</style>