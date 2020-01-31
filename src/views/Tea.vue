<template>
  <div>
    <h1>Cinderella Tea</h1>
    <BaseButton @click="downloadCSV">Download CSV</BaseButton>
    <div class="tea-totals">
      <div class="total">Thursday: {{totalThursday}}</div>
      <div class="total">Friday: {{totalFriday}}</div>
      <div class="total">Saturday: {{totalSaturday}}</div>
      <div class="total">Total: ${{totalTeaAmount}}</div>
    </div>
    <div class="tea-list">
      <TeaItem v-for="item in transactions" :key="item.transaction" :item="item"/>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import TeaItem from '@/components/tea/TeaItem'

export default {
  components: {
    TeaItem
  },
  computed: {
    ...mapGetters([
      'totalThursday',
      'totalFriday',
      'totalSaturday',
      'totalTeaAmount'
    ]),
    ...mapState({
      transactions: state => state.tea.transactions
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
          'amount',
          'thursday',
          'friday',
          'saturday',
          'adult1',
          'adult2',
          'child1',
          'age1',
          'child2',
          'age2',
          'child3',
          'age3',
          'child4',
          'age4',
          'child5',
          'age5',
          'child6',
          'age6',
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
          trans.amount,
          trans.tickets.thursday,
          trans.tickets.friday,
          trans.tickets.saturday,
          trans.adult1,
          trans.adult2,
          trans.children.one.name,
          trans.children.one.age,
          trans.children.two.name,
          trans.children.two.age,
          trans.children.three.name,
          trans.children.three.age,
          trans.children.four.name,
          trans.children.four.age,
          trans.children.five.name,
          trans.children.five.age,
          trans.children.six.name,
          trans.children.six.age,
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
    this.$store.dispatch('fetchTeaTransactions')
  }
}
</script>

<style scoped>
.tea-totals {
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
