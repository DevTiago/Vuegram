<template>
  <span>
    <div v-if="showLoginForm" class="container d-flex justify-content-center">
      <div class="card mt-5 col-xl-6 col-md-8 col-12">
        <h2 class="card-title">Login</h2>
        <form @submit.prevent>
          <div class="formGroup">
            <label>Email</label>
            <div class="formGroupWrapper">
              <font-awesome-icon class="font-awesome-icon" icon="envelope" />
              <input v-model="loginForm.email" type="text" placeholder="Your email" />
            </div>
          </div>
          <div class="formGroup">
            <label>Password</label>
            <div class="formGroupWrapper">
              <font-awesome-icon class="font-awesome-icon" icon="key" />
              <input v-model="loginForm.password" type="password" placeholder="Your password" />
            </div>
          </div>
          <button @click="login">Login</button>
        </form>
        <pulse-loader :loading="performingRequest" :color="'#F333FF'" class="text-center mt-2"></pulse-loader>
        <p @show="errorMsg" class="errorMsg text-danger text-center mt-2">{{errorMsg}}</p>
        <p class="text-center mt-2 newAccount">
          Or create a new account
          <span @click="toggleForm" class="link">here</span>
        </p>
      </div>
    </div>

    <!-- Register Form -->
    <div v-else class="container d-flex justify-content-center">
      <div class="card mt-5 col-xl-6 col-md-8 col-12">
        <h2 class="card-title">Register a new account</h2>
        <form @submit.prevent>
          <div class="formGroup">
            <label>Your name</label>
            <div class="formGroupWrapper">
              <font-awesome-icon class="font-awesome-icon" icon="user" />
              <input
                v-model="registerForm.name"
                type="text"
                placeholder="Your name"
                autocomplete="disable"
              />
            </div>
          </div>
          <div class="formGroup">
            <label>Email</label>
            <div class="formGroupWrapper">
              <font-awesome-icon class="font-awesome-icon" icon="envelope" />
              <input
                v-model="registerForm.email"
                type="text"
                placeholder="Your email"
                autocomplete="disable"
              />
            </div>
          </div>
          <div class="formGroup">
            <label>Password</label>
            <div class="formGroupWrapper">
              <font-awesome-icon class="font-awesome-icon" icon="key" />
              <input
                v-model="registerForm.password"
                type="password"
                placeholder="At least 6 characters"
                autocomplete="disable"
              />
            </div>
          </div>
          <div class="formGroup">
            <label>Confirm your password</label>
            <div class="formGroupWrapper">
              <font-awesome-icon class="font-awesome-icon" icon="lock" />
              <input
                v-model="registerForm.confirmationPassword"
                type="password"
                placeholder="Confirm your password"
                autocomplete="disable"
              />
            </div>
          </div>
          <button @click="signup">Create a new account</button>
          <pulse-loader :loading="performingRequest" :color="'#F333FF'" class="text-center mt-2"></pulse-loader>
        </form>
        <p @show="errorMsg" class="errorMsg text-danger text-center mt-2">{{errorMsg}}</p>
        <p class="text-center mt-2">
          Back to
          <span class="link" @click="toggleForm">Login</span>
        </p>
      </div>
    </div>
  </span>
</template>

<script>
const fb = require("../../firebaseConfig");
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

export default {
  name: "Login",
  data() {
    return {
      performingRequest: false,
      showLoginForm: true,
      errorMsg: "",
      loginForm: {
        email: "",
        password: ""
      },
      registerForm: {
        email: "",
        name: "",
        password: "",
        confirmationPassword: ""
      }
    };
  },
  components: {
    PulseLoader
  },
  methods: {
    toggleForm() {
      this.loginForm.email = "";
      this.loginForm.password = "";

      this.registerForm.name = "";
      this.registerForm.email = "";
      this.registerForm.password = "";
      this.registerForm.confirmationPassword = "";

      this.errorMsg = "";

      this.showLoginForm = !this.showLoginForm;
    },

    login() {
      this.performingRequest = true;
      fb.auth
        .signInWithEmailAndPassword(
          this.loginForm.email,
          this.loginForm.password
        )
        .then(user => {
          this.$store.commit("setCurrentUser", user.user);
          this.$store.dispatch("fetchUserProfile");
          this.$router.push("/dashboard");
        })
        .catch(err => {
          this.errorMsg = err.message;
          this.performingRequest = false;
        });
    },
    signup() {
      this.performingRequest = true;

      if (
        this.registerForm.confirmationPassword === this.registerForm.password
      ) {
        fb.auth
          .createUserWithEmailAndPassword(
            this.registerForm.email,
            this.registerForm.password
          )
          .then(user => {
            this.$store.commit("setCurrentUser", user.user);

            fb.usersCollection
              .doc(user.user.uid)
              .set({
                uid: user.user.uid,
                name: this.registerForm.name,
                email: this.registerForm.email
              })
              .then(_ => {
                this.$store.dispatch("fetchUserProfile");
                this.$router.push("/dashboard");
              })
              .catch(err => {
                this.performingRequest = false;
              });
          })
          .catch(err => {
            this.errorMsg = err.message;
            this.performingRequest = false;
          });
      } else {
        this.errorMsg = "Password does not match!";
      }
    }
  }
};
</script>