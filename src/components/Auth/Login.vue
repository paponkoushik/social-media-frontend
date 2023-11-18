<template>
  <div class="login-container">

    <div class="login-form">
      <h2>Login to Social Media</h2>
      <form>
        <div v-if="loginFailed" class="alert alert-danger" role="alert">
          Invalid Email/Username or password. Please try again.
        </div>
        <div class="form-group">
          <label for="username">Email or Username:</label>
          <input type="text" id="username" v-model="user.email_or_username" placeholder="Email or Username" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="user.password" placeholder="Password" required />
        </div>
        <button type="submit" @click.prevent="submit">Log in</button>

      </form>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "Login",
  data() {
    return {
      user: {},
    }
  },
  computed: {
    ...mapState('Auth', ['loginFailed']),
  },
  methods: {
    ...mapActions({
      login: 'Auth/login'
    }),
    submit() {
      this.login(this.user).then(() => {
        if (! this.loginFailed) {
          console.log('calling')
          this.$router.replace({name: 'home'})
        }
      });
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-form {
  max-width: 400px;
  padding: 20px;
  border: 1px solid #1da1f2;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.twitter-logo {
  width: 30px;
  margin-bottom: 15px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #1da1f2;
}

input {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
}

button {
  background-color: #1da1f2;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.bottom-links {
  margin-top: 15px;
  color: #1da1f2;
}

.bottom-links a {
  text-decoration: none;
  color: #1da1f2;
}

.separator {
  margin: 0 5px;
}
</style>