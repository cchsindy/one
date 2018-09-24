import Vue from 'vue'
import Vuex from 'vuex'
import Firebase from '@/services/firebase/FirebaseService'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    error: null,
    matches: [],
    roles: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    setMatches(state, payload) {
      state.matches = payload
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
    checkForMatch({ commit }, payload) {
      Firebase.checkBlackbaud(commit, payload.email)
    },
    createUser({ commit }, payload) {
      Firebase.createUser(commit, payload)
    },
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
    setError({ commit }, payload) {
      commit('setError', payload)
    },
    clearError({ commit }) {
      commit('clearError')
    },
    sendEmail({ commit }, payload) {
      axios.post('sendEmail', {
        address: payload.to,
        subject: payload.subject,
        html: payload.msg
      })
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
    },
    matches(state) {
      return state.matches
    }
  }
})
