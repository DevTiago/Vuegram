<template>
  <div class="container login-container d-flex justify-content-around">
    <div class="row col-xl-6 login-picture"></div>
    <div class="row col-xl-5 login-form d-flex flex-column justify-content-center">
      <h3 class="text-center mb-5">Vuegram</h3>
      <form>
        <div class="login-form d-flex flex-column">
          <input
            type="email"
            class="form-control mt-5"
            name="email"
            placeholder="Enter your email"
            autocomplete="off"
            v-model="loginForm.email"
          />
          <input
            type="password"
            class="form-control mt-2"
            name="password"
            placeholder="Enter your password"
            v-model="loginForm.password"
          />
          <button
            :disabled="loginForm.email === '' || loginForm.password === ''"
            type="button"
            class="btn btn-success mt-4"
            @click="login"
          >Log In</button>
          <p class="mt-2">
            Create a new
            <a href="/register">account</a>
          </p>
          <div v-if="errorMsg !== ''">
            <p class="error mt-2">{{ errorMsg }}</p>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
const fb = require("../../firebaseConfig");

export default {
  name: "Login",
  data() {
    return {
      errorMsg: "",
      loginForm: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      fb.auth
        .signInWithEmailAndPassword(
          this.loginForm.email,
          this.loginForm.password
        )
        .then(user => {
          this.$store.commit('setCurrentUser', user.user)
          this.$store.dispatch('fetchUserProfile')
          this.$router.push('/dashboard')
          console.log('Ok')
        })
        .catch(err => this.errorMsg = err);
    }
  }
};
</script>

<style scoped>
</style>
