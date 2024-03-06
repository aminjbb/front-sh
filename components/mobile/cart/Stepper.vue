<template lang="">
<header class="v-user__mobile-page-head xs-show justify-space-between">
    <div class="d-flex align-center">
        <a href="/" class="ml-3">
            <v-icon icon="mdi-arrow-right" color="grey-darken-3" />
        </a>
        <span class="grey-darken-3 t14 number-font">
            <template v-if="activeStep - 1 === 0">
                سبد خرید ({{skuCount}} کالا)
            </template>
            <template v-else>
                {{ steps[activeStep - 1] }}
            </template>
        </span>
    </div>

    <v-icon v-if="activeStep - 1 === 0" icon="mdi-trash-can-outline" color="grey" @click="deleteAllOrders()" size="small" />
</header>

<div class="stepper__content">
    <template v-if="activeStep === 1">
        <template v-if="screenType === 'mobile'">
            <template v-for="(item, index) in data.details" :key="`header-product${index}`">
                <mobileCartProductCard :content="item" />

                <v-divider v-if="index + 1 < data.details.length" color="grey" />
            </template>
        </template>

        <template v-if="screenType === 'tablet'">
            <desktopCartSkuListStep :count="dataCount" :productList="data.details" />
        </template>
    </template>

    <template v-if="activeStep === 2">
        <mobileCartSendingInformationAddress @selectedAddress="getAddress" :userDetail="userDetail" />
        <mobileCartSendingInformationTime @selectedDate="getTime" @selectedWay="getWay" />
    </template>

    <template v-if="activeStep === 3">
        <desktopCartPaymentStep ref="paymentStep" @selectedPayment="getPayment" @setDiscountCode="getDiscountCode" :paymentMount="data.paid_price" @deleteBasketVoucher="deleteBasketVoucher" />
    </template>

    <template v-if="activeStep === 4">
        <desktopCartLastStep />
    </template>
</div>

<v-divider v-if="activeStep !== 4" color="grey-lighten-1" class="my-3" />

<v-card v-if="activeStep !== 4" class="px-3 mobile-pa-0 mobile-no-border pb-10 cart-payment-details">
    <div class="d-flex align-center justify-space-between mb-3">
        <span class="t12 w400 text-grey-darken-1">مبلغ قابل پرداخت:</span>
        <span class="t16 w400 text-grey-darken-3 number-font">
            <template v-if="voucher && voucher.total_price && voucher.paid_price">
                {{ splitChar(Number(String(voucher.paid_price + voucher.sending_price).slice(0, -1))) }}
            </template>

            <template v-else>
                {{ splitChar(Number(String(data.paid_price + data.sending_price).slice(0, -1))) }}
            </template>
            <span class="t12 w400 text-grey-darken-3">تومان</span>
        </span>
    </div>

    <div v-if="data.sending_price || voucher.sending_price" class="d-flex align-center justify-space-between mb-3">
        <span class="t12 w400 text-grey-darken-1">هزینه ارسال:</span>
        <span class="t16 w400 text-grey-darken-3 number-font">
            <template v-if="voucher && voucher.sending_price">
                {{ splitChar(Number(String(voucher.sending_price).slice(0, -1))) }}
            </template>

            <template v-else>
                {{ splitChar(Number(String(data.sending_price).slice(0, -1))) }}
            </template>
            <span class="t12 w400 text-grey-darken-3">تومان</span>
        </span>
    </div>

    <div class="d-flex align-center justify-space-between mb-3">
        <span class="t12 w400 text-grey-darken-1">مجموع قیمت کالاها:</span>
        <span class="t16 w400 text-grey-darken-3 number-font">
            <template v-if="voucher && voucher.total_price">
                {{ splitChar(Number(String(voucher.total_price).slice(0, -1))) }}
            </template>
            <template v-else>
                {{ splitChar(Number(String(data.total_price).slice(0, -1))) }}
            </template>
            <span class="t12 w400 text-grey-darken-3">تومان</span>
        </span>
    </div>

    <div class="d-flex align-center justify-space-between mb-3">
        <span class="t12 w400 text-success">سود شما:</span>
        <span class="t16 w400 text-success number-font">
            <template v-if="voucher && voucher.total_price && voucher.paid_price">
                {{ splitChar(Number(String(voucher.total_price - voucher.paid_price).slice(0, -1))) }}
            </template>
            <template v-else>
                {{ splitChar(Number(String(data.total_price - data.paid_price).slice(0, -1))) }}
            </template>
            <span class="t12 w400 text-success">تومان</span>
        </span>
    </div>

    <v-divider color="grey-lighten-1" class="mb-3" />

    <p class="t12 w400 text-grey-darken-1 bg-grey-lighten-4 pa-2 mb-2">
        هزینه ارسال پس از انتخاب آدرس به مبلغ قابل پرداخت افزوده خواهد شد.
    </p>

    <p class="t12 w400 text-deep-purple bg-deep-purple-lighten-5 pa-2">
        کالاهای موجود در سبد خرید شما رزرو نشده‌اند و در صورت اتمام موجودی از سبد خرید حذف خواهند شد.
    </p>
