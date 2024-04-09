<template>
<section class="brands brands--mobile mb-8">
    <header v-if="items?.label" class="brands__header text-center t20 text-secondary">
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
            <swiper-slide v-for="(item, index) in brands.slice(0, 7)" :key="`brands-${index}`">
                <a class="brands__item" :href="item?.link" :title="item?.label">
                    <img :src="item.image?.image_url" :title="item?.label" :alt="item?.label" width="72" height="72" />
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
        items: Array,

        /**
         * Title of section
         */
        title: String,
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
