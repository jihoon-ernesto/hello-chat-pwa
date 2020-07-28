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
      camera-controls autoplay shadow-intensity="1"
      :animation-name="animation"
      >
    </model-viewer>
  </div>

</div>
</template>

<script>
import ModelViewer from '@google/model-viewer';

export default {
  name: 'avatar',
  components: {
    ModelViewer,
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
    setAnimation(animName) {
      this.$nextTick(() => {
        this.animation = animName;
        setTimeout(() => {
          this.animation = 'Idle';
        }, 2000);
      })
    },
    wave() {
      this.setAnimation('Wave');
    },
    run() {
      this.setAnimation('Running');
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
