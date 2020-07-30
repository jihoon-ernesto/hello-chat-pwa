<template>
<div class="container">

  <div class="model-box">
    <model-viewer
      ref="model"
      class="model"
      :src="avatarUrl"
      ios-src=""
      alt="3D model"
      interaction-prompt="false"
      camera-controls
      shadow-intensity="1"
      :animation-name="animation"
      @load="onLoad"
      @pause="onPause"
      >
    </model-viewer>
  </div>

</div>
</template>

<script>
import '@google/model-viewer';

export default {
  name: 'avatar',
  components: {
  },
  props: {
  },
  data() {
    return {
      avatarUrl: process.env.VUE_APP_AVATAR,
      animation: 'Idle',
    };
  },
  computed: {
  },
  methods: {
    playAnimation(animName) {
      this.$nextTick(() => {
        this.animation = animName;
        this.$refs.model.play();

        setTimeout(() => {
          this.$refs.model.pause();
        }, 2000);
      })
    },
    idle() {
      this.animation = 'Idle';
      this.$refs.model.play();
    },
    wave() {
      this.playAnimation('Wave');
    },
    run() {
      this.playAnimation('Running');
    },
    onLoad() {
      console.log('onLoad');
      this.idle();
    },
    onPause() {
      console.log('onPause');
      this.idle();
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;

  .model-box {
    .model {
      width: 200px;
      height: 300px;
    }
  }
}
</style>
