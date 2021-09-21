<template>
  <div>
    <h1>Course Roster Emails</h1>
    Select Department:
    <select v-model="selectedDepartment" @change="onDepartmentChange">
      <option v-for="d in departments" :key="d.id" :value="d.id">{{
        d.name
      }}</option>
    </select>
    <div v-if="selectedDepartment">
      Select Course:
      <select v-model="selectedCourse" @change="onCourseChange">
        <option v-for="c in courses" :key="c.course_code" :value="c.course_code"
          >{{ c.course_code }} - {{ c.course_title }}</option
        >
      </select>
    </div>
    <div class="loading" v-if="sectionCount > 0">
      Sections loading: {{ sectionCount }}
    </div>
    <div class="emails" v-if="showEmails">
      Total students: {{ students.length }}
      <br />
      <textarea v-model="students" cols="50" rows="20"></textarea>
      <br />
      <button @click="copyClipboard">Copy to Clipboard</button>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      courses: [],
      departments: [],
      sections: [],
      selectedCourse: null,
      selectedDepartment: null,
      students: [],
      sectionCount: 0,
    }
  },
  computed: {
    showEmails() {
      return this.sectionCount === 0 && this.students.length > 0 ? true : false
    },
  },
  methods: {
    copyClipboard() {
      const range = document.createRange()
      const text = document.querySelector('textarea')
      range.selectNode(text)
      window.getSelection().addRange(range)
      document.execCommand('copy')
      window.getSelection().removeAllRanges()
    },
    loadData() {
      const d = this.$store.state.fbFunctions.httpsCallable('skyapi')
      getSections(d).then((data) => {
        this.sections = data
        getDepartments(d).then((data) => {
          this.departments = data
        })
      })
    },
    onCourseChange() {
      const temp = this.sections.filter(
        (c) => c.course_code === this.selectedCourse
      )
      const s = []
      for (const t of temp) {
        s.push(t.id)
      }
      const sections = [...new Set(s)] // removes dups
      const d = this.$store.state.fbFunctions.httpsCallable('skyapi')
      this.students = []
      for (const section of sections) {
        this.sectionCount++
        getStudents(d, section).then((data) => {
          this.students = this.students.concat(data)
          this.sectionCount--
        })
      }
    },
    onDepartmentChange() {
      const d = this.$store.state.fbFunctions.httpsCallable('skyapi')
      getCourses(d, this.selectedDepartment).then((data) => {
        this.courses = data
      })
    },
  },
  mounted: function() {
    this.loadData()
  },
}

async function getCourses(f, department) {
  const courses = await f({
    product: 'school',
    url: 'academics/courses',
    params: { department_id: department, level_id: 2175 },
  })
  return courses.data.value.filter((c) => c.inactive === false)
}

async function getDepartments(f) {
  const departments = await f({
    product: 'school',
    url: 'academics/departments',
    params: { level_id: 2175 },
  })
  return departments.data.value
}

async function getSections(f) {
  const sections = await f({
    product: 'school',
    url: 'academics/sections',
    params: { level_num: 2175, school_year: '2021-2022' },
  })
  return sections.data.value
}

async function getStudents(f, id) {
  const result = await f({
    product: 'school',
    url: `academics/sections/${id}/students`,
    params: {},
  })
  const students = []
  for (const r of result.data.value) {
    const s = await f({
      product: 'school',
      url: `users/${r.id}`,
      params: {},
    })
    const student = s.data
    students.push(student.email)
  }
  return students
}
</script>

<style scoped>
.emails {
  margin: 2vw;
}
.loading {
  background: lightgreen;
  margin: 2vw;
}
</style>
