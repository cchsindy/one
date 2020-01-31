<template>
  <div class="tea-item">
    {{item.lastname}},
    {{item.firstname}}
    ${{item.amount}}
    [ {{item.phone}} {{item.email}} ]
    ({{total}})
    {{date}}
  </div>
</template>

<script>
export default {
  computed: {
    date() {
      return new Date(this.item.date).toDateString()
    },
    total() {
      let t = 0
      t += this.item.tickets.thursday
      t += this.item.tickets.friday
      t += this.item.tickets.saturday
      return t
    }
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.tea-item {
  background: #fff;
  border: solid 2px #ccc;
  margin-top: 1vh;
  padding: 1vw;
}
</style>
