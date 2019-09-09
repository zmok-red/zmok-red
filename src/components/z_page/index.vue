<template lang="pug">
.row.full-width.window-height
  page(v-if="$route.params.page" :pageId="$route.params.page")
  pages(v-else)
</template>

<script>
import page from './page'
import pages from './pages'

export default {
  name: 'zPage',
  components: {page, pages},
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
      this.$router.push(`/app/page/${p._id}`)
    }
  },
  created () {
    this.$log('created')
  },
  beforeDestroy () {
    this.$log('beforeDestroy')
    this.$store.commit('z/state', ['page', null])
  }
}
</script>
