<template>
  <div>
    <h1>Pizza Fundraiser</h1>
    <BaseButton>Download CSV</BaseButton>
    <div class="pizza-totals">
      <div class="total">Cheese: {{totalCheese}}</div>
      <div class="total">Pepperoni: {{totalPepperoni}}</div>
      <div class="total">Sausage: {{totalSausage}}</div>
      <div class="total">Combo: {{totalCombo}}</div>
      <div class="total">GF Cheese: {{totalGFcheese}}</div>
      <div class="total">GF Pepperoni: {{totalGFpepperoni}}</div>
      <div class="total">GF Sausage: {{totalGFsausage}}</div>
      <div class="total">GF Combo: {{totalGFcombo}}</div>
      <div
        class="total"
      >Total Pizzas: {{totalCheese + totalPepperoni + totalSausage + totalCombo + totalGFcheese + totalGFpepperoni + totalGFsausage + totalGFcombo}}</div>
      <div class="total">Total Raised: ${{totalRaised}}</div>
    </div>
    <div class="pizza-list">
      <PizzaItem v-for="item in transactions" :key="item.transaction" :item="item"/>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import PizzaItem from '@/components/pizza/PizzaItem'

export default {
  components: {
    PizzaItem
  },
  computed: {
    ...mapGetters([
      'totalCheese',
      'totalPepperoni',
      'totalSausage',
      'totalCombo',
      'totalGFcheese',
      'totalGFpepperoni',
      'totalGFsausage',
      'totalGFcombo',
      'totalRaised'
    ]),
    ...mapState({
      transactions: state => state.pizza.transactions
    })
  },
  created() {
    this.$store.dispatch('fetchTransactions')
  }
}
</script>

<style scoped>
.pizza-totals {
  background: #555;
  color: #fff;
  display: flex;
  flex-wrap: wrap;
  margin: 2vh 0;
  padding: 1vw;
}
.total {
  border: dashed 2px #ccc;
  flex-grow: 1;
  margin: 0.5vw;
  padding: 1vw;
}
</style>
