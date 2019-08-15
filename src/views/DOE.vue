<template>
  <div>
    <h1>DOE Exports</h1>
    <BaseButton @click="getSTN">STN</BaseButton>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      stnData: null
    }
  },
  methods: {
    getSTN() {
      const d = this.$store.state.fbFunctions.httpsCallable('onapi')
      d({ url: `list/91346`, params: {} }).then(result => {
        this.stnData = result.data
      })
    }
  }
}
</script>

<style scoped>
</style>
