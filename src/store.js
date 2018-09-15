import Vue from 'vue'
import Vuex from 'vuex'
import Firebase from '@/services/firebase/FirebaseService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    error: null,
    matches: null,
    roles: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    setRoles(state, payload) {
      state.roles = payload
    },
    clearUser(state) {
      state.user = null
    },
    clearError(state) {
      state.error = null
    },
    clearRoles(state) {
      state.roles = null
    }
  },
  actions: {
    initAuth({ commit }) {
      Firebase.init(commit)
    },
    // createUser({ commit }, payload) {
    //   auth
    //     .createUserWithEmailAndPassword(payload.email, payload.password)
    //     .catch(error => {
    //       commit('setError', error)
    //     })
    //     .then(() => {
    //       auth.currentUser
    //         .updateProfile({
    //           displayName: payload.first + ' ' + payload.last
    //         })
    //         .then(() => {
    //           commit('setUser', auth.currentUser.displayName)
    //         })
    //       const docRef = myStore.doc('users/' + auth.currentUser.uid)
    //       docRef.set({
    //         bbId: payload.bbId,
    //         bbType: payload.bbType,
    //         bbUsername: payload.bbUsername,
    //         first: payload.first,
    //         last: payload.last
    //       })
    //     })
    // },
    googleSignin({ commit }) {
      Firebase.googleLogin(commit)
    },
    loginUser({ commit }, payload) {
      Firebase.loginUser(commit, payload)
    },
    logoutUser({ commit }) {
      Firebase.logout(commit)
    },
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
    // setDisplay() {
    //   auth.currentUser.updateProfile({
    //     displayName: 'Brad Spencer'
    //   })
    // },
    setError({ commit }, payload) {
      commit('setError', payload)
    },
    clearError({ commit }) {
      commit('clearError')
    }
  },
  getters: {
    user(state) {
      return state.user
    },
    error(state) {
      return state.error
    },
    roles(state) {
      return state.roles
    }
  }
})
