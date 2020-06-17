<template>
  <div id="app">
    <chat-messages
      :messages="messages"
      >
    </chat-messages>
    <chat-input
      @send="sendInput"
      >
    </chat-input>
  </div>
</template>

<script>
import ChatMessages from './components/ChatMessages.vue';
import ChatInput from './components/ChatInput.vue';
import chatChannel from './chatChannel.js';

export default {
  name: 'App',
  components: {
    ChatMessages,
    ChatInput,
  },
  data() {
    return {
      messages: [],
    };
  },
  methods: {
    async sendInput(msg) {
      this.messages.push({
        from: 'me',
        content: msg,
      });

      const respList = await chatChannel.sendMessage(msg);
      if (respList) {
        this.handleResponse(respList);
      }
    },
    handleResponse(respList) {
      for (const resp of respList) {
        this.messages.push({
          from: 'you',
          content: resp.content,
        });
      }
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

  padding: 10%;
}
</style>
