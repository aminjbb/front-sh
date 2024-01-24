<template>
<section class="section8-slider section8-slider--mobile" v-if="items && items.length">
    <header class="text-right t20 text-grey-darken-1 py-4 w500">
        
    </header>

    <swiper
        dir="rtl"
        :slidesPerView="6"
        :spaceBetween="24"
        :modules="modules"
        :navigation="navigation"
        :loop="true"
        :height="286" 
        :breakpoints="{
                '200': {
                    slidesPerView: 1.3,
                    spaceBetween: 15,
                },
                '500': {
                    slidesPerView: 2.8,
                    spaceBetween: 15,
                },
                '650': {
                    slidesPerView: 3.2,
                    spaceBetween: 15,
                },
                '768': {
                    slidesPerView: 4.2,
                    spaceBetween: 15,
                },
                '992': {
                    slidesPerView: 4.5,
                },
                '1200': {
                    slidesPerView: 4.8,
                },
                '1398': {
                    slidesPerView: 6,
                }
            }"
        class="mySwiper">
        <swiper-slide v-for="(item, index) in items" :key="`section8-slider-${index}`">
            <generalProductCard
                :content="item"
                :index="hideIndex !== true ? `${index + 1}` : ''"
                class="mb-4" />
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
import 'swiper/css/free-mode';
import 'swiper/css/navigation';

// import required modules
import {
    FreeMode,
    Navigation
} from 'swiper/modules';

export default {
    components: {
        Swiper,
        SwiperSlide,
    },

    props: {
        /**
         * product list
         */
        items: Array,
        /**
         * section title
         */
        title:String,
        /**
         * Hide index
         */
        hideIndex:Boolean,
        /**
         * Show navigation
         */
         navigation:Boolean
    },

    setup() {
        return {
            modules: [FreeMode,Navigation],
        };
    },

}
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";

$parent:'section8-slider';

.#{$parent} {
    header {
        @include gbp(0, "lg") {
            font-size: 16px !important;
        }
    }

    .product-card {
        margin-bottom: 0 !important;
        height: 276px !important;
    }

    .swiper-button-prev,
    .swiper-button-next {
        width: 40px;
        height: 40px;
        background: #fff;
        border:1px solid #9E9E9E;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;

        &::after{
            font-size: 17px !important;
            color: #D72685 !important;
        }
    }
}
</style>
