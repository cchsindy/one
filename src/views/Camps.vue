<template>
  <div>
    <h1>Theatre Camp Payments</h1>
    <BaseButton @click="downloadCSV">Download CSV</BaseButton>
    <div class="transaction-totals">
      <div class="total">Payments: {{ totalCampPayments }}</div>
      <div class="total">Campers: {{ totalCampers }}</div>
      <div class="total">Total Amount: ${{ totalCampAmount }}</div>
    </div>
    <div class="transaction-list">
      <CampItem v-for="item in transactions" :key="item.id" :item="item" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import CampItem from '@/components/camps/CampItem'

export default {
  components: {
    CampItem,
  },
  computed: {
    ...mapGetters(['totalCampPayments', 'totalCampers', 'totalCampAmount']),
    ...mapState({
      transactions: (state) => state.transactions.transactions,
    }),
  },
  methods: {
    downloadCSV() {
      const rows = [
        ['date', 'parent', 'email', 'campers', 'amount', 'paymentId'],
      ]
      this.transactions.forEach((trans) => {
        let t = [
          new Date(trans.date).toDateString(),
          `"${trans.parent}"`,
          `"${trans.email}"`,
          `"${trans.campers}"`,
          `"${trans.amount}"`,
          `"${trans.paymentId}"`,
        ]
        rows.push(t)
      })
      let csvContent = 'data:text/csv;charset=utf-8,'
      rows.forEach(function(rowArray) {
        let row = rowArray.join(',')
        csvContent += row + '\r\n'
      })
      var encodedUri = encodeURI(csvContent)
      window.open(encodedUri)
    },
  },
  created() {
    this.$store.dispatch('fetchCampPayments')
  },
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
