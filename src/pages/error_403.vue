<template lang="pug">
.row.window-height.full-width.items-center.justify-center
  h5 403 no found
</template>

<script>
export default {
  name: 'page__error__403',
  mounted () {
    this.$log('mounted')
    // TODO: explore error codes...
  },
  beforeDestroy () {
    this.$log('beforeDestroy')
  }
}
</script>
