<template>
  <div>
    <h1>Student Picture Directory</h1>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      students: []
    }
  },
  methods: {
    loadStudents() {
      const d = this.$store.state.fbFunctions.httpsCallable('onapi')
      onApi(d).then(data => {
        this.students = data
      })
    }
  },
  mounted: function() {
    this.loadStudents()
  }
}

async function onApi(f) {
  const g1 = await f({ url: `user/all`, params: { roleIDs: 62829 } })
  const g2 = await f({
    url: `user/all`,
    params: { roleIDs: 62829, startRow: 201, endRow: 400 }
  })
  return g1.data.concat(g2.data)
}
</script>

<style scoped>
</style>
