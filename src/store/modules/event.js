import EventService from '@/services/event/EventService'

const state = {
  events: []
}

const getters = {}

const actions = {
  fetchEvents({ commit, rootState }) {
    EventService.getEvents(rootState.firebase.myStore).then(data => {
      commit('SET_EVENTS', data)
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
