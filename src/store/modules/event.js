const state = {
  events: []
}

const getters = {}

const actions = {
  addEvent({ commit }, payload) {
    commit('ADD_EVENT', payload)
  },
  fetchEvents({ commit, rootState }) {
    const ref = rootState.fbStore.collection('events')
    ref.orderBy('end_date', 'desc').onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        console.log(change.type)
      })
      let data = []
      snapshot.forEach(doc => {
        data.push({
          id: doc.id,
          ...doc.data()
        })
      })
      commit('SET_EVENTS', data)
    })
  },
  removeEvent({ commit }, payload) {
    commit('REMOVE_EVENT', payload)
  }
}

const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENTS(state, events) {
    state.events = events
  },
  REMOVE_EVENT(state, eventId) {
    state.events = state.events.filter(e => e.id !== eventId)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
