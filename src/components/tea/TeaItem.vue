<template>
  <div class="tea-item">
    {{item.lastname}},
    {{item.firstname}}
    ${{item.amount}}
    [ {{item.phone}} {{item.email}} ]
    {{order}}
    ({{item.student}})
    {{date}}
  </div>
</template>

<script>
export default {
  computed: {
    date() {
      return new Date(this.item.date).toDateString()
    },
    order() {
      let o = ''
      for (const key in this.item.pizzas) {
        if (this.item.tickets.hasOwnProperty(key)) {
          if (this.item.tickets[key] > 0)
            o += this.item.tickets[key] + ' ' + key + ' '
        }
      }
      return o
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
