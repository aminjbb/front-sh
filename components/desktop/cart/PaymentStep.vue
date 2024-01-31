<template lang="">
<v-card class="pa-5 mobile-pa-0 mobile-no-border ov-v">
    <header class="d-flex align-center mb-5 xs-hide">
        <v-icon
            icon="mdi-credit-card-outline"
            color="primary"
            size="small"
            class="ml-2" />
        <span class="t16 w400 text-grey-darken-3">روش پرداخت</span>
    </header>

    <div>
        <template v-for="(payment , index) in paymentTypeListMoc" :key="`payment${index}`">

            <div class="d-flex align-center justify-space-between flex-grow-1">
                <div>
                    <div class="d-flex align-center">
                        <v-checkbox
                            class="address-checkbox"
                            v-model="paymentModal"
                            @change="selectPayment()"
                            hide-details
                            :value="payment.id" />
                        <h3 class="t15 w400 text-grey-darken-2">{{payment.label}}</h3>
                    </div>
                    <p class="number-font t12 w400 text-grey">
                        <template v-if="payment.type === 'snap_pay'">
                            4 قسط ماهیانه {{splitChar(payment.payment_mount)}} تومان (برون کارمزد)
                        </template>
                        <template v-else-if="payment.type === 'bank'">پرداخت آنلاین با تمام کارت های بانکی</template>
                        <template v-else-if="payment.type === 'wallet'">پرداخت آنلاین با تمام کارت های بانکی</template>
                    </p>
                </div>
                <template v-if="payment.type === 'snap_pay'">
                    <img src="~/assets/images/payment-snap.jpg" alt="payment-image" width="85" height="54">
                </template>

                <template v-else-if="payment.type === 'bank'">
                    <img src="~/assets/images/payment-bank.jpg" alt="payment-image" width="85" height="54">
                </template>

                <template v-else-if="payment.type === 'wallet'">
                    <img src="~/assets/images/payment-wallet.jpg" alt="payment-image" width="85" height="54">
                </template>

            </div>
            <v-divider
                v-if="index+1 < paymentTypeListMoc.length"
                color="grey-lighten-1"
                class="my-3" />
        </template>
    </div>
</v-card>

<v-card class="pa-5 mobile-pa-0 mobile-no-border discount-code">
    <header class="d-flex align-center mb-5 xs-hide">
        <v-icon
            icon="mdi-sale-outline"
            color="primary"
            size="small"
            class="ml-2" />
        <span class="t16 w400 text-grey-darken-3">کد تخفیف</span>
    </header>

    <div>
        <p class="t12 w400 text-grey mb-3">برای هر خرید، امکان اعمال تنها یک کد تخفیف می‌باشد.</p>
        <v-row>
            <v-col md="9" lg="10">
                <v-text-field
                    color="grey-lighten-3"
                    density="compact"
                    variant="outlined"
                    hide-details
                    v-modal="discountCode"
                    single-line />
                    <p class="t12 w400 text-danger my-2">{{discountError}}</p>
            </v-col>
            <v-col md="3" lg="2">
                <v-btn
                    @click="setDiscountCode()"
                    height="44"
                    title="اعمال کد"
                    class="btn btn--cancel w-100">
                    اعمال کد
                </v-btn>
            </v-col>
        </v-row>
    </div>
</v-card>
</template>

<script>
export default {
    data() {
        return {
            paymentModal: null,
            paymentTypeList: [],
            paymentTypeListMoc: [{
                    id: 1,
                    label: 'پرداخت اقساطی اسنپ پی',
                    type: 'snap_pay',
                    payment_mount: '102157'
                },
                {
                    id: 2,
                    label: 'پرداخت اینترنتی',
                    type: 'bank',
                    payment_mount: ''
                },
                {
                    id: 3,
                    label: 'کیف پول',
                    type: 'wallet',
                    payment_mount: ''
                }
            ],
            discountCode: null,
            discountError: null,
        }
    },

    setup() {
        const title = ref('فروشگاه اینترنتی شاواز | روشهای پرداخت ')
        const description = ref("انتخا روش پرداخت برای خرید از فروشگاه لوازم آرایشی و بهداشتی شاواز")
        const userToken = useCookie('userToken');
        useHead({
            title,
            meta: [{
                name: 'description',
                content: description
            }]
        })
        return {
            userToken
        }
    },

    methods: {
        /**
         * Selected Payment for send package to customer
         */
        selectPayment() {
            console.log("🚀 ~ selectPayment ~ this.paymentModal:", this.paymentModal)
            this.$emit('selectedPayment', this.paymentModal);
        },

        /**
         * Set discount code
         */
        setDiscountCode(){
            this.$emit('setDiscountCode', this.discountCode);
        }

    },
}
</script>

<style lang="scss">
.discount-code{
    input{
        height: 44px !important;
    }
}
</style>
