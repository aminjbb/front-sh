<template>
<section class="brands brands--mobile">
    <header v-if="items?.label" class="brands__header w-100"  :class="device === 'desktop' ? 'justify-center text-center t20 text-secondary' : 't16 text-sGrayDarken2 py-2 w700 text-right'">
        {{items?.label}}
    </header>

    <div class="brands__swiper">
        <swiper
            dir="rtl"
            :slidesPerView="7"
            :spaceBetween="60"
            :modules="modules"
            :loop="true"
            :breakpoints="{
                    '200': {
                        slidesPerView: 2.7,
                        spaceBetween: 8,
                    },
                    '500': {
                        slidesPerView: 4.5,
                        spaceBetween: 8,
                    },
                    '768': {
                        slidesPerView: 4.9,
                        spaceBetween: 8,
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
            class="mySwiper py-2">
            <swiper-slide v-for="(item, index) in brands.slice(0, 7)" :key="`brands-${index}`">
                <a class="brands__item w-100 pa-2 flex-column d-flex justify-center align-center bg-white" :href="item?.link" :title="item?.label">
                    <img class="flex-grow-1" :src="item.image?.image_url" :title="item?.label" :alt="item?.label" width="104" height="58" />
                    <h5 class="number-font w700 t10 text-sGray text-center mt-1">110محصول موجود</h5>
                </a>
            </swiper-slide>
        </swiper>
    </div>
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

// import required modules
import {
    FreeMode
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
        items: Object,

        /**
         * Title of section
         */
        title: String,

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
            modules: [FreeMode],
        };
    },

    computed: {
        brands() {
            try {
                return this.items.brands
            } catch (e) {
                return []
            }
        }
    }
}
</script>

<style scoped>
@import '~/assets/scss/components/mobile/home/brands.scss';
</style>
