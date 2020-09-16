<template>
  <div>
    <h1>Teacher Attendance</h1>
    <BaseButton v-if="showRun" @click="runStats">Run Stats</BaseButton>
    <div class="loading" v-if="count > 0">
      Teacher data loading: {{ count }}
    </div>
    <div class="chart">
      <table>
        <tr>
          <th>Teacher</th>
          <th>Q1 %</th>
          <th>Q1 Periods</th>
          <th>Q2 %</th>
          <th>Q2 Periods</th>
          <th>Q3 %</th>
          <th>Q3 Periods</th>
          <th>Q4 %</th>
          <th>Q4 Periods</th>
        </tr>
        <tr v-for="teacher in teachers" :key="teacher.id">
          <td>{{ teacher.name }}</td>
          <td :class="level(teacher.q1)">{{ teacher.q1 }}%</td>
          <td>{{ teacher.q1p }}</td>
          <td :class="level(teacher.q2)">{{ teacher.q2 }}%</td>
          <td>{{ teacher.q2p }}</td>
          <td :class="level(teacher.q3)">{{ teacher.q3 }}%</td>
          <td>{{ teacher.q3p }}</td>
          <td :class="level(teacher.q4)">{{ teacher.q4 }}%</td>
          <td>{{ teacher.q4p }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
/*

TODO:
check on if new period ids
check for new block ids
make it easier to choose year and term

*/
export default {
  data: () => {
    return {
      master: [],
      taken: [],
      teachers: [],
      count: 0,
      showRun: false,
    }
  },
  methods: {
    level(q) {
      if (q > 75) return 'one'
      if (q >= 50 && q < 75) return 'two'
      if (q >= 25 && q < 50) return 'three'
      if (q < 25) return 'four'
    },
    loadData() {
      const d = this.$store.state.fbFunctions.httpsCallable('skyapi')
      getMasterSchedule(d, '2020-08-06', '2020-12-18').then((data) => {
        this.master = data
        getTeachers(d).then((data) => {
          this.teachers = data
          getAttendanceTaken(d, this.teachers).then((data) => {
            this.taken = data
            this.showRun = true
          })
        })
      })
    },
    runStats() {
      const d = this.$store.state.fbFunctions.httpsCallable('skyapi')
      const today = new Date()
      for (const teacher of this.teachers) {
        this.count++
        getTeacherSchedule(d, teacher.id).then((data) => {
          const tt = this.taken.filter((t) => t.user === teacher.id)
          // count for each date range
          let taken = 0
          let total = 0
          let missing = [0, 0, 0, 0, 0, 0, 0, 0]
          for (let i = 0; i < 20; i++) {
            if (this.master[i].date < today) {
              const p = this.master[i].periods.filter((v) => data.includes(v))
              const dt = tt.filter(
                (t) => t.date.getTime() === this.master[i].date.getTime()
              )
              const dups = dt
                .filter(({ period }) => p.includes(period))
                .map(({ period }) => period)
              const c = [...new Set(dups)]
              taken += c.length
              total += p.length
              const m = p.filter((v) => !c.includes(v))
              for (const a of m) {
                switch (a) {
                  case 27169:
                    missing[0]++
                    break
                  case 27170:
                    missing[1]++
                    break
                  case 27187:
                    missing[2]++
                    break
                  case 27188:
                    missing[3]++
                    break
                  case 27189:
                    missing[4]++
                    break
                  case 27190:
                    missing[5]++
                    break
                  case 27191:
                    missing[6]++
                    break
                  case 27192:
                    missing[7]++
                    break
                }
              }
            }
          }
          if (total > 0) teacher.q1 = Math.round((taken / total) * 100)
          if (total > 0) teacher.q1p = missing.toString()
          taken = 0
          total = 0
          missing = [0, 0, 0, 0, 0, 0, 0, 0]
          for (let i = 20; i < 42; i++) {
            if (this.master[i].date < today) {
              const p = this.master[i].periods.filter((v) => data.includes(v))
              const dt = tt.filter(
                (t) => t.date.getTime() === this.master[i].date.getTime()
              )
              const dups = dt
                .filter(({ period }) => p.includes(period))
                .map(({ period }) => period)
              const c = [...new Set(dups)]
              taken += c.length
              total += p.length
              const m = p.filter((v) => !c.includes(v))
              for (const a of m) {
                switch (a) {
                  case 27169:
                    missing[0]++
                    break
                  case 27170:
                    missing[1]++
                    break
                  case 27187:
                    missing[2]++
                    break
                  case 27188:
                    missing[3]++
                    break
                  case 27189:
                    missing[4]++
                    break
                  case 27190:
                    missing[5]++
                    break
                  case 27191:
                    missing[6]++
                    break
                  case 27192:
                    missing[7]++
                    break
                }
              }
            }
          }
          if (total > 0) teacher.q2 = Math.round((taken / total) * 100)
          if (total > 0) teacher.q2p = missing.toString()
          taken = 0
          total = 0
          missing = [0, 0, 0, 0, 0, 0, 0, 0]
          for (let i = 42; i < 62; i++) {
            if (this.master[i].date < today) {
              const p = this.master[i].periods.filter((v) => data.includes(v))
              const dt = tt.filter(
                (t) => t.date.getTime() === this.master[i].date.getTime()
              )
              const dups = dt
                .filter(({ period }) => p.includes(period))
                .map(({ period }) => period)
              const c = [...new Set(dups)]
              taken += c.length
              total += p.length
              const m = p.filter((v) => !c.includes(v))
              for (const a of m) {
                switch (a) {
                  case 27169:
                    missing[0]++
                    break
                  case 27170:
                    missing[1]++
                    break
                  case 27187:
                    missing[2]++
                    break
                  case 27188:
                    missing[3]++
                    break
                  case 27189:
                    missing[4]++
                    break
                  case 27190:
                    missing[5]++
                    break
                  case 27191:
                    missing[6]++
                    break
                  case 27192:
                    missing[7]++
                    break
                }
              }
            }
          }
          if (total > 0) teacher.q3 = Math.round((taken / total) * 100)
          if (total > 0) teacher.q3p = missing.toString()
          taken = 0
          total = 0
          missing = [0, 0, 0, 0, 0, 0, 0, 0]
          for (let i = 62; i < 81; i++) {
            if (this.master[i].date < today) {
              const p = this.master[i].periods.filter((v) => data.includes(v))
              const dt = tt.filter(
                (t) => t.date.getTime() === this.master[i].date.getTime()
              )
              const dups = dt
                .filter(({ period }) => p.includes(period))
                .map(({ period }) => period)
              const c = [...new Set(dups)]
              taken += c.length
              total += p.length
              const m = p.filter((v) => !c.includes(v))
              for (const a of m) {
                switch (a) {
                  case 27169:
                    missing[0]++
                    break
                  case 27170:
                    missing[1]++
                    break
                  case 27187:
                    missing[2]++
                    break
                  case 27188:
                    missing[3]++
                    break
                  case 27189:
                    missing[4]++
                    break
                  case 27190:
                    missing[5]++
                    break
                  case 27191:
                    missing[6]++
                    break
                  case 27192:
                    missing[7]++
                    break
                }
              }
            }
          }
          if (total > 0) teacher.q4 = Math.round((taken / total) * 100)
          if (total > 0) teacher.q4p = missing.toString()
          this.count--
        })
      }
    },
  },
  mounted: function() {
    this.loadData()
  },
}

async function getAttendanceTaken(f, teachers) {
  const result = await f({
    product: 'school',
    url: 'legacy/lists/96468',
    params: {},
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
      date: new Date(row.columns[0].value),
      user: t ? t.id : null,
      period,
    })
  }
  return taken
}

