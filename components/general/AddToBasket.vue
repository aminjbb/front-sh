<template>
<v-row class="add-to-basket ma-0">
    <v-col
        xs="4"
        :sm="smCols[0]"
        :md="mdCols[0]"
        :class="revers === true ? 'revers' : ''"
        class="d-flex justify-end pa-1 align-center">
        <div class="add-to-basket__price-info">
            <template v-if="content.stock">
                <template v-if="content.discount">
                    <div class="d-flex align-center justify-space-between">
                        <span class="product-card__price-info__discount t11 w500 ml-2">{{content.discount_percent}} %</span>
                        <span v-if="content.site_price" class="t19 w400 text-pink-darken-1 product-card__price-info__price product-card__price-info__price--new">
                            {{splitChar(content.site_price)}}
                            <span class="t12 w300 text-pink-darken-1 currency">تومان</span>
                        </span>
                    </div>

                    <span v-if="content.customer_price" class="t12 w400 text-grey product-card__price-info__price product-card__price-info__price--old">
                        <span>{{splitChar(content.customer_price)}}</span>
                        <span class="t10 w300 text-grey currency">تومان</span>
                    </span>
                </template>

                <template v-else>
                    <span v-if="content.customer_price" class="t19 w400 text-grey-darken-2 product-card__price-info__price product-card__price-info__price--main">{{splitChar(content.customer_price)}}</span>
                    <span class="t12 w300 text-grey-darken-2 currency">تومان</span>
                </template>
            </template>

            <template v-else>
                <span class="t20 w400 text-grey-darken-2 product-card__price-info__price product-card__price-info__price--main">ناموجود</span>
            </template>
        </div>
    </v-col>
    <v-col
        xs="8"
        :sm="smCols[1]"
        :md="mdCols[1]"
        class="d-flex justify-end pa-1">
        <template v-if="count === 0">

            <v-btn
                @click="addToCard(content.id)"
                height="44"
                title="افزودن به سبد"
                class="btn btn--submit">
                افزودن به سبد خرید

            </v-btn>
        </template>
        <template v-else>
            <div class="product-card__product-count bg-transparent">
                <v-icon
                    icon="mdi-plus"
                    color="primary"
                    @click="increaseCount()" />
                <span class="t16 w300 text-primary number-font">
                    {{count}}
                </span>
                <v-icon
                    :icon="count === 1 ? 'mdi-trash-can-outline': 'mdi-minus'"
                    color="primary"
                    @click="decreaseCount()" />
            </div>
        </template>
    </v-col>
</v-row>
</template>

<script>
import axios from "axios";
import Basket from '@/composables/Basket.js'
export default {
    setup(){
      const  {addToBasket ,deleteShpsBasket} = new Basket()
      return {addToBasket , deleteShpsBasket}
    },

    data() {
        return {
            loading: false,
            count: 0,
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
        mdCols: {
            type: Array,
            default: ['12', '12']
        },
        /**
         * sm cols size
         */
        smCols: {
            type: Array,
            default: ['5', '7']
        },
        /**
         * Revers column
         */
        revers: Boolean
    },

    methods: {
        async addToCard(id) {
          this.count ++;
          this.addToBasket(id , this.count)
        },
        increaseCount() {
            if (this.count < this.content.order_limit) {
                this.count++;
                this.addToBasket(this.content.id , this.count )
            }
        },
        decreaseCount() {
            if (this.count > 0) {
                this.count--;
                if (this.count == 0) this.deleteShpsBasket(this.content.id)
                else this.addToBasket(this.content.id , this.count )
            }
            else{

            }
            
        },
    },

  watch:{
      content(val){
        if (val.in_basket > 0) this.count = val.in_basket
      }
  }

}
</script>

<style scoped>
@import '~/assets/scss/components/general/product-card.scss';

.revers {
    order: 1 !important
}
</style>
