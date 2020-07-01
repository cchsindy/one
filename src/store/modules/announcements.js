const state = {
  announcements: []
}

const getters = {}

const actions = {
  fetchAnnouncements({ commit, rootState }) {
    const ref = rootState.fbStore.collection('tv').doc('announcement')
    ref.onSnapshot(snapshot => {
      commit('CLEAR_ANNOUNCEMENTS')
      commit('UPDATE_ANNOUNCEMENTS', snapshot.get('announcements'))
    })
  }
}

const mutations = {
  CLEAR_ANNOUNCEMENTS(state) {
    state.announcements = []
  },
  UPDATE_ANNOUNCEMENTS(state, announcements) {
    state.announcements = announcements
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
