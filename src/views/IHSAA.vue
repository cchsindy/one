<template>
  <div>
    <h1>IHSAA Entries</h1>
    <div v-if="showDownload">
      <button @click="download">Download</button>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data: () => {
    return {
      showDownload: false,
      students: [],
    }
  },
  methods: {
    download() {
      let csv =
        'data:text/csv;charset=utf-8,last,first,birthdate,grade,semesters,previousEarned,currentAttempted\r\n'
      for (const s of this.students) {
        csv += s.last + ','
        csv += s.first + ','
        csv += s.birthdate + ','
        csv += s.grade + ','
        csv += s.semesters + ','
        csv += s.lastPassed + ','
        csv += s.currentCredits + '\r\n'
      }
      const encodedUri = encodeURI(csv)
      window.open(encodedUri)
    },
    async loadData() {
      const sky = this.$store.state.fbFunctions.httpsCallable('skyapi')
      const current = await sky({
        product: 'school',
        url: 'legacy/lists/93082',
        params: {},
      })
      let prevId = 0
      for (const row of current.data.rows) {
        if (parseInt(row.columns[7].value) === prevId) {
          this.students[this.students.length - 1].currentCredits += parseFloat(
            row.columns[5].value
          )
        } else {
          prevId = parseInt(row.columns[7].value)
          let grade = 12
          switch (row.columns[1].value) {
            case '2024':
              grade = 9
              break
            case '2023':
              grade = 10
              break
            case '2022':
              grade = 11
              break
          }
          const dob = new Date(row.columns[8].value)
          this.students.push({
            id: prevId,
            last: row.columns[0].value,
            first: row.columns[6].value,
            grade,
            birthdate: moment(dob).format('MM/DD/YYYY'),
            currentCredits: parseFloat(row.columns[5].value),
            s1_2021: 0,
            s2_1920: 0,
            s1_1920: 0,
            s2_1819: 0,
            s1_1819: 0,
            s2_1718: 0,
            s1_1718: 0,
            semesters: 0,
            lastPassed: 0,
          })
        }
      }
      const last = await sky({
        product: 'school',
        url: 'legacy/lists/107686',
        params: {},
      })
      for (const row of last.data.rows) {
        const student = this.students.find(
          (s) => s.id === parseInt(row.columns[0].value)
        )
        if (student) {
          student.s1_2021 = 1
          student.lastPassed += parseFloat(row.columns[1].value)
        }
      }
      const sem2 = await sky({
        product: 'school',
        url: 'legacy/lists/111075',
        params: {},
      })
      for (const row of sem2.data.rows) {
        const student = this.students.find(
          (s) => s.id === parseInt(row.columns[0].value)
        )
        if (student) {
          student.s2_1920 = 1
        }
      }
      const sem1 = await sky({
        product: 'school',
        url: 'legacy/lists/107835',
        params: {},
      })
      for (const row of sem1.data.rows) {
        const student = this.students.find(
          (s) => s.id === parseInt(row.columns[0].value)
        )
        if (student) {
          student.s1_1920 = 1
        }
      }
      const trans = await sky({
        product: 'school',
        url: 'legacy/lists/107833',
        params: {},
      })
      for (const row of trans.data.rows) {
        const student = this.students.find(
          (s) => s.id === parseInt(row.columns[8].value)
        )
        if (student) {
          if (
            row.columns[3].value === '2018 - 2019' &&
            row.columns[7].value === '2nd'
          )
            student.s2_1819 = 1
          if (
            row.columns[3].value === '2018 - 2019' &&
            row.columns[7].value === '1st'
          )
            student.s1_1819 = 1
          if (
            row.columns[3].value === '2017 - 2018' &&
            row.columns[7].value === '2nd'
          )
            student.s2_1718 = 1
          if (
            row.columns[3].value === '2017 - 2018' &&
            row.columns[7].value === '1st'
          )
            student.s1_1718 = 1
        }
      }
      for (const s of this.students) {
        s.semesters =
          s.s1_2021 +
          s.s2_1920 +
          s.s1_1920 +
          s.s2_1819 +
          s.s1_1819 +
          s.s2_1718 +
          s.s1_1718
      }
      this.showDownload = true
    },
  },
  mounted() {
    this.loadData()
  },
}
</script>

<style scoped></style>
