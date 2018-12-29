import Vue from 'vue'
import Vuex from 'vuex'
import event from '@/store/modules/event'
import user from '@/store/modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    event
  }
})
