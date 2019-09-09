<template lang="pug">
component(:is="options.block")
</template>

<script>
export default {
  name: 'zLocal',
  props: ['options'],
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
