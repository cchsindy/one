<template>
  <div>
    <button @click="addEvent">Add Event</button>
    <br>
    <br>
    <div class="event-list">
      <div v-for="item in event.events" :key="item.id" class="event">
        <div class="event-id">
          <button @click="removeEvent" :data-id="item.id">Remove</button>
        </div>
        <div class="event-name">
          <label>Name:</label>
          <input type="text" v-model="item.name">
        </div>
        <div class="event-date">
          <label>Start:</label>
          <input type="datetime-local" v-model="item.start_date">
          <label>End:</label>
          <input type="datetime-local" v-model="item.end_date">
        </div>
        <div class="event-item-list">
          <EventItemList :items="item.items"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import EventItemList from '@/components/event/EventItemList'
import moment from 'moment'

export default {
  components: {
    EventItemList
  },
  computed: {
    ...mapState(['event'])
  },
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
    },
    removeEvent(e) {
      this.$store.dispatch('removeEvent', e.target.dataset.id)
    }
  }
}
</script>

<style>
button {
  background: none;
  border: solid 2px #ccc;
  font-family: 'Work Sans', sans-serif;
  font-size: 1em;
  padding: 0.5vw;
}
button:focus {
  border: solid 2px #000;
  outline: none;
}
button:hover {
  background: #ccc;
  color: #fff;
  cursor: pointer;
}
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
