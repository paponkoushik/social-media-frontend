<template>
  <div class="tweet-container">
    <div v-for="tweet in tweets" :key="tweet.id" class="tweet-card">
      <div class="tweet-header">
        <img class="avatar" src="../../assets/logo.png" alt="User Avatar" />
        <div class="user-info">
          <p class="username"><strong>{{ tweet.user.username }}</strong></p>
        </div>
      </div>
      <div class="tweet-content">
        <p>{{ tweet.content }}</p>
      </div>
      <div class="tweet-footer">
        <div class="interaction-icons">
          <i
            class="far fa-heart"
            :class="{ 'liked': tweet.liked }"
            @click="toggleLike(tweet)"
          ></i>
          <span class="like-count">{{ tweet.likes.length }}</span>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import axios from "axios";

export default {
  name: "Tweets",
  props: ['tweets'],
  methods: {
    toggleLike(tweet) {
      if (tweet.liked) {
        tweet.likes.length --;
      } else {
        tweet.likes.length ++;
      }
      tweet.liked = !tweet.liked
      axios.post(`tweet/${tweet.id}/like`).then(() => {

      }).catch(({response}) =>{
        this.errors = response.data.errors;
      })
    }
  }
}
</script>

<style scoped>
.tweet-container {
  padding: 10px;
}

.tweet-card {
  border: 1px solid #ccc;
  padding: 16px;
  margin-top: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.tweet-card {
  border: 1px solid #e1e8ed;
  border-radius: 12px;
  margin-bottom: 15px;
  padding: 15px;
}

.tweet-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 10px;
}

.user-info {
  flex-grow: 1;
}

.username {
  font-weight: bold;
}

.tweet-content {
  margin-bottom: 10px;
  margin-left: 58px;
}

.tweet-footer {
  display: flex;
  justify-content: space-between;
  color: #657786;
  font-size: 0.8em;
}
.interaction-icons {
  display: flex;
  align-items: center;
  margin-left: 58px;
}
.far.fa-heart {
  cursor: pointer;
  transition: color 0.3s ease-in-out;
}

.far.fa-heart:hover {
  color: red;
}

.liked {
  color: red;
}
.like-count {
  margin-left: 5px;
}
</style>