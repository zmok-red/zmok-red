import { LoadingBar } from 'quasar'
// debug
const debug = require('debug')('[boot]:auth')
// debug.enabled = true

export default async ({ Vue, app, router }) => {
  debug('start')
  // loading bar
  LoadingBar.setDefaults({color: 'black', size: '2px', position: 'top'})
  // auth
  router.beforeEach((to, from, next) => {
    debug('beforeEach', to.path)
    if (to.path === '/login') {
      next()
    } else {
      debug('AUTH route...')
      let token = localStorage.getItem('ztoken')
      // let url = localStorage.getItem('zurl')
      let exp = localStorage.getItem('zexp')
      if (!token || !exp) {
        next('/login')
      } else {
        debug('token', token)
        debug('exp', exp)
        let now = Date.now()
        if (now > parseInt(exp)) {
          next('/login')
        } else {
          next()
        }
      }
    }
  })
  debug('done')
}
