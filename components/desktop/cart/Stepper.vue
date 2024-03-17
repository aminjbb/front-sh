<template>
<div class="stepper">
    <header class="stepper__header d-flex align-center w-100">
        <div v-for="(step, index) in steps" :key="`step${index}`" class="d-flex align-center cur-p" :class="index + 1 < steps.length ? 'flex-grow-1' : ''" @click="previousStep(index+1)">
            <div class="stepper__header__content">
                <v-badge :color="active[index+1] ? 'primary': previousSteps[index+1] ? 'grey-darken-3' : 'grey'" :content="index+1" class="ml-2 mr-2" @click="activeStep = index+1 " inline />
                <span class="t15 w400 pl-2" :class="active[index+1] ? 'text-primary': previousSteps[index+1] ? 'text-grey-darken-3' : 'text-grey'">{{ step }}</span>
            </div>

            <v-divider v-if="index + 1 < steps.length" color="grey" class="flex-grow-1" />
        </div>
    </header>

    <div class="stepper__content mt-7">
        <v-row v-if="activeStep !== 4">
            <v-col md="9">
                <template v-if="activeStep === 1">
                    <desktopCartSkuListStep :count="dataCount" :productList="data.details" />
                </template>

                <template v-if="activeStep === 2">
                    <desktopCartSendingInformationAddress @selectedAddress="getAddress" />

                    <generalNotification class="mb-3" borderColorCode="E91E63" color="pink" icon="mdi-alert-outline" text="کاربران عزیز، تمام سفارشات ثبت شده در بازه 1402/12/23 الی 1403/01/14، به ترتیب اولویت از 15 فروردین ارسال خواهد شد." />
                    <desktopCartSendingInformationTime v-if="orderAddressId" :sendingMethods="sendingMethods" @selectedDate="getTime" @selectedWay="getWay" />
                </template>

                <template v-if="activeStep === 3">
                    <desktopCartPaymentStep ref="paymentStep" @selectedPayment="getPayment" @setDiscountCode="getDiscountCode" :paymentMount="voucher && voucher?.paid_price ? voucher.paid_price + voucher.sending_price : data.paid_price + data.sending_price" @deleteBasketVoucher="deleteBasketVoucher" />
                    <generalModalsErrorOrder :orderSendingMethod="orderSendingMethod" :orderAddressId="orderAddressId" :orderPaymentMethod="orderPaymentMethod" />
                </template>
            </v-col>
            <v-col md="3">

                <v-card class="py-5 px-3">
                    <div class="d-flex align-center justify-space-between">
                        <span class="t14 w500 text-grey-darken-2">مبلغ قابل پرداخت:</span>
                        <span class="t24 w500 text-grey-darken-4 number-font">
                            <template v-if="voucher && voucher.paid_price">
                                {{ splitChar(Number(String(voucher.paid_price + voucher.sending_price).slice(0, -1))) }}
                            </template>

                            <template v-else>
                                {{ splitChar(Number(String(data.paid_price + data.sending_price).slice(0, -1))) }}
                            </template>

                            <span class="t12 w400 text-grey-darken-4">تومان</span>
                        </span>
                    </div>

                    <v-divider color="grey-lighten-1" class="my-3 cart-hr"/>

                    <div v-if="!freeDelivery && data.sending_price !== 0 && data.sending_price !== null" class="d-flex align-center justify-space-between mb-4">
                        <span class="t14 w400 text-grey-darken-1">هزینه ارسال:</span>
                        <span class="t16 w400 text-grey-darken-3 number-font">
                            <template v-if="voucher">
                              <span v-if="voucher.sending_price == 0"> رایگان</span>
                                <span v-else class="number-font">
                                    {{ splitChar(Number(String(voucher.sending_price).slice(0, -1))) }}
                                </span>
                                <span v-if="voucher.sending_price != 0" class="t12 w400 text-grey-darken-3">تومان</span>
                            </template>

                            <template v-else>
                                {{ splitChar(Number(String(data.sending_price).slice(0, -1))) }}
                               <span class="t12 w400 text-grey-darken-3">تومان</span>
                            </template>
                        </span>
                    </div>
                    <div v-if="freeDelivery" class="d-flex align-center justify-space-between mb-4">
                        <span class="t14 w400 text-grey-darken-1">هزینه ارسال:</span>
                        <span class="t16 w400 text-grey-darken-3 number-font">رایگان</span>
                    </div>

                    <div class="d-flex align-center justify-space-between mb-4">
                        <span class="t14 w400 text-grey-darken-1">مجموع قیمت کالاها:</span>
                        <span class="t19 w400 text-grey-darken-3 number-font">
                            <template v-if="voucher && voucher.total_price">
                                {{ splitChar(Number(String(voucher.total_price).slice(0, -1))) }}
                            </template>
                            <template v-else>
                                {{ splitChar(Number(String(data.total_price).slice(0, -1))) }}
                            </template>
                            <span class="t12 w400 text-grey-darken-3">تومان</span>
                        </span>
                    </div>

                    <div class="d-flex align-center justify-space-between mb-4">
                        <span class="t14 w400 text-success">سود شما:</span>
                        <span class="t19 w400 text-success number-font">
                            <template v-if="voucher && voucher.total_price && voucher.paid_price">
                                {{ splitChar(Number(String(voucher.total_price - voucher.paid_price).slice(0, -1))) }}
                            </template>
                            <template v-else>
                                {{ splitChar(Number(String(data.total_price - data.paid_price).slice(0, -1))) }}
                            </template>
                            <span class="t12 w400 text-success">تومان</span>
                        </span>
                    </div>

                    <p class="t14 w400 text-grey-darken-1">
                        هزینه ارسال پس از انتخاب آدرس به مبلغ قابل پرداخت افزوده خواهد شد.
                    </p>

                    <v-btn @click="nextStep()" height="44" :title="buttonText[activeStep - 1]" class="btn btn--submit w-100 mt-5">
                        {{ buttonText[activeStep - 1] }}
                    </v-btn>
                </v-card>

                <p class="t13 w400 text-deep-purple">
                    کالاهای موجود در سبد خرید شما رزرو نشده‌اند و در صورت اتمام موجودی از سبد خرید حذف خواهند شد.
                </p>
            </v-col>
        </v-row>

        <template v-if="activeStep === 4">
            <desktopCartLastStep />
        </template>
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
            active: [],
            previousSteps: [],
            activeStep: 1,
            profit: 0,
            buttonText: [
                'تایید و تکمیل سفارش',
                'تایید اطلاعات ارسال',
                'پرداخت'
            ],
            activeButton: false,
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
            voucher,
            getSendingMethods,
            sendingMethods,
            freeDelivery
        } = new Basket()

        return {
            deleteVoucherFromBasket,
            calculateSendingPrice,
            calculateVoucher,
            createOrder,
            voucher,
            userToken,
            getSendingMethods,
            sendingMethods,
            freeDelivery
        }
    },

    methods: {
        nextStep() {
            if (this.activeStep < 5) {
                if (this.activeStep === 2 || this.activeStep === 3) {
                    const text = this.activeStep === 2 ? 'آدرس تحویل گیرنده یا روش ارسال انتخاب نشده است.' : this.activeStep === 3 ? 'روش پرداخت مورد نظر خود را انتخاب کنید.' : '';

                    if (!this.activeButton) {
                        useNuxtApp().$toast.error(text, {
                            rtl: true,
                            position: 'top-center',
                            theme: 'dark'
                        });
                    } else {
                        if (this.activeStep === 3) {
                            this.createOrder(this.orderSendingMethod, '', this.orderAddressId, this.orderPaymentMethod)
                        } else {
                            this.active[this.activeStep] = false;
                            this.previousSteps[this.activeStep] = false;
                            this.activeStep++;
                            this.active[this.activeStep] = true;
                            this.previousSteps[this.activeStep - 1] = true;
                        }

                    }
                } else {
                    if (this.userToken) {
                        this.active[this.activeStep] = false;
                        this.previousSteps[this.activeStep] = false;
                        this.activeStep++;
                        this.active[this.activeStep] = true;
                        this.previousSteps[this.activeStep - 1] = true;
                    } else {
                        localStorage.setItem('returnPathAfterLogin', this.$route.fullPath)
                        this.$router.push('/login')
                    }

                }

                this.activeButton = false;
            }
        },

        previousStep(step) {
            if (this.activeStep < 5) {
                if (this.userToken) {
                    if (step === this.activeStep - 1) {
                        this.active[this.activeStep] = false;
                        this.previousSteps[this.activeStep] = false;
                        this.activeStep--;
                        this.active[this.activeStep] = true;
                        this.previousSteps[this.activeStep - 1] = true;
                    } else {
                        useNuxtApp().$toast.error('کاربر گرامی شما مجاز به انجام این عملیات نمی باشید.', {
                            rtl: true,
                            position: 'top-center',
                            theme: 'dark'
                        });
                    }
                }

                this.activeButton = false;
            }
        },

        /**
         * Selected address from SendingInformationAddress component
         * @param {*} address
         */
        getAddress(address) {
            if (address !== false) {

                this.$store.commit('set_orderAddress', address)
                this.getSendingMethods(address)

            } else {
                this.$store.commit('set_orderAddress', null)
            }
        },

        /**
         * Selected way from SendingInformationTime component
         * @param {*} way
         */
        getWay(way) {
            if (way !== false) {
                this.$store.commit('set_orderSendingMethod', way)
                this.calculateSendingPrice(this.orderAddressId, way)

                this.activeButton = true;

            } else {
                this.$store.commit('set_orderSendingMethod', null);
                this.activeButton = false;
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
         * Get discount code
         * @param {*} id
         */
        getDiscountCode(code) {
            this.calculateVoucher(code);
        },

        /**
         * Delete voucher from basket
         */
        deleteBasketVoucher(active) {
            if (active) {
                this.deleteVoucherFromBasket();
            }
        }
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
        this.active[this.activeStep] = true;
        this.$store.commit('set_orderAddress', null);
        this.$store.commit('set_orderSendingMethod', null);
        this.$store.commit('set_orderPayMethod', null);
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        if (token) {
            this.activeStep = 4;
            this.active[1] = false;
            this.active[4] = true;
        }
    }
}
</script>

<style lang="scss">
.stepper {
    &__header {
        border-radius: 12px;
        border: 1px solid var(--grey-grey-lighten-3, #EEE);
        box-shadow: 0px 2px 2px 0px rgba(141, 141, 141, 0.15);
        padding: 24px;

        &__content {
            flex: none;

            .v-badge__badge {
                font-family: 'IranSansFaNum' !important;
            }
        }
    }

    .cart-hr{
        opacity: 1 !important;
        height: 1px !important;
        max-height: 1px !important;
    }
}
</style>
