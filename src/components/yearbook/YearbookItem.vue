<template>
  <div class="transaction-item">
    {{item.lastName}},
    {{item.firstName}}
    [{{item.books}} book(s) for
    {{item.students}}]
    {{item.amount}}
    {{item.date}}
    <button
      @click="receipt"
    >Resend Receipt</button>
    {{message}}
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      message: "",
    };
  },
  methods: {
    receipt() {
      let subject = "2019-2020 Yearbook Order";
      let html = "<html><body>";
      html += "<h1>2019-2020 Yearbook Order</h1>";
      html += "<h2>Details</h2>";
      html += `<p>Yearbook(s): ${this.item.books}</p><p>Student(s): ${this.item.students}</p>`;
      html +=
        "<h2>Thank you so much!</h2><p>Yearbooks should arrive by the end of October.</p>";
      html += "</body></html>";
      let recipients = [{ address: this.item.email }];
      this.$store.dispatch("resendReceipt", { subject, html, recipients });
      this.message = "Sent.";
    },
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.transaction-item {
  background: #fff;
  border: solid 2px #ccc;
  margin-top: 1vh;
  padding: 1vw;
}
</style>
