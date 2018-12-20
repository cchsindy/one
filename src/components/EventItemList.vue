<template>
  <div>
    <button>Add Item</button>
    <div v-for="item in items" :key="item.id">
      {{item.name}} for ${{item.price}} ({{item.available}} remaining)
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
</style>
