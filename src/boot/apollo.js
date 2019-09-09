import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

import VueApollo from 'vue-apollo'
import { Notify } from 'quasar'

const debug = require('debug')('[boot]:apollo')
// debug.enabled = true

export default async ({ Vue, app, router }) => {
  debug('start')
  let url = localStorage.getItem('zurl')
  let host = localStorage.getItem('zhost')
  let token = localStorage.getItem('ztoken')
  // http link
  const httpLink = new HttpLink({
    uri: url + '/graphql',
    fetch (uri, options) {
      debug('FETCH HTTP')
      options.headers['Authorization'] = token
      return fetch(uri, options)
    }
  })

  // error link
  const errorLink = onError(({graphQLErrors: ge}) => {
    if (ge) {
      ge.map(e => {
        debug('e.message', e.message)
        debug('e.extensions.code', e.extensions.code)
        Notify.create({
          message: e.message,
          color: 'red',
          textColor: 'white'
        })
        if (e.extensions.code === 401) {
          router.push({name: 'login'})
        }
      })
    }
  })

  // ws link
  const wsLink = new WebSocketLink({
    uri: 'ws://' + host + '/graphql',
    options: {
      lazy: true,
      reconnect: true,
      connectionParams: async () => {
        debug('FETCH WS')
        return {
          headers: {
            Authorization: token
          }
        }
      }
    }
  })

  // TODO: upload link

  // split link
  const link = split(
    // split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query)
      return definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
    },
    wsLink,
    errorLink.concat(httpLink)
  )

  // Install the vue plugin like before
  Vue.use(VueApollo)

  // Cache
  const cache = new InMemoryCache({
    addTypename: true
    // fragmentMatcher,
    // dataIdFromObject: object => object.oid || null
  })
  Vue.prototype.$cache = cache

  // Create the apollo client
  const apolloClient = new ApolloClient({
    link,
    cache,
    connectToDevTools: true
  })

  app.apolloProvider = new VueApollo({
    defaultClient: apolloClient
  })
  debug('done')
}
