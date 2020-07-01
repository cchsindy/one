<template>
  <div class="pizza-item">
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
        if (this.item.pizzas.hasOwnProperty(key)) {
          if (this.item.pizzas[key] > 0)
            o += this.item.pizzas[key] + ' ' + key + ' '
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
.pizza-item {
  background: #fff;
  border: solid 2px #ccc;
  margin-top: 1vh;
  padding: 1vw;
}
</style>
