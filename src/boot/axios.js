import axios from 'axios'
import { Notify } from 'quasar'
const debug = require('debug')('[boot]:axios')
debug.enabled = true

export default async ({ Vue, router }) => {
  axios.interceptors.response.use(response => {
    return response
  }, (error) => {
    var status = 500
    var message = ''
    if (error.response) {
      debug('got response from server')
      status = error.response.status
      message = error.response.data
      if (status === 403) {
        localStorage.removeItem('ztoken')
        // localStorage.removeItem('zurl')
        router.push('/login')
      }
    } else if (error.request) {
      debug('no response from server')
      message = 'no response'
      localStorage.removeItem('ztoken')
      // localStorage.removeItem('zurl')
      router.push('/login')
    } else {
      debug('what is it???')
      message = 'what?'
    }
    Notify.create({message: message, color: 'red', textColor: 'white'})
    return Promise.reject(error)
  })
  Vue.prototype.$axios = axios
}
