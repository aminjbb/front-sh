<template>
<div v-if="items && items.length" class="product-category-slider">
    <header class="t20 w400 text-grey-darken-3 mb-4">
        خرید بر اساس محصول
    </header>

    <div class="product-category-slider__swiper">
        <swiper
            dir="rtl"
            :slidesPerView="7"
            :spaceBetween="60"
            :navigation="true"
            :modules="modules"
            :loop="loop"
            :breakpoints="{
                    '200': {
                        slidesPerView: 2.5,
                        spaceBetween: 15,
                    },
                    '500': {
                        slidesPerView: 2.7,
                        spaceBetween: 15,
                    },
                    '768': {
                        slidesPerView: 3.5,
                    },
                    '992': {
                        slidesPerView: 5.8,
                    },
                    '1200': {
                        slidesPerView: 6.5,
                    },
                    '1398': {
                        slidesPerView: 7,
                    }
                }"
            class="mySwiper">
            <swiper-slide v-for="(item, index) in items" :key="`brands-${index}`">
                <a class="product-category-slider__item d-flex flex-column justify-center align-center" :href="`product/${item.slug}`" :title="item.label">
                    <img :src="item?.image.image_url" :title="item.label" :alt="item.label" width="116" height="116" />
                    <h2 class="t16 w400 mt-2 text-grey-darken-2 text-center">{{item.label}}</h2>
                </a>
            </swiper-slide>
        </swiper>
    </div>
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
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

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
         * Item list
         */
        items: Array,

        /**
         * slider loop
         */
        loop:{
            type: Boolean,
            default: true,
        }
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

.product-category-slider {
    @include gbp(0, 768) {
        margin-top: 0 !important;
    }

    header {
        @include gbp(0, 768) {
            font-size: 16px !important;
            font-variation-settings: "wght"500;
        }
    }

    &__swiper {
        border-radius: 8px;
        border: 1px solid #D9D9D9;
        padding: 15px
    }

    .swiper-button-prev,
    .swiper-button-next {
        width: 40px;
        height: 40px;
        background: #fff;
        border: 1px solid #9E9E9E;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;

        &::after {
            font-size: 17px !important;
            color: #D72685 !important;
        }
    }

    h2 {
        @include gbp(0, 768) {
            font-size: 14px;
            font-variation-settings: "wght"500;
        }
    }
}
</style>
