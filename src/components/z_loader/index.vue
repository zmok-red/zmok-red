<template lang="pug">
.row.full-width
  slot(name="items" v-if="zQuery" :items="zQuery.items" :fetchingMore="fetchingMore")
</template>

<script>
export default {
  name: 'zLoader',
  components: {},
  props: {
    query: {type: Object, required: true},
    queryKey: {type: String, required: true},
    variables: {type: Object}
  },
  data () {
    return {
      items: [],
      fetchingMore: false,
      pageToken: null,
      pageTokenNext: null,
      totalCount: 0,
      itemsCount: 0,
      sub: null
    }
  },
  apollo: {
    zQuery: {
      query () {
        return this.query
      },
      variables () {
        return this.variables
      },
      result ({ data, loading, networkStatus }) {
        if (data) {
          this.$log('zQuery result', data)
          this.items = data[this.queryKey].items
          this.subscribeToMore()
          // this.pageToken = data[this.queryKey].nextPageToken
          // this.totalCount = data[this.queryKey].totalCount
          // this.itemsCount = data[this.queryKey].items.length
        }
      },
      update (data) {
        return data[this.queryKey]
      },
      fetchPolicy: 'cache-and-network'
    }
  },
  methods: {
    fetchMore () {
      this.$log('fetchMore start')
      this.pageTokenNext = this.pageToken
      this.fetchingMore = true
      this.$apollo.queries.zQuery.fetchMore({
        variables: {
          pageToken: this.pageTokenNext
        },
        updateQuery: (from, {fetchMoreResult: to}) => {
          this.$log('fetchMore updateQuery from', from)
          // this.$log('updateQuery to', to)
          let res = {
            [this.queryKey]: {
              ...to[this.queryKey],
              items: [...from[this.queryKey].items, ...to[this.queryKey].items]
            }
          }
          // this.$log('updateQuery res', res)
          this.$log('fetchMore updateQuery done')
          this.fetchingMore = false
          return res
        }
      })
    },
    subscribeToMore () {
      if (this.sub) this.sub.unsubscribe()
      this.sub = this.$apollo.queries.zQuery.subscribeToMore({
        document: gql`
          subscription crudChannel {
            crud {
              action
              model
              doc
            }
          }
        `,
        // Mutate the previous result
        updateQuery: (from, { subscriptionData: {data: {crud}} }) => {
          this.$log('subscribeToMore updateQuery', from, crud)
          let res = {
            [this.queryKey]: {
              ...from[this.queryKey],
              items: [...from[this.queryKey].items]
            }
          }
          if (crud.model !== this.variables.model) return res
          // action
          switch (crud.action) {
            case 'create': {
              this.$log('subscribeToMore updateQuery, action: ', crud.action)
              this.$log('filter', this.variables.filter)
              if (this.variables.filter) {
                let find = this.$sift([crud.doc], this.variables.filter)
                this.$log('find', find)
                if (find.length > 0) res[this.queryKey].items.push(crud.doc)
              } else {
                res[this.queryKey].items.push(crud.doc)
              }
              break
            }
          }

          return res
        }
      })
    }
  },
  mounted () {
    this.$log('mounted')
  },
  beforeDestroy () {
    this.$log('beforeDestroy')
  }
}
</script>
