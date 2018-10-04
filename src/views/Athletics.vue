<template>
  <div class="athletics">
    <h1>Athletics</h1>
    <div>
      Fall - 
      last updated: never
      <button>Update</button>
    </div>
    <team-list />
    <h2>Winter</h2>
    <h2>Spring</h2>
  </div>
</template>

<script>
import TeamList from '@/components/athletics/TeamList'

export default {
  components: {
    TeamList
  }
}
</script>
