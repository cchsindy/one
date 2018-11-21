<template>
  <div class="announcement-list">
    <div v-for="item of items" :key="item.id" class="announcement-item">
      <div class="item-id">ID: {{ item.id }}<br><button>Remove</button></div>
      <div class="item-content" contenteditable="true">{{ item.content }}</div>
      <div class="item-date">From: <input type="date" :value="item.fromDate"><br>To: <input type="date" :value="item.toDate"></div>
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
          content:
            'My First Announcement is a long announcement with lots of words to fill up the screen.',
          fromDate: '2018-11-21',
          toDate: '2018-11-22',
          user: 'bradspencer'
        },
        {
          id: 2,
          content: 'My Second Announcement',
          fromDate: '2018-11-23',
          toDate: '2018-11-25',
          user: 'bradspencer'
        }
      ]
    }
  }
}
</script>

<style scoped>
.announcement-item {
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
.item-content {
  align-self: center;
  grid-column: 2;
  margin: 0 1vw;
}
.item-date {
  align-self: center;
  grid-column: 3;
  text-align: right;
}
</style>