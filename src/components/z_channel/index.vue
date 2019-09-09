<template lang="pug">
.row.full-width.window-height
  channel(v-if="$route.params.channel" :channelId="$route.params.channel")
  channels(v-else)
</template>

<script>
import channel from './channel'
import channels from './channels'

export default {
  name: 'zChannel',
  props: {},
  components: {channel, channels},
  data () {
    return {
    }
  },
  computed: {
  },
  mounted () {
    this.$log('mounted')
  },
  beforeDestroy () {
    this.$log('beforeDestroy')
  }
}
</script>
