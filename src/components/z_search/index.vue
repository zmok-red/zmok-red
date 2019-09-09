<template lang="pug">
.column.fit
  span zSearch
</template>

<script>
export default {
  name: 'zSearch',
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
