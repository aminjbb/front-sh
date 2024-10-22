<template>
<template v-if="view === 'desktop'">
    <v-dialog v-if="dialog" v-model="dialog" color="white" width="600px">
        <v-card class="pt-4 px-3 pb-5">
            <header class="d-flex justify-space-between align-center pb-1 mb-3">
                <span class="t16 w700 text-sGrayDarken2">
                    روش پرداخت
                </span>

                <v-btn class="c-modal__header__btn pa-0 text-none" @click="closeModal()" color="grey-darken-1" size="large" variant="icon">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </header>

            <div class="mt-2">
                <generalOrdersPaymentMethod :orderId="orderId" ref="paymentStep" @selectedPayment="getPayment" />
            </div>

            <!-- <div class="d-flex align-center justify-space-between my-8">
                <span class="color-black w400 t12">مبلغ قابل پرداخت:</span>
                <div class="d-flex align-center">
                    <span class="color-black w500 t16 ml-2 number-font">{{
                      splitChar(Number(String(paidPrice).slice(0, -1)))
                    }}</span>
                    <span class="color-black w400 t12">تومان</span>
                </div>
            </div> -->
            
            <div v-if="voucherCode" class="d-flex align-center justify-space-between my-8">
                <span class="text-sGrayLighten2 w700 t12">کد تخفیف اعمال شده : </span>

                <span class="color-sGrayDarken2 w700 t12 bold number-font">{{ voucherCode }}</span>
            </div>

            <div class="d-flex align-center justify-center mb-2">
                <v-btn class="s-btn s-btn--fill s-btn--fill-primary ml-3" width="49%" height="45" @click="reSubmitOrder()" :disabled="!activeButton">
                    <span class="text-white t14 w700"> پرداخت</span>
                </v-btn>

                <v-btn class="s-btn s-btn--outline s-btn--outline-primary s-btn--bg-white" height="45" width="49%" @click="closeSheet()">
                    <span class="text-primary t14 w700">انصراف</span>
                </v-btn>
            </div>
        </v-card>
    </v-dialog>
</template>

<template v-if="view === 'mobile'">
    <v-bottom-sheet v-model="sheet" height="auto">
        <div class="pt-4 px-3 pb-5 bg-white h-100 bottom-sheet-br">
            <header class="d-flex justify-space-between align-center pb-1 mb-6">
                <span class="t16 w700 text-black">
                    روش پرداخت
                </span>

                <v-btn class="c-modal__header__btn pa-0 text-none" @click="closeSheet()" color="grey-darken-1" size="large" variant="icon">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </header>

            <div>
                <generalOrdersPaymentMethod :orderId="orderId" ref="paymentStep" @selectedPayment="getPayment" />
            </div>

            <!-- <div class="d-flex align-center justify-space-between my-8">
                <span class="color-black w400 t12">مبلغ قابل پرداخت:</span>
                <div class="d-flex align-center">
                    <span class="color-black w500 t16 ml-2 number-font">{{
                      splitChar(Number(String(paidPrice).slice(0, -1)))
                    }}</span>
                    <span class="color-black w400 t12">تومان</span>
                </div>
            </div> -->

            <div v-if="voucherCode" class="d-flex align-center justify-space-between my-8">
                <span class="text-sGrayLighten2 w700 t12">کد تخفیف اعمال شده : </span>

                <span class="color-sGrayDarken2 w700 t12 bold number-font">{{ voucherCode }}</span>
            </div>

            <div class="d-flex align-center justify-center mb-2">
                
                <v-btn class="s-btn s-btn--fill s-btn--fill-primary ml-3" width="49%" height="45" @click="reSubmitOrder()" :disabled="!activeButton">
                    <span class="text-white t14 w700"> پرداخت</span>
                </v-btn>

                <v-btn class="s-btn s-btn--outline s-btn--outline-primary s-btn--bg-white" height="45" width="49%" @click="closeSheet()">
                    <span class="text-primary t14 w700">انصراف</span>
                </v-btn>
            </div>
        </div>
    </v-bottom-sheet>
</template>
</template>

<script>
import Order from '@/composables/Order.js'
export default {
    data() {
        return {
            activeButton: false,
            sheet: false,
            dialog: false,
            paymentWay: null,
        }
    },

    props: {
        view: {
            default: 'mobile',
            type: String
        },
        orderId: String | Number,
        paidPrice: String | Number,
        voucherCode: String
    },

    setup() {
        const {
            rePaymentOrder
        } = new Order()
        return {
            rePaymentOrder
        }
    },

    methods: {
        /**
         * Selected address from SendingInformationAddress component
         * @param {*} id
         */
        getPayment(id) {
            if (id !== false) {
                this.activeButton = true;
                this.paymentWay = id;
            } else {
                this.activeButton = false;
            }
        },

        closeModal() {
            this.dialog = false
        },

        closeSheet() {
            this.sheet = false;
        },

        reSubmitOrder() {
            this.rePaymentOrder(this.orderId, this.paymentWay)
        }
    }

}
</script>
