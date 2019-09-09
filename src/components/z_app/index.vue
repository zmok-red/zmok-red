<template lang="pug">
div(:style=`{height: '100vh'}`).column.full-width.bg-white
  div(:style=`{height: '70px', borderBottom: '1px solid #eee'}`
    ).row.full-width.items-center.q-px-sm
    q-input(v-model="search" filled).full-width
  .col.scroll
    .row.full-width.q-px-md
      span zApp
</template>

<script>
export default {
  name: 'zApp',
  data () {
    return {
      search: ''
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
