<template>

  <v-list-tile>

    <v-list-tile-action>
      <v-checkbox color="grey lighten-1" @click="handleComplition()" v-model="task.completed"></v-checkbox>
    </v-list-tile-action>

    <v-list-tile-content class="draggable-handle" @click.stop="dialog = !dialog" style="cursor:pointer">
      <v-list-tile-title :class="{'grey--text': task.completed }" >{{task.title}}</v-list-tile-title>
    </v-list-tile-content>

    <v-dialog v-model="dialog" max-width="360px">
      <v-card>
        <v-card-text class="pb-1">
          <div class="">
            <v-text-field multi-line rows="3" v-model.trim="task.title" label="Edit task title" ref="focus"></v-text-field>
            <v-select class="mt-0" :items="selectItems" v-model="selectedProjectId" label="Assign to project" item-text="title" item-value="id" :prepend-icon="selectIcon" flat></v-select>
          </div>
        </v-card-text>
        <v-card-actions class="pt-1 pl-3 pr-3 pb-3">
          <v-btn outline color="primary" class="elevation-0" small @click="handleEditTask()">Save</v-btn>
          <v-spacer></v-spacer>
          <v-btn flat color="grey" small @click="handleDeleteTask()" icon>
            <v-icon>delete</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-list-tile>

</template>

<script>
  import firebase from 'firebase'
  import 'firebase/firestore'

  export default {
    props: [
      'task'
    ],
    data () {
      return {
        dialog: false,
        selectedProjectId: this.task.projectId
      }
    },
    computed: {
      selectItems: function () {
        var items = []
        items.push({
          title: 'Home',
          id: null
        })
        if (this.$store.state.projects) {
          this.$store.state.projects.forEach(project => {
            var item = {}
            item.id = project.id
            item.title = project.title
            items.push(item)
          })
        }
        return items
      },
      getSelectedProject: function () {
        if (this.$store.state.projects) {
          var currentProject = this.$store.state.projects.filter(project =>
            project.id === this.selectedProjectId
          )
          return currentProject[0]
        }
      },
      selectIcon: function () {
        if (this.getSelectedProject) {
          return 'list'
        }
        return 'home'
      }
    },
    methods: {
      handleComplition () {
        firebase.firestore().doc('users/' + this.$store.state.authUser.uid + '/tasks/' + this.task.id)
          .update({
            completed: !this.task.completed
          })
      },
      handleEditTask () {
        firebase.firestore().doc('users/' + this.$store.state.authUser.uid + '/tasks/' + this.task.id)
          .update({
            title: this.task.title,
            projectId: (this.selectedProjectId) ? this.selectedProjectId : null,
            order: (this.selectedProjectId !== this.task.projectId) ? this.getSelectedProject.count : this.task.order
          })
          .then(() => {
            this.dialog = false
            this.$store.commit('setNotification', 'Task was successfully updated!')
          })
      },
      handleDeleteTask () {
        firebase.firestore().doc('users/' + this.$store.state.authUser.uid + '/tasks/' + this.task.id)
          .delete()
          .then(() => {
            this.dialog = false
            this.$store.commit('setNotification', 'Task was successfully deleted!')
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  }
</script>

<style scoped>
.list__tile__title.grey--text {
  text-decoration: line-through;
}
</style>
