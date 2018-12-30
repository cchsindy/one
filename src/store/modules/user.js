const state = {
  error: null,
  matches: [],
  roles: null,
  user: null
}

const getters = {
  error(state) {
    return state.error
  },
  matches(state) {
    return state.matches
  },
  roles(state) {
    return state.roles
  },
  user(state) {
    return state.user
  }
}

const actions = {
  checkForMatch({ commit, rootState }, payload) {
    let collection = 'bb_individuals'
    if (payload.email.includes('covenantchristian.org'))
      collection = 'bb_faculty'
    if (payload.email.includes('cchsindy.org')) collection = 'bb_students'
    const bbRef = rootState.fbStore.collection(collection)
    const matches = []
    bbRef
      .where('email', '==', payload.email.trim().toLowerCase())
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          matches.push({
            bbid: doc.id,
            ...doc.data()
          })
          commit('SET_MATCHES', matches)
        })
      })
  },
  clearError({ commit }) {
    commit('CLEAR_ERROR')
  },
  createUser({ commit, rootState }, payload) {
    rootState.fbAuth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .catch(error => {
        commit('SET_ERROR', error)
      })
      .then(() => {
        rootState.fbAuth.currentUser
          .updateProfile({
            displayName: payload.first + ' ' + payload.last
          })
          .then(() => {
            commit('SET_USER', rootState.fbAuth.currentUser.displayName)
          })
        const docRef = rootState.fbStore.doc(
          'users/' + rootState.fbAuth.currentUser.uid
        )
        docRef.set({
          bbId: payload.bbId,
          bbType: payload.bbType,
          bbUsername: payload.bbUsername,
          first: payload.first,
          last: payload.last
        })
      })
  },
  googleSignin({ commit, rootState }) {
    rootState.fbAuth.signInWithPopup(rootState.fbGoogle).then(result => {
      if (result.additionalUserInfo.isNewUser) {
        let collection = 'bb_individuals'
        if (result.user.email.includes('covenantchristian.org'))
          collection = 'bb_faculty'
        if (result.user.email.includes('cchsindy.org'))
          collection = 'bb_students'
        const bbIndRef = rootState.fbStore.collection(collection)
        const records = []
        bbIndRef
          .where('email', '==', result.user.email.toLowerCase())
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              records.push({
                bbid: doc.id,
                ...doc.data()
              })
            })
            if (records.length === 1) {
              const docRef = rootState.fbStore.doc('users/' + result.user.uid)
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
              commit('SET_ERROR', {
                message: 'Email not found in our system.'
              })
              rootState.fbAuth.currentUser.delete().catch(error => {
                console.log('error deleting user:', error)
              })
            }
          })
      }
    })
  },
  initAuth({ commit, rootState }) {
    rootState.fbAuth.onAuthStateChanged(user => {
      if (user) {
        commit('SET_USER', user.displayName || user.email)
        const docRef = rootState.fbStore.doc('users/' + user.uid)
        docRef.onSnapshot(doc => {
          if (doc && doc.exists) {
            const data = doc.data()
            commit('SET_ROLES', data.roles)
          }
        })
      } else {
        commit('CLEAR_USER')
        commit('CLEAR_ROLES')
      }
    })
  },
  loginUser({ commit, rootState }, payload) {
    rootState.fbAuth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .catch(error => {
        commit('SET_ERROR', error)
        // go ahead and try and match and create user
      })
  },
  logoutUser({ commit, rootState }) {
    rootState.fbAuth.signOut().catch(error => {
      commit('SET_ERROR', error)
    })
  },
  setError({ commit }, payload) {
    commit('SET_ERROR', payload)
  }
  // createRole({}, payload) {
  //   const docRef = myStore.doc('users/' + auth.currentUser.uid)
  //   docRef.set(
  //     {
  //       roles: ['Parent']
  //     },
  //     {
  //       merge: true
  //     }
  //   )
  // },
  // sendEmail({ commit }, payload) {
  //   axios.post('sendEmail', {
  //     address: payload.to,
  //     subject: payload.subject,
  //     html: payload.msg
  //   })
  //   commit()
  // }
}

const mutations = {
  CLEAR_ERROR(state) {
    state.error = null
  },
  CLEAR_ROLES(state) {
    state.roles = null
  },
  CLEAR_USER(state) {
    state.user = null
  },
  SET_ERROR(state, payload) {
    state.error = payload
  },
  SET_MATCHES(state, payload) {
    state.matches = payload
  },
  SET_ROLES(state, payload) {
    state.roles = payload
  },
  SET_USER(state, payload) {
    state.user = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
