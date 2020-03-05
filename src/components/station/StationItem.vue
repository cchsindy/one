<template>
  <div class="station-item">
    {{date}}:
    {{item.card}}
    - {{item.event}}
  </div>
</template>

<script>
export default {
  computed: {
    date() {
      return new Date(this.item.date);
    }
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.station-item {
  background: #fff;
  border: solid 2px #ccc;
  margin-top: 1vh;
  padding: 1vw;
}
</style>
