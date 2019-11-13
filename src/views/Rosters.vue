<template>
  <div>
    <h1>Class Roster Emails</h1>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      sections: null
    }
  },
  methods: {
    loadSections() {
      const d = this.$store.state.fbFunctions.httpsCallable('skyapi')
      getSections(d).then(data => {
        this.sections = data
      })
    }
  },
  mounted: function() {
    this.loadSections()
  }
}

async function getSections(f) {
  const sections = await f({
    product: 'school',
    url: 'levels',
    params: {}
    //params: { level_num: 1, school_year: '2019-2020' }
  })
  console.log(sections)
  return sections.data
}
</script>

<style scoped>
</style>
