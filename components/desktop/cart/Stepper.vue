<template>
<div class="stepper">
    <header class="stepper__header d-flex align-center w-100">
        <div
            v-for="(step, index) in steps"
            :key="`step${index}`"
            class="d-flex align-center"
            :class="index + 1 < steps.length ? 'flex-grow-1' : ''">
            <div class="stepper__header__content">
                <v-badge
                    :color="active[index+1] ? 'primary': previousSteps[index+1] ? 'grey-darken-3' : 'grey'"
                    :content="index+1"
                    class="ml-2 mr-2"
                    inline />
                <span class="t15 w400 pl-2" :class="active[index+1] ? 'text-primary': previousSteps[index+1] ? 'text-grey-darken-3' : 'text-grey'">{{step}}</span>
            </div>

            <v-divider
                v-if="index + 1 < steps.length"
                color="grey"
                class="flex-grow-1" />
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
                    
                    <desktopCartSendingInformationTime
                        v-if="orderAddressId"
                        @selectedDate="getTime"
                        @selectedWay="getWay" />
                </template>

                <template v-if="activeStep === 3">
                    <desktopCartPaymentStep @selectedPayment="getPayment" :paymentMount="data.paid_price"/>
                </template>
            </v-col>
            <v-col md="3">
                <v-card class="py-5 px-3">
                    <div class="d-flex align-center justify-space-between">
                        <span class="t14 w400 text-grey-darken-1">مبلغ قابل پرداخت:</span>
                        <span class="t19 w400 text-grey-darken-3 number-font">{{ splitChar(Number(String(data.paid_price).slice(0, -1))) }}<span class="t12 w400 text-grey-darken-3">تومان</span></span>
                    </div>

                    <v-divider color="grey-lighten-2" class="my-3" />

                    <div class="d-flex align-center justify-space-between mb-4">
                        <span class="t14 w400 text-grey-darken-1">هزینه ارسال:</span>
                        <span class="t19 w400 text-grey-darken-3 number-font">{{ splitChar(Number(String(data.sending_price).slice(0, -1))) }} <span class="t12 w400 text-grey-darken-3">تومان</span></span>
                    </div>

                    <div class="d-flex align-center justify-space-between mb-4">
                        <span class="t14 w400 text-grey-darken-1">مجموع قیمت کالاها:</span>
                        <span class="t19 w400 text-grey-darken-3 number-font">{{ splitChar(Number(String(data.total_price).slice(0, -1))) }} <span class="t12 w400 text-grey-darken-3">تومان</span></span>
                    </div>

                    <div class="d-flex align-center justify-space-between mb-4">
                        <span class="t14 w400 text-success">سود شما:</span>
                        <span class="t19 w400 text-success number-font">{{ splitChar(Number(String(data.total_price - data.paid_price).slice(0, -1))) }} <span class="t12 w400 text-success">تومان</span></span>
                    </div>

                    <p class="t14 w400 text-grey-darken-1">
                        هزینه ارسال پس از انتخاب آدرس به مبلغ قابل پرداخت افزوده خواهد شد.
                    </p>

                    <v-btn
                        @click="nextStep()"
                        height="44"
                        :title="buttonText[activeStep - 1]"
                        class="btn btn--submit w-100 mt-5">
                        {{buttonText[activeStep- 1]}}
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
            previousSteps:[],
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
        const {
            calculateSendingPrice,
            createOrder
        } = new Basket()
        return {
            calculateSendingPrice,
            createOrder
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
                            this.createOrder(this.orderSendingMethod, '', this.orderAddressId, this.orderPaymentMethod)
                        } else {
                            this.active[this.activeStep] = false;
                            this.previousSteps[this.activeStep] = false;
                            this.activeStep++;
                            this.active[this.activeStep] = true;
                            this.previousSteps[this.activeStep -1] = true;
                        }

                    }
                } else {
                    this.active[this.activeStep] = false;
                    this.previousSteps[this.activeStep] = false;
                    this.activeStep++;
                    this.active[this.activeStep] = true;
                    this.previousSteps[this.activeStep -1] = true;
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
                this.activeButton = true;
            } else{
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
                this.calculateSendingPrice(this.orderAddressId, way)
            } else{
                this.$store.commit('set_orderSendingMethod', null)
            }
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
            this.$store.commit('set_orderPayMethod', id)
            this.activeButton = true;
        },
    },

    mounted() {
        this.active[this.activeStep] = true;
        this.$store.commit('set_orderAddress', null);
        this.$store.commit('set_orderSendingMethod', null);
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
}
</style>
