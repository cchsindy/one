<template>
  <div>
    <input type="checkbox" v-model="showPast">Show Past Events
    <div class="event-list">
      <div v-for="item in filteredEvents" :key="item.id" class="event-item">
        <div class="item-id">ID: {{ item.id }}<br><button>Remove</button></div>
        <div class="item-content">
          <label>Name:</label>
          <input type="text" v-model="item.name" />
          <EventItemList :items="item.items" />
        </div>
        <div class="item-date">
          <label>Start:</label>
          <input type="datetime-local" v-model="item.startDate">
          <label>End:</label>
          <input type="datetime-local" v-model="item.endDate">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EventItemList from '@/components/EventItemList'
import moment from 'moment'

export default {
  components: {
    EventItemList
  },
  data: () => {
    return {
      events: [
        {
          id: 1,
          name: 'Event One',
          description: 'optional',
          image: 'option url',
          startDate: '2018-12-18T08:00',
          endDate: '2018-12-19T16:30',
          items: [
            {
              id: 1,
              name: 'item 1',
              available: 10,
              price: 5,
              description: 'optional',
              image: 'optional url'
            },
            { id: 2, name: 'item 2', available: 10, price: 5 }
          ]
        },
        {
          id: 2,
          name: 'Event Two',
          startDate: '2018-12-19T08:00',
          endDate: '2018-12-20T18:00',
          items: [
            { id: 3, name: 'item 3', available: 10, price: 5 },
            { id: 4, name: 'item 4', available: 10, price: 5 }
          ]
        },
        {
          id: 3,
          name: 'Event Three',
          startDate: '2018-12-20T08:00',
          endDate: '2018-12-21T12:00',
          items: [
            { id: 5, name: 'item 5', available: 10, price: 5 },
            { id: 6, name: 'item 6', available: 10, price: 5 }
          ]
        }
      ],
      showPast: false
    }
  },
  computed: {
    filteredEvents() {
      if (this.showPast) return this.events
      const now = moment().format('YYYY-MM-DDTHH:mm')
      return this.events.filter(e => e.endDate > now)
    }
  },
  methods: {}
}
</script>

<style scoped>
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
  width: 90%;
}
label {
  display: block;
  font-style: italic;
}
.event-item {
  border: solid 2px #ccc;
  display: grid;
  grid-template-columns: 2fr 6fr 3fr;
  margin-bottom: 2vh;
  padding: 1vw;
}
.item-id {
  align-self: center;
  grid-column: 1;
}
.item-content {
  align-self: center;
  grid-column: 2;
  margin: 0 1vw;
  text-align: left;
}
.item-date {
  align-self: center;
  grid-column: 3;
  text-align: left;
}
</style>
