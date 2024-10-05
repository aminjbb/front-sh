<template>
  <img
      :src="imgSrc"
      :title="imgTitle"
      :alt="imgAlt"
      :width="width"
      :height="height" />
</template>

<script>
export default {
  props:{
    imgSrc: String,
    imgAlt: String,
    imgTitle: String,
    width: Number,
    height: Number,
  }
}
</script>

<style lang="scss" scoped>
@import "~/components/general/Kits/Image/s-image.scss";
</style>