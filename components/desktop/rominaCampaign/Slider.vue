<template>
<section v-if="items && items.length" class="campaign-slider mb-5">
    <div class="campaign-slider__swiper">
        <swiper dir="rtl" :spaceBetween="32" :modules="modules" :navigation="true"  :slidesPerView="3" :breakpoints="{
                    '320': {
                        slidesPerView: 1,
                        slidesPerGroup: 1
                    },
                    '500': {
                        slidesPerView: 2,
                        slidesPerGroup: 2
                    },
                    '992': {
                        slidesPerGroup: 3
                    },
                }">
            <swiper-slide v-for="(item, index) in items" :key="`skus-${index}`">
                <desktopRominaCampaignProductCard :content="item" />
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

    data() {
        return {
        }
    },

    setup() {
        return {
            modules: [FreeMode, Navigation],
        };
    },

    props: {
        /**
         * Content
         */
        items: Array,
    },
}
</script>
    
