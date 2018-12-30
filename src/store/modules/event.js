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
      let e = []
      snapshot.forEach(doc => {
        e.push({
          ...doc.data(),
          id: doc.id
        })
      })
      commit('SET_EVENTS', e)
    })
  }
  // fetchEvents({ commit, dispatch, state }, { page }) {
  //   return EventService.getEvents(state.perPage, page)
  //     .then(response => {
  //       commit('SET_EVENTS_TOTAL', parseInt(response.headers['x-total-count']))
  //       commit('SET_EVENTS', response.data)
  //     })
  //     .catch(error => {
  //       const notification = {
  //         type: 'error',
  //         message: 'There was a problem fetching events: ' + error.message
  //       }
  //       dispatch('notification/add', notification, { root: true })
  //     })
  // }
  // setStore({ rootState }) {
  //   EventService.setStore(rootState.firebase.myStore)
  // }
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
