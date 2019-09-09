<template lang="pug">
div(style=`position: relative`).column.fit
  //- dialogs
  q-dialog(ref="zdialog" :maximized="true" transition-show="slide-left" transition-hide="slide-right")
    page-create(v-if="showPageCreate" @close="$refs.zdialog.hide(), showPageCreate = false")
    page-update(v-if="showPageUpdate" @close="$refs.zdialog.hide(), showPageUpdate = false")
  //- modals
  q-btn(style=`position: absolute; zIndex: 200; right: 10px; bottom: 10px` round size="lg" color="primary" icon="add" @click="pageCreate")
  div(style=`height: 60px; borderBottom: 1px solid #eee`).row.full-width.items-center.q-px-sm.bg-white
    span {{ $lang('pages') }}
  .col.scroll
    z-list(type="Page" @item="pageClick")
</template>

<script>
import pageCreate from './page_create'
import pageUpdate from './page_update'

export default {
  name: 'pages',
  components: {pageCreate, pageUpdate},
  data () {
    return {
      showPageUpdate: false,
      showPageCreate: false
    }
  },
  methods: {
    pageClick (p) {
      this.$log('pageClick', p)
      this.$refs.zdialog.show()
      this.showPageUpdate = true
    },
    pageCreate () {
      this.$log('pageCreate')
      this.$refs.zdialog.show()
      this.showPageCreate = true
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
