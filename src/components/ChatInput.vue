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
    width: 100%;
    height: 25px;
    border: 3px solid skyblue;
  }
}
</style>
