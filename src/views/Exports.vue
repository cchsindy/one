<template>
  <div>
    <h1>SIS Exports</h1>
    <BaseButton @click="getAttendance">DOE Attendance</BaseButton>
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
      message: '',
    }
  },
  methods: {
    async getAttendance() {
      const doeAT = []
      const sky = this.$store.state.fbFunctions.httpsCallable('skyapi')
      const schedule = await getMasterSchedule(sky, '2019-08-01', '2020-05-22')
      const attendance = await getDayAttendance(sky, schedule)
      const students = await getCurrentStudents(sky)
      const first = new Date('2019-08-01T00:00:00')
      for (const s of students) {
        const begin =
          s.started < first
            ? moment(first).format('MM/DD/YYYY')
            : moment(s.started).format('MM/DD/YYYY')
        const end = moment(s.departed).format('MM/DD/YYYY')
        let attended = schedule.filter((d) => s.started <= d && s.departed >= d)
          .length
        let excused =
          attendance.filter((a) => s.id === a.id && a.type === 'E').length / 8
        let int = Math.trunc(excused)
        let dec = excused
          .toFixed(1)
          .toString()
          .slice(-1)
        let newDec = '0'
        if (dec > 3) newDec = '5'
        if (dec > 8) {
          newDec = '0'
          int++
        }
        excused = parseFloat(int.toString() + '.' + newDec)
        attended -= excused
        let unexcused =
          attendance.filter((a) => s.id === a.id && a.type === 'U').length / 8
        int = Math.trunc(unexcused)
        dec = unexcused
          .toFixed(1)
          .toString()
          .slice(-1)
        newDec = '0'
        if (dec > 3) newDec = '5'
        if (dec > 8) {
          newDec = '0'
          int++
        }
        unexcused = parseFloat(int.toString() + '.' + newDec)
        attended -= unexcused
        doeAT.push(
          `C527,${s.stn},${begin},${end},${attended},${excused},${unexcused},${s.grade}`
        )
      }
      let csvContent = 'data:text/csv;charset=utf-8,'
      doeAT.forEach((row) => {
        csvContent += row + '\r\n'
      })
      const encodedUri = encodeURI(csvContent)
      window.open(encodedUri)
    },
    getNWEA() {
      const d = this.$store.state.fbFunctions.httpsCallable('skyapi')
      // list 91578 Sem 1 - 98868 Sem 2
      d({ product: 'school', url: `legacy/lists/91578`, params: {} }).then(
        (result) => {
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
              'Student Email',
            ],
          ]
          result.data.rows.forEach((row) => {
            const student = row.columns
            if (student[10].value !== null) {
              const bd = moment(student[9].value)
              let grade = '9'
              switch (student[16].value) {
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
                student[15].value,
                '',
                student[12].value,
                student[11].value,
                '',
                student[13].value,
                student[13].value,
                student[2].value + ' - Period ' + student[3].value,
                '',
                student[7].value,
                '',
                student[1].value,
                student[0].value,
                '',
                bd.format('MM/DD/YYYY'),
                student[8].value === 'Female' ? 'F' : 'M',
                grade,
                student[10].value,
                '',
                '',
              ]
              rows.push(r)
            }
          })
          let csvContent = 'data:text/csv;charset=utf-8,'
          rows.forEach((rowArray) => {
            let row = rowArray.join(',')
            csvContent += row + '\r\n'
          })
          var encodedUri = encodeURI(csvContent)
          window.open(encodedUri)
        }
      )
    },
    getSTN() {
      const d = this.$store.state.fbFunctions.httpsCallable('skyapi')
      d({ product: 'school', url: `legacy/lists/91346`, params: {} }).then(
        (result) => {
          let missing = []
          let rows = [
            [
              'School Number',
              'Student Test Number',
              'Student Last Name',
              'Student First Name',
              'Language Code',
              'Gender',
              'Birth Date',
              'Ethnicity/Race',
            ],
          ]
          result.data.rows.forEach((row) => {
            const student = row.columns
            if (student[6].value) {
              let langCode = ''
              switch (student[5].value) {
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
              const bd = moment(student[3].value)
              let eth = '5'
              switch (student[4].value) {
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
                student[6].value,
                student[1].value,
                student[0].value,
                langCode,
                student[2].value === 'Female' ? 'F' : 'M',
                bd.format('MM/DD/YYYY'),
                eth,
              ]
              rows.push(r)
            } else {
              missing.push({
                FirstName: student[0].value,
                LastName: student[1].value,
              })
            }
          })
          if (missing.length) {
            this.message =
              '<b><u>Students not exported - missing STN:</u></b><ul>'
            for (const m of missing) {
              this.message += `<li>${m.FirstName} ${m.LastName}</li>`
            }
            this.message += '</ul>'
          }
          let csvContent = 'data:text/csv;charset=utf-8,'
          rows.forEach((rowArray) => {
            let row = rowArray.join(',')
            csvContent += row + '\r\n'
          })
          var encodedUri = encodeURI(csvContent)
          window.open(encodedUri)
        }
      )
    },
  },
}

