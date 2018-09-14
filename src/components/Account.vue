<template>
  <div class="account">
    <div v-if="!user">
      Not logged in.
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
  props: ['user'],
  methods: {
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
