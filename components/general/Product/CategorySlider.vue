<template lang="">
<div v-if="items && items.length" class="product-category-slider">
    <header class="t20 w400 text-grey-darken-3 mb-4">
        خرید بر اساس دسته‌بندی
    </header>

    <div class="product-category-slider__swiper">
        <swiper
            dir="rtl"
            :slidesPerView="7"
            :spaceBetween="60"
            :navigation="true"
            :modules="modules"
            :loop="true"
            :breakpoints="{
                    '200': {
                        slidesPerView: 4.5,
                        spaceBetween: 15,
                    },
                    '500': {
                        slidesPerView: 5.7,
                        spaceBetween: 15,
                    },
                    '768': {
                        slidesPerView: 5.5,
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
                <a class="product-category-slider__item d-flex flex-column justify-center align-center" :href="item.link" :title="item.label">
                    <img :src="imageAddress(item.image?.image_url)" :title="item.label" :alt="item.label" width="116" height="116" />
                    <h2 class="t16 w400 mt-2 text-grey-darken-2 text-center">{{item.title}}</h2>
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
    },

    setup() {
        return {
            modules: [FreeMode, Navigation],
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
}
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";

.product-category-slider {
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
