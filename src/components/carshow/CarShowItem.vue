<template>
  <div class="transaction-item">
    {{item.lastname}},
    {{item.firstname}}
    ({{item.year}}
    {{item.make}}
    {{item.model}})
    [{{amount}}]
    {{date}}
  </div>
</template>

<script>
export default {
  computed: {
    date() {
      return new Date(this.item.date).toDateString()
    },
    amount() {
      let a = this.item.transaction
      if (a !== 'Pay At Check-in') a = '$' + this.item.amount
      return a
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
.transaction-item {
  background: #fff;
  border: solid 2px #ccc;
  margin-top: 1vh;
  padding: 1vw;
}
</style>
