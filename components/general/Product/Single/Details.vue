<template lang="">
<div class="product-details">
    <div class="d-flex justify-space-between align-center">
        <div class="d-flex align-center surprise-part">
            <template v-if="surprise">
                <span class="text-primary t24">سورپرایز روز</span>
                <span class="text-primary t16 ml-2 number-font mt-1">{{ formattedTime}}</span>
            </template>
        </div>

        <generalProductSingleReportModal class="xs-hide" :title="content.label" />
    </div>

    <h1 class="t20 w400 text-grey-darken-4 mb-3 mt-2">{{content.label}}</h1>

    <h2 class="t12 w400 text-grey">{{content.name}}</h2>

    <div class="product-details__rate d-flex align-center mt-3">
        <div class="product-details__rate__star d-flex align-center ltr ml-2">
            <template v-for="icon in generateStarIcons">
                <v-icon
                    v-if="icon === 'mdi-star'"
                    :icon="icon"
                    color="orange-lighten-2" />
                <v-icon
                    v-else
                    :icon="icon"
                    color="orange-lighten-2" />
            </template>
        </div>

        <span class="t12 w400 text-grey-lighten-1 number-font">({{content.numberOfVotes}})</span>
    </div>

    <v-divider color="grey" class="my-3" />

    <!-- color details -->
    <div class="colors-pallet mb-2">
        <h4 class="t16 w400 text-grey-darken-3 mb-3">رنگ:</h4>

        <div class="scroll--x">
            <div class="d-flex align-center">
                <div
                    class="d-flex align-center colors-pallet__item ml-5"
                    v-for="(color,index) in content.colors"
                    :key="`product-single-color${index}`"
                    :id="`color--${color.id}`"
                    @click="selectColor(color.id)">
                    <div class="colors-pallet__item__code ml-1">
                        <span :style="{backgroundColor: color.code}" />
                        <v-icon
                            icon="mdi-check"
                            size="x-small"
                            color="white"
                            class="colors-pallet__selected" />
                    </div>

                    <span class="colors-pallet__item__label t12 w500 text-grey">
                        {{color.label}}
                    </span>
                </div>
            </div>
        </div>
    </div>

    <v-divider color="grey" class="my-3" />

    <h4 class="t16 w400 text-grey-darken-3 mb-3">مشخصات اصلی:</h4>

    <nav class="attribute-list">
        <ul class="ma-0 pa-0 pr-5">
            <li v-for="attr in content.titleAttrs">
                <span class="t13 w400 text-grey">{{attr.type}}: </span>
                <span class="t13 w400 text-grey-darken-1">{{attr.value}}</span>
            </li>
        </ul>
    </nav>

</div>
</template>

<script>
export default {
    data() {
        return {
            formattedTime: '00:00:00',
            targetDate: '2024-01-23 23:59:00',
        }
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

    computed: {
        generateStarIcons() {
            const fullStars = Math.floor(this.content.starNumber);
            const hasHalfStar = this.content.starNumber % 1 !== 0;

            const stars = [];
            for (let i = 0; i < fullStars; i++) {
                stars.push('mdi-star');
            }

            if (hasHalfStar) {
                stars.push('mdi-star-half-full');
            }

            return stars;
        },
    },

    methods: {
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
        }
    },

    mounted() {
        this.startCountdown();
    }
}
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";
@import '~/assets/scss/components/general/products/details.scss';
</style>
