<template lang="">
<section v-if="items && items.length" class="brands brands--mobile mb-8">
    <header class="brands__header text-center t20 text-secondary">
        پرفروش‌ترین برندها
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
            <swiper-slide v-for="(item, index) in items.slice(0, 7)" :key="`brands-${index}`">
                <a class="brands__item" :href="item.href" :title="item.title">
                    <img :src="imageAddress('brands.jpg')" :title="item.title" :alt="item.title" width="72" height="72" />
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
        items: Array
    },

    setup() {
        return {
            modules: [FreeMode],
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

<style scoped>
@import '~/assets/scss/components/mobile/home/brands.scss';
</style>
