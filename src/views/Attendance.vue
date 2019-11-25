<template>
  <div>
    <h1>Teacher Attendance</h1>
    <BaseButton @click="getSchedule">Teacher Schedule</BaseButton>
    <div class="chart">
      <table>
        <tr>
          <th>Teacher</th>
          <th>Q1 %</th>
          <th>Q1 P</th>
        </tr>
        <tr v-for="teacher in teachers" :key="teacher.id">
          <td>{{teacher.name}}</td>
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
      getTeacherSchedule(d, 5529893).then(data => {
        this.schedule = data
      })
    },
    loadData() {
      const d = this.$store.state.fbFunctions.httpsCallable('skyapi')
      getMasterSchedule(d, '2019-08-01', '2019-12-20').then(data => {
        this.master = data
        getTeachers(d).then(data => {
          this.teachers = data
          getAttendanceTaken(d, this.teachers).then(data => {
            this.taken = data
          })
        })
      })
    }
  },
  mounted: function() {
    this.loadData()
  }
}

async function getAttendanceTaken(f, teachers) {
  const result = await f({
    product: 'school',
    url: 'legacy/lists/96468',
    params: {}
  })
  const taken = []
  for (const row of result.data.rows) {
    const t = teachers.find(({ name }) => name === row.columns[1].value)
    let period = 0
    switch (parseInt(row.columns[2].value.substring(0, 1))) {
      case 1:
        period = 27169
        break
      case 2:
        period = 27170
        break
      case 3:
        period = 27187
        break
      case 4:
        period = 27188
        break
      case 5:
        period = 27189
        break
      case 6:
        period = 27190
        break
      case 7:
        period = 27191
        break
      case 8:
        period = 27192
        break
    }
    taken.push({
      date: Date.parse(row.columns[0].value),
      user: t ? t.id : null,
      period
    })
  }
  return taken
}

async function getMasterSchedule(f, start, end) {
  const result = await f({
    product: 'school',
    url: 'academics/schedules/master',
    params: { level_num: 2175, start_date: start, end_date: end }
  })
  const master = []
  for (const r of result.data.value) {
    const date = Date.parse(r.calendar_day)
    const fallBegin = Date.parse('2019-10-14')
    const fallEnd = Date.parse('2019-10-25')
    if (r.schedule_sets.length && (date < fallBegin || date > fallEnd)) {
      const periods = []
      for (const b of r.schedule_sets[0].blocks) {
        if (b.block_id != 27199 && b.block_id != 27198 && b.block_id != 27197) {
          periods.push(b.block_id)
        }
      }
      master.push({
        date, //: r.calendar_day.substring(0, 10),
        periods
      })
    }
  }
  return master
}

async function getTeacherSchedule(f, id) {
  const result = await f({
    product: 'school',
    url: `academics/teachers/${id}/sections`,
    params: { school_year: '2019-2020' }
  })
  const periods = [false, false, false, false, false, false, false, false]
  for (const r of result.data.value) {
    if (r.duration.id === 119873) {
      // sem1 = 119873 sem2 = 119875
      const p = parseInt(r.section_identifier.substring(0, 1))
      periods[p - 1] = true
    }
  }
  const schedule = []
  if (periods[0]) schedule.push(27169)
  if (periods[1]) schedule.push(27170)
  if (periods[2]) schedule.push(27187)
  if (periods[3]) schedule.push(27188)
  if (periods[4]) schedule.push(27189)
  if (periods[5]) schedule.push(27190)
  if (periods[6]) schedule.push(27191)
  if (periods[7]) schedule.push(27192)
  return schedule
}

async function getTeachers(f) {
  const result = await f({
    product: 'school',
    url: 'users',
    params: { roles: '62831' }
  })
  const teachers = []
  for (const r of result.data.value) {
    teachers.push({
      id: r.id,
      name: `${r.first_name} ${r.last_name}`
    })
  }
  return teachers
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
