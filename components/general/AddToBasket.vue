<template lang="">
<v-row class="add-to-basket ma-0">
    <v-col
        xs="6"
        :sm="smCols[0]"
        :md="mdCols[0]"
        :class="revers === true ? 'revers' : ''"
        class="d-flex justify-end pa-1">
        <div class="add-to-basket__price-info">
            <template v-if="content.discount">
                <div class="d-flex align-center justify-space-between">
                    <span class="product-card__price-info__discount t11 w500 ml-2">{{content.discount}}</span>
                    <span v-if="content.customer_price" class="t19 w400 text-pink-darken-1 product-card__price-info__price product-card__price-info__price--new">
                        {{splitChar(content.customer_price)}}
                        <span class="t12 w300 text-pink-darken-1 currency">تومان</span>
                    </span>
                </div>

                <span v-if="content.site_price" class="t12 w400 text-grey product-card__price-info__price product-card__price-info__price--old">
                    <span>{{splitChar(content.site_price)}}</span>
                    <span class="t10 w300 text-grey currency">تومان</span>
                </span>
            </template>

            <template v-else>
                <span v-if="content.customer_price" class="t19 w400 text-grey-darken-2 product-card__price-info__price product-card__price-info__price--main">{{splitChar(content.customer_price)}}</span>
                <span class="t12 w300 text-grey-darken-2 currency">تومان</span>
            </template>
        </div>
    </v-col>
    <v-col
        xs="6"
        :sm="smCols[1]"
        :md="mdCols[1]"
        class="d-flex justify-end pa-1">
        <v-btn
            :loading="loading"
            @click="addToCard()"
            height="44"
            title="افزودن به سبد"
            class="btn btn--submit">
            افزودن به سبد خرید
        </v-btn>
    </v-col>
</v-row>
</template>

<script>
export default {
    data() {
        return {
            loading: false,
        }
    },

    props: {
        /**
         * content
         */
        content: Object,
        /**
         * md cols size
         */
        mdCols:{
            type:Array,
            default:['12','12']
        },
        /**
         * sm cols size
         */
         smCols:{
            type:Array,
            default:['5','7']
        },
        /**
         * Revers column
         */
        revers:Boolean
    },

    methods: {
        addToCard() {
            this.loading = true;
            //TODO: write add to basket method
        }
    }
}
</script>

<style scoped>
@import '~/assets/scss/components/general/product-card.scss';

.revers{
    order:1 !important
}
</style>
