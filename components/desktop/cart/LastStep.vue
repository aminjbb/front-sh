<template >
<v-card class="pa-5 mobile-pa-0 mobile-no-border pb-10">
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
            <template v-if="result=== 'success'">
                از اینکه شاواز را انتخاب کردید متشکریم...
            </template>
            <template v-else>
                پرداخت شما ناموفق بود ...
            </template>
        </h2>

        <span class="t14 text-grey-darken-2 mb-10 number-font">
            <template v-if="result=== 'success'">
                سفارش شما با شماره {{factorNumberMoc}} با موفقیت ثبت کردید.
            </template>
            <template v-else>
                در صورت کسر مبلغ از حساب شما، مبلغ پرداخت شده تا 72 ساعت آینده حساب شما باز خواهد گشت.
            </template>
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
                href="/"
                height="44"
                width="180"
                title="مشاهده فاکتور"
                class="btn btn--submit">
                مشاهده فاکتور
            </v-btn>
        </div>
    </div>
</v-card>
</template>

<script>
export default {
    data() {
        return {
            result: 'success',
            factorNumber:null,
            factorNumberMoc:'256842'
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
        return {
            userToken
        }
    },

    methods: {},
}
</script>

<style lang="scss">
.discount-code {
    input {
        height: 44px !important;
    }
}
</style>
