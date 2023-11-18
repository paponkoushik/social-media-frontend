<template>
  <div class="tweet-container">
    <div class="tweet-username">Koushik</div>
    <div v-for="tweet in tweets" :key="tweet.id" class="tweet-card">
      {{ tweet.content }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Tweets",
  props: ['tweets']
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

.tweet-username {
  font-weight: bold;
  margin-bottom: 8px;
}
</style>