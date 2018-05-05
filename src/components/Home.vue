<template>
  <loading v-if="!$store.state.tasks"></loading>
  <div v-else> 
    <tasks-list></tasks-list>
    <add-task></add-task>
  </div>
</template>

<script>
  import firebase from 'firebase'
  import TasksList from './tasks/Tasks-List'
  import AddTask from './tasks/Add-Task'

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
        this.$store.dispatch('listenTasks', null)
      }
      this.$store.commit('setToolbarTitle', 'Task.al')
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.$store.dispatch('listenTasks', null)
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
