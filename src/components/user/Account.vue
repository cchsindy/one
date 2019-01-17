<template>
  <div class="account">
    <div v-if="!user">Not logged in.
      <form @submit.prevent="onSubmit">
        Email:
        <input type="email" v-model="email">
        Password:
        <input type="password" v-model="password">
        <div v-if="matches.length > 1" class="accounts">
          <h2>Multiple Accounts Found</h2>Please select who you're signing up for:
          <select v-model="account">
            <option
              v-for="match in matches"
              :key="match.bbid"
              :value="match.bbid"
            >{{ match.first }} {{ match.last }}</option>
          </select>
        </div>
        <input type="submit" value="Login">
      </form>OR
      <br>
      <BaseButton @click="googleLogin">Login with Google</BaseButton>
    </div>
    <div v-else>
      Logged in as {{ user }}.
      <BaseButton @click="logout">Logout</BaseButton>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      account: null
    }
  },
  props: ['user', 'error'],
  computed: {
    matches() {
      return '' // this.$store.getters.matches
    }
  },
  methods: {
    onSubmit() {
      if (this.error && this.error.code === 'auth/user-not-found') {
        // this.$store.dispatch('checkForMatch', {
        //   email: this.email
        // })
        // this.$store.dispatch('createUser', {
        //   email: this.email,
        //   password: this.password
        // })
      } else {
        this.$store.dispatch('loginUser', {
          email: this.email,
          password: this.password
        })
      }
    },
    googleLogin() {
      this.$store.dispatch('googleSignin')
    },
    logout() {
      this.$store.dispatch('logoutUser')
    }
  }
}
</script>

<style>
</style>
