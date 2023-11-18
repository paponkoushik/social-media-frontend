<template>
  <aside v-if="store.getters['Auth/authenticated']" class="right-sidebar">
    <div class="search-input">
      <input type="text" placeholder="Search...">
      <i class="fas fa-search"></i>
    </div>
    <div class="card" v-for="card in rightSidebarCards" :key="card.id">
      <h3>{{ card.title }}</h3>
      <p>{{ card.description }}</p>
    </div>
  </aside>
</template>

<script>

export default {
  name: "RightSideBar",
  data() {
    return {
      tweets: [
        // Your tweet data goes here
      ],
      leftSidebarItems: [
        { id: 7, label: 'Profile', icon: 'fas fa-user-alt' },
        { id: 8, label: 'More', icon: 'fas fa-ellipsis-h' },
      ],
      rightSidebarCards: [
        { id: 1, title: 'Card 1', description: 'Description for Card 1' },
        { id: 2, title: 'Card 2', description: 'Description for Card 2' },
      ],
    };
  },
  computed: {
    store() {
      return this.$store;
    },
  },
}
</script>

<style scoped>
.right-sidebar {
  width: 280px;
  background-color: #fff;
  padding: 10px;
  border: 1px solid #e1e8ed;
  height: 100vh;
  position: fixed;
  top: 0;
  overflow-y: auto;
}

.right-sidebar {
  right: 0;
}

.search-input {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.search-input input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.search-input i {
  margin-left: 10px;
  color: #888;
  cursor: pointer;
}

.card {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #e1e8ed;
  border-radius: 4px;
}
</style>