<template>
  <div class="account">
    <div v-if="!user">
      Not logged in.
      <form @submit.prevent="onSubmit">
        <input
          type="email"
          v-model="email" />
        <input
          type="password"
          v-model="password" />
        <input type="submit" value="Login" />
      </form>
      <button @click="googleLogin">Login with Google</button>
    </div>
    <div v-else>
      Logged in.
      <button @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  props: ['user'],
  methods: {
    onSubmit() {
      this.$store.dispatch('loginUser', {
        email: this.email,
        password: this.password
      })
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
