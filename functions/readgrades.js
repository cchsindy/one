const FirebaseService = require('./services/firebase/FirebaseService')
const fb = new FirebaseService()

const csvFilePath = './parents.csv'
const csv = require('csvtojson')
csv()
  .fromFile(csvFilePath)
  .then(jsonObj => {
    fb.saveGrades(jsonObj)
    return null
  })
  .catch(err => {
    console.log(err)
  })
