module.exports = class OnService {
  constructor(token) {
    this.axios = require('axios')
    this.config = require('./config')
    this.on = this.axios.create({
      baseURL: this.config.on.baseUrl
    })
    this.token = token.Token || ''
  }

  async fetchData(url, params) {
    try {
      params.t = this.token
      const res = await this.on.get(url, { params })
      return res.data
    } catch (err) {
      console.log(err.response.data)
      return null
    }
  }

  async postData(url, data) {
    // generic method to post data
  }

  async refreshToken() {
    try {
      // const qs = require('qs')
      // const rd = qs.stringify({
      //   grant_type: 'refresh_token',
      //   refresh_token: this.refresh_token
      // })
      const res = await this.on.post('authentication/login', {
        username: this.config.on.username,
        password: this.config.on.password
      })
      this.token = res.data.Token
      return res.data
    } catch (err) {
      console.log(err.response.data)
      return null
    }
  }
}
