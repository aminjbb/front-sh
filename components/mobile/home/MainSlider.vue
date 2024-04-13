<template>
<section class="main-slider main-slider--mobile">
    <swiper
        :pagination="true"
        :modules="modules"
        :loop="true"
        :autoplay="{
                delay: 2500,
                disableOnInteraction: false,
            }"
        class="mySwiper">
        <swiper-slide v-for="(item,index) in mobileBanners" :key="index">
            <a class="main-slider__item" :href="item?.link">
                <div class="main-slider__image">
                    <img :src="item?.image?.image_url" :title="item?.title" :alt="item?.title" width="768" height="268" />
                </div>
            </a>
        </swiper-slide>
    </swiper>
</section>
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
        items: Object,
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
    mobileBanners(){
      try {
        const banners = this.items?.banners.filter(item => item.device === 'mobile' && item.is_active === 1)
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
@import '~/assets/scss/components/mobile/home/main-slider.scss';
</style>
