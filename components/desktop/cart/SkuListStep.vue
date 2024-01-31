<template lang="">
<v-card class="pa-5 mobile-pa-0 mobile-no-border">
    <header class="d-flex align-center mb-5 xs-hide">
        <v-icon
            icon="mdi-cart-outline"
            color="primary"
            size="small"
            class="ml-2" />
        <span class="number-font t16 w400 text-grey-darken-3">سبد خرید ({{count}} کالا) </span>
    </header>

    <div>
        <desktopCartProductCard
            v-if="productList && productList.shps.length"
            v-for="(product, index) in productList.shps"
            :key="`product${index}`"
            :content="product" />
    </div>
</v-card>
</template>

<script>
export default {
    props: {
        /**
         * Sku count
         */
        count: String,

        /**
         * Product list
         */
        productList:Array,
    }
}
</script>

