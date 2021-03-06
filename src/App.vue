<template>
<div id="app">
  <div class="env-info">
    <p>{{ host }}</p>
    <p>{{ browserInfo }}</p>
    <p>{{ buildInfo }}</p>
  </div>

  <avatar class="avatar"
    ref="avatar"
    >
  </avatar>

  <chat-messages
    class="chat-messages"
    :messages="messages"
    :doScroll="chatScroll"
    @scrolled="scrolled"
    >
  </chat-messages>
  <chat-input
    class="chat-input"
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
import { detect } from 'detect-browser';
import Avatar from './components/Avatar.vue';
import ChatMessages from './components/ChatMessages.vue';
import ChatInput from './components/ChatInput.vue';
import chatChannel from './chatChannel.js';

export default {
  name: 'App',
  components: {
    Avatar,
    ChatMessages,
    ChatInput,
  },
  data() {
    return {
      messages: [{
        from: 'you',
        content: 'Welcome!',
      }],
      showUpdateUI: false,
      chatScroll: false,
    };
  },
  computed: {
    host() {
      return location.host;
    },
    browserInfo() {
      const browser = detect();
      return [browser.name, browser.version, browser.os].join(' / ');
    },
    buildInfo() {
      return 'git hash: ' + process.env.VUE_APP_GIT_HASH;
    },
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

      if (msg[0] === '.') {
        // animation directive (ex: .Wave, .Jump, .Punch)
        this.$refs.avatar.playAnimation(msg.substring(1));
      } else {
        const respList = await chatChannel.sendMessage(msg);
        if (respList) {
          this.handleResponse(respList);
          this.chatScroll = true;
        }
      }
    },
    handleResponse(respList) {
      for (const resp of respList) {
        this.messages.push({
          from: 'you',
          content: resp.content,
        });
      }
      this.chatScroll = true;
      this.doAnimation();
    },
    async update() {
      this.showUpdateUI = false;
      await this.$workbox.messageSW({ type: "SKIP_WAITING" });
    },
    scrolled() {
      this.chatScroll = false;
    },
    doAnimation() {
      if (Math.random() > 0.5) {
        this.$refs.avatar.wave();
      } else {
        this.$refs.avatar.run();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;

  .env-info {
    font-size: 12px;

    p {
      margin: 2px;
    }
  }

  .avatar {
    position: fixed;
    bottom: 50px;
    left: 0;
    width: 40vw;
    height: calc(100% - 180px);
  }

  .chat-messages {
    position: fixed;
    bottom: 50px;
    right: 0;
    width: 45vw;
    height: calc(100% - 180px);
    overflow: auto;
  }

  .chat-input {
    position: fixed;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }
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
