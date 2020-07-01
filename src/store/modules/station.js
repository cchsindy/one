const state = {
  events: []
}

const getters = {
  // totalTickets(state) {
  //   if (state.transactions.length)
  //     return state.transactions.reduce((a, c) => a + parseInt(c.tickets), 0)
  // },
  // totalSpecAmount(state) {
  //   if (state.transactions.length)
  //     return state.transactions.reduce((a, c) => a + parseFloat(c.amount), 0)
  // }
}

const actions = {
  fetchStationEvents({ commit, rootState }) {
    commit('CLEAR_EVENTS')
    const ref = rootState.fbStore.collection('station_events')
    ref.orderBy('date', 'desc').onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          commit('ADD_EVENT', { id: change.doc.id, ...change.doc.data() })
        }
      })
    })
  }
}

const mutations = {
  ADD_EVENT(state, trans) {
    state.events.push(trans)
  },
  CLEAR_EVENTS(state) {
    state.events = []
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
