<template>
  <loading v-if="!$store.state.tasks"></loading>
  <div v-else>
    <tasks-list></tasks-list>
    <add-task></add-task>
  </div>
</template>

<script>
  import firebase from 'firebase'
  import TasksList from '../tasks/Tasks-List'
  import AddTask from '../tasks/Add-Task'
  import Loading from '@/components/util/Loading'

  export default {
    components: {
      Loading, TasksList, AddTask
    },
    data () {
      return {
      }
    },
    created () {
      if (this.$store.state.authUser) {
        firebase.firestore().doc('users/' + this.$store.state.authUser.uid + '/projects/' + this.$route.params.projectId)
          .onSnapshot((doc) => {
            if (doc.exists) {
              this.$store.commit('setCurrentProject', doc.data())
              this.$store.commit('setToolbarTitle', doc.get('title'))
              this.$store.dispatch('listenTasks', this.$route.params.projectId)
            } else {
              this.$router.replace('/')
              this.$store.commit('setNotification', 'Sorry, this project does not exists!')
            }
          })
      }
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          firebase.firestore().doc('users/' + user.uid + '/projects/' + this.$route.params.projectId)
            .onSnapshot((doc) => {
              if (doc.exists) {
                this.$store.commit('setCurrentProject', doc.data())
                this.$store.commit('setToolbarTitle', doc.get('title'))
                this.$store.dispatch('listenTasks', this.$route.params.projectId)
              } else {
                this.$router.replace('/')
                this.$store.commit('setNotification', 'Sorry, this project does not exists!')
              }
            })
        }
      })
    },
    beforeDestroy () {
      this.$store.commit('setTasks', null)
      this.$store.commit('setCurrentProject', null)
    }
  }
</script>

<style scoped>
</style>
