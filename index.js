// const zmok = require('@zmok-red/zmok-server')
// const config = require('./config-template')

// zmok
//   .init(config)
//   .then(async (ctx) => {
//     console.log('zmok inited!')
//   })
//   .catch(e => {
//     console.log('error', JSON.stringify(e))
//   })
module.exports = (req, res) => {
  res.json({
    body: req.body,
    query: req.query,
    cookies: req.cookies
  })
}