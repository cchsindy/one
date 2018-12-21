<template>
  <div>
    <button>Add Item</button>
    <button>Collapse All</button>
    <button>Expand All</button>
    <div class="event-item" v-for="item in items" :key="item.id">
      <button>X</button>
      <button>collapse</button>
      <!-- <div class="event-item-id">ID: {{item.id}}</div> -->
      <div class="event-item-name">
        <label>Name:</label>
        <input type="text" v-model="item.name">
      </div>
      <!-- <div class="event-item-description">
        <label>Description:</label>
        <input type="text" v-model="item.description">
      </div>-->
      <div class="event-item-image">
        <img :src="item.image">
        <label>Image:</label>
        <input type="url" v-model="item.image">
      </div>
      <div class="event-item-flex">
        <div class="event-item-limit">
          <label>Limit:</label>
          <input type="number" v-model="item.limit">
        </div>
        <div class="event-item-price">
          <label>Price:</label>
          $
          <input type="number" v-model="item.price">
        </div>
        <div class="event-item-sold">
          <label>Sold:</label>
          {{item.sold}}
        </div>
      </div>
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
button {
  margin-right: 1vw;
}
img {
  float: right;
  height: 75px;
  margin-top: 10px;
}
input[type='number'] {
  width: 60px;
}
.event-item {
  border: dashed 2px #ccc;
  margin-top: 1vh;
  padding: 1vw;
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
.event-item-flex {
  display: flex;
}
</style>
