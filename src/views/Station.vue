<template>
  <div>
    <h1>Charging Station</h1>
    <!-- <BaseButton @click="downloadCSV">Download CSV</BaseButton> -->
    <div>
      <StationItem v-for="item in events" :key="item.date" :item="item" :cards="cards" />
    </div>
  </div>
</template>

<script>
// import { mapGetters, mapState } from 'vuex'
// import { mapState } from "vuex";
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
    // ...mapState({
    //   events: state => state.station.events
    // })
    events: function() {
      return this.$store.state.station.events;
    }
  },
  data: () => {
    return {
      cards: []
    };
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
    const d = this.$store.state.fbFunctions.httpsCallable("skyapi");
    getCards(d).then(data => {
      this.cards = data;
    });
    this.$store.dispatch("fetchStationEvents");
  }
};

async function getCards(f) {
  const result = await f({
    product: "school",
    url: "legacy/lists/99411",
    params: {}
  });
  const cards = [];
  for (const row of result.data.rows) {
    cards.push({
      userId: parseInt(row.columns[0].value),
      first: row.columns[1].value,
      last: row.columns[2].value,
      email: row.columns[3].value,
      nickname: row.columns[4].value,
      role: row.columns[5].value,
      card: parseInt(row.columns[6].value),
      image: row.columns[7].value
    });
  }
  return cards;
}
</script>

<style scoped>
</style>
