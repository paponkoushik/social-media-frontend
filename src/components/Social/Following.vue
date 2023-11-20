<template>
  <div class="followers-list">
    <h2 class="section-title">Following List</h2>
    <ul class="followers-container">
      <li v-for="follower in followers" :key="follower.id" class="follower-item">
        <img src="../../assets/logo.png" alt="Follower Avatar" class="follower-avatar">
        <div class="follower-info">
          <p class="follower-name">{{ follower.username }}</p>
          <p class="follower-username">@{{ follower.username }}</p>
        </div>
        <button class="follow-button">Follow</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Following",
  props:['id'],
  data() {
    return {
      followers: [
        { id: 1, name: 'Follower 1', username: 'follower1', avatar: 'path/to/avatar1.jpg' },
        { id: 2, name: 'Follower 2', username: 'follower2', avatar: 'path/to/avatar2.jpg' },
        { id: 3, name: 'Follower 3', username: 'follower3', avatar: 'path/to/avatar3.jpg' },
      ],
    };
  },
}
</script>

<style scoped>
.followers-list {
  margin: 20px auto;
}

.section-title {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.followers-container {
  list-style: none;
  padding: 0;
}

.follower-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.follower-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
}

.follower-info {
  flex-grow: 1;
}

.follower-name {
  font-weight: bold;
  margin: 0;
}

.follower-username {
  margin: 0;
  color: #555;
}

.follow-button {
  background-color: #1da1f2;
  color: #fff;
  padding: 5px 10px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}
</style>