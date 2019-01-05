<template>
  <div id="app">
    <Account :user="user" :error="error"/>
    <div class="error" v-if="error">Error: {{ error.message }}</div>
    <div v-if="user">
      <div id="nav">
        <router-link to="/">Dashboard</router-link>&nbsp;&nbsp;|&nbsp;
        <router-link to="/announcements">Announcements</router-link>&nbsp;&nbsp;|&nbsp;
        <router-link to="/event-sales">Event Sales</router-link>
      </div>
      <router-view/>
    </div>
    <div v-else>
      <br>
      <i>* You must be logged in to use this site.</i>
    </div>
  </div>
</template>

<script>
import Account from '@/components/user/Account'

export default {
  components: {
    Account
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
    error() {
      return this.$store.getters.error
    },
    isAdmin() {
      if (this.$store.getters.roles) {
        return this.$store.getters.roles.includes('Attendance Admin')
      }
      return false
    }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('loginUser', {
        email: this.email,
        password: this.password
      })
    },
    logout() {
      this.$store.dispatch('logoutUser')
    },
    googleSignin() {
      this.$store.dispatch('googleSignin')
    }
  },
  mounted() {
    this.$store.dispatch('initAuth')
  }
}
</script>


<style>
@import url('https://fonts.googleapis.com/css?family=Work+Sans');

body {
  background: #eee;
}

#app {
  font-family: 'Work Sans', sans-serif;
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
