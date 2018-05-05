// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import firebase from 'firebase'
import router from './router'
import store from './store'
import VueAnalytics from 'vue-analytics'

Vue.use(Vuetify, {
  theme: {
    primary: '#00897B'
  }
})

Vue.use(VueAnalytics, {
  id: process.env.GOOGLE_ANALYTICS_ID,
  router: router
})

Vue.config.productionTip = false

// Initialize Firebase
firebase.initializeApp({
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.FIREBASE_DATABASEURL,
  projectId: process.env.FIREBASE_PROJECTID
})
// Enable Firestore offline mode
firebase.firestore().enablePersistence()
  .then(function () {
    // Initialize Cloud Firestore through firebase
    // var db = firebase.firestore();
  })
  .catch(function (err) {
    if (err.code === 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
    } else if (err.code === 'unimplemented') {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
    }
  })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('setAuthUser', user)
          .then(() => {
            // Listen projects
            this.$store.dispatch('listenProjects')
            // Set home tasks count
            firebase.firestore().collection('users/' + user.uid + '/tasks').where('projectId', '==', null).where('completed', '==', false)
              .onSnapshot(querySnapshot => {
                this.$store.commit('setHomeTasksCount', querySnapshot.size)
              })
          })
      } else {
        firebase.auth().signInAnonymously()
          .then(() => {
            // this.$store.commit('setNotification', 'Welcome to Task.al')
          })
          .catch((error) => this.$store.commit('setNotification', error.message))
      }
    })
  }
})
