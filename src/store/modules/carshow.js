const state = {
  transactions: []
}

const getters = {
  totalCarShowTransactions(state) {
    return state.transactions.length
  },
  totalCarShowAmount(state) {
    if (state.transactions.length)
      return state.transactions.reduce((a, c) => a + parseFloat(c.amount), 0)
  }
}

const actions = {
  fetchCarShowTransactions({ commit, rootState }) {
    commit('CLEAR_TRANS')
    const ref = rootState.fbStore.collection('car_show_registrations')
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
