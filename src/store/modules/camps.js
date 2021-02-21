const state = {
  transactions: [],
}

const getters = {
  totalCampPayments(state) {
    return state.transactions.length
  },
  totalCampAmount(state) {
    if (state.transactions.length)
      return state.transactions.reduce((a, c) => {
        let b = c.amount ? parseFloat(c.amount) : 0
        return a + b
      }, 0)
  },
  totalCampers(state) {
    if (state.transactions.length)
      return state.transactions.reduce((a, c) => {
        let b = c.campers ? parseInt(c.campers) : 0
        return a + b
      }, 0)
  },
}

const actions = {
  fetchCampPayments({ commit, rootState }) {
    commit('CLEAR_TRANS')
    const ref = rootState.fbStore.collection('theatre_camp_2021')
    ref.orderBy('date', 'desc').onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          commit('ADD_TRANS', { id: change.doc.id, ...change.doc.data() })
        }
      })
    })
  },
}

const mutations = {
  ADD_TRANS(state, trans) {
    state.transactions.push(trans)
  },
  CLEAR_TRANS(state) {
    state.transactions = []
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
