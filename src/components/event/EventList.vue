<template>
  <div>
    <BaseButton @click="addEvent">Add Event</BaseButton>
    <br>
    <br>
    <Event v-for="item in events" :key="item.id" class="event" :event="item"/>
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

<style>
input {
  border: none;
  font-family: 'Work Sans', sans-serif;
  font-size: 1em;
}
input:focus {
  border-bottom: solid 2px #ccc;
  outline: none;
}
input[type='text'] {
  width: 100%;
}
label {
  color: #777;
  display: block;
  font-style: italic;
}
.event {
  border: solid 2px #ccc;
  display: grid;
  grid-template-columns: 2fr 6fr 3fr;
  margin-bottom: 2vh;
  padding: 1vw;
}
.event-id {
  align-self: center;
  color: #aaa;
  grid-column: 1;
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
