import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    historyList: [],
    user: {
      favoriteList: [],
      favoriteSong: [],
      userName: '',
      password: ''
    }
  },
  mutations: {
    setHistoryList(state, history) {
      state.historyList.unshift(history);
    },
    removeHistoryList(state) {
      state.historyList = []
    },
    setUserInfo(state, user) {
      state.user = user;
    }
  },
  actions: {
  },
  modules: {
  }
})
