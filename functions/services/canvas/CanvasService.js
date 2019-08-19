module.exports = class CanvasService {
  constructor() {
    this.axios = require('axios')
    this.config = require('./config')
    this.canvas = this.axios.create({
      baseURL: this.config.baseUrl,
      timeout: 15000,
      headers: {
        Authorization: this.config.auth
      }
    })
  }

  getCoursesFailing(studentName) {
    return new Promise((resolve, reject) => {
      this.getUser(studentName)
        .then(id => {
          let failing = []
          if (id) {
            this.getGrades(id)
              .then(courses => {
                for (const course of courses) {
                  if (course.grade < 69) failing.push(course)
                }
                resolve(failing)
                return
              })
              .catch(error => {
                reject(error)
                console.log(error)
              })
          } else {
            resolve(failing)
          }
          return
        })
        .catch(error => {
          reject(error)
          console.log(error)
        })
    })
  }

  getUser(name) {
    return new Promise((resolve, reject) => {
      this.canvas
        .get('accounts/1/users', {
          params: {
            search_term: name
          }
        })
        .then(response => {
          if (response.data.length) {
            resolve(response.data[0].id)
            // for (const match of response.data) {
            //   console.log(match.id + ' - ' + match.name)
            // }
          } else {
            resolve(null)
            console.log('user not found')
          }
          return
        })
        .catch(error => {
          reject(error)
          console.log(error)
        })
    })
  }

  getGrades(id) {
    return new Promise((resolve, reject) => {
      this.canvas
        .get('users/' + id + '/courses', {
          params: {
            include: ['total_scores', 'sections'],
            per_page: 100
          }
        })
        .then(response => {
          let courses = []
          for (const course of response.data) {
            // check for current term TODO: pass in termId
            if (course.enrollment_term_id === 86) {
              courses.push({
                name: course.name,
                section: course.sections[0].name,
                grade: course.enrollments[0].computed_current_score
              })
            }
          }
          resolve(courses)
          return
        })
        .catch(error => {
          reject(error)
          console.log(error)
        })
    })
  }
}
