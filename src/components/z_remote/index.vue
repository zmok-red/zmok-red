<template lang="pug">
component(v-if="component" :is="component")
</template>

<script>
import ec from 'components/external-component.js'
export default {
  name: 'zRemote',
  props: {
    options: {type: String, required: true}
  },
  data () {
    return {
      component: null
    }
  },
  watch: {
    options: {
      immediate: true,
      deep: true,
      handler (to, from) {
        this.$log('options CHANGED', to.url)
        // let url = `${localStorage.getItem('zurl')}/file/block/${to}`
        let url = `/file/block/${to.block}`
        this.$log('url', url)
        this.component = () => ec(url)
      }
    }
  },
  mounted () {
    this.$log('mounted')
  }
}
</script>
