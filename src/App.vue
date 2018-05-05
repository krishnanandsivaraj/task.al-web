<template>
  <v-app light>

    <v-navigation-drawer v-if="!$store.state.authUser" v-model="drawer" fixed app>
      <loading></loading>
    </v-navigation-drawer>

    <v-navigation-drawer v-else v-model="drawer" fixed app>
      
      <v-list-tile key="home" to="/" ripple>
        <v-list-tile-action>
          <v-icon light>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Home</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-list-tile-action-text>{{$store.state.homeTasksCount}}</v-list-tile-action-text>
        </v-list-tile-action>
      </v-list-tile>
      
      <v-divider></v-divider>

      <projects-list></projects-list>

      <v-divider></v-divider>
      <create-project></create-project>

      <v-divider></v-divider>
    
      <v-list-tile v-if="this.$store.state.authUser.email !== null" key="settings" to="/settings" ripple>
        <v-list-tile-action>
          <v-icon light>settings</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{$store.state.authUser.email}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile color="orange" v-if="$store.state.authUser.email === null" key="guest-mode" to="/guest-mode" ripple>
        <v-list-tile-action>
          <v-icon light color="orange">warning</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Guest mode</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-divider></v-divider>
      
    </v-navigation-drawer>

    <v-toolbar fixed dark color="primary" dense app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="$store.state.toolbarTitle"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="$store.state.authUser && $store.state.authUser.email === null && $route.path !== '/guest-mode'" class="hidden-lg-and-up" icon key="guest-mode" to="/guest-mode" ripple>
        <v-icon color="yellow">warning</v-icon>
      </v-btn>
      <project-menu></project-menu>
    </v-toolbar>

    <v-content>

      <v-container fluid style="max-width:720px">
        <v-slide-y-transition mode="out-in">
          <router-view :key="$route.params.projectId"></router-view>
        </v-slide-y-transition>
      </v-container>
    </v-content>

    <notification></notification>

  </v-app>
</template>

<script>
  // import firebase from 'firebase'
  import Loading from '@/components/util/Loading'
  import Notification from '@/components/util/Notification'
  import AskSigninDialog from '@/components/user/Ask-Signin-Dialog'
  import ProjectsList from '@/components/projects/Projects-List'
  import CreateProject from '@/components/projects/Create-Project'
  import ProjectMenu from '@/components/projects/Project-Menu'

  export default {
    components: {
      Loading, Notification, AskSigninDialog, ProjectsList, CreateProject, ProjectMenu
    },
    data: () => ({
      drawer: null
    }),
    methods: {
    },
    created () {
      // firebase.auth().signOut()
    }
  }
</script>
