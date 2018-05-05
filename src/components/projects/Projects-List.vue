<template>

  <v-layout row wrap align-center>
    <v-flex class="text-xs-center">

      <div v-if="!$store.state.projects" class="pa-4">
        <v-progress-circular indeterminate :size="24" :width="2" color="blue"></v-progress-circular>
      </div>

      <div v-if="$store.state.projects && $store.state.projects.length === 0" class="pa-4">
        <v-icon class="grey--text" large>list</v-icon>
        <p class="grey--text mb-0">No projects yet</p>
      </div>

      <v-list v-if="$store.state.projects && $store.state.projects.length > 0">
        <v-subheader>Projects</v-subheader>
        <draggable v-model="$store.state.projects" @sort="sortProjects">
          <v-list-tile v-for="project in $store.state.projects" :key="project.id" :to="{name: 'Project', params: { projectId: project.id }}">
            <v-list-tile-action>
              <v-icon v-if="!project.shared" light>list</v-icon>
              <v-icon v-else light>group</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{project.title}}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action-text>{{project.count}}</v-list-tile-action-text>
          </v-list-tile>
        </draggable>
      </v-list>

    </v-flex>
  </v-layout>

</template>

<script>
  import firebase from 'firebase'
  import 'firebase/firestore'

  import Draggable from 'vuedraggable'

  export default {
    components: {
      Draggable
    },
    data () {
      return {
      }
    },
    methods: {
      sortProjects () {
        this.$store.state.projects.forEach((project, index) => {
          firebase.firestore().doc('users/' + this.$store.state.authUser.uid + '/projects/' + project.id)
            .update({
              'order': index
            })
        })
        this.$store.commit('setNotification', 'Projects sorted successfully')
      }
    }
  }
</script>

<style scoped>
</style>
