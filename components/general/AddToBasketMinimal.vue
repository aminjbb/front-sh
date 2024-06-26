<template>
<v-row class="add-to-basket add-to-basket--minimal ma-0">
    <div
        v-if="content?.stock"
        class="d-flex justify-end pa-1">
        <template v-if="count === 0 || notSelected">

            <v-btn
                @click="addToCard(content?.shps_id)"
                height="24"
                icon="mdi-plus-box"
                :loading="loadingFirstAddBasket"
                color="primary"
                class="btn btn--submit minimal">
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
    </div>
    <div v-else>
        <v-btn
            height="24"
            icon="mdi-plus-box-outline"
            disabled
            class="btn minimal"
            color="grey">
        </v-btn>
    </div>
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
         * Product Category
         * For seo
         */
        productCategory: String,
    },

    computed: {
        productDetails(){
            const obj ={
                brand_name: this.content.brand_name,
                label: this.content.label,
                id: this.content.shps_id,
            }

            return obj;
        },

        userBasket() {
            try {
                const basket = this.$store.getters['get_basket']
                
                const data = basket?.data?.data?.details.find(item => item?.shps?.id === this.content?.shps_id)

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
                this.addToBasket(this.content?.shps_id  , this.count, 'increase', false, this.productDetails, this.content)
            }
            else{
                if (this.randomNumberForBasket && this.randomNumberForBasket != "") {
                    this.beforeAuthAddToBasket(this.content.id  , this.count ,this.randomNumberForBasket, 'increase',false, this.productDetails, this.content)
                }
                else{
                    const randomNumber = this.createRandomNumber()
                    this.randomNumberForBasket = randomNumber
                    this.beforeAuthAddToBasket(this.content?.shps_id  , this.count , randomNumber.toString(), 'increase',false, this.productDetails, this.content)
                }
            }
        },

        /**
         * Decrease count of product
         */
        decreaseCount() {
            if (this.count > 0) {
                if (this.count === 1) {
                    this.deleteShpsBasket(this.content?.shps_id, this.productDetails, this.content)
                }
                else{
                  if (this.userToken){
                    this.addToBasket(this.content?.shps_id  , this.count, 'decrease',false, this.productDetails, this.content)
                  }
                  else{
                    if (this.randomNumberForBasket && this.randomNumberForBasket != "") {
                      this.beforeAuthAddToBasket(this.content?.shps_id  , this.count ,this.randomNumberForBasket, 'decrease',false, this.productDetails, this.content)
                    }
                    else{
                      const randomNumber = this.createRandomNumber()
                      this.randomNumberForBasket = randomNumber
                      this.beforeAuthAddToBasket(this.content?.shps_id  , this.count , randomNumber.toString(), 'decrease',false, this.productDetails, this.content)
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
                const data = newVal.details.find(item => item?.shps?.id === this.content?.shps_id)
                
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

<style lang="scss">
@import '~/assets/scss/components/general/product-card.scss';

.product-card .btn--submit.minimal,
.product-card .minimal.v-btn--disabled{
    font-size: 13px !important;
    height: 24px !important;
    width: 24px !important;
    border-radius: 0 !important;
    padding: 0 !important;
    border: 0 !important;

    &:hover{
        color: #D72685 !important;
        border-color: #D72685 !important;
    }

    .v-btn__underlay,
    .v-btn__overlay,
    .v-btn__content,
    &::after{
        background-color: none !important;
        background: none !important;
    }

    .v-icon{
        font-size:27px !important ;
    }
}

.add-to-basket--minimal{
    .product-card__product-count{
        width: 65px;
        height: 24px;
        border-color: #e0e0e0;

        span,
        .v-icon{
            font-size: 14px !important;
        }
    }
}
</style>
