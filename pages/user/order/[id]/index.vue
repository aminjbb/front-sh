<template>
<main class="v-order v-order--single">
    <header class="v-user__mobile-page-head xs-show">
        <a href="/user/order" class="ml-3">
            <v-icon icon="mdi-arrow-right" color="grey-darken-3" />
        </a>
        <span class="grey-darken-3 t14">جزئیات سفارش</span>
    </header>

    <v-container>
        <v-row>
            <div class="col-3 py-4 xs-hide">
                <generalUserSidebar />
            </div>
            <div class="col-9 pa-4 mobile-pa-0">
                <div>
                    <v-card class="pa-8 mobile-pa-0 v-order__card">
                        <header class="v-ticket__header d-flex align-center justify-space-between xs-hide card__header pt-6">
                            <h1 class="t18 w700 text-sGrayDarken2 number-font bold ltr">{{ userOrder?.id }} جزئیات سفارش</h1>

                            <v-btn href="/user/order" height="45" title="بازگشت" class="btn--cancel px-6 br12 no-shadow">
                                <span class="w700"> بازگشت</span>
                            </v-btn>
                        </header>

                        <div class="pa-8">
                            <div class="order-details s-border s-border--bottom">
                                <div v-if="userOrder && userOrder?.status" class="d-flex align-center justify-space-between pb-7">
                                    <span class="t12 w700 text-sGrayLighten2">وضعیت سفارش : </span>

                                    <div class="order-details__status t10 w700" :class="[getStatusBg(userOrder?.status), getStatusColor(userOrder?.status)]">
                                        <v-icon :color="getStatusColor(userOrder.status)" :icon="getIcon(userOrder?.status)" class="ml-1" />
                                        {{ getStatusText(userOrder?.status) }}
                                    </div>
                                </div>

                                <div v-if="userOrder && userOrder?.order_number" class="d-flex align-center justify-space-between pb-7">
                                    <span class="t12 w700 text-sGrayLighten2">کد سفارش : </span>

                                    <span class="t12 fw700 text-sGrayDarken2 number-font">{{ userOrder?.order_number }}</span>
                                </div>
                            </div>

                            <div class="order-details s-border s-border--bottom pt-7">
                                <div v-if="userOrder && userOrder?.receiver_name" class="d-flex align-center justify-space-between pb-7">
                                    <span class="t12 w700 text-sGrayLighten2">تحویل گیرنده : </span>

                                    <span class="t12 fw700 text-sGrayDarken2 number-font">{{ userOrder?.receiver_name }}</span>
                                </div>

                                <div v-if="userOrder && userOrder?.receiver_mobile" class="d-flex align-center justify-space-between pb-7">
                                    <span class="t12 w700 text-sGrayLighten2">شماره تماس : </span>

                                    <span class="t12 fw700 text-sGrayDarken2 number-font">{{ userOrder?.receiver_mobile }}</span>
                                </div>

                                <div v-if="userOrder && userOrder?.receiver_address" class="pb-7">
                                    <span class="d-block t14 w700 text-sGrayLighten2 mb-3">آدرس :</span>

                                    <span class="d-block t12 fw700 text-sGrayDarken2 number-font">{{ userOrder?.receiver_address }}</span>
                                </div>
                            </div>

                            <div class="order-details pt-7">
                                <div v-if="userOrder && userOrder?.status" class="d-flex align-center justify-space-between pb-7">
                                    <span class="t12 w700 text-sGrayLighten2">مبلغ سفارش : </span>

                                    <span class="t12 fw700 text-sGrayDarken2 number-font">
                                        {{splitChar(Number(String(userOrder.total_price).slice(0, -1)))}}
                                        <SvgToman />
                                    </span>
                                </div>

                                <div v-if="userOrder && userOrder?.order_number" class="d-flex align-center justify-space-between pb-7">
                                    <span class="t12 w700 text-sGrayLighten2">سود شما: </span>

                                    <span class="t12 fw700 text-sGrayDarken2 number-font">
                                        {{splitChar(Number(String(userOrder.total_discount).slice(0, -1)))}}
                                        <SvgToman />
                                    </span>
                                </div>

                                <div v-if="userOrder && userOrder?.order_number" class="d-flex align-center justify-space-between pb-7">
                                    <span class="t12 w700 text-sGrayLighten2">هزینه ارسال : </span>

                                    <span class="t12 fw700 text-sGrayDarken2 number-font">
                                        <template v-if="userOrder.sending_price && userOrder.sending_price !== 0">
                                            {{splitChar(Number(String(userOrder.sending_price).slice(0, -1)))}}
                                            <SvgToman />
                                        </template>

                                        <template v-else>
                                            رایگان
                                        </template>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </v-card>
                </div>
            </div>
        </v-row>
    </v-container>
    <generalOrdersPaymentMethodModal ref="selectPaymentMethod" :view="screenType === 'desktop' ? 'desktop' : 'mobile'" :orderId="userOrder?.id" :paidPrice="userOrder?.paid_price" />
</main>
</template>

<script>
import Order from '@/composables/Order.js'
import Basket from '@/composables/Basket.js'
import axios from "axios";

export default {
    data() {
        return {
            products: null,
            screenType: 'desktop',
        }
    },

    setup() {
        const runtimeConfig = useRuntimeConfig()
        const userToken = useCookie('userToken');

        const title = ref('فروشگاه اینترنتی شاواز | جزئیات سفارش')
        const description = ref("لیست سفارشات کاربر - سفارشات تایید شده - سفارشات در حال پردازش - سفارشات ارسال شده - سفارشات در حال ارسال - سفارشات مرجوعی")
        const {
            getBasket
        } = new Basket()
        const {
            getOrder,
            order,
            reCreateOrder,
            reCreateOrderLoading
        } = new Order()
        useHead({
            title,
            meta: [{
                name: 'description',
                content: description
            }]
        })
        return {
            getOrder,
            order,
            runtimeConfig,
            userToken,
            getBasket,
            reCreateOrder,
            reCreateOrderLoading
        }
    },

    computed: {
        /** single order object **/
        userOrder() {
            try {
                return this.order ?.data ?.data
            } catch (e) {

            }
        }
    },

    methods: {
        /**
         * Get status icon
         */
        getIcon(status) {

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
         * Recreate for a order
         */
        reOrder() {
            this.reCreateOrder(this.userOrder.id)
        },

        /**
         * Repeat Payment
         */
        repeatPayment() {
            if (this.screenType === 'desktop') {
                this.$refs.selectPaymentMethod.dialog = true;
            } else {
                this.$refs.selectPaymentMethod.sheet = true;
            }
        }
    },

    beforeMount() {
        this.getOrder()
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

<style lang="scss">
@import "~/assets/scss/tools/bp";
@import '~/assets/scss/views/user.scss';
@import '~/assets/scss/views/order.scss';

.mdi-chevron-left {
    font-size: 15px !important;
}
</style>

<style lang="scss" scoped>
@import "~/assets/scss/tools/bp";

.py-5 {
    @include gbp(0, 768) {
        padding: 12px 0 !important;
    }
}
</style>
