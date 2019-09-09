<template lang="pug">
q-layout(view="hHh lpR fFf")
  q-drawer(v-model="leftDrawerShow" side="left" :mini="false" :breakpoint="700" :width="300")
    .row.fit.bg-primary
      z-menu(v-if="!loading")
  q-page-container
    q-page
      z-actions
      //- keep-alive TODO: keep alive with filters
      router-view(v-if="!loading")
      div(v-else style=`height: 100vh`).row.full-width.items-center.justify-center
        q-spinner(size="60px" :thickness="3" color="primary")
</template>

<script>
import Vue from 'vue'
import zMenu from 'components/z_menu'
import zActions from 'components/z_actions'
// import mine from '../../blocks/mine/index.vue'

export default {
  name: 'privateLayout',
  components: { zMenu, zActions },
  data () {
    return {
      loading: true,
      error: false,
      leftDrawerShow: true
    }
  },
  methods: {
    async getCommons () {
      try {
        // this.$log('getCommons start')
        this.loading = true
        // getCommons
        let {data} = await this.$apollo.query({
          query: gql`
            query getCommons {
              getApp
              getUser
              getUserRole
              getUserSettings
            }
          `
        })
        // this.$log('data', data)
        this.$store.commit('z/state', ['app', data.getApp])
        this.$store.commit('z/state', ['user', data.getUser])
        this.$store.commit('z/state', ['role', data.getUserRole])
        this.$store.commit('z/state', ['settings', data.getUserSettings])
        let {data: {find: {items: pages}}} = await this.$apollo.query({
          query: gql`
            query findUserPages {
              find(model: "Page") {
                items {
                  _id
                  type
                  name
                  ... on Page {
                    page
                  }
                }
              }
            }
          `
        })
        this.$store.commit('z/state', ['pages', pages])
        let {data: {find: {items: channels, filters}}} = await this.$apollo.query({
          query: gql`
            query findUserChannels {
              find(model: "Channel") {
                items {
                  _id
                  type
                  name
                  ... on Channel {
                    members
                  }
                }
                filters
              }
            }
          `
        })
        this.$log('filters', filters)
        this.$store.commit('z/state', ['channels', channels])
        this.$log('getCommons done')
        this.loading = false
      } catch (error) {
        this.$log('getCommons error', error)
        this.loading = false
        this.error = error
      }
    },
    regBlocks () {
      this.$log('regBlocks')
      let blocks = this.$store.state.z.app.blocks
      blocks.map(b => (Vue.component(b, () => import(`../../blocks-template/${b}`))))
    }
  },
  async created () {
    await this.getCommons()
    this.regBlocks()
    this.$root.$on('toggle_menu', () => {
      this.leftDrawerShow = !this.leftDrawerShow
    })
  },
  beforeDestroy () {
    this.$log('beforeDestroy')
  }
}
</script>
