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
        'data:text/csv;charset=utf-8,last,first,birthdate,grade,previousAttempted,previousEarned,currentAttempted\r\n'
      for (const s of this.students) {
        csv += s.last + ','
        csv += s.first + ','
        csv += s.birthdate + ','
        csv += s.grade + ','
        csv += s.lastCredits + ','
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
          this.students[this.students.length - 1].currentCredits += parseInt(
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
            currentCredits: parseInt(row.columns[5].value),
            lastCredits: 0,
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
          student.lastCredits += parseInt(row.columns[2].value)
          student.lastPassed += parseInt(row.columns[1].value)
        }
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
