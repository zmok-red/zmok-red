<template lang="pug">
.row.window-height.full-width.items-center.justify-center.bg-grey-3
  div(style=`position: relative; width: 300px; height: 500px; borderRadius: 0px 0px 4px 4px`).row.content-start.bg-white
    div(
      style=`width: 300px; height: 303px; borderRadius: 4px 4px 0px 0px`).row.items-center.justify-center.bg-primary
      q-icon(:name="icon" size="140px" color="accent").q-mt-xl
    .row.full-width.items-end.content-end.q-pa-sm
      q-input(outlined v-model="username" label="Username" @input="handleUsernameInput" @keyup.enter="login()").full-width.q-mb-sm
      q-input(outlined v-model="password" label="Password" type="password" @keyup.enter="login()").full-width.q-mb-sm
      q-btn(style=`height: 57px` color="primary" label="Login" :loading="loading" @click="login()").full-width
</template>

<script>
export default {
  name: 'layoutLogin',
  data () {
    return {
      username: '',
      password: '',
      loading: false
    }
  },
  computed: {
    icon () {
      return process.env.ICON || 'gesture'
    }
  },
  methods: {
    handleUsernameInput (val) {
      this.$log('handleUsernameInput')
      localStorage.setItem('zusername', val)
      // TODO: save username to localstorage?
    },
    async login () {
      try {
        this.$log('login start')
        if (!this.username || this.username.length < 4) throw 'Wrong username!'
        if (!this.password || this.password.lenth < 4) throw 'Wrong password!'
        this.loading = true
        let {data: {token, exp}} = await this.$axios.post(localStorage.getItem('zurl') + '/login', {
          username: this.username,
          password: this.password
        })
        // this.$log('res', res)
        this.$log('ztoken', token)
        localStorage.setItem('ztoken', token)
        localStorage.setItem('zexp', exp)
        this.loading = false
        await this.$router.push('/app')
        // location.reload()
      } catch (error) {
        this.$log('login error', error)
        this.loading = false
        localStorage.removeItem('ztoken')
        localStorage.removeItem('zexp')
        this.$q.notify({message: error.message || error.toString(), color: 'primary', textColor: 'accent'})
      }
    }
  },
  async mounted () {
    this.$log('mounted')
    // get username
    this.$set(this, 'username', localStorage.getItem('zusername'))
  },
  beforeDestroy () {
    this.$log('beforeDestroy')
  }
}
</script>
