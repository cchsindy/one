const functions = require('firebase-functions')
const AuthorizeNetService = require('./services/authorizenet/AuthorizeNetService')
const CanvasService = require('./services/canvas/CanvasService')
const SparkpostService = require('./services/sparkpost/SparkpostService')
const VnnService = require('./services/vnn/VnnService')

exports.creditCard = functions.https.onRequest((request, response) => {
  const authorize = new AuthorizeNetService()
  authorize.charge(request.body.data)
  response.send('Credit card transaction made.')
})

exports.daily_job = functions.pubsub.topic('daily-tick').onPublish(message => {
  const mail = new SparkpostService()
  mail.send(
    'From Cron Job',
    '<html><body>You should get this email once every day.</body></html>',
    [{ address: 'bradspencer@covenantchristian.org' }]
  )
  return true
})

exports.weekly_job = functions.pubsub
  .topic('weekly-tick')
  .onPublish(message => {
    const canvas = new CanvasService()
    const sparkpost = new SparkpostService()
    const vnn = new VnnService()
    vnn.runEligibilityCheck(canvas, sparkpost)
    return true
  })

// exports.sendEmail = functions.https.onRequest((request, response) => {
//   const mail = new SparkpostService()
//   mail.send(request.body.subject, request.body.html, request.body.address)
//   response.send('Email sent.')
// })

// cron jobs
// exports.hourly_job = functions.pubsub
//   .topic('hourly-tick')
//   .onPublish(message => {
//     console.log('This job is run every hour!')
//     if (message.data) {
//       const dataString = Buffer.from(message.data, 'base64').toString()
//       console.log(`Message Data: ${dataString}`)
//     }
//     return true
//   })
