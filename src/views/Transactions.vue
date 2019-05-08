<template>
  <div>
    <h1>Authorize.NET Transactions</h1>
    <BaseButton @click="downloadCSV">Download CSV</BaseButton>
    <div class="transaction-totals">
      <div class="total">Transactions: {{totalTransactions}}</div>
      <div class="total">Total Amount: ${{totalAmount.toFixed(2)}}</div>
    </div>
    <div class="transaction-list">
      <TransactionItem v-for="item in transactions" :key="item.id" :item="item"/>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import TransactionItem from '@/components/transactions/TransactionItem'

export default {
  components: {
    TransactionItem
  },
  computed: {
    ...mapGetters(['totalTransactions', 'totalAmount']),
    ...mapState({
      transactions: state => state.transactions.transactions
    })
  },
  methods: {
    downloadCSV() {
      const rows = [
        ['date', 'lastname', 'firstname', 'amount', 'description', 'id']
      ]
      this.transactions.forEach(trans => {
        rows.push([
          new Date(trans.date).toDateString(),
          trans.lastname,
          trans.firstname,
          trans.amount,
          trans.description,
          trans.id
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
