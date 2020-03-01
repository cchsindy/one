<template>
  <div class="spec-item">
    {{item.lastname}},
    {{item.firstname}}
    ${{item.amount}}
    [ {{item.email}} ]
    ({{item.tickets}} tickets)
    {{date}}
  </div>
</template>

<script>
export default {
  computed: {
    date() {
      return new Date(this.item.date).toDateString()
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
.spec-item {
  background: #fff;
  border: solid 2px #ccc;
  margin-top: 1vh;
  padding: 1vw;
}
</style>
