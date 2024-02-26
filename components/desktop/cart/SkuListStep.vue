<template>
<v-card class="pa-5 mobile-pa-0 mobile-no-border">
    <header class="d-flex align-center justify-space-between xs-hide">
        <div class="d-flex align-center">
            <v-icon
                icon="mdi-cart-outline"
                color="primary"
                size="small"
                class="ml-2" />
            <span class="number-font t16 w400 text-grey-darken-3">سبد خرید ({{count}} کالا) </span>
        </div>

        <v-icon
            icon="mdi-trash-can-outline"
            color="grey"
            @click="deleteAllOrders()"
            size="small" />
    </header>

    <div v-if="productList && productList.length">
        <template v-for="(product, index) in productList" :key="`product${index}`">
            <desktopCartProductCard :content="product" />

            <v-divider v-if="index + 1 < productList.length" color="grey"/>
        </template>
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
        productList: Array,
    },

    methods: {
        /**
         * Delete all orders from vuex
         */
        deleteAllOrders() {
            this.$store.commit('set_basket', []);
        }
    }
}
</script>
