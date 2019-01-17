<template>
  <div>
    <h1>Pizza Fundraiser</h1>
    <BaseButton @click="downloadCSV">Download CSV</BaseButton>
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
  methods: {
    downloadCSV() {
      const rows = [
        [
          'date',
          'lastname',
          'firstname',
          'address',
          'city',
          'state',
          'zip',
          'phone',
          'email',
          'student',
          'amount',
          'donation',
          'cheese',
          'pepperoni',
          'sausage',
          'combo',
          'GFcheese',
          'GFpepperoni',
          'GFsausage',
          'GFcombo',
          'transaction'
        ]
      ]
      this.transactions.forEach(trans => {
        rows.push([
          new Date(trans.date).toDateString(),
          trans.lastname,
          trans.firstname,
          trans.address,
          trans.city,
          trans.state,
          trans.zip,
          trans.phone,
          trans.email,
          trans.student,
          trans.amount,
          trans.donation,
          trans.pizzas.cheese,
          trans.pizzas.pepperoni,
          trans.pizzas.sausage,
          trans.pizzas.combo,
          trans.pizzas.gfCheese,
          trans.pizzas.gfPepperoni,
          trans.pizzas.gfSausage,
          trans.pizzas.gfCombo,
          trans.transaction
        ])
      })
      let csvContent = 'data:text/csv;charset=utf-8,'
      rows.forEach(function(rowArray) {
        let row = rowArray.join(',')
        csvContent += row + '\r\n'
      })
      var encodedUri = encodeURI(csvContent)
      window.open(encodedUri)
    }
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
