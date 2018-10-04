module.exports = class SparkpostService {
  constructor() {
    this.SparkPost = require('sparkpost')
    this.config = require('./config')
    this.sparky = new this.SparkPost(this.config.apiKey)
  }

  send(subject, html, address) {
    this.sparky.transmissions
      .send({
        options: {
          sandbox: false
        },
        content: {
          from: 'noreply@covenant.education',
          subject,
          html
        },
        recipients: [
          {
            address
          }
        ]
      })
      .then(data => {
        console.log(data)
        return
      })
      .catch(error => {
        console.log(error)
      })
  }
}
