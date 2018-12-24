<template>
  <div>
    <button>Add Item</button>
    <button @click="collapseAll">Collapse All</button>
    <button @click="expandAll">Expand All</button>
    <div class="event-item" v-for="item in items" :key="item.id">
      <EventItem :item="item" ref="ei"/>
    </div>
  </div>
</template>

<script>
import EventItem from '@/components/EventItem'

export default {
  components: {
    EventItem
  },
  data: () => {
    return {}
  },
  computed: {},
  methods: {
    collapseAll() {
      for (const i of this.$refs.ei) {
        i.collapse()
      }
    },
    expandAll() {
      for (const i of this.$refs.ei) {
        i.expand()
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
