<template>
<div class="header-basket" id="basket-header" :class="userBasket?.details && userBasket?.details.length ? 'header-basket--no-empty' : ''">
    <header class="header-basket__header d-flex align-center justify-space-between pr-4 py-2">
        <div class="d-flex align-center ">
            <a href="/user/dashboard" class="ml-3">
                <v-icon icon="mdi-cart-minus" color="grey" />
            </a>
            <span class="text-grey w400 t13 number-font">سبد خرید ({{userBasket && userBasket.details && userBasket.details.length > 0 ? userBasket?.details.length : 0}} کالا)</span>
        </div>

        <v-btn
            class="pa-0 text-none"
            @click="close()"
            color="grey-darken-1"
            width="50"
            variant="icon">
            <v-icon>mdi-close</v-icon>
        </v-btn>
    </header>

    <template v-if="userBasket && userBasket?.details && userBasket?.details.length">
        <div class="header-basket__content header-basket__content--no-empty">
            <div>
                <template v-for="(item, index) in userBasket.details" :key="`header-product${index}`">
                    <mobileCartProductCard :content="item" noSeller />

                    <v-divider v-if="index + 1 < userBasket.details.length" color="grey" />
                </template>
            </div>
        </div>

        <div class="header-basket__price">
            <div class="d-flex align-center justify-space-between">
                <span class="t14 w400 text-grey-darken-1">مبلغ قابل پرداخت:</span>
                <span class="t19 w400 text-grey-darken-3 number-font">{{ splitChar(Number(String(userBasket.paid_price).slice(0, -1))) }}<span class="t12 w400 text-grey-darken-3">تومان</span></span>
            </div>

            <p v-if="(userBasket.total_price - userBasket.paid_price) > 0" class="text-green t12 w400 pt-1 number-font">میزان سود شما از این خرید {{ splitChar(Number(String(userBasket.total_price - userBasket.paid_price).slice(0, -1))) }} می‌باشد.</p>

            <div class="d-flex align-center justify-center mt-5 w-100">
                <v-btn
                    href="/"
                    height="44"
                    title="مشاهده کالاهای بیشتر"
                    class="btn btn--submit ml-3 w-50">
                    مشاهده کالاهای بیشتر
                </v-btn>

                <v-btn
                    href="/cart"
                    height="44"
                    title="تکمیل سفارش"
                    class="btn btn--cancel w-50">
                    تکمیل سفارش
                </v-btn>
            </div>
        </div>
    </template>

    <div v-else class="header-basket__content header-basket__content--empty">
        <div class="d-flex flex-column justify-center align-center pt-15 pb-15">
            <div>
                <svgEmptyCart />
            </div>
            <h2 class="t13 w400 text-grey-darken-1 mt-5">سبد خرید شما خالی است!</h2>
            <v-btn
                href="/"
                title="مشاهده محصولات"
                class="mt-5 btn btn--cancel">
                مشاهده محصولات
            </v-btn>
        </div>

        <template v-if="isLogin">
            <div v-if="productUserHistory && productUserHistory.length" class="pa-3">
                <v-divider color="grey"/>
                <h5 class="t13 w500 text-grey-darken-1 mb-3 mt-4">بازدیدهای اخیر</h5>
                <v-row>
                    <v-col
                        v-for="(product, index) in productUserHistory.slice(0,6)"
                        :key="`product${index}`"
                        href=""
                        sm="6">
                        <generalProductSimpleCard :image="product?.image_url" :label="product?.label" :href="`/sku/${product.slug}`"/>
                    </v-col>
                </v-row>
            </div>
        </template>

        <template v-else>
            <div v-if="randomProducts && randomProducts.length" class="pa-3">
                <v-divider color="grey"/>
                <h5 class="t13 w500 text-grey-darken-1 mb-3 mt-4">پیشنهاد شاواز</h5>
                <v-row>
                    <v-col
                        v-for="(product, index) in randomProducts.slice(0,6)"
                        :key="`product${index}`"
                        href=""
                        sm="6">
                        <generalProductSimpleCard :image="product?.image_url" :label="product?.label" :href="`/sku/${product.slug}`"/>
                    </v-col>
                </v-row>
            </div>
        </template>
    </div>
