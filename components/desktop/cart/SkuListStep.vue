<template>
<v-card class="pa-5 mobile-pa-0 mobile-no-border">
    <header class="d-flex align-center justify-space-between mb-5 xs-hide">
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

    <div>
        <desktopCartProductCard
            v-if="productList && productList.length"
            v-for="(product, index) in productList"
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
        productList: Array,
    },

    methods:{
        /**
         * Delete all orders
         */
        deleteAllOrders(){
            //TODO: Write method
        }
    }
}
</script>
