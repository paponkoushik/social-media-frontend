<template>
  <div class="profile-header">
    <img src="../../assets/logo.png" alt="Profile Picture" class="avatar">
    <div class="user-info">
<!--      <h2>{{ user.name }}</h2>-->
      <h2>Koushik</h2>
      <p>@{{ userInfo.username }}</p>
<!--      <p>Koushik</p>-->
<!--      <p>Joined {{ user.joinDate }}</p>-->
      <p>Date</p>
      <p>
<!--        <strong>{{ user.followers }}</strong> Followers-->
        <strong>10</strong> Followers
        <span class="divider"></span>
<!--        <strong>{{ user.following }}</strong> Following-->
        <strong>20</strong> Following
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Profile",
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
    if (! this.id) {
      this.userInfo = this.$store.getters['Auth/user']
      return
    }

    axios.get(`get-user-info/${this.id}`)
      .then(response => {
        this.userInfo = response.data;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
}
</script>

<style scoped>
/* Add your custom styles for the profile header */
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