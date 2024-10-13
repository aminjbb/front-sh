<template>
<section v-if="content" class="order-card order-card--gift mb-4" :class="screenType === 'desktop' ? 'pt-2' : ''">
    <div class="d-flex justify-space-between align-center mb-4">
       <div class="d-flex align-center">
            <img src="~/assets/images/gift.svg" alt="Shavaz 404 error image" width="36" height="36">
            <span class="t18 w700 text-sGrayDarken2 mx-1">سفارش هدیه ی</span>
            <img src="~/assets/images/shavaz-logo2.svg" alt="Shavaz 404 error image" width="54" height="26">
       </div>

       <img src="~/assets/images/free-badge.svg" alt="Shavaz 404 error image" width="70" height="33">
    </div>

    <header class="d-flex justify-space-between align-center" :class="screenType === 'desktop' ? 'mb-4' : 'mb-2'">
        <a v-if="content.order_number" class="t12 w700 text-sGray number-font bold" >
            کد سفارش
            {{ content.order_number }}
        </a>

        <div v-if="content && content.status" class="order-card__status t10 w700" :class="[getStatusBg(content.status), getStatusColor(content.status)]">
            <v-icon :color="getStatusColor(content.status)" :icon="getIcon(content.status)" class="ml-1"/>
            {{ getStatusText(content.status) }}
        </div>
    </header>
    
    <div class="d-flex align-center order-card__info" :class=" screenType === 'desktop' ? 'mb-5' : 'mb-1'">
        <div v-if="content.receiver_name" class="d-flex align-center">
            <v-icon icon="mdi-account-box-outline" color="sGrayLighten2" size="x-small" class="ml-1"></v-icon>
            <span class="text-sGrayLighten2 t12 w500 number-font">تحویل گیرنده:{{ content.receiver_name }}</span>
        </div>
        <div v-if="content?.submit_date_fa" class="d-flex align-center">
            <v-icon icon="mdi-calendar-month-outline" color="sGrayLighten2" size="x-small" class="ml-1"></v-icon>
            <span class="text-sGrayLighten2 t12 w500 number-font">{{ content?.submit_date_fa }}</span>
        </div>
        <div v-if="content.sending_method" class="d-flex align-center">
            <v-icon icon="mdi-truck-fast-outline" color="sGrayLighten2" size="x-small" class="ml-1"></v-icon>
            <span class="text-sGrayLighten2 t12 w500">نحوه ارسال: {{ getWayText(content.sending_method) }}</span>
        </div>
    </div>

    <div class="d-flex align-center justify-space-between mb-4 order-card__contents">
       <div class="scroll--x order-card__items d-flex align-center">
            <a class="order-card__item ov-h">
                <img src="~/assets/images/order-gift-image.png" title="کاهای هدیه" alt="کالای هدیه" width="79" height="80" />
            </a>
       </div>

       <div class="t14 w700 number-font bold text-sGray d-flex justify-end align-center">
            0  <svgToman/>
       </div>
    </div>

    <div class="order-card__action justify-end d-flex w-100">
        <template v-if="content.status === 'sending'">
            <div class="w-100 d-flex align-center justify-space-between w-100">
                <span class="t12 w700 text-sGray">آیا سفارش به دست شما رسیده ؟</span>
                <v-btn class="s-btn s-btn--outline s-btn--outline-success s-btn--bg-white" :loading="receivedLoading" :width="screenType === 'desktop' ? '200' : '48%'" @click="receivedOrder(content?.id)">
                    <span class="text-sSuccess t12 w700">بلی</span>
                </v-btn>
            </div>
        </template>
    </div>
        
</section>
<generalOrdersPaymentMethodModal ref="selectPaymentMethod" :view="screenType === 'desktop' ? 'desktop' : 'mobile'" :orderId="content?.id" :paidPrice="content?.paid_price" :voucherCode="content?.voucher_code"/>
</template>

