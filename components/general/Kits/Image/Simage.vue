<template>
  <img
      v-if="lazy"
      :src="imgSrc"
      :title="imgTitle"
      :alt="imgAlt"
      :width="width"
      :height="height" />

  <img
      v-else
      data-not-lazy
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
    width: Number|String,
    height: Number|String,
    lazy:{
      type:Boolean,
      default:true
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/components/general/Kits/Image/s-image.scss";
</style>