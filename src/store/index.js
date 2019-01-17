import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from '@/store/modules/firebase'
import event from '@/store/modules/event'
import pizza from '@/store/modules/pizza'
import user from '@/store/modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    event,
    pizza
  },
  state: {
    fbAuth: firebase.myAuth,
    fbGoogle: firebase.myGoogle,
    fbStore: firebase.myStore
  }
})
