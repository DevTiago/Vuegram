import Vue from "vue";
import App from "./App";
import router from "./router";
import { store } from "./store";
import "./assets/scss/app.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUserSecret,
  faEnvelope,
  faKey
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const fb = require("../firebaseConfig");

library.add(faUserSecret, faEnvelope, faKey);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

// handle page app initialization or page reload

let app;

fb.auth.onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      el: "#app",
      router,
      store,
      components: { App },
      template: "<App/>"
    });
  }
});
