module.exports = class CanvasService {
  constructor() {
    this.axios = require('axios')
    this.config = require('./config')
    this.canvas = this.axios.create({
      baseURL: this.config.baseUrl,
      timeout: 1000,
      headers: {
        Authorization: this.config.auth
      }
    })
  }

  getUser() {
    this.canvas
      .get('accounts/1/users?search_term=brad&per_page=100')
      .then(response => {
        if (response.data.length) {
          for (const match of response.data) {
            console.log(match.id + ' - ' + match.name)
          }
        } else {
          console.log('user not found')
        }
        return
      })
      .catch(error => {
        console.log(error)
      })
  }

  getGrades() {
    this.canvas
      .get('users/2192/courses?include[]=total_scores&include[]=sections')
      .then(response => {
        for (const course of response.data) {
          if (course.enrollment_term_id === 51) {
            console.log(
              course.name +
                ' - ' +
                course.sections[0].name +
                ' => ' +
                course.enrollments[0].computed_current_score
            )
          }
        }
        return
      })
      .catch(error => {
        console.log(error)
      })
  }
}

const cs = new CanvasService()
cs.getUser()