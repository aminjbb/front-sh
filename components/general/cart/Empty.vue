<template lang="">
<div>
    <v-card class="pa-5 mobile-pa-0 mobile-no-border">
        <header class="d-flex align-center mb-5 xs-hide">
            <v-icon
                icon="mdi-cart-outline"
                color="primary"
                size="small"
                class="ml-2" />
            <span class="number-font">سبد خرید ({{count}} کالا) </span>
        </header>

        <div class="d-flex flex-column justify-center align-center pt-15 pb-15">
            <svgEmptyCart />
            <h2 class="t13 w400 text-grey-darken-1 mt-5">سبد خرید شما خالی است!</h2>
            <v-btn
                href="/product"
                title="مشاهده محصولات"
                class="mt-5 btn btn--cancel">
                مشاهده محصولات
            </v-btn>
        </div>
    </v-card>

    <v-divider color="grey-lighten-1" class="xs-show"/>

    <div>
        <header class="t20 text-right text-grey-darken-2 pa-3 pr-0 pb-5">
            پیشنهاد شاواز
        </header>

        <v-row>
            <v-col
                v-for="(product, index) in products"
                :key="`product${index}`"
                xs="6"
                sm="3"
                md="3"
                lg="2">
                <generalProductSimpleCard :image="product.image.image_url" :label="product.label" />
            </v-col>
        </v-row>
    </div>
</div>
</template>

<script>
export default {
    props: {
        /**
         * Product count
         */

        count: String,
        /**
         * Suggestion product list
         */
        products: Array
    }
}
</script>
