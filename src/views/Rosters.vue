<template>
  <div>
    <h1>Course Roster Emails</h1>
    Select Department:
    <select v-model="selectedDepartment" @change="onDepartmentChange">
      <option v-for="d in departments" :key="d.id" :value="d.id">
        {{d.name}}
      </option>
    </select>
    <div v-if="selectedDepartment">
      Select Course:
      <select v-model="selectedCourse" @change="onCourseChange">
        <option v-for="c in courses" :key="c.course_code" :value="c.course_code">
          {{c.course_code}} - {{c.course_title}}
        </option>
      </select>
    </div>
    <p v-for="s in students" :key="s.id">
      {{ s.name }}
    </p>
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
      students: []
    }
  },
  methods: {
    loadData() {
      const d = this.$store.state.fbFunctions.httpsCallable('skyapi')
      getSections(d).then(data => {
        this.sections = data
        getDepartments(d).then(data => {
          this.departments = data
        })
      })
    },
    onCourseChange() {
      const temp = this.sections.filter(
        c => c.course_code === this.selectedCourse
      )
      const s = []
      for (const t of temp) {
        s.push(t.id)
      }
      const sections = [...new Set(s)]
      const d = this.$store.state.fbFunctions.httpsCallable('skyapi')
      for (const section of sections) {
        getStudents(d, section).then(data => {
          this.students = this.students.concat(data)
        })
      }
    },
    onDepartmentChange() {
      const d = this.$store.state.fbFunctions.httpsCallable('skyapi')
      getCourses(d, this.selectedDepartment).then(data => {
        this.courses = data
      })
    }
  },
  mounted: function() {
    this.loadData()
  }
}

async function getCourses(f, department) {
  const courses = await f({
    product: 'school',
    url: 'academics/courses',
    params: { department_id: department, level_id: 2175 }
  })
  return courses.data.value.filter(c => c.inactive === false)
}

async function getDepartments(f) {
  const departments = await f({
    product: 'school',
    url: 'academics/departments',
    params: { level_id: 2175 }
  })
  return departments.data.value
}

async function getSections(f) {
  const sections = await f({
    product: 'school',
    url: 'academics/sections',
    params: { level_num: 2175, school_year: '2019-2020' }
  })
  return sections.data.value
}

async function getStudents(f, id) {
  const students = await f({
    product: 'school',
    url: `academics/sections/${id}/students`,
    params: {}
  })
  return students.data.value
}
</script>

<style scoped>
</style>
