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

  init(commit) {
    this.auth.onAuthStateChanged(user => {
      if (user) {
        commit('setUser', user.displayName || user.email)
        const docRef = this.myStore.doc('users/' + user.uid)
        docRef.onSnapshot(doc => {
          if (doc && doc.exists) {
            const data = doc.data()
            commit('setRoles', data.roles)
          }
        })
      } else {
        commit('clearUser')
        commit('clearRoles')
      }
    })
  }

  googleLogin(commit) {
    this.auth
      .signInWithPopup(this.google)
      .then(result => {
        if (result.additionalUserInfo.isNewUser) {
          let collection = 'bb_individuals'
          if (result.user.email.includes('covenantchristian.org'))
            collection = 'bb_faculty'
          if (result.user.email.includes('cchsindy.org'))
            collection = 'bb_students'
          const bbIndRef = this.myStore.collection(collection)
          const records = []
          bbIndRef
            .where('email', '==', result.user.email.toLowerCase())
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(doc => {
                records.push({
                  ...doc.data(),
                  bbid: doc.id
                })
              })
              if (records.length === 1) {
                const docRef = this.myStore.doc('users/' + result.user.uid)
                let doc = {}
                switch (collection) {
                  case 'bb_faculty':
                    doc = {
                      bbId: records[0].bbid,
                      bbType: 'Faculty',
                      first: records[0].first,
                      last: records[0].last,
                      title: records[0].title,
                      faculty: records[0].faculty
                    }
                    break
                  case 'bb_individuals':
                    doc = {
                      bbId: records[0].bbid,
                      bbType: 'Individuals',
                      first: records[0].first,
                      last: records[0].last,
                      username: records[0].username
                    }
                    break
                  case 'bb_students':
                    doc = {
                      bbId: records[0].bbid,
                      bbType: 'Student',
                      first: records[0].first,
                      last: records[0].last,
                      nickname: records[0].nickname,
                      gender: records[0].gender,
                      birthdate: records[0].birthdate,
                      grade: records[0].grade,
                      status: records[0].status
                    }
                    break
                }
                docRef.set(doc)
              } else {
                commit('setError', {
                  message: 'Email not found in our system.'
                })
                this.auth.currentUser.delete().catch(error => {
                  console.log('error deleting user:', error)
                })
              }
            })
        }
      })
      .catch(error => {
        commit('setError', error)
      })
  }

  logout(commit) {
    this.auth.signOut().catch(error => {
      commit('setError', error)
    })
  }
}

export default new FirebaseService()
