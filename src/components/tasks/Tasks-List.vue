<template>

  <div>

    <v-card v-if="$store.state.tasks && $store.state.tasks.length === 0">
      <v-card-text class="text-xs-center">
        <v-icon large class="grey--text">done</v-icon>
        <p class="grey--text mb-0">No tasks yet.</p>
      </v-card-text>
    </v-card>
    
    <v-list v-if="$store.state.tasks && $store.state.tasks.length > 0" class="elevation-1 mb-3">
      <draggable v-model="$store.state.tasks" @sort="sortTasks" :options="{handle:'.draggable-handle'}">
        <taskItem v-for="task in $store.state.tasks" :task="task" :key="task.id"></taskItem>
      </draggable>
    </v-list>

  </div>

</template>

<script>
  import firebase from 'firebase'
  import 'firebase/firestore'

  import Draggable from 'vuedraggable'
  import TaskItem from './Task-Item'

  export default {
    components: {
      Draggable, TaskItem
    },
    data () {
      return {
      }
    },
    methods: {
      sortTasks () {
        this.$store.state.tasks.forEach((task, index) => {
          firebase.firestore().doc('users/' + this.$store.state.authUser.uid + '/tasks/' + task.id)
            .update({
              'order': index
            })
        })
        this.$store.commit('setNotification', 'Tasks sorted successfully')
      }
    }
  }
</script>

<style scoped>
.list, .card {
  margin-top: 15px;
}

/* @media only screen and (max-width: 599px) {
  .list {
    margin-top: -24px;
    margin-left: -24px;
    margin-right: -24px;
    padding-top: 14px;
    padding-left: 7px;
    padding-right: 7px;
  }
} */

</style>
