<template>
<v-row class="add-to-basket add-to-basket--pdp ma-0">
    <v-col
        xs="4"
        :sm="smCols[0]"
        :md="mdCols[0]"
        :class="revers === true ? 'revers' : ''"
        class="d-flex justify-end pa-1 align-center">
        <div class="add-to-basket__price-info">
            <template v-if="content?.stock">
                <template v-if="content?.discount">
                    <div class="d-flex align-center justify-space-between">


                        <span class="product-card__price-info__discount t11 w500 ml-2" :class="isPdp ? true : false">{{content.discount_percent}} %</span>
                        <span v-if="content?.site_price" class="t19 w400 text-pink-darken-1 product-card__price-info__price product-card__price-info__price--new">
                            {{ splitChar(Number(String(content?.site_price).slice(0, -1))) }}
                            <span class="t12 w300 text-pink-darken-1 currency">تومان</span>
                        </span>
                    </div>

                    <div class="d-flex align-center justify-end">
                        <span v-if="!isPdp" class="product-card__price-info__discount t11 w500 ml-2 xs-show">{{content.discount_percent}} %</span>
                        <span v-if="content?.customer_price" class="t12 w400 text-grey product-card__price-info__price product-card__price-info__price--old">
                            <span>{{ splitChar(Number(String(content?.customer_price).slice(0, -1))) }}</span>
                            <span class="t10 w300 text-grey currency">تومان</span>
                        </span>
                    </div>
                    
                </template>

                <template v-else>
                    <span v-if="content?.customer_price" class="t19 w400 text-grey-darken-2 product-card__price-info__price product-card__price-info__price--main">{{ splitChar(Number(String(content?.customer_price).slice(0, -1))) }}</span>
                    <span class="t12 w300 text-grey-darken-2 currency">تومان</span>
                </template>
            </template>

            <template v-else>
                <span class="t20 w400 text-grey-darken-2 product-card__price-info__price product-card__price-info__price--main">ناموجود</span>
            </template>
        </div>
    </v-col>
    <v-col
        v-if="content?.stock"
        xs="8"
        :sm="smCols[1]"
        :md="mdCols[1]"
        class="d-flex justify-end pa-1">
        <template v-if="count === 0 || notSelected">
            <v-btn
                @click="addToCard(content?.id)"
                height="44"
                :loading="loadingFirstAddBasket"
                title="افزودن به سبد"
                class="btn btn--submit">
                افزودن به سبد خرید

            </v-btn>
        </template>
        <template v-else>
            <div class="product-card__product-count bg-transparent">
               <template v-if="!loadingAddBasket">
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
               </template>

               <template v-else>
                  <v-btn variant="plain" :loading="loadingAddBasket"></v-btn>
               </template>
            </div>
        </template>
    </v-col>
</v-row>
</template>

