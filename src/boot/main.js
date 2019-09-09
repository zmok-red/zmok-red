import { date } from 'quasar'
const Sift = require('sift').default
const debug = require('debug')('[boot]:main')
debug.enabled = true
import TweenMax from 'gsap/TweenMax'
import VueObserveVisibility from 'vue-observe-visibility'
import { sync } from 'vuex-router-sync'

const sift = (array, query) => {
  if (!Array.isArray(array)) array = [array]
  return array.filter(Sift(query))
}

export default async ({ Vue, router, store }) => {
  Vue.use(VueObserveVisibility)
  Vue.prototype.$wait = (msg) => new Promise(resolve => setTimeout(resolve, msg))
  Vue.prototype.$log = function (...msg) {
    const debug = require('debug')(`[${this.$options.name}] `)
    debug.enabled = true
    debug(...msg)
  }
  Vue.filter('cut', function (text, length) {
    let add = text.length > length ? '...' : ''
    return text.slice(0, length) + add
  })
  sync(store, router, { moduleName: 'route' })
  Vue.prototype.$tween = TweenMax
  Vue.prototype.$sift = sift
  Vue.prototype.$date = (ts, format) => {
    return date.formatDate(ts, format || 'YYYY.MM.DD', {
      dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
      monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
    })
  }
  // load components
  const components = ['z_crud', 'z_list', 'z_loader', 'z_remote', 'z_local', 'z_channel/channel']
  const cName = (c) => {
    let s = c.split('/')
    return s[s.length - 1]
  }
  components.map(c => Vue.component(cName(c), () => import(`components/${c}`)))
  // // load blocks
  // debug('blocks', store.state.z.app)
}

export { sift }
