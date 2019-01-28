module.exports = class FirebaseService {
  constructor() {
    const admin = require('firebase-admin')
    const serviceAccount = require('./serviceAccountKey.json')
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://my-covenant.firebaseio.com'
      })
    }
    this.myStore = admin.firestore()
    if (!admin.apps.length) {
      this.myStore.settings({
        timestampsInSnapshots: true
      })
    }
  }

  authorizeNetTransaction(data) {
    return new Promise((resolve, reject) => {
      try {
        let docRef = this.myStore.doc('authorizeNet/' + data.transactionId)
        let doc = {
          amount: data.amount,
          description: data.description,
          date: data.date,
          firstname: data.firstname,
          lastname: data.lastname
        }
        docRef.set(doc)
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }

  blackbaud(collection, data) {
    return new Promise((resolve, reject) => {
      try {
        const ts = Date.now()
        for (const d of data) {
          let docName = ''
          let doc = {}
          switch (collection) {
            case 'bb_faculty':
              docName = d['Record ID']
              doc = {
                email: d['Contact number'].trim().toLowerCase(),
                first: d['First name'].trim(),
                last: d['Last name'].trim(),
                title: d['Title 1'].trim(),
                faculty: d['Current teacher?'] === 'Yes' ? true : false,
                synced: ts
              }
              break
            case 'bb_individuals':
              docName = d['Record ID']
              doc = {
                email: d['Contact number'].trim().toLowerCase(),
                first: d['First name'].trim(),
                last: d['Last name'].trim(),
                username: d['Online user ID'].trim(),
                synced: ts
              }
              break
            case 'bb_students':
              docName = d['Student ID']
              doc = {
                email: d['Contact number'].trim().toLowerCase(),
                first: d['First name'].trim(),
                last: d['Last name'].trim(),
                nickname: d['Nickname'].trim(),
                birthdate: d['Birth date'].trim(),
                gender: d['Gender'].trim(),
                grade: d['Current Grade'].trim(),
                status: d['Current status'].trim(),
                synced: ts
              }
              break
          }
          let docRef = this.myStore.doc(collection + '/' + docName)
          docRef.set(doc)
        }
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }

  pizzaDonation(data) {
    return new Promise((resolve, reject) => {
      try {
        this.myStore
          .collection('pizza_fundraiser')
          .add(data)
          .then(docRef => {
            resolve()
            return
          })
          .catch(error => {
            reject(error)
          })
      } catch (error) {
        reject(error)
      }
    })
  }
}
