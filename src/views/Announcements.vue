<template>
  <div class="announcements">
    <h1>Announcements</h1>
    <h2>My Announcements</h2>
    <AnnouncementList />
    <button>Add New Announcement</button>
    <h2>My Notifications</h2>
    <NotificationList />
    <button>Add New Notification</button>
  </div>
</template>

<script>
import AnnouncementList from '@/components/AnnouncementList'
import NotificationList from '@/components/NotificationList'

export default {
  components: {
    AnnouncementList,
    NotificationList
  }
}
</script>

<style>
</style>
