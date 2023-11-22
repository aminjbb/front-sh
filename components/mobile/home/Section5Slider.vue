<template>
<section v-if="content" class="section5-slider section5-slider--mobile mb-4">
    <div class="d-flex align-center flex-wrap" :style="{ backGround: `#${slider.background_hex_code}` }">
        <div class="section5-slider__info">
            <div v-if="content.label" class="section5-slider__info__title text-white mb-2">
                {{slider.label}}
            </div>

            <div class="section5-slider__info__image">
                <img :src="slider.image?.image_url" :title="slider.label" :alt="slider.label" width="111" height="118" />
            </div>
        </div>

        <div v-if="sliderPartitions && sliderPartitions.length" class="section5-slider__items">
            <div>
                <div
                    v-for="(groups, index) in sliderPartitions.slice(0, 3)"
                    :key="`skus-groups-${index}`"
                    class="section5-slider__sku-groups pa-2">
                    <div class="section5-slider__sku-groups__inner">
                        <h2 v-if="groups.label" class="t16 w400 text-grey-darken-2 text-right pb-2">
                            {{groups.label}}
                        </h2>

                        <div class="d-flex flex-wrap">
                            <a v-for="(item, index) in groups.skus.slice(0, 4)" :key="`sku-${index}`" class="section5-slider__item" :href="item.href">
                                <img :src="item.image?.image_url" :item="item.label" :alt="item.label" width="90" height="90" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
</template>

<script>
import {ca} from "vuetify/locale";

export default {

    props: {
        /**
         * Content
         */
        content: Object,

        /**
         * Section background color code
         * code should without "#"
         */
        bgColor: String,
    },

    methods: {
        //TODO: Should delete after add endpoint
        imageAddress(path) {
            const assets =
                import.meta.glob('~/assets/images/should-delete/*', {
                    eager: true,
                    import: 'default',
                })
            return assets['/assets/images/should-delete/' + path]
        }
    },

  computed:{
      slider(){
        try {
          return this.content?.sliders[0]
        }
        catch (e) {
          return ''
        }
    },
      sliderPartitions(){
          try {
            return  this.slider?.partitions
          }catch (e) {
            return []
          }
      }
  }
}
</script>

<style scoped>
@import '~/assets/scss/components/mobile/home/section5-slider.scss';
</style>
