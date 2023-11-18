<template>
  <aside v-if="store.getters['Auth/authenticated']" class="right-sidebar">
    <div class="search-container">
      <div class="search-input" @click="toggleSearchResults">
        <input type="text" v-model="searchText" placeholder="Search..." @input="onSearch">
        <i class="fas fa-search search-icon"></i>
      </div>

      <div v-if="isActive" class="search-results">
        <div class="user-card" v-for="(result, index) in searchResults" :key="index" @click="selectResult(result)">
          <img src="../../assets/logo.png" alt="User Avatar" class="user-avatar">
          <div class="user-details">
            <span class="user-name">{{ result.username }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="card-wrapper">
      <div class="card" v-for="card in rightSidebarCards" :key="card.id">
        <h3>{{ card.title }}</h3>
        <p>{{ card.description }}</p>
      </div>
    </div>
  </aside>
</template>

<script>
import { debounce } from 'lodash';
import axios from "axios";
export default {
  name: "RightSideBar",
  data() {
    return {
      searchText: '',
      isActive: false,
      searchResults: [],
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
  created() {
    this.onSearch = debounce(() => {
      axios.get(`users?query=${this.searchText}`)
        .then(response => {
          this.searchResults = response.data;
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }, 500);
  },
  methods: {
    toggleSearchResults() {
      this.isActive = !this.isActive;
    },
    selectResult(result) {
      console.log('Selected result:', result);
      this.isActive = false; // Hide the dropdown after selecting a result
    }
  }
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
  margin-bottom: 0px;
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
.card-wrapper {
  margin-top: 20px;
}
.card {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #e1e8ed;
  border-radius: 4px;
}

.search-container {
  position: relative;
}

.search-input {
  position: relative;
  display: inline-block;
}

.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
}

.search-results.active {
  display: block;
  border: 1px solid #ccc;
}

.user-card {
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #eee; /* Add a border to separate user cards */
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.user-details {
  flex: 1;
}

.user-name {
  font-weight: bold;
}

.user-handle {
  color: #888;
}
</style>