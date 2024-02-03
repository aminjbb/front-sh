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
                {{steps[activeStep - 1]}}
            </template>
        </span>
    </div>

    <v-icon
        v-if="activeStep - 1 === 0"
        icon="mdi-trash-can-outline"
        color="grey"
        @click="deleteAllOrders()"
        size="small" />
</header>

<div class="stepper__content">
    <template v-if="activeStep === 1">
        <template v-if="screenType === 'mobile'">
            <template v-for="(item, index) in data.shps" :key="`header-product${index}`">
                <mobileCartProductCard :content="item" />

                <v-divider v-if="index + 1 < data.shps.length" color="grey" />
            </template>
        </template>

        <template v-if="screenType === 'tablet'">
            <desktopCartSkuListStep :count="data.count" :productList="data" />
        </template>
    </template>

    <template v-if="activeStep === 2">
        <mobileCartSendingInformationAddress @selectedAddress="getAddress" :userDetail="userDetail" />
        <mobileCartSendingInformationTime @selectedDate="getTime" @selectedWay="getWay" />
    </template>

    <template v-if="activeStep === 3">
        <desktopCartPaymentStep @selectedPayment="getPayment" />
    </template>

    <template v-if="activeStep === 4">
        <desktopCartLastStep />
    </template>
</div>

<v-divider
    v-if="activeStep !== 4"
    color="grey-lighten-1"
    class="my-3" />

<v-card v-if="activeStep !== 4" class="px-3 mobile-pa-0 mobile-no-border pb-10 cart-payment-details">
    <div class="d-flex align-center justify-space-between mb-3">
        <span class="t12 w400 text-grey-darken-1">مبلغ قابل پرداخت:</span>
        <span class="t16 w400 text-grey-darken-3 number-font">{{splitChar(data.paid_price)}} <span class="t12 w400 text-grey-darken-3">تومان</span></span>
    </div>

    <div v-if="shippingCost" class="d-flex align-center justify-space-between mb-3">
        <span class="t12 w400 text-grey-darken-1">هزینه ارسال:</span>
        <span class="t16 w400 text-grey-darken-3 number-font">{{splitChar(shippingCost)}} <span class="t12 w400 text-grey-darken-3">تومان</span></span>
    </div>

    <div class="d-flex align-center justify-space-between mb-3">
        <span class="t12 w400 text-grey-darken-1">مجموع قیمت کالاها:</span>
        <span class="t16 w400 text-grey-darken-3 number-font">{{splitChar(data.total_price)}} <span class="t12 w400 text-grey-darken-3">تومان</span></span>
    </div>

    <div class="d-flex align-center justify-space-between mb-3">
        <span class="t12 w400 text-success">سود شما:</span>
        <span class="t16 w400 text-success number-font">{{splitChar(data.total_price - data.paid_price)}} <span class="t12 w400 text-success">تومان</span></span>
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
        <span class="t16 w400 text-grey-darken-3 number-font">{{splitChar(data.paid_price)}} <span class="t11 w400 text-grey-darken-3">تومان</span></span>
    </div>

    <div>
        <v-btn
            @click="nextStep()"
            height="44"
            :title="buttonText[activeStep - 1]"
            class="btn btn--submit w-100 mt-3">
            {{buttonText[activeStep- 1]}}
        </v-btn>
    </div>
</div>
</template>

<script>
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
                        this.activeStep++;
                    }
                } else {
                    this.activeStep++;
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
         * @param {*} id 
         */
        getAddress(id) {
            console.log("🚀 ~ getAddress ~ id:", id)
            //TODO: Add address time to cart method
            this.activeButton = true;
        },

        /**
         * Selected way from SendingInformationTime component
         * @param {*} way 
         */
        getWay(way) {
            console.log("🚀 ~ getWay ~ way:", way)
            //TODO: Add set way to cart method
        },

        /**
         * Selected time from SendingInformationTime component
         * @param {*} arr 
         */
        getTime(arr) {
            console.log("🚀 ~ getTime ~ arr:", arr)
            //TODO: Add set time to cart
            this.activeButton = true;
        },

        /**
         * Selected address from SendingInformationAddress component
         * @param {*} id 
         */
        getPayment(id) {
            console.log("🚀 ~ getPayment ~ id:", id)
            //TODO: Add set payment to cart method
            this.activeButton = true;
        },

        /**
         * Delete all orders
         */
        deleteAllOrders(){
            //TODO: Write method
        }
    },

    beforeMount() {
        this.fetchUserProfile()
    },

    mounted() {
        /**
         * Check screen size
         */
        window.innerWidth <= 540 ? this.screenType = 'mobile' : 540 < window.innerWidth < 768 ? this.screenType = 'tablet' : this.screenType = 'desktop';
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