// eslint-disable-next-line no-unused-vars
async function getDayAttendance(sky, days) {
  const attendance = []
  let result
  for (const day of days) {
    result = await sky({
      product: 'school',
      url: 'attendance',
      params: {
        level_id: 2175,
        day: moment(day).format('YYYY-MM-DD'),
        offering_type: 1,
      },
    })
    result.data.value.forEach((r) => {
      if (r.excuse_type_id === 6736 || r.excuse_type_id === 7806) {
        attendance.push({
          id: r.student_user_id,
          type: 'U',
        })
      } else if (
        r.excuse_type_id === 6737 ||
        r.excuse_type_id === 6740 ||
        r.excuse_type_id === 6741
      ) {
        attendance.push({
          id: r.student_user_id,
          type: 'E',
        })
      }
    })
  }
  return attendance
}

// eslint-disable-next-line no-unused-vars
async function getMasterSchedule(sky, start, end) {
  const result = await sky({
    product: 'school',
    url: 'academics/schedules/master',
    params: { level_num: 2175, start_date: start, end_date: end },
  })
  const master = []
  // fix Fall Break dates
  const fallBegin = new Date('2019-10-14T00:00:00')
  const fallEnd = new Date('2019-10-25T00:00:00')
  // fix COVID dates
  const covid1 = new Date('2020-03-13T00:00:00')
  const covid2 = new Date('2020-03-16T00:00:00')
  const covid3 = new Date('2020-04-06T00:00:00')
  const covid4 = new Date('2020-04-13T00:00:00')
  const covid5 = new Date('2020-04-20T00:00:00')
  const covid6 = new Date('2020-04-27T00:00:00')
  for (const r of result.data.value) {
    const date = new Date(r.calendar_day.substring(0, 10) + 'T00:00:00')
    if (
      r.schedule_sets.length &&
      r.schedule_sets[0].blocks.length &&
      (date < fallBegin || date > fallEnd) &&
      (date < covid1 || date > covid1) &&
      (date < covid2 || date > covid2) &&
      (date < covid3 || date > covid3) &&
      (date < covid4 || date > covid4) &&
      (date < covid5 || date > covid5) &&
      (date < covid6 || date > covid6)
    ) {
      master.push(date)
    }
  }
  return master
}

// eslint-disable-next-line no-unused-vars
async function getCurrentStudents(sky) {
  const result = await sky({
    product: 'school',
    url: 'legacy/lists/102532',
  })
  const students = []
  let prev = 0
  for (const r of result.data.rows) {
    if (r.columns[0].value !== prev) {
      if (r.columns[3].value === 'Student' && r.columns[5].value) {
        const departed = new Date('2020-05-22T00:00:00')
        let grade = '12'
        switch (r.columns[7].value) {
          case '7260':
            grade = '11'
            break
          case '7261':
            grade = '10'
            break
          case '7262':
            grade = '09'
            break
        }
        students.push({
          id: parseInt(r.columns[0].value),
          stn: r.columns[5].value,
          started: new Date(r.columns[4].value),
          departed,
          grade,
          name: r.columns[1].value + ' ' + r.columns[2].value,
        })
      } else {
        if (r.columns[6].value && r.columns[5].value) {
          const departed = new Date(r.columns[6].value)
          const first = new Date('2019-08-01T00:00:00')
          let grade = '12'
          switch (r.columns[7].value) {
            case '7260':
              grade = '11'
              break
            case '7261':
              grade = '10'
              break
            case '7262':
              grade = '09'
              break
          }
          if (departed > first) {
            students.push({
              id: parseInt(r.columns[0].value),
              stn: r.columns[5].value,
              started: new Date(r.columns[4].value),
              departed,
              grade,
              name: r.columns[1].value + ' ' + r.columns[2].value,
            })
          }
        }
      }
      prev = r.columns[0].value
    }
  }
  return students
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
