<template>
  <div>
    <h1>Spring Spec</h1>
    <BaseButton @click="downloadCSV">Download CSV</BaseButton>
    <div class="spec-totals">
      <div class="total">Tickets: {{totalTickets}}</div>
      <div class="total">Total: ${{totalSpecAmount}}</div>
    </div>
    <div class="spec-list">
      <SpecItem v-for="item in transactions" :key="item.transaction" :item="item"/>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import SpecItem from '@/components/spec/SpecItem'

export default {
  components: {
    SpecItem
  },
  computed: {
    ...mapGetters([
      'totalTickets',
      'totalSpecAmount'
    ]),
    ...mapState({
      transactions: state => state.spec.transactions
    })
  },
  methods: {
    downloadCSV() {
      const rows = [
        [
          'date',
          'lastname',
          'firstname',
          'email',
          'amount',
          'tickets',
          'transaction'
        ]
      ]
      this.transactions.forEach(trans => {
        rows.push([
          new Date(trans.date).toDateString(),
          trans.lastname,
          trans.firstname,
          trans.email,
          trans.amount,
          trans.tickets,
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
    this.$store.dispatch('fetchSpecTransactions')
  }
}
</script>

<style scoped>
.spec-totals {
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
