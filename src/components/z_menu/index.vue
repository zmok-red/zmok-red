<template lang="pug">
div(style=`overflow-x: hidden`).column.fit
  //- div(style=`height: 10px`).row.full-width.bg-red
  //- header
  div(style=`minHeight: 100px`).row.full-width.items-start.content-start
    //- app info
    div(style=`height: 50px`).row.full-width.justify-start.items-center.content-center.q-px-xs
      q-btn(round flat icon="gesture" color="accent" @click="$router.push(`/app`)")
      .col.full-height
        .row.fit.content-center.items-center.q-px-sm
          .row.full-width
            span.text-bold.text-accent {{$store.state.z.app.name}}
          .row.full-width
            small.text-accent {{$store.state.z.app.description}}
    //- user info
    div(style=`height: 50px`).row.full-width.items-center.justify-start.q-px-xs
      q-btn(round flat icon="perm_identity" color="accent" @click="$router.push(`/app/setting/account`)")
      .col
        .row.full-width.q-px-sm
          .row.full-width
            span.text-accent {{$store.state.z.user.username}}
          .row.full-width
            small.text-accent {{$store.state.z.user.name}}
    //- services
    div(v-if="true" style=`height: 50px`).row.full-width.items-center.q-px-xs
      //- q-btn(round flat color="accent" icon="search" @click="$router.push('/app/search')")
      //- q-btn(round flat color="accent" icon="chat_bubble_outline" @click="$router.push('/app/channel')")
      //- q-btn(round flat color="accent" icon="done_all" @click="$router.push('/app/task')")
      q-btn(round flat color="accent" icon="settings" @click="$router.push('/app/setting')"
        :style=`{border: $route.name === 'setting' ? '1px solid red' : 'none'}`)
  //- body
  div(style=`overflow-x: hidden`).col.scroll
    //- pages header
    div(:style=`{background: $route.name === 'page' && !$route.params.page ? '#f44336 !important' : 'none'}`).row.full-width.items-center.q-px-sm
      div(@click="pagesClick()").col.cursor-pointer
        span.text-accent {{$lang('Pages')}}
      q-btn(v-if="pages.length > 0" @click="pagesToggle()"
        flat round dense :icon="pagesShow ? 'keyboard_arrow_up' : 'keyboard_arrow_down'" color="accent")
    //- pages list
    div(v-show="pagesShow").row.full-width.items-start.content-start
      div(v-for="(p, pi) in pages" :key="p._id" @click="pageClick(p, pi)"
        :style=`{height: '20px', ...highlight('page', p._id)}`
        ).row.full-width.items-center.justify-between.q-px-md.cursor-pointer.hwhite
        small.text-accent ~ {{ p.name | cut(18)}}
        small(style='opacity: 0.4').text-accent {{p.type}}
    //- channels header
    div(:style=`{background: $route.name === 'channel' && !$route.params.channel ? '#f44336 !important' : 'none'}`).row.full-width.items-center.q-px-sm
      div(@click="channelsClick()").col.cursor-pointer
        span.text-accent {{$lang('Channels')}}
      q-btn(v-if="channels.length > 1" @click="channelsToggle()"
        flat round dense :icon="channelsShow ? 'keyboard_arrow_up' : 'keyboard_arrow_down'" color="accent")
    //- channels list
    div(v-show="channelsShow").row.full-width.items-start.content-start
      div(v-for="(c, ci) in channels" :key="c._id" @click="channelClick(c, ci)"
        :style=`{height: '20px', ...highlight('channel', c._id)}`
        ).row.full-width.items-center.justify-between.q-px-md.cursor-pointer.hwhite
        small.text-accent # {{ c.name | cut(30)}}
        small(style='opacity: 0.4').text-accent {{c.type}}
  //- debug
  div(v-if="false" style=`fontSize: 12px; color: white`).row.full-width.bg-red.q-pa-xs
</template>

<script>
export default {
  name: 'zMenu',
  props: {},
  data () {
    return {
      pagesShow: true,
      channelsShow: true
    }
  },
  computed: {
    pages () {
      return this.$store.state.z.pages
    },
    channels () {
      return this.$store.state.z.channels
    },
    apps () {
      return this.$store.state.z.apps
    }
  },
  methods: {
    pagesClick (page, index) {
      this.$log('pagesClick')
      this.$router.push('/app/page').catch(e => {})
    },
    pagesToggle () {
      this.$log('pagesToggle')
      this.pagesShow = !this.pagesShow
    },
    pageClick (page, index) {
      this.$log('pageClick', page, index)
      this.$router.push(`/app/page/${page._id}`).catch(e => {})
    },
    async channelsClick () {
      this.$log('channelsClick')
      this.$router.push('/app/channel').catch(e => {})
    },
    channelsToggle () {
      this.$log('channelsToggle')
      this.channelsShow = !this.channelsShow
    },
    channelClick (channel, index) {
      this.$log('channelClick', channel, index)
      this.$router.push(`/app/channel/${channel._id}`).catch(e => {})
    },
    highlight (type, _id) {
      if (this.$route.params[type] === _id) return {background: '#f44336 !important', color: 'white !important'}
      // else return {}
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
