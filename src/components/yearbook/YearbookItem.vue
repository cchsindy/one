<template>
  <div class="transaction-item">
    {{item.lastname}},
    {{item.firstname}}
    [{{item.books}} book(s) for 
    {{item.students}}]
    {{item.amount}}
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
.transaction-item {
  background: #fff;
  border: solid 2px #ccc;
  margin-top: 1vh;
  padding: 1vw;
}
</style>
