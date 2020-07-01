import Vue from 'vue'

const state = {
  events: [],
  cachedEvents: []
}

const getters = {}

const actions = {
  addEvent({ commit }, payload) {
    commit('ADD_EVENT', payload)
  },
  cancelEvent({ commit }, payload) {
    commit('CANCEL_EVENT', payload)
  },
  fetchEvents({ commit, rootState }) {
    commit('CLEAR_EVENTS')
    const ref = rootState.fbStore.collection('events')
    ref.orderBy('end_date', 'desc').onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          commit('ADD_EVENT', { id: change.doc.id, ...change.doc.data() })
        } else if (change.type === 'modified') {
          commit('MODIFY_EVENT', { id: change.doc.id, ...change.doc.data() })
        } else if (change.type === 'removed') {
          commit('REMOVE_EVENT', change.doc.id)
        }
      })
    })
  },
  removeEvent({ commit, rootState }, payload) {
    if (payload.substring(0, 3) !== 'NEW') {
      rootState.fbStore
        .collection('events')
        .doc(payload)
        .delete()
    } else {
      commit('REMOVE_EVENT', payload)
    }
  },
  saveEvent({ commit, state, rootState }, payload) {
    const event = JSON.parse(
      JSON.stringify(state.events.find(e => e.id === payload))
    )
    const id = event.id
    delete event.id
    if (id.substring(0, 3) === 'NEW') {
      state.events = state.events.filter(e => e.id !== id)
      rootState.fbStore
        .collection('events')
        .add(event)
        .then(commit('SAVE_EVENT'))
    } else {
      rootState.fbStore
        .collection('events')
        .doc(id)
        .set(event)
        .then(commit('SAVE_EVENT'))
    }
  }
}

const mutations = {
  CLEAR_EVENTS(state) {
    state.events = []
    state.cachedEvents = []
  },
  ADD_EVENT(state, event) {
    state.events.push(event)
    state.cachedEvents.push(JSON.parse(JSON.stringify(event)))
  },
  CANCEL_EVENT(state, eventId) {
    if (eventId.substring(0, 3) === 'NEW') {
      state.events = state.events.filter(e => e.id !== eventId)
      state.cachedEvents = state.cachedEvents.filter(e => e.id !== eventId)
    } else {
      const index = state.events.findIndex(e => {
        return e.id === eventId
      })
      Vue.set(
        state.events,
        index,
        JSON.parse(JSON.stringify(state.cachedEvents[index]))
      )
    }
  },
  MODIFY_EVENT(state, event) {
    // check each property if changed?
    const index = state.events.findIndex(e => {
      return e.id === event.id
    })
    Vue.set(state.events, index, event)
    state.cachedEvents.forEach((e, i) => {
      if (e.id === event.id) state.cachedEvents[i] = event
    })
  },
  REMOVE_EVENT(state, eventId) {
    state.events = state.events.filter(e => e.id !== eventId)
    state.cachedEvents = state.cachedEvents.filter(e => e.id !== eventId)
  },
  SAVE_EVENT() {
    // commit changes
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
