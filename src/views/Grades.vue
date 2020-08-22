<template>
  <div>
    <h1>Grades - Canvas</h1>
    <BaseInput label="Name:" v-model="name" />
    <br />
    <BaseButton @click="loadSchedule">Load Grades</BaseButton>
    <div v-if="schedule">
      <h2>{{ schedule.user.name }}</h2>
      <div v-for="s in schedule.grades" :key="s.name">
        <p>{{s.name}} : {{s.section}} : {{s.grade}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      name: "",
      schedule: null,
    };
  },
  methods: {
    loadSchedule() {
      this.schedule = null;
      const d = this.$store.state.fbFunctions.httpsCallable("canvas");
      d({ action: "getGradesByUser", name: this.name, term: 89 }).then(
        (result) => {
          this.schedule = result.data;
        }
      );
    },
  },
};
</script>

<style scoped>
</style>
