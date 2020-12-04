<template>
  <div>
    <h1>Update Attendance</h1>
  </div>
</template>

<script>
export default {
  methods: {},
  mounted: async function() {
    const sky = this.$store.state.fbFunctions.httpsCallable('skyapi')
    const result = await sky({
      product: 'school',
      url: 'attendance',
      params: {
        level_id: 2175,
        day: '2020-11-30',
        offering_type: 1,
        // excuse_type: 9105,
      },
    })
    console.log(result)
  },
}
</script>
