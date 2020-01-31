<template>
  <div id="app">
    <Account :user="user" :error="error"/>
    <div class="error" v-if="error">Error: {{ error.message }}</div>
    <div v-if="user">
      <div id="nav">
        <router-link to="/">Dashboard</router-link>
        <router-link v-if="isAdmin" to="/announcements">Announcements</router-link>
        <router-link v-if="isAdmin || isAttendance" to="/attendance">Attendance</router-link>
        <router-link v-if="isAdmin || isCar" to="/carshow">Car Show</router-link>
        <router-link v-if="isAdmin" to="/event-sales">Event Sales</router-link>
        <router-link v-if="isAdmin || isExports" to="/exports">Exports</router-link>
        <router-link v-if="isAdmin || isGrades" to="/grades">Grades</router-link>
        <router-link v-if="isAdmin || isPizza" to="/pizza">Pizza</router-link>
        <router-link v-if="isAdmin || isRosters" to="/rosters">Rosters</router-link>
        <router-link v-if="isAdmin || isStudents" to="/students">Students</router-link>
        <router-link v-if="isAdmin || isTea" to="/tea">Tea</router-link>
        <router-link v-if="isAdmin" to="/transactions">Transactions</router-link>
        <router-link v-if="isAdmin || isYearbook" to="/yearbook">Yearbook</router-link>
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
        return this.$store.getters.roles.includes('Admin')
      }
      return false
    },
    isAttendance() {
      if (this.$store.getters.roles) {
        return this.$store.getters.roles.includes('Attendance')
      }
      return false
    },
    isCar() {
      if (this.$store.getters.roles) {
        return this.$store.getters.roles.includes('CarShow')
      }
      return false
    },
    isExports() {
      if (this.$store.getters.roles) {
        return this.$store.getters.roles.includes('Exports')
      }
      return false
    },
    isGrades() {
      if (this.$store.getters.roles) {
        return this.$store.getters.roles.includes('Grades')
      }
      return false
    },
    isPizza() {
      if (this.$store.getters.roles) {
        return this.$store.getters.roles.includes('Pizza')
      }
      return false
    },
    isStudents() {
      if (this.$store.getters.roles) {
        return this.$store.getters.roles.includes('Students')
      }
      return false
    },
    isTea() {
      if (this.$store.getters.roles) {
        return this.$store.getters.roles.includes('Tea')
      }
      return false
    },
    isRosters() {
      if (this.$store.getters.roles) {
        return this.$store.getters.roles.includes('Rosters')
      }
      return false
    },
    isYearbook() {
      if (this.$store.getters.roles) {
        return this.$store.getters.roles.includes('Yearbook')
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
  color: #2c3e50;
  font-weight: bold;
  padding: 0 1vw;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.error {
  color: red;
}
</style>
