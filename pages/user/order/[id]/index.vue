<template>
<main class="v-order v-order--single">
    <header class="v-user__mobile-page-head xs-show">
        <a href="/user/order" class="ml-1">
            <v-icon icon="mdi-chevron-right" color="sGrayDarken2" />
        </a>
        <span class="fw700 t14 number-font text-sGrayDarken2 ltr">{{ userOrder?.id }} جزئیات سفارش</span>
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

                        <div :class="screenType === 'desktop' ? 'pt-3 pb-8 pr-8 pl-8' : 'pt-1 pb-4 pr-3 pl-3'">
                            <div v-if="userOrder?.status === 'payment_in_progress' || userOrder?.status === 'payment_out_date' || userOrder?.status === 'received'" class="v-order__notification pa-4 bg-sWarningLighten2 br16 mb-6">
                                <v-icon icon="mdi-alert-circle-outline" color="sWarningLighten1" />
                                <span class="t12 fw500 text-sWarning number-font">
                                    <template v-if="userOrder?.status === 'payment_in_progress'">
                                        شاوازی عزیز برای پرداخت مجدد سفارش ۲۰ دقیقه زمان دارید.
                                    </template>

                                    <template v-if="userOrder?.status === 'payment_out_date'">
                                        شاوازی عزیز در صورت سفارش مجدد ممکن است هزینه و موجودی محصولات تغییر کند.
                                    </template>

                                    <template v-if="userOrder?.status === 'received'">
                                        شاوازی عزیز برای مرجوع کردن محصول فقط“ ۷ روز “ وقت دارید .
                                    </template>
                                </span>
                            </div>

                            <div>
                                <div class="order-details s-border s-border--bottom">
                                    <div v-if="userOrder && userOrder?.status" class="d-flex align-center justify-space-between" :class="screenType === 'desktop' ? 'pb-7' : 'pb-5'">
                                        <span class="t12 w700 text-sGrayLighten2">وضعیت سفارش: </span>

                                        <div class="order-details__status t10 w700" :class="[getStatusBg(userOrder?.status), getStatusColor(userOrder?.status)]">
                                            <v-icon :color="getStatusColor(userOrder.status)" :icon="getIcon(userOrder?.status)" class="ml-1" />
                                            {{ getStatusText(userOrder?.status) }}
                                        </div>
                                    </div>

                                    <div v-if="userOrder && userOrder?.order_number" class="d-flex align-center justify-space-between" :class="screenType === 'desktop' ? 'pb-7' : 'pb-5'">
                                        <span class="t12 w700 text-sGrayLighten2">کد سفارش: </span>

                                        <span class="t12 fw700 text-sGrayDarken2 number-font">{{ userOrder?.order_number }}</span>
                                    </div>
                                </div>

                                <div class="order-details s-border s-border--bottom" :class="screenType === 'desktop' ? 'pt-7' : 'pt-5'">
                                    <div v-if="userOrder && userOrder?.receiver_name" class="d-flex align-center justify-space-between" :class="screenType === 'desktop' ? 'pb-7' : 'pb-5'">
                                        <span class="t12 w700 text-sGrayLighten2">تحویل گیرنده: </span>

                                        <span class="t12 fw700 text-sGrayDarken2 number-font">{{ userOrder?.receiver_name }}</span>
                                    </div>

                                    <div v-if="userOrder && userOrder?.receiver_mobile" class="d-flex align-center justify-space-between" :class="screenType === 'desktop' ? 'pb-7' : 'pb-5'">
                                        <span class="t12 w700 text-sGrayLighten2">شماره تماس: </span>

                                        <span class="t12 fw700 text-sGrayDarken2 number-font">{{ userOrder?.receiver_mobile }}</span>
                                    </div>

                                    <div v-if="userOrder && userOrder?.receiver_address" class="pb-7">
                                        <span class="d-block t14 w700 text-sGrayLighten2 mb-3">آدرس:</span>

                                        <span class="d-block t12 fw700 text-sGrayDarken2 number-font">{{ userOrder?.receiver_address }}</span>
                                    </div>
                                </div>

                                <div class="order-details" :class="screenType === 'desktop' ? 'pt-7' : 'pt-5'">
                                    <div v-if="userOrder && userOrder?.status" class="d-flex align-center justify-space-between" :class="screenType === 'desktop' ? 'pb-7' : 'pb-5'">
                                        <span class="t12 w700 text-sGrayLighten2">مبلغ سفارش: </span>

                                        <span class="t12 fw700 text-sGray number-font">
                                            {{splitChar(Number(String(userOrder.total_price).slice(0, -1)))}}
                                            <SvgToman />
                                        </span>
                                    </div>

                                    <div v-if="userOrder && userOrder?.order_number" class="d-flex align-center justify-space-between" :class="screenType === 'desktop' ? 'pb-7' : 'pb-5'">
                                        <span class="t12 w700 text-sGrayLighten2">سود شما: </span>

                                        <span class="t12 fw700 text-sGray number-font">
                                            {{splitChar(Number(String(userOrder.total_discount).slice(0, -1)))}}
                                            <SvgToman />
                                        </span>
                                    </div>

                                    <div v-if="userOrder && userOrder?.order_number" class="d-flex align-center justify-space-between" :class="screenType === 'desktop' ? 'pb-7' : 'pb-5'">
                                        <span class="t12 w700 text-sGrayLighten2">هزینه ارسال: </span>

                                        <span class="t12 fw700 text-sGray number-font">
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

                                <div class="order-card__action justify-end d-flex w-100 mb-2">
