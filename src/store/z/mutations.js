const debug = require('debug')('[boot]:main')
debug.enabled = true
// import { sift } from 'boot/main'
// import Vue from 'vue'

export const state = (state, [ key, data ]) => {
  if (key !== undefined) {
    state[key] = data
  } else {
    return state[key]
  }
}
