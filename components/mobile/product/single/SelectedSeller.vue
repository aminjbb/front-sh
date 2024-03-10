<template>
<div v-if="content" class="selected-seller">
    <div class="d-flex align-center mb-3">
        <span class="t14 w400 text-grey-darken-3 ml-1">فروشگاه:</span>

        <span v-if="content.seller_shopping_name" class="t12 w400 text-grey-darken-1">
            <v-icon
                icon="mdi-account-outline"
                color="grey-darken-1"
                class="t15" />
            {{content.seller_shopping_name}}
        </span>
    </div>

    <div v-if="content.stock" class="d-flex align-center mb-3">
        <span class="t12 w400 text-grey-darken-1 ml-1">ارسال از: </span>

        <span class="t12 w400 text-grey-darken-1 number-font">
            <template v-if="content.stock === true">
                موجود در انبار شاواز
            </template>
            <template v-else>
                کالا نزد فروشنده
            </template>
        </span>
    </div>

    <mobileProductSingleSelectSellerModal :sellers="sellers" :productId="productId"/>
</div>
</template>

<script>
export default {
    props: {
        /**
         * Content
         */
        content: Object,

        /**
         * Seller list
         */
        sellers: Array,

        /**
         * product id
         */
        productId: String,
    }
}
</script>
