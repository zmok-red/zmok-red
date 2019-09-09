<template lang="pug">
.column.fit
  div(style=`height: 60px; borderBottom: 1px solid #eee`).row.full-width.items-center.q-px-sm.bg-white
    .col
      .row.fit.items-center
        span {{$lang('app')}}
    //- q-btn(round flat icon)
  .col.scroll
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
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
