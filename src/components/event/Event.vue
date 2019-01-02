<template>
  <div>
    <div class="event-id">
      <button @click="removeEvent">Remove</button>
      <button @click="saveEvent" :disabled="hideSave">Save</button>
      <button @click="cancelEvent" :disabled="hideSave">Cancel</button>
    </div>
    <div class="event-name">
      <label>Name:</label>
      <input type="text" v-model="localEvent.name">
    </div>
    <div class="event-date">
      <label>Start:</label>
      <input type="datetime-local" v-model="localEvent.start_date">
      <label>End:</label>
      <input type="datetime-local" v-model="localEvent.end_date">
    </div>
    <div class="event-item-list">
      <EventItemList :items="localEvent.items" ref="itemList"/>
    </div>
  </div>
</template>

<script>
import EventItemList from '@/components/event/EventItemList'

export default {
  components: {
    EventItemList
  },
  data: () => {
    return {
      hideSave: true,
      localEvent: {}
    }
  },
  methods: {
    cancelEvent() {
      this.localEvent.name = this.cachedEvent.name
      this.localEvent.start_date = this.cachedEvent.start_date
      this.localEvent.end_date = this.cachedEvent.end_date
      this.$refs.itemList.resetData()
    },
    removeEvent() {
      this.$store.dispatch('removeEvent', this.event.id)
    },
    saveEvent() {
      // save to firestore
    }
  },
  created() {
    this.localEvent = this.event
    this.cachedEvent = JSON.parse(JSON.stringify(this.event))
  },
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  watch: {
    localEvent: {
      handler: function() {
        if (
          JSON.stringify(this.cachedEvent) !== JSON.stringify(this.localEvent)
        ) {
          this.hideSave = false
        } else {
          this.hideSave = true
        }
      },
      deep: true
    }
  }
}
</script>

<style>
button:disabled {
  display: none;
}
</style>
