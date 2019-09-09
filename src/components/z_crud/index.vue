<template lang="pug">
.column.fit
  div(:style=`{height: '50px', borderBottom: '1px solid #eee'}`).row.full-width.items-center.q-px-md
    span {{page.name}}
    .col
    //- q-btn()
  .col.scroll
    z_loader(:query="query" :variables="variables" queryKey="find" v-slot:items="{items}")
      z_list(:items="items")
</template>

<script>
export default {
  name: 'zCrud',
  props: {
    page: {type: Object},
    options: {type: Object, required: true}
  },
  data () {
    return {
    }
  },
  computed: {
    // query () {
    //   return gql`
    //     query find {
    //       find${this.options.model} {
    //         items {
    //           _id
    //         }
    //       }
    //     }
    //   `
    // },
    query () {
      return gql`
        query find {
          find(model: "Message") {
            items {
              _id
              name
              type
              ... on Message {
                message
              }
            }
          }
        }
      `
    },
    variables () {
      return {
        model: this.options.model
      }
    }
  },
  watch: {
    options: {
      deep: true,
      immediate: true,
      handler (to, from) {
        this.$log('options CHANGED', to)
      }
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
