<template>
  <div class="account">
    <div v-if="!user">
      Not logged in.
    </div>
    <div v-else>
      Logged in.
    </div>
  </div>
</template>

<script>
export default {
  props: ['user']
}
</script>

<style>
</style>
