<template>
<div class="chat-messages" ref="msgs"
  :class="classObj">
  <p v-for="(msg, i) in messages"
    :key="i"
    :class="`from-${msg.from}`"
    v-html="msg.content"
    >
  </p>
</div>
</template>

<script>
export default {
  name: 'chat-messages',
  props: {
    messages: {
      type: Array,
      required: true,
    },
    doScroll: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
    };
  },
  computed: {
    classObj() {
      return location.port === '8080' ? {
          'default-port': true,
          'another-port': false,
        } : {
          'default-port': false,
          'another-port': true,
        };
    },
  },
  mounted() {
    this.scrollToBottom();
  },
  watch: {
    doScroll(newVal) {
      if (newVal === true) {
        this.scrollToBottom();
      }
    },
  },
  methods: {
    scrollToBottom() {
      const msgs = this.$refs.msgs;
      msgs.scrollTop = msgs.scrollHeight;
      this.$emit('scrolled');
    },
  },
};
</script>

<style lang="scss" scoped>
.chat-messages {
  margin: 10px;
  padding: 10px;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  p {
    margin: 4px 0;

    &.from-me {
      color: steelblue;
      text-align: right;
    }
    &.from-you {
      color: navy;
      text-align: left;
    }
  }
}

@media only screen and (max-width: 600px) {
  .default-port {
    background-color: lightskyblue;
  }
  .another-port {
    background-color: khaki;
  }
}
@media only screen and (min-width: 600px) {
  .default-port {
    background-color: powderblue;
  }
  .another-port {
    background-color: lightyellow;
  }
}
</style>
