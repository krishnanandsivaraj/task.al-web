import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import 'firebase/firestore'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    toolbarTitle: null,
    authUser: null,
    projects: null,
    currentProject: null,
    tasks: null,
    notification: null,
    homeTasksCount: null
  },
  mutations: {
    setToolbarTitle (state, text) {
      state.toolbarTitle = text
    },
    setAuthUser (state, authUser) {
      state.authUser = authUser
    },
    setProjects (state, projects) {
      state.projects = projects
    },
    setCurrentProject (state, currentProject) {
      state.currentProject = currentProject
    },
    setTasks (state, tasks) {
      state.tasks = tasks
    },
    setNotification (state, message) {
      state.notification = message
    },
    setHomeTasksCount (state, count) {
      state.homeTasksCount = count
    }
  },
  actions: {
    // Set Auth User
    setAuthUser ({commit}, user) {
      commit('setAuthUser', {
        email: user.email,
        uid: user.uid
      })
    },
    // Listen projects
    listenProjects ({commit}) {
      firebase.firestore().collection('users/' + this.state.authUser.uid + '/projects').orderBy('order')
        .onSnapshot(querySnapshot => {
          var projects = []
          querySnapshot.forEach(function (doc) {
            var project = {}
            project = doc.data()
            project.id = doc.id
            projects.push(project)
          })
          commit('setProjects', projects)
        })
    },
    // Listen tasks
    listenTasks ({commit}, projectId) {
      firebase.firestore().collection('users/' + this.state.authUser.uid + '/tasks/').where('projectId', '==', projectId).orderBy('order')
        .onSnapshot(querySnapshot => {
          var tasks = []
          querySnapshot.forEach(function (doc) {
            var task = {}
            task = doc.data()
            task.id = doc.id
            tasks.push(task)
          })
          commit('setTasks', tasks)
        })
    }
  }
})

export default store
