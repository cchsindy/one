<template>
  <div class="event-item">
    <button @click="removeItem">X</button>
    <button @click="toggleCollapse">{{collapseText}}</button>
    <div v-if="collapsed">
      <div>{{localItem.name}}</div>
    </div>
    <div v-else>
      <div class="event-item-name">
        <label>Name:</label>
        <input type="text" v-model="localItem.name">
      </div>
      <div class="event-item-image">
        <img :src="localItem.image">
        <label>Image:</label>
        <input type="url" v-model="localItem.image">
      </div>
      <div class="event-item-flex">
        <div class="event-item-limit">
          <label>Limit:</label>
          <input type="number" v-model="localItem.limit">
        </div>
        <div class="event-item-price">
          <label>Price:</label>
          $
          <input type="number" v-model="localItem.price">
        </div>
        <div class="event-item-sold">
          <label>Sold:</label>
          {{localItem.sold}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      collapsed: true,
      localItem: {}
    }
  },
  computed: {
    collapseText() {
      return this.collapsed ? 'expand' : 'collapse'
    }
  },
  methods: {
    collapse() {
      this.collapsed = true
    },
    expand() {
      this.collapsed = false
    },
    removeItem() {
      this.$emit('RemoveItem', this.item)
    },
    resetData() {
      this.localItem.name = this.cachedItem.name
      this.localItem.image = this.cachedItem.image
      this.localItem.limit = this.cachedItem.limit
      this.localItem.price = this.cachedItem.price
    },
    toggleCollapse() {
      this.collapsed = !this.collapsed
    }
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  created() {
    this.localItem = this.item
    this.cachedItem = JSON.parse(JSON.stringify(this.item))
  }
}
</script>

<style scoped>
img {
  float: right;
  height: 75px;
  margin-top: 10px;
}
input[type='number'] {
  width: 60px;
}
.event-item button {
  float: right;
  font-size: 0.6em;
  margin-left: 1vw;
  margin-right: 0;
  padding: 0.2vw;
}
.event-item-id {
  color: #aaa;
}
.event-item-name {
  text-align: left;
}
.event-item-image {
  text-align: left;
}
.event-item-flex {
  display: flex;
  text-align: left;
}
</style>
