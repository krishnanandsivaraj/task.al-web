<template>

  <v-list-tile @click="dialog = true">
    <v-list-tile-title>Project settings</v-list-tile-title>

    <v-dialog v-model="dialog" max-width="360px">

      <v-card>
        <v-card-text class="pb-1">
          <v-text-field v-model.trim="projectTitle" hint="Press enter to save" label="Edit project title" :error-messages="errorEditProjectTitle" @keyup.enter="editProjectTitle()"></v-text-field>
        </v-card-text>
        <v-card-actions class="pl-3 pr-3 pb-3">
          <v-spacer></v-spacer>
          <v-btn v-if="!confimDelete" outline color="error" small @click="confimDelete = true">Delete project</v-btn>
          <v-btn v-if="confimDelete" color="grey darken-1" outline small @click.stop="confimDelete = false">Cancel</v-btn>
          <v-btn v-if="confimDelete" color="error" small @click.stop="deleteProject()">Confirm Delete</v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>

  </v-list-tile>

</template>

<script>
  import firebase from 'firebase'
  import 'firebase/firestore'

  export default {
    data () {
      return {
        dialog: false,
        newTitle: null,
        errorEditProjectTitle: [],
        confimDelete: false
      }
    },
    computed: {
      projectTitle: {
        get: function () {
          if (this.$store.state.currentProject.title) {
            return this.$store.state.currentProject.title
          }
        },
        set: function (newValue) {
          this.newTitle = newValue
        }
      }
    },
    methods: {
      editProjectTitle () {
        firebase.firestore().doc('users/' + firebase.auth().currentUser.uid + '/projects/' + this.$route.params.projectId)
          .update({
            title: this.newTitle
          })
          .then(() => {
            this.newTitle = null
            this.dialog = false
          })
      },
      deleteProject () {
        firebase.firestore().doc('users/' + firebase.auth().currentUser.uid + '/projects/' + this.$route.params.projectId)
          .delete()
          .then(() => {
            this.dialog = false
            this.$store.commit('setNotification', 'Project successfully deleted')
            this.$router.push('/')
            this.confimDelete = false
          })
      }
    }
  }
</script>
