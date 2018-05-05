<template>
  
  <v-text-field 
    v-if="$store.state.tasks"
    v-model.trim="newTaskTitle" 
    hint="Press enter to save" 
    ref="refAddTask" 
    label="Add a task" 
    :error-messages="errorAddTask" 
    @keyup.enter="addTask()" 
    autofocus
  >
  </v-text-field>

</template>

<script>
  import firebase from 'firebase'
  import 'firebase/firestore'

  export default {
    data () {
      return {
        newTaskTitle: '',
        errorAddTask: []
      }
    },
    methods: {
      addTask () {
        if (this.newTaskTitle === '') {
          return
        }
        firebase.firestore().collection('users/' + this.$store.state.authUser.uid + '/tasks')
          .add({
            title: this.newTaskTitle,
            completed: false,
            order: this.$store.state.tasks.length,
            projectId: this.$route.params.projectId ? this.$route.params.projectId : null
          })
          .then((task) => {
            // this.$refs.refAddTask.blur()
          })
          .catch(error => {
            console.log(error)
          })
        this.newTaskTitle = ''
      }
    }
  }
</script>

<style scoped>
.input-group {
  margin-top: 15px;
}
</style>