</div>
</template>

<script>
import User from '@/composables/User.js'
export default {

    data() {
        return {
            isLogin :false,
        }
    },

    props: {
        /** user basket from vueX **/
        userBasket: Object,
        userData:Object,
    },

    setup() {
        const {
            getProductUserHistory,
            productUserHistory,
            getRandomProducts,
            randomProducts
        } = new User();

        return {
            getProductUserHistory,
            productUserHistory,
            getRandomProducts,
            randomProducts
        }
    },

    methods: {
        close() {
            document.getElementById('basket-header').classList.remove('show');
            document.body.classList.remove('active-basket');
        },

        /**
         * Close Header basket if I click in outside
         * @param {*} event 
         */
        closeDropDown(event) {
            if(this.$route.name !== 'login' && this.$route.name !== 'forgotPassword'){
                const basketHeader = document.getElementById('basket-header');
                const toggleBasket = document.getElementById('toggle-basket');

                if (!basketHeader.contains(event.target) && !event.target.closest('#toggle-basket')) {
                    basketHeader.classList.remove('show');
                    document.body.classList.remove('active-basket');
                }
            }
        }
},

    watch:{
        userBasket(newVal){
            if(newVal){
                if(newVal.details && newVal?.details.length === 0){
                    document.body.classList.remove('active-basket');
                }
            }
        },

        userData(newVal){
            if(newVal && newVal?.phone_number !== null){
                this.isLogin = true;
            }
        }
    },
 
    mounted(){
        document.addEventListener('click', this.closeDropDown);
        this.getProductUserHistory();
        this.getRandomProducts();
    },

    beforeDestroy() {
        document.removeEventListener('click', this.closeDropDown);
    },

}
</script>

<style lang="scss">
.header-basket {
    width: 358px;
    height: 80vh;
    border-radius: 0px 8px 8px 0px;
    background: #FFF;
    box-shadow: 0px 0px 15px 0px rgba(89, 89, 89, 0.50);
    position: fixed;
    left: 0;
    top: 0;
    overflow: hidden;
    z-index: 12;
    left:-358px;
    transition: all 0.5s ease;

    &--no-empty{
        padding-bottom: 145px;
    }

    &.show {
        transition: all 0.5s ease;
        left:0;
    }

    &__header {
        border-bottom: 1px solid #BDBDBD;
    }

    &__content {
        height: calc(100% - 53px);
        overflow: hidden;

        &--empty {
            >div:first-child {
                height: 287px;
            }

            >div:last-child {
                overflow-x: hidden;
                height: calc(100% - 284px);
                overflow-y: auto;

                &::-webkit-scrollbar {
                    width: 4px !important;
                }

                &::-webkit-scrollbar-track {
                    border-radius: 4px;
                    background-color: #EEEEEE;
                }

                &::-webkit-scrollbar-thumb {
                    border-radius: 4px;
                    background-color: #BDBDBD;
                }
            }

            .product-card--simple {
                border-radius: 8px;
                border: 1px solid var(--grey-grey-lighten-2, #E0E0E0);
                height: 100%;

                h3 {
                    text-align: right !important;
                    font-variation-settings: "wght"500 !important;
                }
            }
        }

        &--no-empty {
            overflow-x: hidden;
            height: calc(100% - 53px);
            overflow-y: auto;

            &::-webkit-scrollbar {
                width: 4px !important;
            }

            &::-webkit-scrollbar-track {
                border-radius: 4px;
                background-color: #EEEEEE;
            }

            &::-webkit-scrollbar-thumb {
                border-radius: 4px;
                background-color: #BDBDBD;
            }
        }
    }

    &__price {
        position: absolute;
        width: 100%;
        bottom: 0;
        right: 0;
        border-radius: 0px 0px 8px 0px;
        background: #FFF;
        box-shadow: 0px 0px 15px 0px rgba(89, 89, 89, 0.50);
        padding: 16px;
    }
}
</style>
