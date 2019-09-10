<template>
  <div>
    <h1>Midterms</h1>
    <BaseButton @click="loadData">Load Data</BaseButton>
    <BaseButton @click="saveData">Save Data</BaseButton>
    <BaseButton @click="sendData">Send Data</BaseButton>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      grades: [],
      parents: [],
      reports: []
    }
  },
  methods: {
    loadData() {
      const fb = this.$store.state.fbStore
      const grades = fb.doc('midterms/grades')
      grades.get().then(doc => {
        this.grades = doc.data().data
      })
      const parents = fb.doc('midterms/parents')
      parents.get().then(doc => {
        this.parents = doc.data().data
      })
    },
    saveData() {
      this.grades.sort((a, b) => {
        return a['User ID'] - b['User ID']
      })
      const htmlTop =
        "<html><body><p>One way that we uphold our commitment to partner with you for the education of your student, is to report grades below C at the halfway (midterm) point of each quarter. We hope this communication helps to inform your understanding of your student's current academic progress.</p><p>Please take time to discuss this grade report with your student. We appreciate the partnership we share with you in your student's education.</p>"
      const htmlBottom =
        '</table><p>Donnie Fishburn<br><i>Dean of Students</i><br>Covenant Christian High School</p><img src="http://covenantchristian.org/images/CCHS-email-signature-credo.jpg" alt="CCHS"></body></html>'
      let current = 0
      let prev = 0
      let body = ''
      let emails = []
      let report = ''
      let to = ''
      for (const g of this.grades) {
        current = g['User ID']
        if (current !== prev) {
          if (report !== '') {
            const p = this.parents.filter(r => r['User ID'] === prev)
            emails = []
            for (const i of p) {
              if (i['E-Mail'] !== '') emails.push({ address: i['E-Mail'] })
            }
            body = htmlTop + report + htmlBottom
            this.reports.push({ to, body, emails })
          }
          to = g['Last name'] + '_' + g['First name']
          report =
            '<h2>' +
            g['Grade plan grade'] +
            ' Report for ' +
            g['First name'] +
            ' ' +
            g['Last name'] +
            '</h2>'
          report +=
            '<table cellpadding="5" cellspacing="5"><tr style="background: #444; color: #fff;"><th>Class</th><th>Grade</th></tr>'
          report +=
            '<tr style="background: #ddd;"><td>' +
            g['Course title'] +
            '</td><td style="text-align: center;">' +
            g['Numeric grade'] +
            '</td></tr>'
        } else {
          report +=
            '<tr style="background: #ddd;"><td>' +
            g['Course title'] +
            '</td><td style="text-align: center;">' +
            g['Numeric grade'] +
            '</td></tr>'
        }
        prev = current
      }
      const p = this.parents.filter(r => r['User ID'] === prev)
      emails = []
      for (const i of p) {
        if (i['E-Mail'] !== '') emails.push({ address: i['E-Mail'] })
      }
      body = htmlTop + report + htmlBottom
      this.reports.push({ to, body, emails })
      // send email and write to FB
      const fb = this.$store.state.fbStore
      for (const r of this.reports) {
        fb.collection('midterms/sent/progress1')
          .doc(r.to)
          .set({
            body: r.body,
            emails: r.emails,
            subject: 'CCHS Progress 1 Report'
          })
      }
    },
    sendData() {
      const f = this.$store.state.fbFunctions.httpsCallable('midterms')
      f()
    }
  }
}
</script>

<style scoped>
</style>
