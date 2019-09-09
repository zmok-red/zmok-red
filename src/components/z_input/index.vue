<template lang="pug">
.row.full-width
  span zInput
</template>

<script>
import zText from './z_text'
// import zTextarea from './z_textarea'
// import zTexteditor from './z_texteditor'
// import zBoolean from './z_boolean'
// import zMessage from './z_message'
// import zRef from './z_ref/
// import zType from './z_type'
// import zTags from './z_tags'

export default {
  name: 'zInput',
  components: {zText},
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
