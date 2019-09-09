<template lang="pug">
.row.window-height.full-width.items-center.justify-center
  h4 404
</template>

<script>
export default {
  name: 'page__error__404',
  mounted () {
    this.$log('mounted')
  },
  beforeDestroy () {
    this.$log('beforeDestroy')
  }
}
</script>
