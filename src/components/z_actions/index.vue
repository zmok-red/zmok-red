<template lang="pug">
div(style=`position: absolute; zIndex: 10; bottom: 70px; width: 60px; left: 0px`).row.items-end.q-pa-md
  //- actionsCore
  q-btn(@click="handleLogout()" flat round icon="power_off" color="primary")
  q-btn(@click="handleRefresh()" flat round icon="refresh" color="primary")
  q-btn(@click="showLeftDrawer = !showLeftDrawer" flat round icon="menu" color="primary")
  q-btn(@click="handleDev()" flat round icon="settings" color="primary")
  //- TODO: add actionsUser
</template>

<script>
export default {
  name: 'zActions',
  data () {
    return {
    }
  },
  computed: {
    actions () {
      return {...this.actions}
    }
  },
  methods: {
    handleLogout () {
      this.$log('handleLogout')
      this.$router.push('/login')
    },
    handleRefresh () {
      this.$log('handleRefresh')
      window.location.reload(true)
    },
    handleDev () {
      this.$log('handleDev')
      this.$router.push('/app/dev')
    }
  },
  mounted () {
    // this.$log('mounted')
  },
  beforeDestroy () {
    this.$log('beforeDestroy')
  }
}
</script>
