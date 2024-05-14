<template>
<v-card class="pa-5 mobile-pa-0 mobile-no-border">
    <header class="d-flex align-center justify-space-between xs-hide">
        <div class="d-flex align-center">
            <v-icon icon="mdi-cart-outline" color="primary" size="small" class="ml-2" />
            <span class="number-font t16 w400 text-grey-darken-3">سبد خرید ({{count}} کالا) </span>
        </div>

        <v-icon icon="mdi-trash-can-outline" color="grey" @click="removeProductFromBasket()" size="small" />
    </header>

    <div v-if="productList && productList.length">
        <template v-for="(product, index) in productList" :key="`product${index}`">
            <desktopCartProductCard noLazy :content="product" />

            <v-divider v-if="index + 1 < productList.length" color="grey" />
        </template>
    </div>
</v-card>

<generalModalsDelete ref="deleteAllProduct" title="حذف کالا از سبد" text="آیا از حذف تمام کالاها از سید خرید اطمینان دارید؟" submitText="حذف" @removeProduct="deleteAllOrders" />
</template>

<script>
import axios from "axios";

export default {
    setup() {
        const runtimeConfig = useRuntimeConfig()
        const userToken = useCookie('userToken');
        const randomNumberForBasket = useCookie('randomNumberForBasket')
        return {
            runtimeConfig,
            randomNumberForBasket,
            userToken
        }
    },
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
         * Remove all product accept
         */
        removeProductFromBasket() {
            this.$refs.deleteAllProduct.dialog = true;
        },

        /**
         * Delete all orders from vuex
         */
        deleteAllOrders() {
            let endpoint = ''
            if (this.randomNumberForBasket && this.randomNumberForBasket != "") {
                endpoint = `/basket/crud/delete?identifier=${this.randomNumberForBasket}`
            } else {
                endpoint = `/basket/crud/delete`
            }
            axios.delete(this.runtimeConfig.public.apiBase + endpoint, {
                    headers: {
                        Authorization: `Bearer ${this.userToken}`,
                    },

                }, )
                .then((response) => {
                    this.$store.commit('set_basket', '')
                    if (this.randomNumberForBasket && this.randomNumberForBasket != "") {
                        this.randomNumberForBasket = ''
                    }
                    this.$refs.deleteAllProduct.dialog = false;
                    this.$refs.deleteAllProduct.loading = false;
                })
                .catch((err) => {

                }).finally(() => {
                   
                })
        }
    },
}
</script>
