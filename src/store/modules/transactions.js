const state = {
  transactions: []
}

const getters = {
  totalTransactions(state) {
    return state.transactions.length
  },
  totalAmount(state) {
    if (state.transactions.length)
      return state.transactions.reduce((a, c) => a + parseFloat(c.amount), 0)
  }
}

const actions = {
  fetchTransactions({ commit, rootState }) {
    commit('CLEAR_TRANS')
    const ref = rootState.fbStore.collection('authorizeNet')
    ref.orderBy('date', 'desc').onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          commit('ADD_TRANS', { id: change.doc.id, ...change.doc.data() })
        }
      })
    })
  }
}

const mutations = {
  ADD_TRANS(state, trans) {
    state.transactions.push(trans)
  },
  CLEAR_TRANS(state) {
    state.transactions = []
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
