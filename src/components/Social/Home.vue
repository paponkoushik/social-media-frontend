<template>
  <div>
    <header class="fixed-main-header">
      <div class="tabs">
        <div
          :class="{ 'active-tab': activeTab === 'tab1' }"
          @click="setActiveTab('tab1')"
        >
          For You
        </div>
        <div
          :class="{ 'active-tab': activeTab === 'tab2' }"
          @click="setActiveTab('tab2')"
        >
          Following
        </div>
      </div>
    </header>

    <main>
      <div class="post-section">
        <textarea v-model="content" placeholder="What's happening?"></textarea>
        <button @click="postTweet">Post</button>
      </div>
      <div v-if="activeTab === 'tab1'">
        <tweets :tweets="suggestTweets" />
      </div>
      <div v-else-if="activeTab === 'tab2'">
        <tweets :tweets="followingTweets" />
      </div>
    </main>
  </div>
</template>

<script>
import Tweets from "./Tweets.vue";
import axios from "axios";

export default {
  name: "Home",
  components: {Tweets},
  data() {
    return {
      activeTab: 'tab1',
      suggestTweets: [],
      followingTweets: [],
      content: '',
      errors:'',
    };
  },
  created() {
    this.getSuggestTweets()
  },
  methods: {
    setActiveTab: function (tab) {
      this.activeTab = tab;
      this.activeTab === 'tab1' ? this.getSuggestTweets() : this.getFollowingTweets();
    },
    postTweet() {
      if (this.content.length) {
        axios.post('tweet', {content: this.content}).then(response => {
          if (response.status == '201') {
            this.activeTab === 'tab1' ? this.getSuggestTweets() : this.getFollowingTweets();
          }

          this.resetForm();
        }).catch(({response}) =>{
          this.errors = response.data.errors;
        })
      }
    },
    resetForm() {
      this.content = ''
    },
    getFollowingTweets() {
      axios.get('following-tweets').then(response => {
        this.followingTweets = response.data.data
      }).catch(({response}) =>{
        this.errors = response.data.errors;
      })
    },
    getSuggestTweets() {
      axios.get('suggest-tweets').then(response => {
        this.suggestTweets = response.data.data
      }).catch(({response}) =>{
        this.errors = response.data.errors;
      })
    }
  },
}
</script>

<style scoped>
.fixed-main-header {
  position: fixed;
  width: calc(100% - 560px);
  background-color: #ffffff;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  top: 0;
  z-index: 1000;
}

.tabs {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  width: 100%;
}

.tabs div {
  flex: 1;
  text-align: center;
  padding: 10px 0;
  font-weight: bold;
}

.active-tab {
  border-bottom: 2px solid #1da1f2;
  color: #1da1f2;
}

.post-section {
  padding: 90px 10px 20px 10px;
  border-bottom: 1px solid #ccc;
}

.post-section textarea {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 8px;
}

.post-section button {
  background-color: #1da1f2;
  color: #fff;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
}
</style>