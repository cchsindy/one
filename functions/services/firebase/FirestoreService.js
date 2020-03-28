module.exports = class FirestoreService {
  constructor() {
    this.admin = require('firebase-admin')
    const functions = require('firebase-functions')
    try {
      this.admin.initializeApp(functions.config().firebase)
    } catch (err) {
      console.log(err)
    }
    this.myStore = this.admin.firestore()
  }

  async loadOnToken() {
    try {
      const doc = await this.myStore.doc('onTokens/token').get()
      return doc.data()
    } catch (err) {
      console.log(err)
      return {}
    }
  }

  async loadSkyToken(product) {
    try {
      const doc = await this.myStore.doc(`skyTokens/${product}`).get()
      return doc.data()
    } catch (err) {
      console.log(err)
      return {}
    }
  }

  async saveOnToken(token) {
    try {
      await this.myStore.doc('onTokens/token').set(token)
      return 'saved'
    } catch (err) {
      console.log(err)
      return {}
    }
  }

  async saveSkyToken(product, token) {
    try {
      await this.myStore.doc(`skyTokens/${product}`).set(token)
      return 'saved'
    } catch (err) {
      console.log(err)
      return {}
    }
  }

  async addCollectionDocument(collection, data) {
    try {
      await this.myStore.collection(collection).add(data)
      return {}
    } catch (err) {
      console.log(err)
      return {}
    }
  }

  async getCollectionDocumentIds(collection) {
    try {
      const result = await this.myStore.collection(collection).listDocuments()
      return result.documents
    } catch (err) {
      console.log(err)
      return []
    }
  }

  async getDocumentData(path) {
    try {
      let docRef = this.myStore.doc(path)
      let doc = await docRef.get()
      return doc.data()
    } catch (err) {
      console.log(err)
      return {}
    }
  }

  async documentFieldsIncrementer(path, fields) {
    try {
      let docRef = this.myStore.doc(path)
      let inc = {}
      for (const key in fields) {
        inc[key] = this.admin.firestore.FieldValue.increment(fields[key])
      }
      await docRef.update(inc)
      return {}
    } catch (err) {
      console.log(err)
      return {}
    }
  }

  async teaDecrement(tickets) {
    try {
      let docRef = this.myStore.doc('tea_counts/tickets')
      let thursday = parseInt(tickets.thursday)
      let friday = parseInt(tickets.friday)
      let saturday = parseInt(tickets.saturday)
      await docRef.update({
        thursday: this.admin.firestore.FieldValue.increment(-thursday),
        friday: this.admin.firestore.FieldValue.increment(-friday),
        saturday: this.admin.firestore.FieldValue.increment(-saturday)
      })
      return {}
    } catch (err) {
      console.log(err)
      return {}
    }
  }
}
