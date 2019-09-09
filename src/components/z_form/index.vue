<template lang="pug">
.row.full-width
  span zForm
</template>

<script>
export default {
  name: 'zForm',
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
