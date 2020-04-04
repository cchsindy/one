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

  async getCollectionDocumentRefs(collection) {
    try {
      const refs = await this.myStore.collection(collection).listDocuments()
      return refs
    } catch (err) {
      console.log(err)
      return []
    }
  }

  async deleteCollectionDocuments(collection) {
    try {
      this.myStore
        .collection(collection)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            doc.ref.delete()
          })
          return {}
        })
        .catch((e) => {
          console.log(e)
        })
    } catch (err) {
      console.log(err)
      return {}
    }
  }

  async deleteCollectionDocumentsWhere(collection, match) {
    try {
      this.myStore
        .collection(collection)
        .where(match.field, match.condition, match.value)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            doc.ref.delete()
          })
          return {}
        })
        .catch((e) => {
          console.log(e)
        })
    } catch (err) {
      console.log(err)
      return {}
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
}
