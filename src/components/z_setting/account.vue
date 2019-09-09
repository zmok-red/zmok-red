<template lang="pug">
.column.fit
  div(style=`height: 60px; borderBottom: 1px solid #eee`).row.full-width.items-center.q-px-sm.bg-white
    span {{$lang('account')}}
  .col.scroll
</template>

<script>
export default {
  name: 'account',
  data () {
    return {
    }
  },
  monuted () {
    this.$log('mounted')
  },
  beforeDestroy () {
    this.$log('beforeDestroy')
  }
}
</script>
