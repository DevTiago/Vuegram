import Vue from "vue";
import App from "./App";
import router from "./router";
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import { store } from "./store";
import "./assets/scss/app.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUserSecret,
  faEnvelope,
  faKey,
  faUser,
  faLock
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const fb = require("../firebaseConfig");

library.add(faUserSecret, faEnvelope, faKey, faUser, faLock);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.use(Buefy)

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
