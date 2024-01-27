<template lang="">
<v-row
    v-if="seller"
    class="seller-card ma-0 pa-3"
    :class="selected === true ? 'selected': ''">
    <v-col
        cols="12"
        md="3"
        class="py-0 d-flex align-center seller-card__seller-name">
        <div v-if="seller.name" class="d-flex align-center">
            <v-icon
                :icon="selected === true ? 'mdi-account-check-outline' : 'mdi-account-outline'"
                :color="selected === true ? 'green' :'grey'"
                class="t15 ml-1" />
            <span class="16 w400 text-grey-darken-4 ml-1">فروشگاه {{seller.name}}</span>
        </div>
    </v-col>

    <v-col
        cols="12"
        md="4"
        class="py-0 d-flex align-center">
        <div class="d-flex align-center seller-card__date">
            <span class="t14 w400 text-grey ml-1">ارسال: </span>

            <span class="t14 w400 text-grey-darken-1 number-font">
                <template v-if="seller.stock === true">
                    موجود در انبار شاواز
                </template>
                <template v-else>
                    کالا نزد فروشنده
                </template>
                (ارسال از 3 روز آینده)
            </span>
        </div>
    </v-col>

    <v-col
        cols="12"
        md="5"
        class="py-0">
        <generalAddToBasket
            :content="seller"
            :revers="revers"
            :mdCols="['6','6']"
            :smCols="['4','8']" />
    </v-col>
</v-row>
</template>

<script>
export default {
    props: {
        /**
         * seller
         */
        seller: Object,
        /**
         * If seller selected active this prop
         */
        selected: Boolean,

        /**
         * Active add to basket revers prop
         */
        revers: Boolean
    }
}
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";

.seller-card {

    &.selected,
    &:hover {
        background-color: #FBE9F3;
    }

    .v-btn {
        height: 36px !important;
    }

    &__seller-name {
        @include gbp(0, 768) {
            margin-bottom: 15px;
        }
    }

    &__date {
        @include gbp(0, 768) {
            margin-bottom: 15px;
            border-bottom: 0.5px solid #E0E0E0;
            width: 100%;
            padding-bottom: 20px;
        }
    }

    .v-btn {
        @include gbp(0, 768) {
            width: 100% !important;
        }
    }
}
</style>
