<template lang="pug">
div(id="q-app")
  router-view
</template>

<script>
export default {
  name: 'App',
  beforeCreate () {
    // TODO: remote this shit from here
    // TODO: or not?
    // TODO: or why?
    // this.$log('beforeCreate', process.env)
    let SERVER_URL = process.env.SERVER_URL || process.env.APP_URL
    // this.$log('SERVER_URL', SERVER_URL)
    localStorage.setItem('zurl', SERVER_URL)
    let link = new URL(SERVER_URL)
    // this.$log('link', link.host)
    localStorage.setItem('zhost', link.host)
  }
}
</script>
