<template>
<section v-if="items && items.length" class="main-slider main-slider--desktop">
    <swiper
        :pagination="true"
        :modules="modules"
        :loop="true"
        :autoplay="{
                delay: 2500,
                disableOnInteraction: false,
            }"
        class="mySwiper">
        <swiper-slide v-for="(item,index) in items" :key="index">
            <a class="main-slider__item" :href="item.link">
                <div class="main-slider__image">
                    <img :src="imageAddress('main-slider.jpg')" :title="item.title" :alt="item.title" width="768" height="268" />
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
};
</script>

<style>
@import '~/assets/scss/components/desktop/home/main-slider.scss';
</style>
