<template>
<div class="main-slider main-slider--desktop">
    <swiper
        :pagination="{
        clickable: true,
        }"
        :modules="modules"
        :loop="true"
        :autoplay="{
                delay: 5000,
                disableOnInteraction: false,
            }"
        class="mySwiper">
        <swiper-slide v-for="(item,index) in desktopBanners" :key="index">
            <a class="main-slider__item" :href="item?.link">
                <div class="main-slider__image">
                    <img :src="item?.image?.image_url" :title="item?.label" :alt="item?.label" width="768" height="268" />
                </div>
            </a>
        </swiper-slide>
    </swiper>
</div>
</template>

<script>
// Import Swiper Vue.js components
import {
    Swiper,
    SwiperSlide
} from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import {
    Autoplay,
    Pagination
} from 'swiper/modules';

export default {
    props: {
        /**
         * Item list
         */
        items: Array,
    },

    components: {
        Swiper,
        SwiperSlide,
    },

    setup() {
        return {
            modules: [Autoplay, Pagination],
        };
    },

    computed:{
      desktopBanners(){
        try {
          const banners = this.items?.banners.filter(item => item.device === 'desktop' && item.is_active === 1)
          if (banners.length) return banners
          else  return  []
        }
        catch (e) {
          return  []
        }
      }
    }
};
</script>

<style>
@import '~/assets/scss/components/desktop/home/main-slider.scss';
</style>
