<template>
  <div>
    <input type="checkbox" v-model="showPast">Show Past Events
    <button>Add Event</button>
    <div class="event-list">
      <div v-for="item in filteredEvents" :key="item.id" class="event">
        <div class="event-id">
          ID: {{ item.id }}
          <br>
          <button>Remove</button>
        </div>
        <div class="event-name">
          <label>Name:</label>
          <input type="text" v-model="item.name">
        </div>
        <div class="event-date">
          <label>Start:</label>
          <input type="datetime-local" v-model="item.startDate">
          <label>End:</label>
          <input type="datetime-local" v-model="item.endDate">
        </div>
        <div class="event-item-list">
          <EventItemList :items="item.items"/>
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
          name: '2019 Pizza Fundraiser',
          description: 'optional',
          image: 'option url',
          startDate: '2019-01-15T00:00',
          endDate: '2019-01-20T16:30',
          items: [
            {
              id: 1,
              name: 'Cheese Pizza',
              description: 'optional',
              image: '/images/cheese.jpg',
              limit: 0,
              sold: 0,
              price: 12
            },
            {
              id: 2,
              name: 'Pepperoni Pizza',
              description: 'optional',
              image: '/images/pepperoni.jpg',
              limit: 0,
              sold: 0,
              price: 13
            },
            {
              id: 3,
              name: 'Sausage Pizza',
              description: 'optional',
              image: '/images/sausage.jpg',
              limit: 0,
              sold: 0,
              price: 13
            },
            {
              id: 4,
              name: 'Combo Pizza',
              description: 'optional',
              image: '/images/combo.jpg',
              limit: 0,
              sold: 0,
              price: 15
            }
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
