<template lang="pug">
.row.fit
  div(v-if="loading").row.fit.items-center.justify-center
    q-spinner(size="60px" :thickness="3" color="primary")
  div(v-else).row.fit
    .col.full-height
      .column.fit
        //- header
        div(:style=`{height: '56px', borderBottom: '1px solid #eee'}`
          ).row.full-width.items-center.q-px-sm
          q-btn(flat style=`height: 40px; width: 40px` icon="menu" @click="$root.$emit('toggle_menu')")
          .col.q-px-sm
            .row.fit
              span.text-bold {{channel.name}}
            .row.full-width
              small members ({{channel.members.length}})
          //- actions
          q-btn(flat style=`height: 40px; width: 40px` icon="search" color="grey-9")
          q-btn(flat style=`height: 40px; width: 40px` icon="more_vert" color="grey-9")
        //- body
        .col.scroll
          //- wrapper
          .row.full-width.justify-center.q-px-sm
            //- wrapper
            div(:style=`{maxWidth: maxWidth+'px'}`).row.full-width.items-start.content-start
              //- message more
              //- div(:style=`{height: '70px'}`).row.full-width.items-center.justify-center
              //-   q-spinner(size="60px" :thickness="3" color="primary")
              z_loader(:query="query" queryKey="find" :variables="variables" v-slot:items="{items}")
                //- message wrapper
                div(v-for="(m, mi) in items" :key="mi"
                  @click="messageClick(m, mi)"
                  @mouseenter="$event => messageMouseenter($event, m, mi)"
                  @mouseleave="$event => messageMouseleave($event, m, mi)"
                  :style=`{position: 'relative'}`
                  ).row.full-width.items-start.hr.cursor-pointer
                  //- message author
                  div(v-if="items[mi-1] ? items[mi-1].author !== m.author : true").row.full-width.q-mt-md
                    span.text-bold {{m.author}}
                  //- message body
                  div(:style=`{position: 'relative', minHeight: '18px'}`).row.full-width.items-center
                    //- message
                    //- span {{ m.message }}
                    div(v-html="m.message")
                    //- message actions
                    //- q-btn(v-if="m === messageOver" round flat icon="more_vert" dense color="grey-6" :style=`{position: 'absolute', top: '0px', right: '0px'}`).q-ma-xs
                  //- message reactions
                  div(v-if="false").row.full-width
                    small message actions
        //- input
        div(:style=`{minHeight: '70px', borderTop: '1px solid #eee'}`).row.full-width.justify-center.q-px-sm
          div(:style=`{maxWidth: maxWidth+'px'}`).row.full-width.items-center
            q-input(
              v-model="message" filled placeholder="печатай"
              :input-style="inputStyle" type="textarea" autogrow :max-height="200"
              @keyup.ctrl.13="messageSend()"
              v-touch-swipe.mouse.up="inputSwipeUp"
              v-touch-swipe.mouse.down="inputSwipeDown").col.q-my-sm
              template(v-slot:append)
                q-btn(flat dense icon="attachment" color="grey-9").rotate-90
            q-btn(
              @click="messageSend()" :loading="messageSending"
              dense no-caps color="primary" style=`width: 56px; height: 56px`).q-ml-sm шли
    //- channel thread
    //- div(v-if="!thread && false"
    //-   :style=`{maxWidth: '600px', width: '100%'}`).column.full-height.bg-grey-1
    //-   channel(:thread="true")
</template>

<script>
export default {
  name: 'zChannel__Channel',
  components: {},
  props: ['channelId', 'thread'],
  data () {
    return {
      loading: true,
      error: null,
      maxWidth: 600,
      message: '',
      messageOver: null,
      messageSending: false,
      inputStyle: {
        maxHeight: '400px'
      },
      messages: [],
      channel: null
    }
  },
  computed: {
    query () {
      return gql`
        query messagesLoad ($model: String!, $filter: JSON!) {
          find (model: $model, filter: $filter) {
            items {
              _id
              name
              type
              ... on Message {
                message
                author
              }
            }
            filters
          }
        }`
    },
    variables () {
      return {
        model: 'Message',
        filter: {channel: this.channelId}
      }
    }
  },
  watch: {
    'channelId': {
      immediate: true,
      async handler (to, from) {
        try {
          this.$log('channelId CHANGED', to)
          this.loading = true
          // channel find
          let channel = this.$store.state.z.channels.find(c => (c._id === to))
          this.$log('channel', channel)
          // channel check
          if (!channel) throw new Error(`No such channel ${to}!`)
          // channel set
          this.$set(this, 'channel', channel)
          // messages load
          this.$set(this, 'messages', await this.messagesLoad(to))
          // done
          this.loading = false
        } catch (error) {
          this.loading = false
          this.error = error
        }
      }
    }
  },
  methods: {
    async messageSend () {
      try {
        this.$log('messageSend start')
        this.messageSending = true
        let {data: {create}} = await this.$apollo.mutate({
          mutation: gql`
            mutation messageSend ($message: JSON!) {
              create (model: "Message" doc: $message)
            }
          `,
          variables: {
            message: {
              author: this.$store.state.z.user._id,
              channel: this.channelId,
              message: this.message
            }
          }
        })
        this.$log('messageSend done', create)
        this.messageSending = false
        this.message = ''
      } catch (error) {
        this.$log('messageSend error', error)
        this.messageSending = false
      }
    },
    messageClick (m, mi) {
      this.$log('messageClick', m, mi)
    },
    messageMouseleave (e, message, index) {
      // this.$log('messageMouseleave', e, message, index)
      this.messageOver = null
    },
    messageMouseenter (e, message, index) {
      // this.$log('messageMouseenter', e, message, index)
      this.messageOver = message
    },
    inputSwipeUp () {
      this.$log('inputSwipeUp')
      this.$tween.to(this.inputStyle, 0.33, {height: '400px'})
    },
    inputSwipeDown () {
      this.$log('inputSwipeDown')
      this.$tween.to(this.inputStyle, 0.33, {height: '70px'})
    },
    goBack () {
      this.$log('goBack')
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
