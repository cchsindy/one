<template>
  <div class="event-item">
    <BaseButton @click="removeItem" buttonClass="small right">X</BaseButton>
    <BaseButton @click="toggleCollapse" buttonClass="small right">{{collapseText}}</BaseButton>
    <div v-if="collapsed">
      <div>{{item.name}}</div>
    </div>
    <div v-else>
      <div class="event-item-name">
        <BaseInput label="Name:" type="text" v-model="item.name"/>
      </div>
      <div class="event-item-image">
        <img :src="item.image">
        <BaseInput label="Image:" type="url" v-model="item.image"/>
      </div>
      <div class="event-item-flex">
        <div class="event-item-limit">
          <BaseInput label="Limit:" type="number" v-model="item.limit"/>
        </div>
        <div class="event-item-price">
          <BaseInput label="Price:" type="number" decorator="$" v-model="item.price"/>
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
  data: () => {
    return {
      collapsed: true
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
      this.$emit('RemoveItem', this.item.id)
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
  }
}
</script>

<style scoped>
img {
  float: right;
  height: 75px;
  margin-top: 10px;
}
.event-item {
  border: dashed 2px #ccc;
  margin-top: 1vh;
  padding: 1vw 1vw 1.5vw 1vw;
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
