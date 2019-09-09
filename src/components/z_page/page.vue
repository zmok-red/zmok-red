<template lang="pug">
.row.fit
  component(:is="`z_${page.type}`" :page="page" :options="page.page")
</template>

<script>
export default {
  name: 'zPage__page',
  props: ['pageId'],
  data () {
    return {
      loading: true,
      error: null,
      page: null
    }
  },
  watch: {
    'pageId': {
      immediate: true,
      async handler (to, from) {
        try {
          this.$log('pageId CHANGED', to)
          this.loading = true
          // find page
          let page = this.$store.state.z.pages.find(p => (p._id === to))
          this.$log('page', page)
          if (!page) throw new Error(`No such page ${to}!`)
          this.page = page
          this.loading = false
        } catch (error) {
          this.loading = false
          this.error = error
        }
      }
    }
  },
  mounted () {
    this.$log('mounted')
  },
  beforeDestroy () {
    this.$log('beforeDestroy')
    this.$store.commit('z/state', ['page', null])
  }
}
</script>
