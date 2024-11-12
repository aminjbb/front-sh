<template>
<v-card class="pa-5 mobile-pa-0 mobile-no-border pb-10">
    <template v-if="transactionData?.status=== 'successful'">
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
                سفارش شما با شماره {{order?.data?.data?.order_number}} با موفقیت ثبت گردید.
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
                    :disabled="!order"
                    v-if="result=== 'success'"
                    :href="`/user/order/${order?.data?.data?.id}`"
                    height="44"
                    width="180"
                    title="مشاهده فاکتور"
                    class="btn btn--submit">
                    مشاهده فاکتور
                </v-btn>
            </div>
        </div>
    </template>

    <template v-else-if="transactionData?.status=== 'unsuccessful'">
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
                سفارش شما به شماره {{order?.data?.data?.order_number}} به مبلغ {{ splitChar(Number(String(order?.data?.data?.total_price ).slice(0, -1))) }} تومان در انتظار پرداخت است
            </h2>

            <span class="t14 text-grey-darken-2 mb-10 number-font">
                در صورت عدم پرداخت، سفارش شما تا<span class="text-primary w-500"> ۲۰ دقیقه آینده</span> به صورت خودکار لغو خواهد شد 
            </span>

            <img src="~/assets/images/basket-failed.jpg" alt="payment-image" width="217" height="163">

            <div class="d-flex align-center justify-center mt-2 mb-10 w-100 mt-10 px-5">
                <v-btn
                    @click="createFailedOrder(order?.data?.data.id)"
                    height="44"
                    width="180"
                    title="پرداخت"
                    class="btn btn--cancel ml-3">
                    پرداخت
                </v-btn>

                <v-btn
                    :disabled="!order"
                    :href="`/user/order/${order?.data?.data.id}`"
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
import Affiliate from '@/composables/Affiliate.js'

export default {
    data() {
        return {
            result: 'success',
            factorNumber: null,
            factorNumberMoc: '256842',
            umSource:null,
        }
    },

    setup() {
        const title = ref('فروشگاه اینترنتی شاواز | نتیجه پرداخت ')
        const description = ref("نتیجه پرداخت از فروشگاه لوازم آرایشی و بهداشتی شاواز")
        const taToken = useCookie('tatoken');
        const alToken = useCookie('altoken');
        // const deemaToken = useCookie('dm-clickid')

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

        const{
            // sendInfoToTakhfifan,
            // sendInfoToDeema,
            sendInfoToTaAffilinks
        } = new Affiliate()

        return {
            getTransactionData,
            transactionData,
            createFailedOrder,
            getOrderById,
            order,
            // sendInfoToTakhfifan,
            taToken,
            // sendInfoToDeema,
            alToken,
            sendInfoToTaAffilinks,
            // deemaToken
        }
    },

    methods: {
        /**
         * Enhance E-commerce for Seo in Checkout Step 4 after payment
         */
         enhanceECommerceLastStep(){
           if (localStorage.getItem('tokenPurchase')  != this.$route.query.token){
             if(this.transactionData.status=== 'successful'){
               let productArrLastTrue = [];
               this.order.data.data.details.forEach(item =>{
                 const obj={
                   price: Number(String(item.site_price).slice(0, -1)),	// insert an actual product price. Number or a string. Don't include currency code
                   quantity: item.count,
                   item_id: item?.shps?.sku?.id,
                   name: item ?.shps ?.sku ?.label
                 }
                 productArrLastTrue.push(obj);
               })

               window.dataLayer = window.dataLayer || [];
               window.dataLayer.push({
                 event: 'purchase',  // name of the event. In this case, it always must be purchase
                 ecommerce: {
                   currency: 'USD',
                   value: Number(String(this.order?.data?.data?.paid_price).slice(0, -1)),// order total (price of all products + shipping) based Toman.
                   shipping: Number(String(this.order?.data?.data?.sending_price).slice(0, -1)),	// shipping costs
                   order_id: this.order?.data?.data?.id,	// order id
                   um_source:this.umSource,
                   userID: this.order?.data?.data?.user_id,
                   coupon: this.order?.data?.data?.voucher_code,	// if coupon was applied to the order, include it here
                   couponvalue: Number(String(this.order?.data?.data?.voucher_amount).slice(0, -1)),   // if coupon was applied to the order, include value the amount deducted from the order by this coupon

                   items: productArrLastTrue
                 }
               });
               localStorage.setItem('tokenPurchase' , this.$route.query.token)

             }  else{
               let productArrLast = [];
               this.order.data.data.details.forEach(item =>{
                 const obj={
                   price: Number(String(item.site_price).slice(0, -1)),	// insert an actual product price. Number or a string. Don't include currency code
                   item_id: item?.sku_id,
                   quantity: item.count,
                 }
                 productArrLast.push(obj);
               })

               window.dataLayer = window.dataLayer || [];
               window.dataLayer.push({
                 event: 'unsuccessful_purchase',  // name of the event. In this case, it always must be purchase
                 currency: 'USD',
                 userID: this.order?.data?.data?.user_id,
                 value: Number(String(this.order?.data?.data?.paid_price).slice(0, -1)),// order total (price of all products + shipping) based Toman.
                 shipping: Number(String(this.order?.data?.data?.sending_price).slice(0, -1)),	// shipping costs
                 order_id: this.order?.data?.data?.id,	// order id
                 coupon: this.order?.data?.data?.voucher_code,	// if coupon was applied to the order, include it here
                 couponvalue: Number(String(this.order?.data?.data?.voucher_amount).slice(0, -1)),   // if coupon was applied to the order, include value the amount deducted from the order by this coupon

                 items: productArrLast
               });
               localStorage.setItem('tokenPurchase' , this.$route.query.token)
             }
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

                if(this.transactionData?.status=== 'successful'){
                    
                    // if(this.deemaToken && this.deemaToken !== null && this.deemaToken !== ''){
                    //     this.sendInfoToDeema(newVal?.data?.data); //Call Deema affiliate code
                    //     this.umSource = 'Deema';
                    // }

                    // if(this.taToken && this.taToken !== null && this.taToken !== ''){
                    //     this.sendInfoToTakhfifan(this.order?.data?.data) //Call Takhfifan code
                    //     this.umSource = 'Takhfifan';
                    // }

                    if(this.alToken && this.alToken !== null && this.alToken !== ''){
                        this.sendInfoToTaAffilinks(this.order?.data?.data) //Call Affilinks code
                        this.umSource = 'Affilinks';
                    }
                }
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
