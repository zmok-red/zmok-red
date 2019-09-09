<template lang="pug">
.column.fit
  //- header
  div(:style=`{height: '70px', borderBottom: '1px solid #eee'}`).row.full-width.items-center.q-px-sm
    q-input(v-model="search" filled autofocus :placeholder="$lang('найди')").full-width
      template(v-slot:append)
        q-btn(v-if="search.length > 0" round flat icon="clear" @click="search = ''")
  //- body
  .col.scroll
    .row.full-width.items-start
      div(
        v-for="(c, ci) in channels" :key="c._id" @click="channelClick(c, ci)"
        :style=`{height: '30px', borderBottom: '1px solid #eee'}`
        ).row.full-width.items-center.cursor-pointer.q-px-md.hrblack
        span {{ c.name }}
</template>

<script>
export default {
  name: 'zChannel__channels',
  data () {
    return {
      search: ''
    }
  },
  computed: {
    channels () {
      return this.$store.state.z.channels
    }
  },
  methods: {
    channelClick (c, ci) {
      this.$log('channelClick', c, ci)
      this.$router.push(`/app/channel/${c._id}`)
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