</v-card>

<div v-if="activeStep !== 4" class="cart-mobile-stepper">
    <div class="d-flex align-center justify-space-between">
        <span class="t12 w400 text-grey-darken-1">جمع قابل پرداخت:</span>
        <span class="t16 w400 text-grey-darken-3 number-font">
            <template v-if="voucher && voucher.paid_price">
                {{ splitChar(Number(String(voucher.paid_price + voucher.sending_price).slice(0, -1))) }}
            </template>

            <template v-else>
                {{ splitChar(Number(String(data.paid_price + data.sending_price).slice(0, -1))) }}
            </template>
            <span class="t11 w400 text-grey-darken-3">تومان</span></span>
    </div>

    <div>
        <v-btn @click="nextStep()" height="44" :title="buttonText[activeStep - 1]" class="btn btn--submit w-100 mt-3">
            {{buttonText[activeStep- 1]}}
        </v-btn>
    </div>
</div>
</template>

<script>
import Basket from '@/composables/Basket.js'

export default {
    data() {
        return {
            steps: [
                'مشاهده سبد خرید',
                'تکمیل اطلاعات ارسال',
                'انتخاب روش پرداخت',
                'اتمام خرید'
            ],
            screenType: null,
            activeStep: 1,
            profit: 0,
            buttonText: [
                'تایید و تکمیل سفارش',
                'تایید اطلاعات ارسال',
                'پرداخت'
            ],
            activeButton: false,
            userDetail: null,
        }
    },

    props: {
        /**
         * Basket data
         */
        data: Object
    },

    computed: {
        orderSendingMethod() {
            return this.$store.getters['get_orderSendingMethod']
        },

        orderPaymentMethod() {
            return this.$store.getters['get_orderPayMethod']
        },

        orderAddressId() {
            return this.$store.getters['get_orderAddress']
        },

        dataCount() {
            try {
                return this.data.details.length
            } catch (e) {
                return 0
            }
        }
    },

    setup() {
      const userToken = useCookie('userToken')
        const {
            deleteVoucherFromBasket,
            calculateSendingPrice,
            calculateVoucher,
            createOrder,
            voucher
        } = new Basket()
        return {
            deleteVoucherFromBasket,
            calculateSendingPrice,
            calculateVoucher,
            createOrder,
            voucher,
            userToken
        }
    },

    methods: {
        nextStep() {
            if (this.activeStep < 5) {
                if (this.activeStep === 2 || this.activeStep === 3) {
                    const text = this.activeStep === 2 ? 'آدرس تحویل گیرنده انتخاب نشده است.' : this.activeStep === 3 ? 'روش پرداخت مورد نظر خود را انتخاب کنید.' : '';

                    if (!this.activeButton) {
                        useNuxtApp().$toast.error(text, {
                            rtl: true,
                            position: 'top-center',
                            theme: 'dark'
                        });
                    } else {
                        if (this.activeStep === 3) {
                            this.createOrder(this.orderSendingMethod, '', this.orderAddressId.id, this.orderPaymentMethod)
                        } else {
                            this.activeStep++;
                        }
                    }
                } else {
                  if (this.userToken){
                    this.activeStep++;
                  }
                  else{
                    localStorage.setItem('returnPathAfterLogin' , this.$route.fullPath)
                    this.$router.push('/login')
                  }
                }

                this.activeButton = false;
            }
        },

        /**
         * fetch user data
         */
        async fetchUserProfile() {
            try {
                const response = await auth.getUserProfile(this.userToken)
                this.userDetail = response.data;
            } catch (error) {
                // Handle errors
            }
        },

        /**
         * Selected address from SendingInformationAddress component
         * @param {*} address 
         */
        getAddress(address) {
            if (address && address !== false) {
                this.$store.commit('set_orderAddress', address)
                this.activeButton = true;
            } else {
                this.$store.commit('set_orderAddress', null)
            }
        },

        /**
         * Selected way from SendingInformationTime component
         * @param {*} way 
         */
        getWay(way) {
            if (way) {
                this.$store.commit('set_orderSendingMethod', way)
                this.calculateSendingPrice(this.orderAddressId.id, way)
            } else {
                this.$store.commit('set_orderSendingMethod', null)
            }
        },

        /**
         * Selected time from SendingInformationTime component
         * @param {*} arr 
         */
        getTime(arr) {
            //TODO: Add set time to cart
            this.activeButton = true;
        },

        /**
         * Selected address from SendingInformationAddress component
         * @param {*} id 
         */
        getPayment(id) {
            this.$store.commit('set_orderPayMethod', id)
            this.activeButton = true;
        },

        /**
         * Delete all orders from vuex
         */
        deleteAllOrders() {
            this.$store.commit('set_basket', []);
        },

        /**
         * Get discount code
         * @param {*} id 
         */
        getDiscountCode(code) {
            this.calculateVoucher(code);
        },

        /**
         * Delete voucher from basket
         */
         deleteBasketVoucher(active){
            if(active){
                this.deleteVoucherFromBasket();
            }
        }
    },

    beforeMount() {
        this.fetchUserProfile()
    },

    watch: {
        voucher(newVal) {
            if (newVal && newVal.paid_price) {
                this.$refs.paymentStep.deleteVoucher = true;
            } else {
                this.$refs.paymentStep.deleteVoucher = false;
            }
        }
    },

    mounted() {
        /**
         * Check screen size
         */
        window.innerWidth <= 540 ? this.screenType = 'mobile' : 540 < window.innerWidth <= 768 ? this.screenType = 'tablet' : this.screenType = 'desktop';

        this.$store.commit('set_orderAddress', null);
        this.$store.commit('set_orderSendingMethod', null);
        this.$store.commit('set_orderPayMethod', null);

        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (token) {
            this.activeStep = 4;
        }
    },
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/tools/bp";

.cart-payment-details {
    padding-bottom: 100px !important;
}

.cart-mobile-stepper {
    border-radius: 8px 8px 0px 0px;
    background: #FFF;
    box-shadow: 0px 0px 15px 0px rgba(89, 89, 89, 0.50);
    display: flex;
    align-items: center;
    position: fixed;
    right: 0;
    bottom: 55px;
    width: 100%;
    padding: 16px 36px;

    @include gbp(0, 540) {
        flex-direction: column;
    }

    >div:first-child {
        width: 100%;

        @include gbp(540, 768) {
            order: 1;
            width: 20%;
            flex-direction: column;
        }
    }

    >div:last-child {
        width: 100%;

        @include gbp(541, 768) {
            width: 80%;
            margin-left: 15px;
        }
    }

}
</style>
