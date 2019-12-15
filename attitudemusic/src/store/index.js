import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    historyList: []
  },
  mutations: {
    setHistoryList(state, history) {
      state.historyList.unshift(history)
    }
  },
  actions: {
  },
  modules: {
  }
})
