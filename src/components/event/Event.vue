<template>
  <div class="event">
    <div class="event-id">
      <BaseButton @click="removeEvent" :disabled="isNew">Remove</BaseButton>
      <BaseButton @click="saveEvent" :disabled="hideSave">Save</BaseButton>
      <BaseButton @click="cancelEvent" :disabled="hideSave">Cancel</BaseButton>
    </div>
    <div class="event-name">
      <BaseInput label="Name:" type="text" v-model="event.name"/>
      <BaseInput label="Header Image:" type="url" v-model="event.image"/>
      <img :src="event.image">
      <BaseTextArea label="Description:" v-model="event.description"/>
    </div>
    <div class="event-date">
      <BaseInput label="Start:" type="datetime-local" v-model="event.start_date"/>
      <BaseInput label="End:" type="datetime-local" v-model="event.end_date"/>
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
      // Add "Are you sure?" confirmation
      this.$store.dispatch('removeEvent', this.event.id)
    },
    saveEvent() {
      this.$store.dispatch('saveEvent', this.event.id)
      this.hideSave = true
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
        // also check store if modified from outside the app?
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

<style scoped>
img {
  margin-top: 1vh;
  width: 100%;
}
.event {
  background: #fff;
  border: solid 2px #ccc;
  display: grid;
  grid-template-columns: 2fr 6fr 3fr;
  margin-bottom: 2vh;
  padding: 1vw;
}
.event-id {
  align-items: center;
  align-self: center;
  color: #aaa;
  display: flex;
  grid-column: 1;
  justify-content: space-around;
}
.event-name {
  align-self: center;
  grid-column: 2;
  margin: 0 1vw;
  text-align: left;
}
.event-date {
  align-self: center;
  grid-column: 3;
  margin: 0 1vw;
  text-align: left;
}
.event-item-list {
  grid-column-start: 1;
  grid-column-end: 4;
}
@media (max-width: 800px) {
  .event {
    grid-template-columns: 100%;
  }
  .event-name {
    grid-column: 1;
  }
  .event-date {
    grid-column: 1;
  }
  .event-item-list {
    grid-column-start: 1;
    grid-column-end: 1;
  }
}
</style>
