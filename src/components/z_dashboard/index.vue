<template lang="pug">
span zDashboard
</template>

<script>
export default {
  name: 'zDashboard',
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
