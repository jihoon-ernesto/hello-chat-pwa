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
  background-color: lightyellow;
  margin: 10px;

  .from-me {
    text-align: right;
  }
  .from-you {
    text-align: left;
  }
}
</style>
