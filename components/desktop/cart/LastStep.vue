<template>
<v-card class="pa-5 mobile-pa-0 mobile-no-border pb-10">
    <template v-if="transactionData.status=== 'success'">
        <header class="d-flex align-center mb-5 xs-hide">
            <v-icon
                icon="mdi-credit-card-outline"
                color="primary"
                size="small"
                class="ml-2" />
            <span class="t16 w400 text-grey-darken-3">اتمام خرید</span>
        </header>

        <div class="d-flex flex-column align-center justify-center mt-10">
            <h2 class="t22 w500 text-grey-darken-3 mb-5">
                از اینکه شاواز را انتخاب کردید متشکریم...
            </h2>

            <span class="t14 text-grey-darken-2 mb-10 number-font">
                سفارش شما با شماره {{transactionData.order_id}} با موفقیت ثبت کردید.
            </span>

            <img src="~/assets/images/2basket.jpg" alt="payment-image" width="249" height="210">

            <div class="d-flex align-center justify-center mt-2 mb-10 w-100">
                <v-btn
                    href="/"
                    height="44"
                    width="180"
                    title="بازگشت به صفحه اصلی"
                    class="btn btn--cancel ml-3">
                    بازگشت به صفحه اصلی
                </v-btn>

                <v-btn
                    v-if="result=== 'success'"
                    :href="`/user/order/${transactionData.order_id}`"
                    height="44"
                    width="180"
                    title="مشاهده فاکتور"
                    class="btn btn--submit">
                    مشاهده فاکتور
                </v-btn>
            </div>
        </div>
    </template>

    <template v-else-if="transactionData.status=== 'failed'">
        <header class="d-flex align-center mb-5 xs-hide">
            <v-icon
                icon="mdi-timer-sand-complete"
                color="primary"
                size="small"
                class="ml-2" />
            <span class="t16 w400 text-grey-darken-3">سفارش در انتظار پرداخت</span>
        </header>

        <div class="d-flex flex-column align-center justify-center mt-10">
            <h2 class="t22 w500 text-grey-darken-3 mb-5 number-font pt-10">
                سفارش شما به شماره {{transactionData.order_id}} به مبلغ {{ splitChar(Number(String(transactionData.amount ).slice(0, -1))) }} تومان در انتظار پرداخت است
            </h2>
            
            <span class="t14 text-grey-darken-2 mb-10 number-font">
                در صورت عدم پرداخت، سفارش شما تا 1 ساعت آینده به صورت خودکار لغو خواهد شد
            </span>

            <img src="~/assets/images/basket-failed.jpg" alt="payment-image" width="217" height="163">

            <div class="d-flex align-center justify-center mt-2 mb-10 w-100 mt-10 px-5">
                <v-btn
                    @click="createFailedOrder(transactionData.order_id)"
                    height="44"
                    width="180"
                    title="پرداخت"
                    class="btn btn--cancel ml-3">
                    پرداخت
                </v-btn>

                <v-btn
                    :href="`/user/order/${transactionData.order_id}`"
                    height="44"
                    width="180"
                    title="جزئیات سفارش"
                    class="btn btn--submit">
                    جزئیات سفارش
                </v-btn>
            </div>
        </div>
    </template>
</v-card>
</template>

<script>
import Basket from '@/composables/Basket.js'
export default {
    data() {
        return {
            result: 'success',
            factorNumber: null,
            factorNumberMoc: '256842'
        }
    },

    setup() {
        const title = ref('فروشگاه اینترنتی شاواز | نتیجه پرداخت ')
        const description = ref("نتیجه پرداخت از فروشگاه لوازم آرایشی و بهداشتی شاواز")
        const userToken = useCookie('userToken');
        useHead({
            title,
            meta: [{
                name: 'description',
                content: description
            }]
        })

        const {
            getTransactionData,
            transactionData,
            createFailedOrder,
        } = new Basket()

        return {
            userToken,
            getTransactionData,
            transactionData,
            createFailedOrder
        }
    },

    methods: {
    },

    mounted() {
        this.getTransactionData();
    }
}
</script>

<style lang="scss">
.discount-code {
    input {
        height: 44px !important;
    }
}
</style>
