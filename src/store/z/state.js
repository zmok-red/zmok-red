export default {
  width: window.innerWidth,
  height: window.innerHeight,
  app: null,
  user: null,
  role: null,
  actions: [],
  pages: [],
  channels: [],
  settings: [],
  error: null,
  errors: [
    {_id: '404', type: 'default', name: 'Not found'},
    {_id: '401', type: 'default', name: 'Not auth'}
  ]
}
