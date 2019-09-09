<template lang="pug">
q-input(v-model="string").full-width
</template>

<script>
export default {
  name: 'zText',
  data () {
    return {
      text: ''
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
