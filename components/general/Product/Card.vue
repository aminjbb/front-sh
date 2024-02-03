<template>
<a v-if="content" class="product-card pa-2" :href="`/sku/asdasdasd`">
    <div v-if="index" class="product-card__index">
        <span class="t16">#{{index}}</span>
    </div>

    <div v-if="deleteIcon" class="product-card__delete">
        <generalModalsDelete
            title="حذف محصول"
            text="آیا از حذف این محصول از لیست علاقمندی ها اطمینان دارید؟"
            submitText="حذف کالا"
            @removeProduct="removeProduct(content)" />
    </div>

    <div v-if="content.image && content.image.image_url && !isPLP" class="product-card__image mb-3 mt-4">
        <img :src="content?.image?.image_url" :title="content.label" :alt="content.label" width="90" height="90" />
    </div>
    <div v-else-if="content.image_url && isPLP" class="product-card__image mb-3 mt-4">
        <img :src="content?.image_url" :title="content.label" :alt="content.label" width="90" height="90" />
    </div>

    <h3 v-if="!hideLabel && content.label" class="t14 w500 text-grey product-card__title mb-2">
        {{content.label}}
    </h3>

    <div class="product-card__info d-flex align-center justify-space-between mb-2" :class="hideInfo ? 'hideInfo' : ''">
        <div class="product-card__info__send">
            <v-icon icon="mdi-truck-outline" color="deep-purple" />
            <span class="t12 text-grey">ارسال فوری</span>
        </div>

        <div class="product-card__info__rate">
            <span class="t12 text-grey">4.3</span>
            <v-icon icon="mdi-star" color="orange-lighten-2" />
        </div>
    </div>

    <div class="product-card__price-info mb-2">
        <template v-if="content.discount">
            <div class="d-flex align-center justify-space-between">
                <span class="product-card__price-info__discount t11 w500">{{content.discount}}</span>
                <span v-if="content.customer_price" class="t19 w400 text-pink-darken-1 product-card__price-info__price product-card__price-info__price--new">
                    {{content.customer_price}}
                    <span class="t12 w300 text-pink-darken-1 currency">تومان</span>
                </span>
            </div>

            <span v-if="content.site_price" class="t12 w400 text-grey product-card__price-info__price product-card__price-info__price--old">
                <span>{{splitChar(content.site_price)}}</span>
                <span class="t10 w300 text-grey currency">تومان</span>
            </span>
        </template>

        <template v-else>
            <span v-if="content.customer_price && !isPLP" class="t19 w400 text-grey-darken-2 product-card__price-info__price product-card__price-info__price--main">{{splitChar(content.customer_price)}}</span>
            <span v-if="content.site_price && isPLP" class="t19 w400 text-grey-darken-2 product-card__price-info__price product-card__price-info__price--main">{{splitChar(content.site_price)}}</span>
            <span class="t12 w300 text-grey-darken-2 currency">تومان</span>
        </template>
    </div>

    <div v-if="content.colors && showColors" class="product-card__colors d-flex align-center justify-center">
        <div
            class="product-card__colors__item"
            v-for="(color,index) in content.colors.slice(0,6)"
            :key="`product-color${index}`">
            <span :style="{ backgroundColor: color.code }"></span>
            <v-tooltip activator="parent" location="top">{{color.label}}</v-tooltip>
        </div>
        <div v-if="content.colors.length > 7" class="number-font text-grey-lighten-1 t12 w400">+{{ content.colors.length - 7 }} تنوع</div>
    </div>

    <div v-if="functions" class="d-flex align-center justify-space-between mt-2 mobile-pa-0 w-100">
        <v-btn
            @click="showProduct()"
            height="44"
            title="مشاهده محصول"
            class="btn btn--cancel">
            مشاهده محصول
        </v-btn>
        <v-btn
            :loading="loading"
            @click="addToCard()"
            height="44"
            title="افزودن به سبد"
            class="btn btn--submit">
            افزودن به سبد
        </v-btn>
    </div>
</a>
</template>

<script>
import {
    splitChar
} from "~/utils/functions.js";

export default {
    props: {
        /**
         * Content
         */
        content: Object,
        /**
         * Show index
         */
        index: String,
        /**
         * Hide card info
         */
        hideInfo: Boolean,
        /**
         * Show buy function
         */
        functions: Boolean,
        /**
         * Active delete icon
         */
        deleteIcon: Boolean,
        /**
         * Show colors in card
         */
        showColors: Boolean,
        /**
         * user this card in plp page for image_url and price
         */
        isPLP: {
            type: Boolean,
            default: false
        },

        /**
         * Hide label of card
         */
        hideLabel:{
            type: Boolean,
            default: false
        },
    },

    methods: {
        splitChar,

        /**
         * Emit remove function
         * @param {*} status
         */
        removeProduct(content) {
            this.$emit('removeProduct', content);
        },

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
@import '~/assets/scss/components/general/product-card.scss';
</style>
