import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    choosenBookId: null,
    books: [],
    status: 'INITIAL',
    offset: 0,
    formData: new FormData()
  },
  mutations,
  actions,
  getters
})
