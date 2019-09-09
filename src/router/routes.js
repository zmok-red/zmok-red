
const routes = [
  { path: '/login', component: () => import('layouts/layout_login.vue') },
  { path: '/', redirect: '/app' },
  {
    path: '/app',
    component: () => import('layouts/layout_app.vue'),
    children: [
      { name: 'dashboard', path: '', component: () => import('components/z_dashboard') },
      { name: 'page', path: 'page/:page?', component: () => import('components/z_page') },
      { name: 'channel', path: 'channel/:channel?', component: () => import('components/z_channel') },
      { name: 'setting', path: 'setting/:setting?', component: () => import('components/z_setting') },
      { name: 'error', path: 'error/:error?', component: () => import('components/z_error') }
      // { name: 'task', path: 'task/:task?', component: () => import('components/z_task') },
      // { name: 'search', path: 'search', component: () => import('components/z_search') },
    ]
  }
]

if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/error_404.vue')
  })
}

export default routes
