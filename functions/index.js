const functions = require('firebase-functions')
const cors = require('cors')({ origin: true })
const AuthorizeNetService = require('./services/authorizenet/AuthorizeNetService')
const CanvasService = require('./services/canvas/CanvasService')
const FirebaseService = require('./services/firebase/FirebaseService')
const FirestoreService = require('./services/firebase/FirestoreService')
const OnService = require('./services/blackbaud/OnService')
const SparkpostService = require('./services/sparkpost/SparkpostService')
const VnnService = require('./services/vnn/VnnService')

exports.canvas = functions.https.onCall(async (data, context) => {
  const cs = new CanvasService()
  const user = await cs.getUser(data.name)
  const grades = await cs.getGrades(user[0].id, 86)
  const result = {
    user: user[0],
    grades
  }
  return result
})

exports.creditCard = functions.https.onRequest((request, response) => {
  return cors(request, response, async () => {
    const authorize = new AuthorizeNetService()
    const ccTrans = await authorize.charge(request.body.data)
    if (ccTrans.transactionId) {
      const fbs = new FirebaseService()
      await fbs.authorizeNetTransaction({
        transactionId: ccTrans.transactionId,
        amount: request.body.data.amount,
        description: request.body.data.description,
        date: Date.now(),
        firstname: request.body.data.firstName,
        lastname: request.body.data.lastName
      })
    }
    response.send(ccTrans)
  })
})

exports.carShow = functions.https.onRequest((request, response) => {
  return cors(request, response, async () => {
    const fbs = new FirebaseService()
    let data = {
      firstname: request.body.data.firstName,
      lastname: request.body.data.lastName,
      address: request.body.data.address,
      city: request.body.data.city,
      state: request.body.data.state,
      zip: request.body.data.zip,
      email: request.body.data.email,
      phone: request.body.data.phone,
      year: request.body.data.year,
      make: request.body.data.make,
      model: request.body.data.model,
      features: request.body.data.features,
      release: request.body.data.release,
      date: Date.now()
    }
    if (request.body.data.payment === 'online') {
      data.amount = request.body.data.amount
      data.transaction = request.body.data.transactionId
    } else {
      data.transaction = 'Pay At Check-in'
    }
    await fbs.carShowRegistration(data)
    const mail = new SparkpostService()
    let subject = request.body.data.description
    let html = request.body.data.html
    let recipients = [{ address: request.body.data.email }]
    await mail.send(subject, html, recipients)
    response.send('Registration complete.')
  })
})

exports.onapi = functions.https.onCall(async (data, context) => {
  try {
    const fs = new FirestoreService()
    const token = await fs.loadOnToken()
    const os = new OnService(token)
    let res = await os.fetchData(data.url, data.params)
    if (!res) {
      const newToken = await os.refreshToken()
      if (newToken) {
        await fs.saveOnToken(newToken)
        res = await os.fetchData(data.url, data.params)
      }
    }
    if (!res) res = 'Unable to fetch data.'
    return res
  } catch (err) {
    return err
  }
})

exports.pizza = functions.https.onRequest((request, response) => {
  return cors(request, response, async () => {
    // THIS NEEDS TO BE UPDATED FOR THE NEW WAY !!
    // const fbs = new FirebaseService()
    // await fbs.pizzaDonation({
    //   firstname: request.body.data.firstName,
    //   lastname: request.body.data.lastName,
    //   address: request.body.data.address,
    //   city: request.body.data.city,
    //   state: request.body.data.state,
    //   zip: request.body.data.zip,
    //   phone: request.body.data.phone,
    //   email: request.body.data.email,
    //   pizzas: request.body.data.pizzas,
    //   donation: request.body.data.donation,
    //   student: request.body.data.student,
    //   transaction: ccTrans.transactionId,
    //   amount: request.body.data.amount,
    //   date: Date.now()
    // })
    response.send('na')
  })
})

exports.yearbook = functions.https.onRequest((request, response) => {
  return cors(request, response, async () => {
    const fbs = new FirebaseService()
    let data = {
      firstname: request.body.data.firstName,
      lastname: request.body.data.lastName,
      address: request.body.data.address,
      city: request.body.data.city,
      state: request.body.data.state,
      zip: request.body.data.zip,
      email: request.body.data.email,
      phone: request.body.data.phone,
      books: request.body.data.books,
      students: request.body.data.students,
      amount: request.body.data.amount,
      transaction: request.body.data.transactionId,
      date: Date.now()
    }
    await fbs.yearbookPurchase(data)
    const mail = new SparkpostService()
    let subject = request.body.data.description
    let html = request.body.data.html
    let recipients = [{ address: request.body.data.email }]
    await mail.send(subject, html, recipients)
    response.send('Order complete.')
  })
})

// exports.daily_job = functions.pubsub.topic('daily-tick').onPublish(message => {
//   const mail = new SparkpostService()
//   mail.send(
//     'From Cron Job',
//     '<html><body>You should get this email once every day.</body></html>',
//     [{ address: 'bradspencer@covenantchristian.org' }]
//   )
//   return true
// })

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
