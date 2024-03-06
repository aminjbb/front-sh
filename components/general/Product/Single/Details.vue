<template>
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

    <h1 v-if="content.label" class="t20 w400 text-grey-darken-4 mb-3 mt-2">{{content.label}}</h1>

    <h2 v-if="content.name" class="t12 w400 text-grey">{{content.name}}</h2>

    <div class="product-details__rate d-flex align-center mt-3">
        <div class="product-details__rate__star d-flex align-center ltr ml-2">
            
            <template v-for="(icon, index) in generateStarIcons" :key="`icon${index}`">
                <v-icon
                    v-if="icon === 'mdi-star'"
                    :icon="icon"
                    color="orange-lighten-2" />
                <v-icon
                    v-else
                    :icon="icon"
                    color="orange-lighten-2" />
            </template>
            <template v-if="emptyStar !== 0" >
                <template v-for="(icon, index) in emptyStar" :key="`icon${index}`">
                    <v-icon
                    icon="mdi-star"
                    color="grey-lighten-2" />
                </template>
            </template>
        </div>

        <span v-if="content.score" class="t12 w400 text-grey-lighten-1 number-font">({{Math.floor(content.score)}})</span>
    </div>

    <v-divider color="grey" class="my-3" />

    <!-- color details -->
    <div class="colors-pallet mb-2">
        <h4 class="t16 w400 text-grey-darken-3 mb-3">رنگ:</h4>

        <div class="scroll--x pb-3">
            <div class="d-flex align-center">

                <div
                    class="d-flex align-center colors-pallet__item ml-5"
                    v-for="(color,index) in content.colors"
                    :key="`product-single-color${index}`"
                    :id="`color--${color.id}`"
                    @click="selectColor(color.slug)">
                    <div class="colors-pallet__item__code ml-1" :class="isColorSelected(color.slug) === true ? 'colors-pallet__item__code--selected' : ''">
                        <span :style="{backgroundColor: color.value}" />
                        <v-icon
                            icon="mdi-check"
                            size="x-small"
                            color="white" />
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

            <li
                v-for="(attr, index) in content.attributes"
                class="d-flex align-center"
                :key="`attr${index}`"
                :class="attr.attribute_values.length >1 ? 'mb-2' : ''">
                <span class="t13 w400 text-grey" :class="attr.attribute_values.length >1 ? 'ml-2' : 'ml-1'">{{attr.label}}: </span>

                <template v-if="attr.attribute_values">
                    <span class="t13 w400 text-grey-darken-1 mr-2">{{attr.attribute_values.label}}</span>
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
                                :items="attr.attribute_values"
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
export default {
    data() {
        return {
            formattedTime: '00:00:00',
            targetDate: '2024-01-23 23:59:00',
            selectedAttr: null,
            emptyStar:0,
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
            const fullStars = Math.floor(this.content.score);
            const hasHalfStar = this.content.score % 1 !== 0;

            const stars = [];
            for (let i = 0; i < fullStars; i++) {
                stars.push('mdi-star');
            }

            if (hasHalfStar) {
                stars.push('mdi-star-half-full');
            }

            if(stars.length < 6){
                this.emptyStar = 5 - (stars.length);
            }

            return stars;
        },
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

        selectAttr() {
            console.log("🚀 ~ selectAttr ~ selectedAttr:", this.selectedAttr)
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
