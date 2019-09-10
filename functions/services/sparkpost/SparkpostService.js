module.exports = class SparkpostService {
  constructor() {
    this.SparkPost = require('sparkpost')
    this.config = require('./config')
    this.sparky = new this.SparkPost(this.config.apiKey)
  }

  send(subject, html, recipients, reply_to = 'noreply@covenant.education') {
    return new Promise((resolve, reject) => {
      try {
        this.sparky.transmissions
          .send({
            options: {
              sandbox: false
            },
            content: {
              from: 'noreply@covenant.education',
              subject,
              html,
              reply_to
            },
            recipients
          })
          .then(data => {
            console.log(data)
            resolve('Email sent.')
            return
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
      } catch (error) {
        reject(error)
      }
    })
  }
}