<script>
import Basket from '@/composables/Basket.js'
export default {
    setup(){
      const userToken = useCookie('userToken')
      const randomNumberForBasket = useCookie('randomNumberForBasket')
      const runtimeConfig = useRuntimeConfig()
      const  {addToBasket ,deleteShpsBasket , beforeAuthAddToBasket, loadingAddBasket, count, loadingFirstAddBasket} = new Basket()
      return {addToBasket , deleteShpsBasket , userToken , runtimeConfig , randomNumberForBasket , beforeAuthAddToBasket, loadingAddBasket,
        count, loadingFirstAddBasket}
    },

    data() {
        return {
            loading: false,
            notSelected: false,
            reloadingPage: false,
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
        revers: Boolean,

        /**
         * Product details
         * For Seo
         */
        productDetails: Object | String,

        /**
         * Product Category
         * For seo
         */
        productCategory: String,
        isPdp:false
    },

    computed: {
        userBasket() {
            try {
                const basket = this.$store.getters['get_basket']
                
                const data = basket?.data?.data?.details.find(item => item?.shps?.id === this.content?.id)

                if(!data){
                    this.notSelected = true;
                    this.count = 0;
                }else{
                    this.notSelected = false
                    this.count = data?.count;
                }

                return basket ?.data ?.data
            } catch (e) {
                return null
            }
        }
    },

    methods: {
        /**
         * Add to card
         * @param {*} id 
         */
        async addToCard(id) {
            if (this.userToken){
                this.addToBasket(id , this.count, 'increase', false, this.productDetails, this.content)
            }

            else{
                if (this.randomNumberForBasket && this.randomNumberForBasket != "") {
                    this.beforeAuthAddToBasket(id , this.count ,this.randomNumberForBasket, 'increase',false, this.productDetails, this.content)
                }
                else{
                    const randomNumber = this.createRandomNumber()
                    this.randomNumberForBasket = randomNumber
                    this.beforeAuthAddToBasket(id , this.count , randomNumber.toString(), 'increase',false, this.productDetails, this.content)
                }
            }

            this.reloadingPage = true
        },

        createRandomNumber(){
          let result = '';
          for(let i = 0; i < 20; i++) {
            result += Math.floor(Math.random() * 10); // generates a random integer between 0 and 9
          }
          return result
        },

        /**
         * Increase count of product
         */
        increaseCount() {
            if (this.userToken){
                this.addToBasket(this.content?.id  , this.count, 'increase', false, this.productDetails, this.content)
            }
            else{
                if (this.randomNumberForBasket && this.randomNumberForBasket != "") {
                    this.beforeAuthAddToBasket(this.content.id  , this.count ,this.randomNumberForBasket, 'increase',false, this.productDetails, this.content)
                }
                else{
                    const randomNumber = this.createRandomNumber()
                    this.randomNumberForBasket = randomNumber
                    this.beforeAuthAddToBasket(this.content?.id  , this.count , randomNumber.toString(), 'increase',false, this.productDetails, this.content)
                }
            }
        },

        /**
         * Decrease count of product
         */
        decreaseCount() {
            if (this.count > 0) {
                if (this.count === 1) {
                    this.deleteShpsBasket(this.content?.id, this.productDetails, this.content)
                }
                else{
                  if (this.userToken){
                    this.addToBasket(this.content?.id  , this.count, 'decrease',false, this.productDetails, this.content)
                  }
                  else{
                    if (this.randomNumberForBasket && this.randomNumberForBasket != "") {
                      this.beforeAuthAddToBasket(this.content?.id  , this.count ,this.randomNumberForBasket, 'decrease',false, this.productDetails, this.content)
                    }
                    else{
                      const randomNumber = this.createRandomNumber()
                      this.randomNumberForBasket = randomNumber
                      this.beforeAuthAddToBasket(this.content?.id  , this.count , randomNumber.toString(), 'decrease',false, this.productDetails, this.content)
                    }
                  }
                }

            }
        },
    },

    watch:{
        content(val){
            if (this.userToken){
                if (val.in_basket > 0) {
                    this.count = val.in_basket
                }
            }else{
                const pageSlug = this.$route.params.slug;
                if(this.userBasket !== null){
                    const productInBasket = this.userBasket?.details.find(element => element?.shps?.sku?.slug === pageSlug)
                    if (productInBasket) {
                        this.count = productInBasket.count
                    }
                }
            }

        },

        userBasket(newVal){
            if(newVal && newVal.details && newVal.details.length){
                const data = newVal.details.find(item => item?.shps?.id === this.content?.id)
                
                if(!data){
                    this.notSelected = true;
                    this.count = 0;
                }else{
                    this.notSelected = false
                    this.count = data.count;
                }
            }else{
                this.notSelected = true;
                this.count = 0;
            }
        },

        count(newVal,oldVal){
            this.reloadingPage = true
        }
    },
}
</script>

<style scoped lang="scss">
@import '~/assets/scss/components/general/product-card.scss';

.revers {
    order: 1 !important
}

.add-to-basket--pdp{
    position: relative;

    .product-card__price-info__discount{
        border-radius:5px !important;
        font-size: 13px !important;
        padding: 4px 7px !important;
        font-variation-settings: "wght" 700 !important;
        position: unset !important;
    }
}
</style>
