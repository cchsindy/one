const functions = require('firebase-functions')
const SparkPost = require('sparkpost')
const config = require('./config')
const sparky = new SparkPost(config.sparkpostApiKey)

exports.sendEmail = functions.https.onRequest((request, response) => {
  sparky.transmissions
    .send({
      options: {
        sandbox: false
      },
      content: {
        from: 'noreply@covenant.education',
        subject: request.body.subject,
        html: request.body.html
      },
      recipients: [
        {
          address: request.body.address
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
  response.send('Email sent.')
})
