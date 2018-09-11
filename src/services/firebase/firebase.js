import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import config from './config'

const my = firebase.initializeApp(config)
const auth = my.auth()
const google = new firebase.auth.GoogleAuthProvider()
const myStore = my.firestore()
myStore.settings({
  timestampsInSnapshots: true
})

export { auth, google, myStore }
