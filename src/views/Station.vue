<template>
  <div>
    <h1>Charging Station</h1>
    <BaseButton @click="downloadCSV">Download CSV</BaseButton>
    <div>
      <StationItem v-for="item in events" :key="item.date" :item="item" />
    </div>
  </div>
</template>

<script>
// import { mapGetters, mapState } from 'vuex'
import { mapState } from "vuex";
import StationItem from "@/components/station/StationItem";

export default {
  components: {
    StationItem
  },
  computed: {
    // ...mapGetters([
    //   'totalTickets',
    //   'totalSpecAmount'
    // ]),
    ...mapState({
      events: state => state.station.events
    })
  },
  methods: {
    downloadCSV() {
      const rows = [
        [
          "date",
          "lastname",
          "firstname",
          "email",
          "amount",
          "tickets",
          "transaction"
        ]
      ];
      this.transactions.forEach(trans => {
        rows.push([
          new Date(trans.date).toDateString(),
          trans.lastname,
          trans.firstname,
          trans.email,
          trans.amount,
          trans.tickets,
          trans.transaction
        ]);
      });
      let csvContent = "data:text/csv;charset=utf-8,";
      rows.forEach(function(rowArray) {
        let row = rowArray.join(",");
        csvContent += row + "\r\n";
      });
      var encodedUri = encodeURI(csvContent);
      window.open(encodedUri);
    }
  },
  created() {
    this.$store.dispatch("fetchStationEvents");
  }
};
</script>

<style scoped>
</style>
