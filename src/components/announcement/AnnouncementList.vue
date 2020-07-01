<template>
  <div class="announcement-list">
    <div v-for="item of announcements" :key="item.id" class="announcement-item">
      <div class="item-id">ID: {{ item.id }}<br><BaseButton>Remove</BaseButton></div>
      <div class="item-content" contenteditable="true">{{ item.text }}</div>
      <BaseInput label="From:" type="datetime-local" v-model="item.start_date"/>
      <br><BaseInput label="To:" type="datetime-local" v-model="item.end_date"/>
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
.announcement-item {
  border: solid 2px #ccc;
  display: grid;
  grid-template-columns: 2fr 6fr 2fr;
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
}
.item-date {
  align-self: center;
  grid-column: 3;
  text-align: right;
}
</style>
