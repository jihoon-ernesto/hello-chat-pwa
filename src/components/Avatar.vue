<template>
<div class="container">
  <script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>

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
// import ModelViewer from '@google/model-viewer';

export default {
  name: 'avatar',
  components: {
    // ModelViewer,
  },
  props: {
    wave: {
      type: Boolean,
      default: false,
    },
    run: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      avatarUrl: process.env.VUE_APP_AVATAR,
    };
  },
  computed: {
    animation() {
      return this.wave ? 'Wave' :
        this.run ? 'Running' :
        'Idle';
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
