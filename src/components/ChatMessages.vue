<template>
<div class="chat-messages" ref="msgs"
  >
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
  .chat-messages {
    background-color: powderblue;
  }
}
@media only screen and (min-width: 600px) {
  .chat-messages {
    background-color: lightyellow;
  }
}
</style>
