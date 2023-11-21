<template>
  <div class="followers-list">
    <h2 class="section-title">Followers List</h2>
    <ul class="followers-container">
      <li v-for="(follower) in followers" :key="follower.id" class="follower-item">
        <img src="../../assets/logo.png" alt="Follower Avatar" class="follower-avatar">
        <div class="follower-info">
          <p class="follower-username">{{ follower.username }}</p>
          <p class="follower-username">Joined {{ follower.created_at }}</p>
        </div>
        <template v-if="store.getters['Auth/user'].id  !== follower.id">
          <button v-if="follower.is_followed_by_auth_user"
                  @click.prevent="unFollow(follower)"
                  class="follow-button">Unfollow</button>
          <button v-else
                  class="follow-button"
                  @click.prevent="follow(follower)"
          >Follow</button>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
import { FollowUnfollowMixin } from "../../Mixins/FollowUnfollowMixin";

export default {
  name: "Followers",
  props:['id', 'followers'],
  mixins:[FollowUnfollowMixin],
  data() {
    return {
    };
  },
}
</script>

<style scoped>
.followers-list {
  margin: 20px auto;
  padding: 15px;
}

.section-title {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.followers-container {
  list-style: none;
  padding: 15px;
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