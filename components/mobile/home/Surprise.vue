<template lang="">
<section v-if="content" class="surprise-slider surprise-slider--mobile">
    <div class="d-flex align-center flex-wrap" :style="{ backGround: `#${bgColor}` }">
        <div class=" surprise-slider__info">
            <div class="surprise-slider__info__counter mb-4">
                <span class="t16 w400 ml-2">12:34:45</span>
                <v-icon icon="mdi-clock-outline" />
            </div>

            <div class="surprise-slider__info__image mb-4">
                <img :src="imageAddress('surprise.jpg')" title="سپوپرایز" alt="سپوپرایز" width="111" height="118" />
            </div>

            <v-btn
                color="primary500"
                height="40"
                variant="outlined"
                href="/"
                class="px-8 mt-1 surprise-slider__info__btn">
                مشاهده همه
                <template v-slot:append>
                    <v-icon icon="mdi-chevron-left" />
                </template>
            </v-btn>
        </div>

        <div class="surprise-slider__swiper">
            <swiper
                dir="rtl"
                :slidesPerView="6"
                :spaceBetween="8"
                :modules="modules"
                :loop="true"
                :breakpoints="{
                    '200': {
                        slidesPerView: 0.8,
                    },
                    '500': {
                        slidesPerView: 2.2,
                    },
                    '768': {
                        slidesPerView: 3.2,
                    },
                    '1000': {
                        slidesPerView:  3.8,
                    },
                    '1200': {
                        slidesPerView: 4.8,
                    },
                    '1398': {
                        slidesPerView: 5.5,
                    }
                }"
                class="mySwiper">
                <swiper-slide
                    v-if="content.skus && content.skus.length"
                    v-for="(item, index) in content.skus.slice(0, 10)"
                    :key="`skus-${index}`">
                    <generalProductCard
                        :content="item"
                        hideInfo
                        class="mb-4" />
                </swiper-slide>
            </swiper>
        </div>
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

    setup() {
        return {
            modules: [FreeMode],
        };
    },

    props: {
        /**
         * Section background color
         */
        bgColor: String,

        /**
         * Content
         */
        content: Object,
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

<style scoped>
@import '~/assets/scss/components/mobile/home/surprise.scss';
</style>
