<template>
<div class="container">

  <div class="model-box">
    <model-gltf
      clsss="model-3d"
      src="https://hujiulong.github.io/vue-3d-model/static/models/gltf/Duck/glTF/Duck.gltf">
    </model-gltf>
  </div>

  <div class="model-box">
    <model-fbx
      clsss="model-3d"
      src="https://hujiulong.github.io/vue-3d-model/static/models/fbx/dancing.fbx">
    </model-fbx>
  </div>

</div>
</template>

<script>
import {
  ModelGltf,
  ModelFbx,
} from 'vue-3d-model';

export default {
  name: 'avatar',
  components: {
    ModelGltf,
    ModelFbx,
  },
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;

  .model-box {
    width: 100%;
    height: 200px;
  }
}
</style>
