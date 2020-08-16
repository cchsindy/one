<template>
  <div>
    <h1>Yearbook Orders</h1>
    <BaseButton @click="downloadCSV">Download CSV</BaseButton>
    <div class="transaction-totals">
      <div class="total">Orders: {{totalYearbookOrders}}</div>
      <div class="total">Total Amount: ${{totalYearbookAmount}}</div>
    </div>
    <div class="transaction-list">
      <YearbookItem v-for="item in transactions" :key="item.id" :item="item" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import YearbookItem from "@/components/yearbook/YearbookItem";

export default {
  components: {
    YearbookItem,
  },
  computed: {
    ...mapGetters(["totalYearbookOrders", "totalYearbookAmount"]),
    ...mapState({
      transactions: (state) => state.transactions.transactions,
    }),
  },
  methods: {
    downloadCSV() {
      const rows = [
        [
          "date",
          "lastname",
          "firstname",
          "address",
          "city",
          "state",
          "zip",
          "email",
          "phone",
          "books",
          "students",
          "amount",
          "paymentId",
        ],
      ];
      this.transactions.forEach((trans) => {
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
          trans.books,
          `"trans.students"`,
          trans.amount,
          trans.paymentId,
        ];
        rows.push(t);
      });
      let csvContent = "data:text/csv;charset=utf-8,";
      rows.forEach(function (rowArray) {
        let row = rowArray.join(",");
        csvContent += row + "\r\n";
      });
      var encodedUri = encodeURI(csvContent);
      window.open(encodedUri);
    },
  },
  created() {
    this.$store.dispatch("fetchYearbookOrders");
  },
};
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
