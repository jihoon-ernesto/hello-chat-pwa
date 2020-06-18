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

  <div class="update-dialog" v-if="showUpdateUI">
    <div class="update-dialog__content">
      A new version is found. Refresh to load it?
    </div>
    <div class="update-dialog__actions">
      <button
        class="update-dialog__button update-dialog__button--confirm"
        @click="update"
      >
        Update
      </button>
      <button
        class="update-dialog__button update-dialog__button--cancel"
        @click="showUpdateUI = false"
      >
        Cancel
      </button>
    </div>
  </div>

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
      messages: [{
        from: 'you',
        content: 'Hi!',
      }],
      showUpdateUI: false,
    };
  },
  created() {
    if (this.$workbox) {
      this.$workbox.addEventListener("waiting", () => {
        this.showUpdateUI = true;
      });
    }
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
    },
    async update() {
      this.showUpdateUI = false;
      await this.$workbox.messageSW({ type: "SKIP_WAITING" });
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

  padding: 0 10%;
  display: flex;
  flex-direction: column;
  align-content: flex-end;
}

.update-dialog {
  position: fixed;
  left: 50%;
  bottom: 64px;
  transform: translateX(-50%);
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  padding: 12px;
  max-width: 576px;
  color: white;
  background-color: #2c3e50;
  text-align: left;

  &__actions {
    display: flex;
    margin-top: 8px;
  }

  &__button {
    margin-right: 8px;

    &--confirm {
      margin-left: auto;
    }
  }
}
</style>
