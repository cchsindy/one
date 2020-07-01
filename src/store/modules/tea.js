const state = {
  transactions: []
}

const getters = {
  totalThursday(state) {
    if (state.transactions.length)
      return state.transactions.reduce(
        (a, c) => a + parseInt(c.tickets.thursday),
        0
      )
  },
  totalFriday(state) {
    if (state.transactions.length)
      return state.transactions.reduce(
        (a, c) => a + parseInt(c.tickets.friday),
        0
      )
  },
  totalSaturday(state) {
    if (state.transactions.length)
      return state.transactions.reduce(
        (a, c) => a + parseInt(c.tickets.saturday),
        0
      )
  },
  totalTeaAmount(state) {
    if (state.transactions.length)
      return state.transactions.reduce((a, c) => a + parseFloat(c.amount), 0)
  }
}

const actions = {
  fetchTeaTransactions({ commit, rootState }) {
    commit('CLEAR_TRANS')
    const ref = rootState.fbStore.collection('tea_tickets')
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
