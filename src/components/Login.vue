<template>
  <div class="container d-flex justify-content-center">
    <div v-if="showLoginForm" class="card mt-5">
      <h2 class="card-title">Login</h2>
      <form @submit.prevent>
        <div class="formGroup">
          <label>Email</label>
          <div class="formGroupWrapper">
            <font-awesome-icon class="font-awesome-icon" icon="envelope" />
            <input type="text" placeholder="Type your email" />
          </div>
        </div>
        <div class="formGroup">
          <label>Password</label>
          <div class="formGroupWrapper">
            <font-awesome-icon class="font-awesome-icon" icon="key" />
            <input type="password" placeholder="Type your password" />
          </div>
        </div>
        <button @click="login">Login</button>
      </form>
      <p @show="errorMsg" class="errorMsg text-danger text-center mt-2">{{errorMsg}}</p>
      <p class="text-center mt-2">
        Or create a new account
        <span>here</span>
      </p>
      <!-- <p class="text-center">Or Login with</p> -->
      <!-- <IconList>
      <SocialIcon v-for="item in items" :key="item.iconName" :iconColor="item.color">
        <font-awesome-icon :icon="['fab', item.iconName]" />
      </SocialIcon>
      </IconList>-->
    </div>
  </div>
</template>

<script>
const fb = require("../../firebaseConfig");

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
  methods: {
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
    }
    //   signup() {
    //     this.performingRequest = true;
    //     fb.auth
    //       .createUserWithEmailAndPassword(
    //         this.registerForm.email,
    //         this.registerForm.password
    //       )
    //       .then(user => {
    //         this.$store.commit("setCurrentUser", user.user);
    //         fb.usersCollection
    //           .doc(user.user.uid)
    //           .set({
    //             name: this.registerForm.name,
    //             email: this.registerForm.email
    //           })
    //           .then(_ => {
    //             this.$store.dispatch("fetchUserProfile");
    //             this.$router.push("/dashboard");
    //           })
    //           .catch(err => {
    //             this.errorMsg = err.message;
    //             this.performingRequest = false;
    //           });
    //       })
    //       .catch(err => console.log(err));
    //   },
    //   toggleForm() {
    //     this.showLoginForm = !this.showLoginForm;
    //     this.loginForm.email = "";
    //     this.loginForm.password = "";
    //     this.registerForm.name = "";
    //     this.registerForm.password = "";
    //     this.registerForm.confirmationPassword = "";
    //     this.registerForm.email = "";
    //     this.errorMsg = "";
    //   }
  }
};
</script>