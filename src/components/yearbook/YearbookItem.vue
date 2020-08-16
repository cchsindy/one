<template>
  <div class="transaction-item">
    {{item.lastname}},
    {{item.firstname}}
    [{{item.books}} book(s) for
    {{item.students}}]
    {{item.amount}}
    {{item.date}}
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.transaction-item {
  background: #fff;
  border: solid 2px #ccc;
  margin-top: 1vh;
  padding: 1vw;
}
</style>
