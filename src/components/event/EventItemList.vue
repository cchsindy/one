<template>
  <div>
    <div class="button-group">
      <BaseButton @click="addItem">Add Item</BaseButton>
      <BaseButton @click="collapseAll">Collapse All</BaseButton>
      <BaseButton @click="expandAll">Expand All</BaseButton>
    </div>
    <EventItem v-for="item in items" :key="item.id" :item="item" ref="ei" @RemoveItem="removeItem"/>
  </div>
</template>

<script>
import EventItem from '@/components/event/EventItem'

export default {
  components: {
    EventItem
  },
  computed: {},
  methods: {
    addItem() {
      this.items.push({
        id: this.items.length + 1,
        name: 'new item name',
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
    removeItem(itemId) {
      this.$delete(this.items, itemId - 1)
      let index = 1
      for (const i of this.items) {
        i.id = index++
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
.button-group {
  align-items: center;
  display: flex;
  justify-content: space-around;
}
</style>
