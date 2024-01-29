<template lang="">
<div class="stepper">
    <header class="stepper__header d-flex align-center w-100">
        <div
            v-for="(step, index) in steps"
            :key="`step${index}`"
            class="d-flex align-center"
            :class="index + 1 < steps.length ? 'flex-grow-1' : ''">
            <div class="stepper__header__content">
                <v-badge
                    :color="active[index+1] ? 'primary' : 'grey'"
                    :content="index+1"
                    class="ml-2 mr-2"
                    inline />
                <span class="t15 w400 pl-2" :class="active[index+1] ? 'text-primary' : 'text-grey'">{{step}}</span>
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
                    <desktopCartSkuListStep :count="data.count" :productList="data" />
                </template>

                <template v-if="activeStep === 2">
                    <desktopCartSendingInformationAddress @selectedAddress="getAddress" />
                    <desktopCartSendingInformationTime @selectedDate="getTime" @selectedWay="getWay" />
                </template>

                <template v-if="activeStep === 3">
                    <desktopCartPaymentStep @selectedPayment="getPayment" />
                </template>
            </v-col>
            <v-col md="3">
                <v-card class="py-5 px-3">
                    <div class="d-flex align-center justify-space-between">
                        <span class="t14 w400 text-grey-darken-1">مبلغ قابل پرداخت:</span>
                        <span class="t19 w400 text-grey-darken-3 number-font">{{splitChar(data.paid_price)}} <span class="t12 w400 text-grey-darken-3">تومان</span></span>
                    </div>

                    <v-divider color="grey-lighten-2" class="my-3" />

                    <div class="d-flex align-center justify-space-between mb-4">
                        <span class="t14 w400 text-grey-darken-1">هزینه ارسال:</span>
                        <span class="t19 w400 text-grey-darken-3 number-font">{{splitChar(shippingCost)}} <span class="t12 w400 text-grey-darken-3">تومان</span></span>
                    </div>

                    <div class="d-flex align-center justify-space-between mb-4">
                        <span class="t14 w400 text-grey-darken-1">مجموع قیمت کالاها:</span>
                        <span class="t19 w400 text-grey-darken-3 number-font">{{splitChar(data.total_price)}} <span class="t12 w400 text-grey-darken-3">تومان</span></span>
                    </div>

                    <div class="d-flex align-center justify-space-between mb-4">
                        <span class="t14 w400 text-success">سود شما:</span>
                        <span class="t19 w400 text-success number-font">{{splitChar(data.total_price - data.paid_price)}} <span class="t12 w400 text-success">تومان</span></span>
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
                        this.active[this.activeStep] = false;
                        this.activeStep++;
                        this.active[this.activeStep] = true;
                    }
                } else {
                    this.active[this.activeStep] = false;
                    this.activeStep++;
                    this.active[this.activeStep] = true;
                }

                this.activeButton = false;
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
    },

    mounted() {
        this.active[this.activeStep] = true;
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