<!--                                    <template v-if="userOrder?.status === 'sending'">-->
<!--                                        <div class="w-100 bg-white pa-3 s-border br12 s-border&#45;&#45;light-gray">-->
<!--                                            <span class="t14 w700 text-sGrayDarken2 d-block w-100 text-right mb-2 mt-1">آیا سفارش به دست شما رسیده ؟</span>-->
<!--                                            <div class="d-flex justify-end">-->
<!--                                                <v-btn :loading="receivedLoading" class="bg-sSuccessLighten2 s-btn s-btn&#45;&#45;outline s-btn&#45;&#45;outline-success" width="128" @click="changeStatus()">-->
<!--                                                    <span class="text-sSuccess t12 w700">بلی</span>-->
<!--                                                </v-btn>-->
<!--                                            </div>-->
<!--                                        </div>-->
<!--                                    </template>-->

                                    <!-- <template v-else-if="userOrder?.status === 'received'">
                                        <div class="d-flex align-center w-100 justify-center">
                                            <v-btn class="s-btn s-btn--fill s-btn--fill-primary" :width="screenType === 'desktop' ? '50%' : '100%'" :href="`/user/order/${userOrder?.id}/return`">
                                                <span class="text-white t12 w700">مرجوع سفارش</span>
                                            </v-btn>
                                        </div>
                                    </template> -->

                                    <template v-if="userOrder?.status === 'payment_out_date' || userOrder?.status=== 'cancelled'">
                                        <div class="d-flex align-center w-100 justify-center">
                                            <v-btn class="s-btn s-btn--fill s-btn--fill-primary" :width="screenType === 'desktop' ? '50%' : '100%'" @click="createOrder()">
                                                <span class="text-white t12 w700"> سفارش مجدد</span>
                                            </v-btn>
                                        </div>
                                    </template>

                                    <template v-else-if="userOrder?.status === 'payment_in_progress'">
                                        <div class="d-flex align-center w-100 justify-center">
                                            <v-btn class="s-btn s-btn--fill s-btn--fill-primary" :width="screenType === 'desktop' ? '50%' : '100%'" @click="repeatPayment()" :loading="reCreateOrderLoading">
                                                <span class="text-white t12 w700"> پرداخت مجدد</span>
                                            </v-btn>
                                        </div>
                                    </template>

                                    <template v-else-if="userOrder?.status === 'pre_progress'">
                                        <div class="d-flex align-center w-100 justify-center">
                                            <v-btn class="s-btn s-btn--fill s-btn--fill-primary" :width="screenType === 'desktop' ? '50%' : '100%'" :href="`/user/order/${userOrder?.id}/cancel`">
                                                <span class="text-white t12 w700">لغو کل سفارش</span>
                                            </v-btn>
                                        </div>
                                    </template>
                                </div>
                            </div>

                            <div v-if="userOrder?.details && userOrder?.details.length" class="sku-list mt-6">
                                <header class="d-flex align-center justify-space-between mb-6">
                                    <div class="d-flex align-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" class="ml-1">
                                            <path d="M6.60563 1.5L3.89062 4.2225" stroke="#3C3C3C" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M11.3906 1.5L14.1056 4.2225" stroke="#3C3C3C" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M1.5 5.88745C1.5 4.49995 2.2425 4.38745 3.165 4.38745H14.835C15.7575 4.38745 16.5 4.49995 16.5 5.88745C16.5 7.49995 15.7575 7.38745 14.835 7.38745H3.165C2.2425 7.38745 1.5 7.49995 1.5 5.88745Z" stroke="#3C3C3C" stroke-width="1.5" />
                                            <path d="M7.32031 10.5V13.1625" stroke="#3C3C3C" stroke-width="1.5" stroke-linecap="round" />
                                            <path d="M10.7695 10.5V13.1625" stroke="#3C3C3C" stroke-width="1.5" stroke-linecap="round" />
                                            <path d="M2.625 7.5L3.6825 13.98C3.9225 15.435 4.5 16.5 6.645 16.5H11.1675C13.5 16.5 13.845 15.48 14.115 14.07L15.375 7.5" stroke="#3C3C3C" stroke-width="1.5" stroke-linecap="round" />
                                        </svg>
                                        <span class="t16 w700 text-sGrayDarken2">لیست خرید</span>
                                    </div>

                                    <span class="t10 fw400 number-font text-sGray">{{ userOrder?.details.length }} محصول</span>
                                </header>

                                <GeneralOrdersDetailsCard v-for="order in userOrder?.details" :key="`order${order.id}`" :content="order" class="mb-4" :orderId="userOrder?.id" :status="userOrder?.status"/>
                            </div>
                        </div>
                    </v-card>
                </div>
            </div>
        </v-row>
    </v-container>
    <generalModalsDelete ref="changeStatusModal" title="تغییر وضعیت سفارش" text="آیا از تغییر وضعیت سفارش  اطمینان  دارید؟" submitText="بله" @removeProduct="receivedOrder" />
    <generalSheetsDelete ref="changeStatusSheet" title="تغییر وضعیت سفارش" text="آیا از تغییر وضعیت سفارش  اطمینان  دارید؟" submitText="بله" @removeProduct="receivedOrder" />

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
            receivedLoading: false,
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
        async createOrder() {
            this.reCreateOrder(this.userOrder ?.id)
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
        },

        /**
         * Change order status confirm
         */
        changeStatus() {
            if (this.screenType === 'desktop') {
                this.$refs.changeStatusModal.dialog = true;
            } else {
                this.$refs.changeStatusSheet.sheet = true;
            }
        },

        /**
         * Received order
         * @param {*} id 
         */
        receivedOrder() {
            this.receivedLoading = true;

            const formData = new FormData()

            formData.append('order_id', this.userOrder ?.id)

            axios
                .post(this.runtimeConfig.public.apiBase + '/user/return-order/received', formData, {
                    headers: {
                        Authorization: `Bearer ${this.userToken}`,
                    },
                })
                .then((response) => {
                    if (this.screenType === 'desktop') {
                        this.$refs.changeStatusModal.dialog = false;
                        this.$refs.changeStatusModal.loading = false;
                    } else {
                        this.$refs.changeStatusSheet.sheet = false;
                        this.$refs.changeStatusSheet.loading = false;
                    }
                    this.getOrder();
                })
                .catch((err) => {
                  this.$store.commit('set_snackBar', {
                    show:true , text:err.response.data.message, status:'error'
                  })
                  this.$store.commit('set_snackBar', {
                    show:true , text:err.response.data.message, status:'error'
                  })

                }).finally(() => {
                    this.receivedLoading = false;
                });
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
