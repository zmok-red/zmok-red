<template lang="pug">
div.row.full-width.window-height
  div(v-if="$route.params.error").row.fit.items-center.justify-center.bg-red
    span error {{$route.params.error}}
  div(v-else).row.fit.bg-white
    span errors and reports...
</template>

<script>
export default {
  name: 'zError',
  data () {
    return {
    }
  },
  mounted () {
    this.$log('mounted', this.$route.params.error)
  },
  beforeDestroy () {
    this.$log('beforeDestroy')
  }
}
</script>
