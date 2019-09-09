<template lang="pug">
.column.fit.bg-white
  //- header
  div(:style=`{height: '70px', borderBottom: '1px solid #eee'}`
    ).row.full-width.q-px-sm
    q-input(filled v-model="search" :placeholder=`$lang('найди')` autofocus).full-width
  //- body
  .col.scroll
    .row.full-width.items-start
      div(
        v-for="(p, pi) in pages" :key="p._id" @click="pageClick(p, pi)"
        :style=`{height: '40px', borderBottom: '1px solid #eee'}`
        ).row.full-width.items-center.q-px-md.cursor-pointer.hblack
        span {{p.name}}
</template>

<script>
export default {
  name: 'zPage__pages',
  data () {
    return {
      search: ''
    }
  },
  computed: {
    pages () {
      return this.$store.state.z.pages
    }
  },
  methods: {
    pageClick (p, pi) {
      this.$log('pageClick', p, pi)
      this.$router.push(`/app/page/${p._id}`).catch(e => {})
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
