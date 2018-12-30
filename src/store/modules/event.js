const state = {
  events: []
}

const getters = {}

const actions = {
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
  }
}

const mutations = {
  SET_EVENTS(state, events) {
    state.events = events
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
