const functions = require('firebase-functions')

exports.sendEmail = functions.https.onRequest((request, response) => {
  const SparkpostService = require('./services/sparkpost/SparkpostService')
  const mail = new SparkpostService()
  mail.send(request.body.subject, request.body.html, request.body.address)
  response.send('Email sent.')
})

// cron
exports.hourly_job = functions.pubsub
  .topic('hourly-tick')
  .onPublish(message => {
    console.log('This job is run every hour!')
    if (message.data) {
      const dataString = Buffer.from(message.data, 'base64').toString()
      console.log(`Message Data: ${dataString}`)
    }
    return true
  })
