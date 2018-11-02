class CanvasService {
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
    this.data = null
  }

  async run(name) {
    await this.getUser(name)
    await this.getGrades(this.data[0].id)
  }

  async getAccounts() {
    await new Promise((resolve, reject) => {
      this.canvas
        .get('accounts/1/sub_accounts', {
          params: {
            per_page: 50
          }
        })
        .then(response => {
          console.log(response.data)
          resolve()
          return
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  }

  async getCourse(id) {
    await new Promise((resolve, reject) => {
      this.canvas
        .get('courses/' + id)
        .then(response => {
          console.log(response.data)
          resolve()
          return
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  }

  async getUser(name) {
    await new Promise((resolve, reject) => {
      this.canvas
        .get('accounts/1/users', {
          params: {
            search_term: name
          }
        })
        .then(response => {
          // if (response.data.length) {
          //   for (const match of response.data) {
          //     console.log(match.id + ' - ' + match.name)
          //   }
          // } else {
          //   console.log('user not found')
          // }
          this.data = response.data
          resolve()
          return
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  }

  async getGrades(id) {
    await new Promise((resolve, reject) => {
      this.canvas
        .get('users/' + id + '/courses', {
          params: {
            include: ['total_scores', 'sections']
          }
        })
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
          resolve()
          return
        })
        .catch(error => {
          // console.log(error)
          reject(error)
        })
    })
  }

  updateCourse(id, name) {
    this.canvas
      .put('courses/' + id, {
        course: {
          name: name
        }
      })
      .then(response => {
        console.log(response.data)
        return
      })
      .catch(error => {
        console.log(error)
      })
  }
}

const c = new CanvasService()
c.run('Dylan Lawson')
  .then(() => {
    console.log('hey')
    return
  })
  .catch(e => {
    console.log(e)
  })
