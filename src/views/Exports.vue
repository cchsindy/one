<template>
  <div>
    <h1>SIS Exports</h1>
    <BaseButton @click="getSTN">DOE STN</BaseButton>
    <BaseButton @click="getNWEA">NWEA Roster</BaseButton>
    <div v-html="message"></div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data: () => {
    return {
      message: ''
    }
  },
  methods: {
    getNWEA() {
      const d = this.$store.state.fbFunctions.httpsCallable('onapi')
      d({ url: `list/91578`, params: {} }).then(result => {
        // check for missing/invalid data
        let rows = [
          [
            'School State Code',
            'School Name',
            'Previous Instructor ID',
            'Instructor ID',
            'Instructor State ID',
            'Instructor Last Name',
            'Instructor First Name',
            'Instructor Middle Initial',
            'User Name',
            'Email Address',
            'Class Name',
            'Previous Student ID',
            'Student ID',
            'Student State ID',
            'Student Last Name',
            'Student First Name',
            'Student Middle Initial',
            'Student Date Of Birth',
            'Student Gender',
            'Student Grade',
            'Student Ethnic Group Name',
            'Student User Name',
            'Student Email'
          ]
        ]
        result.data.forEach(student => {
          if (student.Ethnicity !== null) {
            const bd = moment(student.Dob)
            let grade = '9'
            switch (student.GradeLevelDescription) {
              case 'Senior':
                grade = '12'
                break
              case 'Junior':
                grade = '11'
                break
              case 'Sophomore':
                grade = '10'
                break
              case 'Freshman':
                grade = '9'
                break
            }
            let r = [
              'C527',
              'Covenant Christian High School',
              '',
              student.SPN,
              '',
              student.LastName,
              student.FirstName,
              '',
              student.EMail,
              student.EMail,
              student.CourseTitle + ' - Period ' + student.GroupIdentifier,
              '',
              student.GradeId < 7262 ? student.HostID : student.UserID,
              '',
              student.StudentLastName,
              student.StudentFirstName,
              '',
              bd.format('MM/DD/YYYY'),
              student.Gender === 'Female' ? 'F' : 'M',
              grade,
              student.Ethnicity,
              '',
              ''
            ]
            rows.push(r)
          }
        })
        let csvContent = 'data:text/csv;charset=utf-8,'
        rows.forEach(rowArray => {
          let row = rowArray.join(',')
          csvContent += row + '\r\n'
        })
        var encodedUri = encodeURI(csvContent)
        window.open(encodedUri)
      })
    },
    getSTN() {
      const d = this.$store.state.fbFunctions.httpsCallable('onapi')
      d({ url: `list/91346`, params: {} }).then(result => {
        const missing = result.data.filter(s => s.STN === null)
        if (missing.length) {
          this.message =
            '<b><u>Students not exported - missing STN:</u></b><ul>'
          for (const m of missing) {
            this.message += `<li>${m.FirstName} ${m.LastName}</li>`
          }
          this.message += '</ul>'
        }
        let rows = [
          [
            'School Number',
            'Student Test Number',
            'Student Last Name',
            'Student First Name',
            'Language Code',
            'Gender',
            'Birth Date',
            'Ethnicity/Race'
          ]
        ]
        result.data.forEach(student => {
          if (student.STN !== null) {
            let langCode = ''
            switch (student.PrimaryLanguage) {
              case 'Afrikaans':
                langCode = '010'
                break
              case 'Arabic':
                langCode = '040'
                break
              case 'Czech':
                langCode = '175'
                break
              case 'English':
                langCode = '211'
                break
              case 'French':
                langCode = '250'
                break
              case 'Korean':
                langCode = '485'
                break
              case 'Mandarin':
                langCode = '600'
                break
              case 'Spanish':
                langCode = '835'
                break
              case 'Vietnamese':
                langCode = '945'
                break
            }
            const bd = moment(student.Dob)
            let eth = '5'
            switch (student.Ethnicity) {
              case 'American Indian/Alaskan Native':
                eth = '1'
                break
              case 'Black':
                eth = '2'
                break
              case 'Asian':
                eth = '3'
                break
              case 'Hispanic/Latino':
                eth = '4'
                break
              case 'White':
                eth = '5'
                break
              case 'Multiracial':
                eth = '6'
                break
              case 'Native Hawaiian/Pacific Islander':
                eth = '7'
                break
            }
            let r = [
              'C527',
              student.STN,
              student.LastName,
              student.FirstName,
              langCode,
              student.Gender === 'Female' ? 'F' : 'M',
              bd.format('MM/DD/YYYY'),
              eth
            ]
            rows.push(r)
          }
        })
        let csvContent = 'data:text/csv;charset=utf-8,'
        rows.forEach(rowArray => {
          let row = rowArray.join(',')
          csvContent += row + '\r\n'
        })
        var encodedUri = encodeURI(csvContent)
        window.open(encodedUri)
      })
    }
  }
}
</script>

<style>
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
