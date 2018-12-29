import Vue from 'vue'
import Vuex from 'vuex'
import FirebaseService from '@/services/firebase/FirebaseService'
import event from '@/store/modules/event'
import user from '@/store/modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    event
  },
  state: {
    firebase: FirebaseService
  }
})
