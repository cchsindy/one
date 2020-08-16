const state = {
  transactions: [],
}

const getters = {
  totalYearbookOrders(state) {
    return state.transactions.length
  },
  totalYearbookAmount(state) {
    if (state.transactions.length)
      return state.transactions.reduce((a, c) => {
        let b = c.amount ? parseFloat(c.amount) : 0
        return a + b
      }, 0)
  },
}

const actions = {
  fetchYearbookOrders({ commit, rootState }) {
    commit('CLEAR_TRANS')
    const ref = rootState.fbStore.collection('yearbook_orders_2020')
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
