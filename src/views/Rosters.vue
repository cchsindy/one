<template>
  <div>
    <h1>Course Roster Emails</h1>
    <p v-for="course in courses" :key="course.course_code">
      {{course.course_code}}: {{course.course_title}}
    </p>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      courses: []
    }
  },
  methods: {
    loadSections() {
      const d = this.$store.state.fbFunctions.httpsCallable('skyapi')
      getCourses(d).then(data => {
        this.courses = data
      })
    }
  },
  mounted: function() {
    this.loadSections()
  }
}

async function getCourses(f) {
  const courses = await f({
    product: 'school',
    url: 'academics/courses',
    params: { department_id: 34144, level_id: 2175 }
  })
  return courses.data.value
}

async function getSections(f) {
  const sections = await f({
    product: 'school',
    url: 'academics/sections',
    params: { level_num: 2175, school_year: '2019-2020' }
  })
  let courses = []
  let prevCourse = ''
  for (const s of sections.data.value) {
    if (s.duration.name === '1st Semester') {
      if (s.course_code != prevCourse) {
        courses.push({
          code: s.course_code,
          sections: [
            {
              id: s.id,
              name: s.name,
              period: s.section_identifier
            }
          ]
        })
      } else {
        courses[courses.length - 1].sections.push({
          id: s.id,
          name: s.name,
          period: s.section_identifier
        })
      }
      prevCourse = s.course_code
    }
  }
  return courses
}
</script>

<style scoped>
</style>
