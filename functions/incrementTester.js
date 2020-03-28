const FirestoreService = require('./services/firebase/FirestoreService')

const fs = new FirestoreService()

fs.documentFieldsIncrementer('test', {
  one: 4,
  two: -3,
  three: 8
})
