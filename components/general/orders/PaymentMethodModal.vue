<template>
<template v-if="view === 'desktop'">
    <v-dialog v-if="dialog" v-model="dialog" color="white" width="480px">
        <v-card class="pt-3 px-6 pb-5">
            <header class="c-modal__header d-flex justify-space-between align-center pb-1">
                <span class="t15 w500 text-black">
                    روش پرداخت
                </span>

                <v-btn class="c-modal__header__btn pa-0 text-none" @click="closeModal()" color="grey-darken-1" size="large" variant="icon">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </header>

            <div class="mt-2">
                <generalOrdersPaymentMethod ref="paymentStep" @selectedPayment="getPayment" />
            </div>

            <div class="d-flex align-center justify-space-between my-8">
                <span class="color-black w400 t12">مبلغ قابل پرداخت:</span>
                <div class="d-flex align-center">
                    <span class="color-black w500 t16 ml-2 number-font">97,000</span>
                    <span class="color-black w400 t12">تومان</span>
                </div>
            </div>

            <div class="d-flex align-center justify-center mb-2">
                <v-btn
                    height="28"
                    style="height: 32px !important;"
                    title="پرداخت"
                    class="btn btn--submit px-10">
                    پرداخت
                </v-btn>
            </div>
        </v-card>
    </v-dialog>
</template>

<template v-if="view === 'mobile'">
    <v-bottom-sheet v-model="sheet" height="550px" >
        <v-card class="pt-3 px-6 pb-5">
            <header class="c-modal__header d-flex justify-space-between align-center pb-1">
                <span class="t15 w500 text-black">
                    روش پرداخت
                </span>

                <v-btn class="c-modal__header__btn pa-0 text-none" @click="closeSheet()" color="grey-darken-1" size="large" variant="icon">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </header>

            <div>
                <generalOrdersPaymentMethod ref="paymentStep" @selectedPayment="getPayment" />
            </div>


            <div class="d-flex align-center justify-space-between my-8">
                <span class="color-black w400 t12">مبلغ قابل پرداخت:</span>
                <div class="d-flex align-center">
                    <span class="color-black w500 t16 ml-2 number-font">97,000</span>
                    <span class="color-black w400 t12">تومان</span>
                </div>
            </div>

            <div class="d-flex align-center justify-center mb-2">
                <v-btn
                    height="28"
                    style="height: 32px !important;"
                    title="پرداخت"
                    class="btn btn--submit px-10">
                    پرداخت
                </v-btn>
            </div>
        </v-card>
    </v-bottom-sheet>
</template>
</template>

<script>
export default {
    data() {
        return {
            activeButton: false,
            sheet:false,
            dialog:false

        }
    },

    props: {
        view: {
            default: 'mobile',
            type: String
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
            } else {
                this.activeButton = false;
            }
        },

        closeModal(){
            this.dialog = false
        },

        closeSheet(){
            this.sheet = false;
        }
    }

}
</script>

