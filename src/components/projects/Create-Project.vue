<template>

  <span>

    <v-list-tile @click.stop="dialog = !dialog" ripple>
      <v-list-tile-action>
        <v-icon light>add</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>Create a project</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>

    <v-dialog v-model="dialog" max-width="360px">
      <v-card>
         <v-card-title primary-title class="pb-0">
          <div><h3 class="headline mb-0">Create a project</h3></div>
        </v-card-title>
        <v-card-text class="pb-2">
          <v-text-field
            v-model.trim="projectTitle" 
            ref="refCreateProject" 
            label="Project Title"
            @keyup.enter="createProject()"
            autofocus 
          >
          </v-text-field>
          <v-btn block color="primary" class="mb-2" @click="createProject()">Create project</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>

  </span>

</template>

<script>
  import firebase from 'firebase'
  import 'firebase/firestore'

  export default {
    data () {
      return {
        dialog: false,
        projectTitle: '',
        errorCreateProject: []
      }
    },
    methods: {
      createProject () {
        if (this.newProjectTitle === '') {
          return
        }
        firebase.firestore().collection('users/' + this.$store.state.authUser.uid + '/projects')
          .add({
            title: this.projectTitle,
            order: this.$store.state.projects.length,
            count: 0
          })
          .then((project) => {
            this.$store.commit('setNotification', 'Project was created successfully!')
            this.projectTitle = ''
            this.dialog = false
            this.$router.push({
              name: 'Project',
              params: {
                projectId: project.id
              }
            })
          })
          .catch(error => {
            this.$store.commit('setToolbarTitle', error.message)
          })
      }
    }
  }
</script>
