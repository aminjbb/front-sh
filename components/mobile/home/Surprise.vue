<template>
<section v-if="mainBanner?.skus && mainBanner?.skus?.length" class="surprise-slider surprise-slider--mobile">
    <div class="surprise-slider__swiper w-100" v-if="mainBanner?.skus && mainBanner?.skus?.length" :style="{ background: `${mainBanner?.background_hex_code}` }">
        <swiper dir="rtl" :slidesPerView="6" :spaceBetween="8" :modules="modules" :navigation="false" :breakpoints="{
                    '200': {
                        slidesPerView: 1.8,
                    },
                    '350': {
                        slidesPerView: 2.2,
                    },
                    '500': {
                        slidesPerView: 3.2,
                    },
                    '768': {
                        slidesPerView: 3.2,
                    },
                }" class="mySwiper">
            <swiper-slide>
                <div class="d-flex flex-column align-center surprise-slider__info h-100 w-100 flex-nowrap">
                    <div class="surprise-slider__info__counter mb-2">
                        <span class="t18 w700 ml-2">{{ formattedTime }}</span>
                        <v-icon icon="mdi-clock-outline" />
                    </div>

                    <div class="surprise-slider__info__image flex-grow-1 mb-2 d-flex align-center justify-center">
                        <img :src="mainBannerImage" :title="mainBanner?.label" :alt="mainBanner?.label" width="111" height="118" />
                    </div>
                    <div class="surprise-slider__info__title mb-2">
                        <span class="t16 w700 ml-2 text-white"> {{mainBanner?.label}}</span>
                    </div>

                    <v-btn color="primary500" height="40" variant="outlined" :href="mainBanner?.link" class="mb-2 t12 w700 px-4 mt-1 surprise-slider__info__btn s-border--medium">
                        مشاهده بیشتر
                    </v-btn>
                </div>
            </swiper-slide>

            <swiper-slide v-for="(item, index) in mainBannerSkus" :key="`skus-${index}`">
                <generalProductCard  :cardIdImage="`home-${screenId}-${content?.id}-${index +1}-image`"
                                     :cardIdLabel="`home-${screenId}-${content?.id}-${index +1}-label`" :content="item" hideInfo :index="index + 1" sectionName="سورپرایز" :shps="item?.pivot?.shps" class="mb-4" />
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

      /**
       * screenId
       */
      screenId: {
        type:String,
        default:'M'
      },
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
        mainBannerSkus() {
            try {
                const skus = this.mainBanner.skus.slice(0, 10)
                const findSkus = skus.filter(sku => sku ?.seller_s_k_us ?.length && sku ?.seller_s_k_us[0] ?.site_stock > 0)
                return findSkus
            } catch (e) {
                return []
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
