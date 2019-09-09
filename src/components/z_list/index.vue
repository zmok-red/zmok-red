<template lang="pug">
.row.full-width
  div(
    v-for="(i, ii) in items" :key="i._id" @click="itemClick(i, ii)"
    :style=`{minHeight: '40px'}`).row.full-width.items-center.q-px-sm.cursor-pointer.item
    //- small item: {{ i.name || i._id }}
    small item: {{ i }}
</template>

<script>
export default {
  name: 'zList',
  props: {
    items: {type: Array, required: true},
    selected: {type: Array}
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    itemClick (i, ii) {
      this.$log('itemClick', i, ii)
      this.$emit('itemClick')
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

<style lang="stylus" scoped>
.item:hover
  background: #eee
</style>
