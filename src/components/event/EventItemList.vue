<template>
  <div>
    <button @click="addItem">Add Item</button>
    <button @click="collapseAll">Collapse All</button>
    <button @click="expandAll">Expand All</button>
    <EventItem
      v-for="item in items"
      :key="item.id"
      :item="item"
      ref="ei"
      @RemoveItem="removeItem"/>
  </div>
</template>

<script>
import EventItem from '@/components/event/EventItem'

export default {
  components: {
    EventItem
  },
  data: () => {
    return {}
  },
  computed: {},
  methods: {
    addItem() {
      this.items.push({
        id: this.items.length + 1,
        name: 'new item name',
        description: '',
        image: '',
        limit: 0,
        sold: 0,
        price: 0
      })
    },
    collapseAll() {
      for (const i of this.$refs.ei) {
        i.collapse()
      }
    },
    expandAll() {
      for (const i of this.$refs.ei) {
        i.expand()
      }
    },
    removeItem(item) {
      // move all data to store...
      this.items = this.items.filter(i => i.id !== item.id)
    },
    resetData() {
      for (const i of this.$refs.ei) {
        i.resetData()
      }
    }
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
button {
  margin-right: 1vw;
}
.event-item {
  border: dashed 2px #ccc;
  margin-top: 1vh;
  padding: 1vw;
}
</style>
