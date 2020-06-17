<template>
<div>
  <input
    v-model="inputMsg"
    @keyup.enter="send"
  />
</div>
</template>

<script>
export default {
  name: 'chat-input',
  data() {
    return {
      inputMsg: '',
    };
  },
  methods: {
    send() {
      this.$emit('send', this.inputMsg);
      this.inputMsg = '';
    },
  },
};
</script>

<style scoped>
input {
  width: 100%;
}
</style>
