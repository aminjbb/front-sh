<template>
<v-card class="pa-5 mobile-pa-0 mobile-no-border pb-10">
    <template v-if="transactionData.status=== 'successful'">
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
                سفارش شما با شماره {{transactionData?.transaction?.order_number}} با موفقیت ثبت کردید.
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
                    :href="`/user/order/${transactionData?.transaction?.order_id}`"
                    height="44"
                    width="180"
                    title="مشاهده فاکتور"
                    class="btn btn--submit">
                    مشاهده فاکتور
                </v-btn>
            </div>
        </div>
    </template>

    <template v-else-if="transactionData.status=== 'unsuccessful'">
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
                سفارش شما به شماره {{transactionData.order_number}} به مبلغ {{ splitChar(Number(String(transactionData.amount ).slice(0, -1))) }} تومان در انتظار پرداخت است
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
import Order from '@/composables/Order.js'

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

        const {
            getOrderById,
            order
        } = new Order()

        return {
            userToken,
            getTransactionData,
            transactionData,
            createFailedOrder,
            getOrderById,
            order
        }
    },

    methods: {
        /**
         * Enhance E-commerce for Seo in Checkout Step 4 after payment
         */
         enhanceECommerceLastStep(){
            if(this.transactionData.status=== 'successful'){
                let productArr = [];
                this.order.data.data.details.forEach(item =>{
                    const obj={
                        item_id: item.id,	// insert an actual product ID
                        price: Number(String(item.site_price).slice(0, -1)),	// insert an actual product price. Number or a string. Don't include currency code
                        item_brand: null,	// insert an actual product price
                        item_category: null,// insert an actual product top-level category
                        item_color: null,  // insert the color of product select
                        quantity: item.count,	
                    }
                    productArr.push(obj);
                })


                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    event: 'purchase',  // name of the event. In this case, it always must be purchase
                    ecommerce: {
                        currency: 'IRR',
                        value: Number(String(this.order?.data?.data?.total_price).slice(0, -1)),// order total (price of all products + shipping) based Toman.
                        shipping: Number(String(this.order?.data?.data?.sending_price).slice(0, -1)),	// shipping costs
                        order_id: this.order?.data?.data?.id,	// order id
                        coupon: this.order?.data?.data?.voucher_code,	// if coupon was applied to the order, include it here
                        couponvalue: this.order?.data?.data?.voucher_amount,   // if coupon was applied to the order, include value the amount deducted from the order by this coupon 
                        
                        items: productArr
                    }
                });

            }  else{
                let productArr = [];
                this.order.data.data.details.forEach(item =>{
                    const obj={
                        item_id: item.id,	// insert an actual product ID
                        price: Number(String(item.site_price).slice(0, -1)),	// insert an actual product price. Number or a string. Don't include currency code
                        item_brand: null,	// insert an actual product price
                        item_category: null,// insert an actual product top-level category
                        item_color: null,  // insert the color of product select
                        quantity: item.count,	
                    }
                    productArr.push(obj);
                })
                
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    event: 'unsuccessful_purchase',  // name of the event. In this case, it always must be purchase
                    ecommerce: {
                        currency: 'IRR',
                        value: Number(String(this.order?.data?.data?.total_price).slice(0, -1)),// order total (price of all products + shipping) based Toman.
                        shipping: Number(String(this.order?.data?.data?.sending_price).slice(0, -1)),	// shipping costs
                        order_id: this.order?.data?.data?.id,	// order id
                        coupon: this.order?.data?.data?.voucher_code,	// if coupon was applied to the order, include it here
                        couponvalue: this.order?.data?.data?.voucher_amount,   // if coupon was applied to the order, include value the amount deducted from the order by this coupon 
                        
                        items: productArr
                    }
                });
            }
        },
    },

    watch:{
        transactionData(newVal){
            if(newVal && newVal !== null){
                this.getOrderById(newVal?.transaction?.order_id)
            }
        },

        order(newVal){
            if(newVal && newVal!==null){
                this.enhanceECommerceLastStep();
            }
        }
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
