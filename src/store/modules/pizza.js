const state = {
  transactions: []
}

const getters = {
  totalCheese(state) {
    if (state.transactions.length)
      return state.transactions.reduce(
        (a, c) => a + parseInt(c.pizzas.cheese),
        0
      )
  },
  totalPepperoni(state) {
    if (state.transactions.length)
      return state.transactions.reduce(
        (a, c) => a + parseInt(c.pizzas.pepperoni),
        0
      )
  },
  totalSausage(state) {
    if (state.transactions.length)
      return state.transactions.reduce(
        (a, c) => a + parseInt(c.pizzas.sausage),
        0
      )
  },
  totalCombo(state) {
    if (state.transactions.length)
      return state.transactions.reduce(
        (a, c) => a + parseInt(c.pizzas.combo),
        0
      )
  },
  totalGFcheese(state) {
    if (state.transactions.length)
      return state.transactions.reduce(
        (a, c) => a + parseInt(c.pizzas.gfCheese),
        0
      )
  },
  totalGFpepperoni(state) {
    if (state.transactions.length)
      return state.transactions.reduce(
        (a, c) => a + parseInt(c.pizzas.gfPepperoni),
        0
      )
  },
  totalGFsausage(state) {
    if (state.transactions.length)
      return state.transactions.reduce(
        (a, c) => a + parseInt(c.pizzas.gfSausage),
        0
      )
  },
  totalGFcombo(state) {
    if (state.transactions.length)
      return state.transactions.reduce(
        (a, c) => a + parseInt(c.pizzas.gfCombo),
        0
      )
  },
  totalRaised(state) {
    if (state.transactions.length)
      return state.transactions.reduce((a, c) => a + parseFloat(c.amount), 0)
  }
}

const actions = {
  fetchTransactions({ commit, rootState }) {
    commit('CLEAR_TRANS')
    const ref = rootState.fbStore.collection('pizza_fundraiser')
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
