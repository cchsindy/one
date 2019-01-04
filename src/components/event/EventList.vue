<template>
  <div>
    <BaseButton @click="addEvent">Add Event</BaseButton>
    <br>
    <br>
    <Event v-for="item in events" :key="item.id" :event="item"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Event from '@/components/event/Event'
import moment from 'moment'

export default {
  components: {
    Event
  },
  computed: mapState({
    events: state => state.event.events
  }),
  methods: {
    addEvent() {
      const now = moment()
      const newEvent = {
        id: 'NEW' + Date.now(),
        name: '',
        description: '',
        image: '',
        start_date: now.format('YYYY-MM-DDTHH:mm'),
        end_date: now.add(1, 'day').format('YYYY-MM-DDTHH:mm'),
        items: []
      }
      this.$store.dispatch('addEvent', newEvent)
    }
  }
}
</script>

<style scoped>
</style>
