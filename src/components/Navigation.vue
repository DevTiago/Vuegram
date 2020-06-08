<template>
<div class="container">
    <b-navbar>
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                    src="../assets/images/vue.jpeg"
                    alt="Vuegram"
                >
            </b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-item>
                <router-link to="dashboard">Dashboard</router-link>
            </b-navbar-item>
            <b-navbar-item>
                  <router-link to="dashboard">Settings</router-link>
            </b-navbar-item>
        </template>

        <template slot="end">
            <b-navbar-item tag="div">
                <div class="buttons">
                    <a class="button is-light" @click="logout">
                        Log out
                    </a>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
    </div>
</template>

<script>
const fb = require("../../firebaseConfig");

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
  }
};
</script>