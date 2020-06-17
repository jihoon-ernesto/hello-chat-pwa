<template>
<div>
  <p v-for="(msg, i) in messages"
    :key="i"
    :class="`from-${msg.from}`"
    >
    {{ msg.content }}
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
    }
  },
  data() {
    return {
    };
  },
};
</script>

<style scoped>
.from-me {
  text-align: right;
}
.from-you {
  text-align: left;
}
</style>
