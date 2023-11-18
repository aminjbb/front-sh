<template lang="">
<section class="section8-slider section8-slider--mobile">
    <header class="text-right t20 text-grey-darken-1 py-4">
        پرفروش‌ترین محصولات
    </header>
    <swiper
        dir="rtl"
        :slidesPerView="6"
        :spaceBetween="24"
        :modules="modules"
        :loop="true"
        :breakpoints="{
                '200': {
                    slidesPerView: 1.3,
                    spaceBetween: 15,
                },
                '500': {
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
        <swiper-slide v-for="(item, index) in items.slice(0, 6)" :key="`section8-slider-${index}`">
            <generalProductCard
                :content="item"
                :index="index + 1"
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
        items: Array
    },

    setup() {
        return {
            modules: [FreeMode],
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
}
</style>
