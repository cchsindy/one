<template>
  <div class="event-list">
    <div class="event-id">
      <button @click="removeEvent" :disabled="isNew">Remove</button>
      <button @click="saveEvent" :disabled="hideSave">Save</button>
      <button @click="cancelEvent" :disabled="hideSave">Cancel</button>
    </div>
    <div class="event-name">
      <label>Name:</label>
      <input type="text" v-model="event.name">
    </div>
    <div class="event-date">
      <label>Start:</label>
      <input type="datetime-local" v-model="event.start_date">
      <label>End:</label>
      <input type="datetime-local" v-model="event.end_date">
    </div>
    <div class="event-item-list">
      <EventItemList :items="event.items" ref="itemList"/>
    </div>
  </div>
</template>

<script>
import EventItemList from '@/components/event/EventItemList'

export default {
  components: {
    EventItemList
  },
  computed: {
    isNew() {
      return this.event.id.substring(0, 3) === 'NEW'
    }
  },
  data: () => {
    return {
      hideSave: true
    }
  },
  methods: {
    cancelEvent() {
      this.$store.dispatch('cancelEvent', this.event.id)
      this.isReset = true
    },
    removeEvent() {
      this.$store.dispatch('removeEvent', this.event.id)
    },
    saveEvent() {
      this.$store.dispatch('saveEvent', this.event.id)
      this.isReset = true
    }
  },
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  watch: {
    event: {
      handler: function() {
        if (this.isReset) {
          this.hideSave = true
          this.isReset = false
        } else {
          this.hideSave = false
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
