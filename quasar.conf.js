require('dotenv').config({})
const path = require('path')
const webpack = require('webpack')

module.exports = function (ctx) {
  return {
    preFetch: true,
    boot: [
      'auth',
      'apollo',
      'axios',
      'main',
      'lang',
      'i18n'
    ],
    css: [
      'app.styl'
    ],
    extras: [
      'material-icons'
    ],
    framework: {
      all: true,
      components: [
        'QBtnDropdown',
        'QEditor',
        'QDate',
        'QTime',
        'QBtnToggle',
        'QSpinner',
        'QCarousel',
        'QCarouselControl',
        'QCarouselSlide',
        'QSplitter',
        'QTabs',
        'QTab',
        'QRouteTab',
        'QTabPanels',
        'QTabPanel',
        'QTooltip',
        'QDialog',
        'QCheckbox',
        'QSelect',
        'QPopupProxy',
        'QMenu',
        'QColor',
        'QInput',
        'QLayout',
        'QHeader',
        'QDrawer',
        'QPageContainer',
        'QPage',
        'QToolbar',
        'QToolbarTitle',
        'QBtn',
        'QIcon',
        'QList',
        'QItem',
        'QItemSection',
        'QItemLabel',
        'QPageSticky',
        'QFab',
        'QFabAction',
        'QBadge'
      ],
      directives: [
        'Ripple',
        'CloseMenu',
        'CloseDialog',
        'TouchSwipe'
      ],
      plugins: [
        'Notify',
        'Meta'
      ],
      // iconSet: 'ionicons-v4'
      // lang: process.env.LANG || 'en-us'
    },
    supportIE: false,
    htmlVariables: {
      title: 'zmok-red',
      description: 'zmok-red'
    },
    build: {
      productName: 'zmok-red',
      env: {
        SERVER_URL: JSON.stringify(process.env.SERVER_URL)
      },
      distDir: path.resolve(process.env.INIT_CWD, 'public'),
      scopeHoisting: true,
      vueRouterMode: 'history',
      vueCompiler: true,
      gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack (cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
        })
        cfg.module.rules.push({
          test: /\.pug$/,
          loader: 'pug-plain-loader'
        })
        cfg.plugins.push(
          new webpack.ProvidePlugin({
            gql: 'graphql-tag'
          })
        )
      }
    },
    devServer: {
      // https: true,
      port: 8080,
      open: true
    },
    animations: 'all',
    ssr: {
      pwa: false
    },
    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {}, // only for NON InjectManifest
      manifest: {
        name: 'zmok-red',
        short_name: 'zmok-red',
        description: 'zmok-red',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },
    cordova: {
      // id: 'org.cordova.quasar.app'
      // noIosLegacyBuildFlag: true // uncomment only if you know what you are doing
    },
    electron: {
      // bundler: 'builder', // or 'packager'
      extendWebpack (cfg) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      },
      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',
        // Window only
        // win32metadata: { ... }
      },
      builder: {
        // https://www.electron.build/configuration/configuration
        // appId: 'quasar-app'
      }
    }
  }
}
