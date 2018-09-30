const functions = require('firebase-functions')

exports.sendEmail = functions.https.onRequest((request, response) => {
  const SparkpostService = require('./services/sparkpost/SparkpostService')
  const mail = new SparkpostService()
  mail.send(request.body.subject, request.body.html, request.body.address)
  response.send('Email sent.')
})
