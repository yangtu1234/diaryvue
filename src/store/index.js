import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userID: window.sessionStorage.getItem('UserId'),
    username: window.sessionStorage.getItem('UserName'),
    token: window.sessionStorage.getItem('token')
  },
  mutations: {},
  actions: {},
  modules: {}
})
