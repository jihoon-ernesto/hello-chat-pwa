<template>
<div class="chat-input">
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

<style lang="scss" scoped>
.chat-input {
  margin: 10px;

  input {
    width: calc(100% - 20px);
    height: 25px;
    border: 1px solid skyblue;
    font-size: 16px;
  }
}
</style>
