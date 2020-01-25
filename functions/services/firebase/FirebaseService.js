module.exports = class FirebaseService {
  constructor() {
    const admin = require('firebase-admin')
    const functions = require('firebase-functions')
    try {
      admin.initializeApp(functions.config().firebase)
    } catch (err) {
      console.log(err)
    }
    this.myStore = admin.firestore()
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

  carShowRegistration(data) {
    return new Promise((resolve, reject) => {
      try {
        this.myStore
          .collection('car_show_registrations')
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

  saveGrades(data) {
    return new Promise((resolve, reject) => {
      try {
        let docRef = this.myStore.doc('midterms/parents')
        let doc = { data }
        docRef.set(doc)
        resolve()
      } catch (err) {
        reject(err)
      }
    })
  }

  getReports() {
    return new Promise((resolve, reject) => {
      try {
        const reports = []
        this.myStore
          .collection('midterms/sent/progress1')
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              reports.push(doc.data())
            })
            resolve(reports)
            return
          })
          .catch(err => {
            reject(err)
          })
      } catch (err) {
        console.log(err)
        reject(err)
      }
    })
  }

  wabcMembership(data) {
    return new Promise((resolve, reject) => {
      try {
        this.myStore
          .collection('wabc_memberships')
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

  yearbookPurchase(data) {
    return new Promise((resolve, reject) => {
      try {
        this.myStore
          .collection('yearbook_orders')
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
