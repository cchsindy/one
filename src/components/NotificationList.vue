<template>
  <div class="notification-list">
    <div v-for="item of items" :key="item.id" class="notification-item">
      <div class="item-id">ID: {{ item.id }}<br><button>Remove</button></div>
      <div class="item-student" contenteditable="true">{{ item.student }} to {{ item.location }}</div>
      <div class="item-expiration">Until: <input type="time" :value="item.expiration"></div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      items: [
        {
          id: 1,
          student: 'Bob Forbush',
          location: 'Library',
          expiration: '16:35',
          user: 'bradspencer'
        },
        {
          id: 2,
          student: 'Jill Doe',
          location: 'Room 123',
          expiration: '09:15',
          user: 'bradspencer'
        }
      ]
    }
  }
}
</script>

<style scoped>
.notification-item {
  border: solid 2px #ccc;
  display: grid;
  grid-template-columns: 2fr 6fr 2fr;
  margin-bottom: 2vh;
  padding: 1vw;
}
.item-id {
  align-self: center;
  grid-column: 1;
}
.item-student {
  align-self: center;
  grid-column: 2;
  margin: 0 1vw;
}
.item-expiration {
  align-self: center;
  grid-column: 3;
  text-align: right;
}
</style>