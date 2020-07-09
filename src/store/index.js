import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: ''
  },
  mutations: {
    setToken(state, value) {
      state.token = value
    },
    unsetToken(state) {
      state.token = ''
    }
  },
  actions: {
  },
  modules: {
  }
})
