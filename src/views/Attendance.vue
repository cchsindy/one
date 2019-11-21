<template>
  <div>
    <h1>Teacher Attendance</h1>
    <BaseButton @click="getSchedule">Teacher Schedule</BaseButton>
    <BaseButton @click="loadTeachers">Teachers</BaseButton>
    <BaseButton @click="loadTaken">Taken</BaseButton>
    <div class="chart">
      <table>
        <tr>
          <th>Teacher</th>
          <th>Q1 %</th>
          <th>Q1 P</th>
        </tr>
        <tr v-for="teacher in teachers" :key="teacher.id">
          <td>{{teacher.display}}</td>
          <td>0%</td>
          <td>1</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      master: [],
      schedule: [],
      taken: [],
      teachers: []
    }
  },
  computed: {
    showEmails() {
      return this.sectionCount === 0 && this.students.length > 0 ? true : false
    }
  },
  methods: {
    getSchedule() {
      const d = this.$store.state.fbFunctions.httpsCallable('skyapi')
      getTeacherSchedule(d, 5529894).then(data => {
        this.schedule = data
      })
    },
    loadData() {
      const d = this.$store.state.fbFunctions.httpsCallable('skyapi')
      getMasterSchedule(d, '2019-08-01', '2019-12-20').then(data => {
        this.master = data
      })
    },
    loadTaken() {
      const d = this.$store.state.fbFunctions.httpsCallable('onapi')
      d({ url: `list/96468`, params: {} }).then(result => {
        this.taken = result.data
      })
      // const d = this.$store.state.fbFunctions.httpsCallable('skyapi')
      // getAttendanceTaken(d).then(data => {
      //   this.taken = data
      // })
    },
    loadTeachers() {
      const d = this.$store.state.fbFunctions.httpsCallable('skyapi')
      getTeachers(d).then(data => {
        this.teachers = data
      })
    }
  },
  mounted: function() {
    this.loadData()
  }
}

// async function getAttendanceTaken(f) {
//   const taken = await f({
//     product: 'school',
//     url: 'legacy/lists',
//     params: { list_id: 96468 }
//   })
//   return taken.data.value
// }

async function getMasterSchedule(f, start, end) {
  const master = await f({
    product: 'school',
    url: 'academics/schedules/master',
    params: { level_num: 2175, start_date: start, end_date: end }
  })
  return master.data.value
}

// async function getRoles(f) {
//   const roles = await f({
//     product: 'school',
//     url: 'roles',
//     params: {}
//   })
//   return roles.data.value
// }

async function getTeacherSchedule(f, id) {
  const schedule = await f({
    product: 'school',
    url: `academics/teachers/${id}/sections`,
    params: { school_year: '2019-2020' }
  })
  return schedule.data.value
}

async function getTeachers(f) {
  const teachers = await f({
    product: 'school',
    url: 'users',
    params: { roles: '62831' }
  })
  return teachers.data.value
}
</script>

<style scoped>
table {
  border-collapse: collapse;
}
td,
th {
  border: solid 1px #aaa;
  padding: 1vw;
}
.chart {
  margin: 1vw;
}
</style>
