<template lang="pug">
div(:style=`{height: '100vh'}`).row.full-width
  //- settings menu
  div(style=`width: 300px`).column.full-height.bg-grey-9
    div(v-if="true" :style=`{height: '60px'}`).row.full-width.items-center.q-pl-md.q-pr-sm
      span.text-grey-5 {{$lang('Settings')}}
      .col
      //- q-btn(round flat dense icon="search" color="grey-5")
      //- q-btn(round flat dense icon="more_vert" color="grey-5")
    .col.scroll
      div(v-for="(s, si) in settings" :key="si" @click="settingClick(s, si)"
        :style=`{height: '30px', background: $route.params.setting === s._id ? 'white !important' : 'none'}`
        ).row.full-width.items-center.cursor-pointer.q-px-md
        span {{ s.name }}
  //- setting
  .col.full-height.bg-white
    .column.fit
      div(:style=`{height: '60px', borderBottom: '1px solid #eee'}`).row.full-width
      .col.scroll
        //- div(v-for="(s, si) in settings" :key="s._id"
        //-   :style=`{height: '100px'}`).row.full-width.items-center
        //-   span {{ s.name }}
</template>

<script>
export default {
  name: 'zSettings',
  data () {
    return {
    }
  },
  computed: {
    settings () {
      return this.$store.state.z.settings
    }
  },
  watch: {},
  methods: {
    settingClick (s, si) {
      this.$log('settingClick', s, si)
      this.$router.push({params: {setting: s._id}})
    }
  },
  mounted () {
    this.$log('mounted')
    if (!this.$route.params.setting && this.settings.length > 0) this.settingClick(this.settings[0])
  },
  beforeDestroy () {
    this.$log('beforeDestroy')
    this.$store.commit('z/state', ['setting', null])
  }
}
</script>
