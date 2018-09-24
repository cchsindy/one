import SparkPost from 'sparkpost'
import config from './config'

class SparkpostService {
  constructor() {
    this.sparky = new SparkPost(config.apiKey)
  }

  sendEmail(address, subject, html) {
    this.sparky.transmissions
      .send({
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

export default new SparkpostService()
