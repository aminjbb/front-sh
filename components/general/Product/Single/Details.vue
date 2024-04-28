<template>
<div class="product-details">
    <div class="d-flex justify-space-between align-center">
        <div class="d-flex align-center surprise-part">
            <template v-if="surprise">
                <span class="text-primary t24">سورپرایز روز</span>
                <span class="text-primary t16 ml-2 number-font mt-1">{{ formattedTime}}</span>
            </template>
        </div>

        <generalProductSingleReportModal class="xs-hide" :title="content?.label" />
    </div>

    <h1 v-if="content?.label" class="t20 w400 text-grey-darken-4 mb-3 mt-2">{{content?.label}}</h1>

    <h2 v-if="content?.name" class="t12 w400 text-grey">{{content?.name}}</h2>

    <div v-if="screenType !== null && screenType === 'desktop'" class="d-flex justify-space-between items-center">
    <div class="product-details__rate d-flex align-center mt-3">
      <div class="product-details__rate__star d-flex align-center ltr ml-2">
        <v-rating
            v-model="content.score"
            class="ltr ml-0"
            :length="5"
            :size="32"
            half-increments
            readonly
            color="grey-lighten-2"
            active-color="orange-lighten-2"
        ></v-rating>
      </div>

      <span v-if="content.score" class="t12 w400 text-grey-lighten-1 number-font">({{Math.floor(content?.score)}})</span>
    </div>

    <div v-if="content?.brand_name && content?.brand_slug" class="d-flex align-center mt-3">
        <span class="t14 w400 text-grey">برند:</span>
        <a :href="`/brand/${content?.brand_slug}`" class="w400 text-grey-darken-3 mr-1">{{ content?.brand_name }}</a>
    </div>
  </div>

    <div v-if="screenType !== null && screenType === 'mobile'">
        <div v-if="content?.brand_name && content?.brand_slug" class="d-flex justify-space-between align-center mt-3">
            <span class="t14 w400 text-grey">برند:</span>
            <a :href="`/brand/${content?.brand_slug}`" class="w400 text-grey-darken-3 mr-1">{{ content?.brand_name }}</a>
        </div>

        <div class="product-details__rate d-flex align-center mt-3">
            <div class="product-details__rate__star d-flex align-center ltr ml-2">
                <v-rating
                    v-model="content.score"
                    class="ltr ml-0"
                    :length="5"
                    :size="32"
                    half-increments
                    readonly
                    color="grey-lighten-2"
                    active-color="orange-lighten-2"
                />
            </div>

            <span v-if="content.score" class="t12 w400 text-grey-lighten-1 number-font">({{Math.floor(content?.score)}})</span>
        </div>
    </div>

    <v-divider color="grey" class="my-3" />

    <!-- color details -->
    <div class="colors-pallet mb-2">
        <h4 class="t16 w400 text-grey-darken-3 mb-3">رنگ:</h4>

        <div>
            <swiper
                v-if="content?.colors"
                dir="rtl"
                :slidesPerView="'auto'"
                :spaceBetween="8"
                :modules="modules"
                :navigation="true"
                class="mySwiper px-6">
                <swiper-slide v-for="(color, index) in content?.colors" :key="`product-single-color${index}`">
                    <div
                        class="d-inline-flex align-center colors-pallet__item ml-5"
                        :id="`color--${color.id}`"
                        @click="selectColor(color?.slug)">
                        <div class="colors-pallet__item__code ml-1" :class="isColorSelected(color?.slug) === true ? 'colors-pallet__item__code--selected' : ''">
                            <span :style="{backgroundColor: color?.value}" />
                            <v-icon
                                icon="mdi-check"
                                size="x-small"
                                color="white" />
                        </div>

                        <span class="colors-pallet__item__label t12 w500 text-grey number-font">
                            {{color?.label}}
                        </span>
                    </div>
                </swiper-slide>
        </swiper>
        </div>
    </div>

    <v-divider color="grey" class="my-3" />

    <h4 class="t16 w400 text-grey-darken-3 mb-3">مشخصات اصلی:</h4>

    <nav class="attribute-list">
        <ul class="ma-0 pa-0 pr-5">
            <li
                v-for="(attr, index) in content?.attributes"
                class="d-flex align-center"
                :key="`attr${index}`"
                :class="attr?.attribute_values.length >1 ? 'mb-2' : ''">
                <span class="t13 w400 text-grey" :class="attr?.attribute_values.length >1 ? 'ml-2' : 'ml-1'">{{attr?.label}}: </span>

                <template v-if="attr?.attribute_values">
                    <span class="t13 w400 text-grey-darken-1 mr-2 number-font">{{attr?.attribute_values.label}}</span>
                </template>
                <template v-else>
                    <div class="attr-select">
                        <ClientOnly>
                            <v-select
                                height="30"
                                density="compact"
                                variant="underlined"
                                single-line
                                item-title="label"
                                item-value="id"
                                hide-details
                                :items="attr?.attribute_values"
                                v-model="selectedAttr"
                                @update:modelValue="selectAttr()" />
                        </ClientOnly>
                    </div>
                </template>
            </li>
        </ul>
    </nav>
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

// import required modules
import {
    Navigation
} from 'swiper/modules';

export default {
    data() {
        return {
            formattedTime: '00:00:00',
            targetDate: '2024-01-23 23:59:00',
            selectedAttr: null,
            emptyStar:0,
            screenType: 'desktop',
        }
    },
    
    components: {
        Swiper,
        SwiperSlide,
    },

    setup() {
        return {
            modules: [Navigation],
        };
    },

    props: {
        /**
         * Content
         */
        content: Object,
        /**
         *  Show surprise
         */
        surprise: Boolean,
        /**
         * Sku group
         */
        skuGroup: Object,
    },

    methods: {
        isColorSelected(colorSlug){
          if (colorSlug === this.$route.params.slug) return true
          return false
        },
        
        /**
         * Counter for time
         * @param {*} targetDate
         */
        startCountdown(targetDate) {
            const targetTime = new Date(this.targetDate).getTime();

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
        },

        selectColor(slug) {
            this.$router.push(`/sku/${slug}`)
        },

        /**
         * Fix bug for select in c-select
         */
         onUpdateMenu(open) {
            if (open) {
                // WORKAROUND: fixes dialog menu popup position
                setTimeout(() => window.dispatchEvent(new Event("resize")), 50);
            }
        }
    },

    mounted() {
        this.startCountdown();
      window.innerWidth < 769 ? this.screenType = 'mobile' : this.screenType = 'desktop';
    }
}
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";
@import '~/assets/scss/components/general/products/details.scss';

.attr-select {
    width: 150px;

    .v-field__input {
        min-height: 37px;
        padding: 0 10px !important;
    }

    .v-select__selection-text {
        font-size: 13px;
        color: #616161 !important
    }
}
</style>
