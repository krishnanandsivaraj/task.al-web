<template>

  <v-menu v-if="$route.params.projectId && $store.state.currentProject" bottom left class="mr-0">
    
    <v-btn class="hidden-md-and-down teal" icon slot="activator">
      <v-icon>more_vert</v-icon>
    </v-btn>

    <v-btn class="hidden-lg-and-up" icon slot="activator">
      <v-icon>more_vert</v-icon>
    </v-btn>

    <v-list>
      <v-list-tile ripple @click="editProjectTitleDialog = !editProjectTitleDialog">
        <v-list-tile-content>
          <v-list-tile-title>Edit project title</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile ripple @click="deleteProjectDialog = !deleteProjectDialog">
        <v-list-tile-content>
          <v-list-tile-title>Delete project</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

    <v-dialog v-model="editProjectTitleDialog" max-width="360px">
      <v-card>
         <v-card-title primary-title class="pb-0">
          <div><h3 class="headline mb-0">Edit project title</h3></div>
        </v-card-title>
        <v-card-text class="pb-2">
          <v-text-field
            v-model.trim="$store.state.currentProject.title" 
            ref="refCreateProject" 
            label="Project Title"
            @keyup.enter="handleEditProjectTitle()"
            autofocus 
          >
          </v-text-field>
          <v-btn block color="primary" class="mb-2" @click="handleEditProjectTitle()">Save</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteProjectDialog" max-width="360px">
      <v-card>
         <v-card-title primary-title class="pb-0">
          <div><h3 class="headline mb-0">Confirm Delete</h3></div>
        </v-card-title>
        <v-card-text class="pb-2">
          <p>IMPORTANT: Deleting a project can't be undone. Please confirm below</p>
          <v-btn block color="red white--text" class="mb-2" @click="handleDeleteProject()">Confirm Delete</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>

  </v-menu>

</template>

<script>
  import firebase from 'firebase'
  export default {
    data () {
      return {
        editProjectTitleDialog: false,
        deleteProjectDialog: false
      }
    },
    methods: {
      handleEditProjectTitle () {
        firebase.firestore().doc('users/' + firebase.auth().currentUser.uid + '/projects/' + this.$route.params.projectId)
          .update({
            title: this.$store.state.currentProject.title
          })
          .then(() => {
            this.editProjectTitleDialog = false
            this.$store.commit('setNotification', 'Project title was updated successfully!')
          })
      },
      handleDeleteProject () {
        firebase.firestore().doc('users/' + firebase.auth().currentUser.uid + '/projects/' + this.$route.params.projectId)
          .delete()
          .then(() => {
            this.$store.commit('setNotification', 'Project deleted successfully!')
            this.deleteProjectDialog = false
            this.$router.replace('/')
          })
          .catch(error => {
            this.$store.commit('setNotification', error.message)
          })
      }
    }
  }
</script>