async function getMasterSchedule(f, start, end) {
  const result = await f({
    product: 'school',
    url: 'academics/schedules/master',
    params: { level_num: 2175, start_date: start, end_date: end },
  })
  const master = []
  // const fallBegin = new Date('2019-10-14T00:00:00')
  // const fallEnd = new Date('2019-10-25T00:00:00')
  for (const r of result.data.value) {
    const date = new Date(r.calendar_day.substring(0, 10) + 'T00:00:00')
    if (
      r.schedule_sets.length &&
      r.schedule_sets[0].blocks.length
      // && (date < fallBegin || date > fallEnd)
    ) {
      const periods = []
      for (const b of r.schedule_sets[0].blocks) {
        if (b.block_id != 27199 && b.block_id != 27198 && b.block_id != 27197) {
          periods.push(b.block_id)
        }
      }
      master.push({
        date,
        periods,
      })
    }
  }
  return master
}

async function getTeacherSchedule(f, id) {
  const result = await f({
    product: 'school',
    url: `academics/teachers/${id}/sections`,
    params: { school_year: '2020-2021' },
  })
  const periods = [false, false, false, false, false, false, false, false]
  for (const r of result.data.value) {
    // console.log(r.duration.id)
    if (r.duration.id === 132850) {
      // sem1 = 119873 sem2 = 119875 2019-2020
      // sem1 = 132850 sem2 = 132852 2020-2021
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
    params: { roles: '62831' },
  })
  const teachers = []
  for (const r of result.data.value) {
    teachers.push({
      id: r.id,
      name: `${r.first_name} ${r.last_name}`,
      q1: 0,
      q1p: 0,
      q2: 0,
      q2p: 0,
      q3: 0,
      q3p: 0,
      q4: 0,
      q4p: 0,
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
  padding: 0.5vw;
}
.chart {
  margin: 1vw;
}
.loading {
  background: lightgreen;
  margin: 2vw;
}
.one {
  background: lightgreen;
}
.two {
  background: yellow;
}
.three {
  background: orange;
}
.four {
  background: red;
}
</style>
