import Vue from 'vue'
import Vuex from 'vuex'
import z from './z'
Vue.use(Vuex)

export default function () {
  const Store = new Vuex.Store({
    modules: {
      z
    },
    strict: process.env.DEV
  })

  return Store
}
