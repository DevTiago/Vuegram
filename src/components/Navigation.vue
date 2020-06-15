<template>
  <div class="container">
    <b-navbar>
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img
            src="../assets/images/vue.jpeg"
            alt="Lightweight UI components for Vue.js based on Bulma"
          />
        </b-navbar-item>
      </template>
      <template slot="start">
        <b-navbar-item href="#">
          <router-link to="dashboard">Dashboard</router-link>
        </b-navbar-item>
        <b-navbar-item href="#">
          <router-link to="settings">Settings</router-link>
        </b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item tag="div">
          <span class="mr-2">Welcome {{ userProfile.name | capitalize }}</span>
          <div class="buttons">
            <a class="button is-light" @click="logout">Log out</a>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
  </div>
</template>

<script>
const fb = require("../../firebaseConfig");
import { mapState } from "vuex";

export default {
  methods: {
    logout() {
      fb.auth
        .signOut()
        .then(_ => {
          this.$store.dispatch("clearData");
          this.$router.push("/login");
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    ...mapState(["userProfile"])
  },
  filters: {
    capitalize(val) {
      if (!val) return "";
      val = val.toString();
      return val.charAt(0).toUpperCase() + val.slice(1);
    }
  }
};
</script>