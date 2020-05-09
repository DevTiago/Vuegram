import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store'
const fb = require('../firebaseConfig')

Vue.config.productionTip = false

// handle page app initialization or page reload

let app

fb.auth.onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      store,
      components: { App },
      template: '<App/>'
    })
  }
})
