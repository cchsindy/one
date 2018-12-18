const fireserv = require('./services/firebase/FirebaseService')

const fb = new fireserv()

fb.authorizeNetTransaction({ myformdata: 'test123' }, { transactionId: 123 })
  .then(() => {
    console.log('done')
    return
  })
  .catch(error => {
    console.log(error)
  })