<script>
import Basket from '@/composables/Basket.js'
import Order from '@/composables/Order.js'
import axios from "axios";

export default {

    props: {
        /**
         * Content
         */
        content: Object,
    },

    data() {
        return {
            screenType: 'desktop',
            receivedLoading: false,
        }
    },

    setup() {
        const runtimeConfig = useRuntimeConfig()
        const userToken = useCookie('userToken');

        const {
            getBasket
        } = new Basket();
        const {
            reCreateOrder,
            reCreateOrderLoading
        } = new Order();
        return {
            getBasket,
            reCreateOrder,
            reCreateOrderLoading,
            runtimeConfig,
            userToken,
        }
    },

    methods: {

        /**
         * Repeat Payment
         */
        repeatPayment() {
            if (this.screenType === 'desktop') {
                this.$refs.selectPaymentMethod.dialog = true;
            } else {
                this.$refs.selectPaymentMethod.sheet = true;
            }
        },

        /**
         * Recreate for a order
         */
        async createOrder() {
            await this.reCreateOrder(this.content.id);

        },

        /**
         * Get Way text
         */
         getWayText(status) {

            if (status == 'post') {
                return 'پست';
            }
            if (status == 'nafis') {
                return 'نفیس';
            }
            if (status == 'tipax') {
                return 'تیپاکس';
            }

            return '';
        },

        /**
         * Get status icon
         */
        getIcon(status){

            if (status == 'processing') {
                return 'mdi-basket-outline';
            }
            if (status == 'sending') {
                return 'mdi-truck-fast-outline';
            }
            if (status == 'received') {
                return 'mdi-bag-personal-outline';
            }
            if (status == 'returned') {
                return 'mdi-sync';
            }

            if (status == 'pre_progress') {
                return 'mdi-progress-helper';
            }
            if (status == 'boxing') {
                return 'mdi-basket-fill';
            }
            if (status == 'payment_out_date') {
                return 'mdi-basket-remove-outline';
            }
            if (status == 'cancelled') {
                return 'mdi-basket-remove-outline';
            }
            if (status == 'payment_in_progress') {
                return 'mdi-credit-card-outline';
            }

            return '';
        },

        /**
         * Get status text
         */
         getStatusText(status) {

            if (status == 'processing') {
                return 'درحال پردازش';
            }
            if (status == 'sending') {
                return 'درحال ارسال';
            }
            if (status == 'received') {
                return 'تحویل شده';
            }
            if (status == 'returned') {
                return 'مرجوعی';
            }

            if (status == 'pre_progress') {
                return 'پیش پردازش';
            }
            if (status == 'boxing') {
                return 'در حال بسته بندی';
            }
            if (status == 'payment_out_date') {
                return 'انقضای سفارش';
            }
            if (status == 'cancelled') {
                return 'لغو شده';
            }
            if (status == 'payment_in_progress') {
                return 'انتظار پرداخت';
            }
            

            return '';
        },

        /**
         * Get status text
         */
         getStatusBg(status) {
            const text = '';

            if (status == 'processing') {
                return 'bg-sWarningLighten2';
            }
            if (status == 'sending') {
                return 'bg-sErrorLighten2';
            }
            if (status == 'received') {
                return 'bg-sSuccessLighten2';
            }
            if (status == 'returned') {
                return 'bg-sInfoLighten2';
            }

            if (status == 'pre_progress') {
                return 'bg-sBrownLighten2';
            }
            if (status == 'boxing') {
                return 'bg-sSuccessLighten2';
            }
            if (status == 'payment_out_date') {
                return 'bg-sCyanLighten2';
            }
            if (status == 'cancelled') {
                return 'bg-sYellowLighten2';
            }
            if (status == 'payment_in_progress') {
                return 'bg-sPurpleLighten2';
            }

            return 'text-sGreyLighten2';
        },

        /**
         * Get status text
         */
         getStatusColor(status) {

            if (status == 'processing') {
                return 'text-sWarning';
            }
            if (status == 'sending') {
                return 'text-sError';
            }
            if (status == 'received') {
                return 'text-sSuccess';
            }
            if (status == 'returned') {
                return 'text-sInfo';
            }

            if (status == 'paid') {
                return 'text-sInfo';
            }
            if (status == 'pre_progress') {
                return 'text-sBrown';
            }
            if (status == 'boxing') {
                return 'text-sSuccess';
            }
            if (status == 'payment_out_date') {
                return 'text-sCyan';
            }
            if (status == 'cancelled') {
                return 'text-sYellow';
            }
            if (status == 'payment_in_progress') {
                return 'text-sPurple';
            }

            return 'text-sGray';
        },

         /**
         * Received order
         * @param {*} id 
         */
         receivedOrder(id){
            this.receivedLoading = true;

            const formData = new FormData()

            formData.append('order_id', id)

            axios
                .post(this.runtimeConfig.public.apiBase + '/user/return-order/received', formData, {
                    headers: {
                        Authorization: `Bearer ${this.userToken}`,
                    },
                })
                .then((response) => {
                    this.$emit('updateList', true)
                })
                .catch((err) => {
                    useNuxtApp().$toast.error(err.response.data.message, {
                        rtl: true,
                        position: 'top-center',
                        theme: 'dark'
                    });
                }).finally(() => {
                    this.receivedLoading = false;
                });
        }
        
    },

    mounted() {
        /**
         * Check screen size
         */
        window.innerWidth < 769 ? this.screenType = 'mobile' : this.screenType = 'desktop';
    },

    watch: {
        reCreateOrderLoading(newVal) {
            if (!newVal) {
                this.getBasket()
                this.$router.push('/cart')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/tools/bp";
.order-card{
    border-radius: 6px;
    box-shadow: 0px 2px 4px 0px rgba(97, 97, 97, 0.10) !important;
    padding: 8px;

    &--gift{
        background: url('~/assets/images/order-gift-desktop.png') no-repeat center center;
        background-size: 100% 100% !important;

        @include gbp (0, 768) {
            background: url('~/assets/images/order-gift-mobile.png') no-repeat center center !important;
            background-size: 100% 100% !important;
        }
    }

    @include gbp (0, 768) {
        box-shadow: 0px 2px 4px 0px rgba(97, 97, 97, 0.10) !important;
        background: #fff;
    }

    &__status{
        padding: 6px 9px;
        border-radius: 6px;

        @include gbp (0, 768) {
            padding: 8px 9px;
        }
    }

    &__contents{
        > div:first-child{
            width: 70%;
            flex: 0 0 70%;
        }

        > div:nth-child(2){
            width: 30%;
            flex: 0 0 30%;

             > svg{
                margin-right: 2px;
             }
        }
    }

    &__item{
        width: 50px;
        height: 50px;
        display: block;
        overflow: hidden;
        border-radius: var(--Space_12, 12px);
        border: 1px solid #F3F3F3;
        background: #FAFAFA;
        position: relative;
        margin-left: 6px;
        flex: 0 0 50px;

        img{
            width: auto;
            height: 100%;
        }

        > span{
            position: absolute;
            border: 1px solid #F3F3F3;
            background: #FBE9F3;
            border-radius: 6px;
            bottom: 4px;
            right: 4px;
            width: 18px;
            height: 18px;
        }
    }

    &__info{
        > div:not(:last-child){
            position: relative;
            padding-left: 6px;
            margin-left: 6px;

            &::after{
                content: '';
                width: 1px;
                height: 12px;
                left: 0;
                top: 3px;
                background: #E8E8E8 !important;
                position: absolute;
            }
        }

        >div{
            @include gbp (0, 768) {
                margin-bottom: 10px;
            }
        }

        @include gbp (0, 768) {
           flex-wrap:wrap !important
        }
        
    }
}
</style>
