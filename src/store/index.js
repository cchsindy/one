import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from '@/store/modules/firebase'
import announcements from '@/store/modules/announcements'
import carshow from '@/store/modules/carshow'
import event from '@/store/modules/event'
import pizza from '@/store/modules/pizza'
import spec from '@/store/modules/spec'
import station from '@/store/modules/station'
import tea from '@/store/modules/tea'
import transactions from '@/store/modules/transactions'
import user from '@/store/modules/user'
import yearbook from '@/store/modules/yearbook'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    announcements,
    carshow,
    event,
    pizza,
    spec,
    station,
    tea,
    transactions,
    yearbook
  },
  state: {
    fbAuth: firebase.myAuth,
    fbFunctions: firebase.myFunctions,
    fbGoogle: firebase.myGoogle,
    fbStore: firebase.myStore
  }
})
