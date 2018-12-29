import UserService from '@/services/user/UserService'

const state = {
  user: null,
  error: null,
  matches: [],
  roles: null
}

const getters = {
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

const actions = {
  initAuth({ commit }) {
    UserService.init(commit)
  },
  checkForMatch({ commit }, payload) {
    UserService.checkBlackbaud(commit, payload.email)
  },
  createUser({ commit }, payload) {
    UserService.createUser(commit, payload)
  },
  googleSignin({ commit }) {
    UserService.googleLogin(commit)
  },
  loginUser({ commit }, payload) {
    UserService.loginUser(commit, payload)
  },
  logoutUser({ commit }) {
    UserService.logout(commit)
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
  }
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
}

export default {
  state,
  getters,
  actions,
  mutations
}
