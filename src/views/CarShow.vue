<template>
  <div>
    <h1>Car Show Registrations</h1>
    <BaseButton @click="downloadCSV">Download CSV</BaseButton>
    <div class="transaction-totals">
      <div class="total">Registrations: {{totalCarShowTransactions}}</div>
      <div class="total">Total Amount: ${{totalCarShowAmount}}</div>
    </div>
    <div class="transaction-list">
      <CarShowItem v-for="item in transactions" :key="item.id" :item="item"/>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import CarShowItem from '@/components/carshow/CarShowItem'

export default {
  components: {
    CarShowItem
  },
  computed: {
    ...mapGetters(['totalCarShowTransactions', 'totalCarShowAmount']),
    ...mapState({
      transactions: state => state.transactions.transactions
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
          'email',
          'phone',
          'year',
          'make',
          'model',
          'features',
          'release',
          'transaction',
          'amount'
        ]
      ]
      this.transactions.forEach(trans => {
        let t = [
          new Date(trans.date).toDateString(),
          trans.lastname,
          trans.firstname,
          trans.address,
          trans.city,
          trans.state,
          trans.zip,
          trans.email,
          trans.phone,
          trans.year,
          trans.make,
          trans.model,
          trans.features,
          trans.release,
          trans.transaction
        ]
        if (trans.amount) {
          t.push(trans.amount)
        } else {
          t.push('TBD')
        }
        rows.push(t)
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
    this.$store.dispatch('fetchCarShowTransactions')
  }
}
</script>

<style scoped>
.transaction-totals {
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
