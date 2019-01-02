<template>
  <div>
    <h1>Event Sales</h1>
    <EventList/>
  </div>
</template>

<script>
import EventList from '@/components/event/EventList'

export default {
  components: {
    EventList
  },
  created() {
    this.$store.dispatch('fetchEvents')
  }
}
</script>

<style scoped>
</style>
