<template>
  <div>
    <div class="profile-header">
      <img src="../../assets/logo.png" alt="Profile Picture" class="avatar">
      <div class="user-info">
        <!--      <h2>{{ user.name }}</h2>-->
        <h2>{{ userInfo.username || '' }}</h2>
        <p>@{{ userInfo.username || '' }}</p>
        <p>Joined {{ userInfo.created_at }}</p>
        <p>
          <a v-if="userInfo.followers"
             href="#"
             @click.prevent="followersPage()"
          >
            <strong>
              {{ userInfo.followers.length }}
            </strong> Followers
          </a>
          <span class="divider"></span>
          <a
            v-if="userInfo.following"
            href="#"
            @click.prevent="followingPage()">
            <strong>
              {{ userInfo.following.length }}
            </strong> Following
          </a>
        </p>
      </div>
    </div>
    <tweets :tweets="userInfo.tweets" />
  </div>
</template>

<script>
import axios from "axios";
import Tweets from "./Tweets.vue";

export default {
  name: "Profile",
  components: {Tweets},
  props: ['id'],
  data() {
    return {
      userInfo: {},
    }
  },
  computed: {
    store() {
      return this.$store;
    },
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      if (! this.id) {
        this.userInfo = this.$store.getters['Auth/user']
        return
      }

      axios.get(`get-user-info/${this.id}`)
        .then(response => {
          this.userInfo = response.data.data[0];
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    },
    followersPage() {
      this.$router.push({
        name: 'followers',
        params: {
          ...(this.id && { id: this.id }),
          followers: this.userInfo.followers
        }
      });
    },
    followingPage() {
      this.$router.push({
        name: 'following',
        params: {
          ...(this.id && {id: this.id}),
          following: this.userInfo.following
        }
      });
    }
  },
  watch: {
    '$route.path': function () {
      this.getUserInfo()
    },
  },
}
</script>

<style scoped>

.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 20px;
}

.user-info {
  display: flex;
  flex-direction: column;
}

h2 {
  margin: 0;
}

p {
  margin: 5px 0;
}

.strong {
  font-weight: bold;
}

.divider {
  margin: 0 5px;
  border-right: 1px solid #ccc;
  height: 12px;
  display: inline-block;
}
</style>