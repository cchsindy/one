<template>
  <div class="container">
    <div v-for="item in announcements" :key="item.id" class="announcements">
      <div class="announcement-item" :class='item.category'>{{item.text}}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState({
    announcements: state => state.announcements.announcements
  }),
  created() {
    this.$store.dispatch('fetchAnnouncements')
  }
}
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 5fr 1fr;
  height: 100vh;
  width: 100vw;
}
.announcements {
  background: #fff;
  grid-column: 1 / span 2;
  grid-row: 1 / span 2;
  display: flex;
  flex-wrap: wrap;
  padding: 1vw;
  /* align-items: stretch; */
  align-content: stretch;
  /* justify-content: center; */
  overflow-y: scroll;
}
.announcement-item {
  color: #fff;
  display: flex;
  font-size: 3em;
  flex: 1 0 25vw;
  /* flex-basis: 25vw; */
  /* flex-grow: 1; */
  margin: 1vw;
  /* max-width: 40%; */
  opacity: 1;
  transition: opacity 2s ease;
  padding: 2vw;
  text-align: center;
  /* align-content: center; */
  /* flex-direction: column; */
}
.wide {
  /* flex-grow: 25; */
  /* flex-basis: 50vw; */
  flex: 1 1 auto;
}
.general {
  background: #790000;
}
.two {
  background: #f1e2a0;
}
.three {
  background: #90badd;
}
.four {
  background: #df9056;
}
.five {
  background: #c89804;
}
.item-text {
  /* background: #555; */
  flex-grow: 1;
  align-self: center;
}
</style>
