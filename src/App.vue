<template>
  <div id="app">
    <!-- <Account :user="user" :error="error"/> -->
    <!-- <div class="error" v-if="error">Error: {{ error.message }}</div> -->
    <!-- <div v-if="user"> -->
    <div id="nav">
      <router-link to="/">Dashboard</router-link>&nbsp;&nbsp;|&nbsp;
      <router-link to="/announcements">Announcements</router-link>&nbsp;&nbsp;|&nbsp;
      <router-link to="/event-sales">Event Sales</router-link>
    </div>
    <router-view/>
    <!-- </div> -->
    <!-- <div v-else><br><i>* You must be logged in to use this site.</i></div> -->
  </div>
</template>

<script>
// import { mapActions, mapState } from 'vuex'
// import Account from '@/components/Account'

export default {
  components: {
    // Account
  },
  computed: {
    // ...mapState(['user/user', 'user/error'])
    // user() {
    //   return ''
    // return this.$store.user.getters.user
    // },
    // error() {
    //   return ''
    // return this.$store.user.getters.error
    // }
    // isAdmin() {
    //   if (this.$store.getters.roles) {
    //     return this.$store.getters.roles.includes('Attendance Admin')
    //   }
    //   return false
    // }
  }
  // methods: mapActions('onSubmit', 'logout', 'googleSignin'),
  // onSubmit() {
  //   this.$store.user.dispatch('loginUser', {
  //     email: this.email,
  //     password: this.password
  //   })
  // },
  // logout() {
  //   this.$store.user.dispatch('logoutUser')
  // },
  // googleSignin() {
  //   this.$store.user.dispatch('googleSignin')
  // }

  // mounted: mapActions('initAuth')
  // this.$store.user.dispatch('initAuth')
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.error {
  color: red;
}
</style>
