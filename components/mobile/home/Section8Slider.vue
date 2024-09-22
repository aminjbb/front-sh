<template>
<section class="section8-slider section8-slider--mobile">
    <header v-if="items && items.length > 0 && title" class="text-right py-4" :class="device === 'desktop' ? 't20 text-sGrayDarken2 py-4 w700': 's-title s-title--medium text-sGrayDarken2'">
        {{ title }}
    </header>

    <swiper dir="rtl" :slidesPerView="6" :spaceBetween="8" :modules="modules" :navigation="device === 'desktop' ? true : false" :loop="false" :breakpoints="{
                '200': {
                    slidesPerView: 2.3,
                    spaceBetween: 8,
                },
                '500': {
                    slidesPerView: 2.8,
                    spaceBetween: 8,
                },
                '650': {
                    slidesPerView: 3.2,
                    spaceBetween: 8,
                },
                '768': {
                    slidesPerView: 4.2,
                    spaceBetween: 15,
                },
                '992': {
                    slidesPerView: 4.5,
                },
                '1200': {
                    slidesPerView: 5.8,
                },
                '1398': {
                    slidesPerView: 7,
                }
            }" class="mySwiper py-2">
        <swiper-slide v-for="(item, index) in items" :key="`section8-slider-${index}`">
            <generalProductCard :sectionName="title" :content="item" :isPLP="isPLP" :index="index + 1" :showIndex="hideIndex !== true ? true : false" class="mb-4" />
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
        title: String,
        /**
         * Hide index
         */
        hideIndex: Boolean,
        /**
         * Show navigation
         */
        navigation: Boolean,

        /**
         * is plp for product card
         */
        isPLP: Boolean,

        /**
         * device
         */
        device: {
            type: String,
            default: "desktop"
        },
    },

    setup() {
        return {
            modules: [FreeMode, Navigation],
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
        box-shadow: 0px 2px 4px 0px rgba(97, 97, 97, 0.10);
        border: 0;
        min-height: 242px;

        @include gbp(0, 768) {
            height: 217px !important;
        }

        &__image {
            height: 110px;
        }
    }

    .swiper-button-next,
    .swiper-button-prev {
        border-radius: 16px !important;
        background: #FBE9F3 !important;
        width: 42px !important;
        height: 42px !important;

        &::before {
            width: 23px;
            height: 23px;
            border-radius: 50%;
            content: '';
            position: absolute;
            top: calc(50% - 11.5px);
            right: calc(50% - 11.5px);
            background-color: #D72685;
        }

        &::after {
            z-index: 1;
            color: white;
            font-size: 13px;
        }
        
        &.swiper-button-disabled{
            display: none !important;
        }
    }
}
</style>
