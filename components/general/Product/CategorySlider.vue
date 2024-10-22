<template>
<div v-if="items && items.length" class="product-category-slider">
    <v-container>
        <header class="t18 w700 text-sGrayDarken2 mb-4 product-category-slider__header">
            {{ title }}
        </header>

        <div class="product-category-slider__swiper">
            <swiper dir="rtl" :slidesPerView="8" :spaceBetween="16" :navigation="true" :modules="modules" :loop="false" :breakpoints="{
                    '200': {
                        slidesPerView: 2.5,
                        spaceBetween: 10,
                    },
                    '360': {
                        slidesPerView: 4.5,
                        spaceBetween: 10,
                    },
                    '500': {
                        slidesPerView: 6.5,
                        spaceBetween: 10,
                    },
                    '768': {
                        slidesPerView: 5.5,
                    },
                    '992': {
                        slidesPerView: 6.8,
                    },
                    '1200': {
                        slidesPerView: 7,
                    },
                    '1398': {
                        slidesPerView: 8.3,
                    }
                }" class="mySwiper">
                <swiper-slide v-for="(item, index) in items" :key="`slider-${index}`">
                    <a class="product-category-slider__item d-flex flex-column justify-center align-center" :href="`/${prefix}/${item?.slug}`" :title="item?.label" :class="item.is_selected === true ? 'selected' : ''">
                        <div class="product-category-slider__item__image">
                            <img :src="item?.image_url" :title="item?.label" :alt="item?.label" width="76" height="76" />
                        </div>
                        <p class="t14 w700 mt-3 text-sGrayLighten2 text-center product-category-slider__item__title">{{item?.label}}</p>
                    </a>
                </swiper-slide>
            </swiper>
        </div>
    </v-container>
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
         * Title of slider
         */
        title: String,

        /**
         * Link prefix
         */
        prefix: {
            type: String,
            default: 'category'
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
    margin-bottom: 20px;
    border-bottom: 1px solid #E8E8E8;

    @include gbp(0, 768) {
        margin-top: 0 !important;
        border: 0 !important;
        margin-bottom: 0 !important;
    }

    .v-container{
        @include gbp(0, 768) {
            padding-left: 0 !important;
            padding-bottom: 12px !important;
        }
    }

    &__header{
        @include gbp(0, 768) {
            font-size: 14px !important;
            padding-top: 8px;
        } 
    }

    &__swiper {
        @include gbp(0, 768) {
            border: 0 !important;
            border-radius: 0 !important;
            padding: 0 !important;
        }
    }

    &__item {
        &__image {
            border-radius: 32px;
            background: #F5F5F5;
            padding: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid #F5F5F5;

            @include gbp(0, 768) {
                padding: 10px !important;
                border-radius: 16px !important;
                border: 0 !important;
            }


            img {
                width: 76px;
                max-height: 76px;
                border-radius: 16px;

                @include gbp(0, 768) {
                    width: 49px !important;
                    height: 49px !important;
                    border-radius: 50% !important;
                }
            }
        }

        &__title{
            display: -webkit-box;
            -webkit-box-orient: vertical;
            overflow: hidden;
            -webkit-line-clamp: 2;
        }

        &.selected {
            .product-category-slider__item__image {
                border-color:#D72685;

                @include gbp(0, 768) {
                    border-color: transparent !important;
                    background: linear-gradient(135deg, #E77DB6 -0.38%, #811750 99.62%);
                }
            }

            h2 {
                color: #D72685 !important;
            }
        }
    }

    .swiper-slide{
        padding-bottom: 16px !important;

        @include gbp(0, 768) {
            padding-bottom:0 !important ;
        }
    }

    .swiper-button-next,
    .swiper-button-prev {
        border-radius: 16px !important;
        background: #FBE9F3 !important;
        width: 42px !important;
        height: 42px !important;
        top: 70px !important;

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

        @include gbp(0, 768) {
            display: none !important;
        }
    }

    h2{
        @include gbp(0, 768) {
            font-size: 12px;
        }
    }
}
</style>
