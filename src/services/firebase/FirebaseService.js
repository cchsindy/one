import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import config from './config'

class FirebaseService {
  constructor() {
    this.my = firebase.initializeApp(config)
    this.auth = this.my.auth()
    this.google = new firebase.auth.GoogleAuthProvider()
    this.myStore = this.my.firestore()
    this.myStore.settings({
      timestampsInSnapshots: true
    })
  }
}

export default new FirebaseService()
