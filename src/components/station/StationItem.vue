<template>
  <div class="station-item">
    {{date}}:
    {{item.card}}
    - {{item.event}}
    [ {{name}} ]
    <img :src="image" />
  </div>
</template>

<script>
export default {
  computed: {
    date() {
      return new Date(this.item.date);
    },
    name() {
      const card = this.cards.filter(c => c.card === this.item.card);
      if (card.length) {
        return `${card[0].first} ${card[0].last}`;
      }
      return "Name not found.";
    },
    image() {
      const card = this.cards.filter(c => c.card === this.item.card);
      if (card.length && card[0].image) {
        return `https://bbk12e1-cdn.myschoolcdn.com/ftpimages/1465/user/${card[0].image}`;
      }
      return "https://covenantchristian.myschoolapp.com/app/content/images/user.png";
    }
  },
  props: {
    cards: {
      type: Array,
      required: true
    },
    item: {
      type: Object,
      required: true
    }
  },
  watch: {
    item: {
      handler: function() {},
      deep: true
    }
  }
};
</script>

<style scoped>
.station-item {
  background: #fff;
  border: solid 2px #ccc;
  margin-top: 1vh;
  padding: 1vw;
}
img {
  height: 72px;
  width: 72px;
}
</style>
