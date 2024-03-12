<template>
<section v-if="mainBanner" class="surprise-slider surprise-slider--mobile">
    <div class="d-flex align-center flex-wrap" :style="{ background: `${mainBanner?.background_hex_code}` }">
        <div class=" surprise-slider__info">
            <div class="surprise-slider__info__counter mb-4">
                <span class="t14 ml-2">{{ formattedTime }}</span>
                <v-icon icon="mdi-clock-outline" />
            </div>

            <div class="surprise-slider__info__image mb-4">
                <img :src="mainBannerImage" :title="mainBanner.label" :alt="mainBanner.label" width="111" height="118" />
            </div>
          <div class="surprise-slider__info__title mb-4">
            <span class="t14 ml-2">  {{mainBanner.label}}</span>
          </div>

            <v-btn
                color="primary500"
                height="40"
                variant="outlined"
                :href="mainBanner.link"
                class="px-8 mt-1 surprise-slider__info__btn">
                مشاهده همه
                <template v-slot:append>
                    <v-icon icon="mdi-chevron-left" />
                </template>
            </v-btn>
        </div>

        <div class="surprise-slider__swiper" v-if="mainBanner.skus && mainBanner.skus.length">
            <swiper
                dir="rtl"
                :slidesPerView="6"
                :spaceBetween="8"
                :modules="modules"
                :navigation="true"
                :breakpoints="{
                    '200': {
                        slidesPerView: 0.8,
                    },
                    '380': {
                        slidesPerView: 1.2,
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
                <swiper-slide v-for="(item, index) in mainBanner.skus.slice(0, 10)" :key="`skus-${index}`">
                    <generalProductCard
                        :content="item"
                        hideInfo
                        hideLabel
                        :shps="item?.pivot?.shps"
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
import 'swiper/css/navigation';

// import required modules
import {
    FreeMode,Navigation
} from 'swiper/modules';

export default {
    components: {
        Swiper,
        SwiperSlide,
    },

    data() {
        return {
            counter: null,
            targetDate: '2023-11-21 23:59:00',
            formattedTime: '00:00:00'
        }
    },

    setup() {
        return {
            modules: [FreeMode, Navigation],
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

    mounted() {

    },

    watch: {
        mainBanner() {
            this.startCountdown(this.mainBanner ?.end_time);
        }
    },

    methods: {

        /**
         * Counter for time
         * @param {*} targetDate
         */
        startCountdown(targetDate) {
            const targetTime = new Date(targetDate).getTime();

            const countdownInterval = setInterval(() => {
                const currentTime = new Date().getTime();

                const remainingTime = targetTime - currentTime;

                if (remainingTime <= 0) {
                    clearInterval(countdownInterval);
                    this.formattedTime = '00:00:00';
                    return;
                }

                const hours = Math.floor(remainingTime / (1000 * 60 * 60));
                const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

                this.formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            }, 1000);
        }
    },

    computed: {
        mainBanner() {
            try {
                return this.content.sliders[0]
            } catch (e) {
                return ''
            }
        },
        mainBannerImage() {
            try {
                return this.mainBanner ?.image ?.image_url
            } catch (e) {
                return ''
            }
        }
    }
}
</script>

<style>
@import '~/assets/scss/components/mobile/home/surprise.scss';
</style>

