import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from '@/store/modules/firebase'
import carshow from '@/store/modules/carshow'
import event from '@/store/modules/event'
import pizza from '@/store/modules/pizza'
import transactions from '@/store/modules/transactions'
import user from '@/store/modules/user'
import yearbook from '@/store/modules/yearbook'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    carshow,
    event,
    pizza,
    transactions,
    yearbook
  },
  state: {
    fbAuth: firebase.myAuth,
    fbGoogle: firebase.myGoogle,
    fbStore: firebase.myStore
  }
})
