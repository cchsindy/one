const state = {
  transactions: [],
}

const getters = {
  totalAPOrders(state) {
    return state.transactions.length
  },
  totalAPAmount(state) {
    if (state.transactions.length)
      return state.transactions.reduce((a, c) => {
        let b = c.amount ? parseFloat(c.amount) : 0
        return a + b
      }, 0)
  },
}

const actions = {
  fetchAPOrders({ commit, rootState }) {
    commit('CLEAR_TRANS')
    const ref = rootState.fbStore.collection('ap_exams_2021')
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
