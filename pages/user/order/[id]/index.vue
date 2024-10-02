<template>
<main class="v-order v-order--single pt-15">
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
                    <v-card class="py-5 mobile-pa-0 mobile-no-border v-order__inner d-flex flex-column">
                        <header class="d-flex align-center justify-space-between mb-5 xs-hide px-5">
                            <div class="d-flex align-center">
                                <a href="/user/order" class="ml-3">
                                    <v-icon icon="mdi-arrow-right" color="grey-darken-3" />
                                </a>
                                <span>جزئیات سفارش</span>
                            </div>

                            <div class="d-flex align-center">
                                <v-icon icon="mdi-receipt-text-check-outline ml-2" color="grey" />
                                <span class="t13 w400 text-grey">مشاهده فاکتور</span>
                            </div>
                        </header>

                        <v-divider color="grey" class="xs-hide" />

                        <div class="px-5">
                            <v-row v-if="userOrder?.snapp_transaction_id && userOrder?.snapp_transaction_id !== null" class="order-details my-0">
                                <v-col cols="12" sm="6" lg="3" class="d-flex align-center order-details__item py-5">
                                    <v-icon icon="mdi-circle ml-1" color="grey-darken-1" />
                                    <span class="t13 w400 text-grey-darken-1 ml-1">کد سفارش:</span>
                                    <span v-if="userOrder && userOrder.id" class="t13 w400 text-grey-darken-3 number-font">{{ userOrder.order_number }}</span>
                                </v-col>
                                <v-col cols="12" sm="6" lg="4" class="d-flex align-center order-details__item py-5">
                                    <div v-if="userOrder && userOrder.snapp_transaction_id">
                                        <v-icon icon="mdi-circle ml-1" color="grey-darken-1" />
                                        <span class="t13 w400 text-grey-darken-1 ml-1">کد اسنپ پی:</span>
                                        <span class="t13 w400 text-grey-darken-3 number-font">{{ userOrder.snapp_transaction_id }}</span>
                                    </div>
                                </v-col>

                                <v-col cols="12" sm="6" lg="8" class="d-flex align-center order-details__item py-5">
                                    <v-icon icon="mdi-circle ml-1" color="grey-darken-1" />
                                    <span class="t13 w400 text-grey-darken-1 ml-1">تاریخ تحویل:</span>
                                    <span class="t13 w400 text-grey-darken-3 number-font">زمان تقریبی تحویل سفارش 5 الی 8 روز کاری می‌باشد.</span>
                                </v-col>
                                <v-col cols="12" sm="6" lg="4" class="d-flex align-center order-details__item py-5 justify-end">
                                    <a v-if="(userOrder && userOrder.id) && (userOrder.status == 'pre_progress')" :href="`/user/order/${userOrder.id}/cancel`" class="d-flex align-center mobile-button">
                                        <span class="text-grey-darken-1 t13 w400">
                                            <template v-if="userOrder.status == 'pre_progress'">
                                                درخواست لغو
                                            </template>
                                            <template v-if="userOrder.status == 'received-dd'">
                                                درخواست مرجوعی
                                            </template>
                                        </span>
                                        <v-icon icon="mdi-chevron-left" color="grey-darken-1" />
                                    </a>

                                    <template v-if="userOrder && userOrder.status == 'payment_in_progress'">
                                        <v-btn @click="repeatPayment" height="28" title="پرداخت مجدد" style="height: 32px !important;" class="btn btn--submit">
                                            پرداخت مجدد
                                        </v-btn>
                                    </template>

                                    <template v-if="userOrder && userOrder.status == 'payment_out_date'">
                                        <v-btn @click="reOrder()" :loading="reCreateOrderLoading" height="28" style="height: 32px !important;" title="سفارش مجدد" class="btn btn--submit">
                                            سفارش مجدد
                                        </v-btn>
                                    </template>
                                </v-col>

                            </v-row>

                            <v-row v-else class="order-details my-0">
                                <v-col cols="12" sm="4" lg="3" class="d-flex align-center order-details__item py-5">
                                    <v-icon icon="mdi-circle ml-1" color="grey-darken-1" />
                                    <span class="t13 w400 text-grey-darken-1 ml-1">کد سفارش:</span>
                                    <span v-if="userOrder && userOrder.id" class="t13 w400 text-grey-darken-3 number-font">{{ userOrder.order_number }}</span>
                                </v-col>

                                <v-col cols="12" sm="6" lg="6" class="d-flex align-center order-details__item py-5">
                                    <v-icon icon="mdi-circle ml-1" color="grey-darken-1" />
                                    <span class="t13 w400 text-grey-darken-1 ml-1">تاریخ تحویل:</span>
                                    <span class="t13 w400 text-grey-darken-3 number-font">زمان تقریبی تحویل سفارش 5 الی 8 روز کاری می‌باشد.</span>
                                </v-col>

                                <v-col cols="12" sm="4" lg="3" class="d-flex align-center order-details__item py-5 justify-end">
                                    <a v-if="(userOrder && userOrder.id) && (userOrder.status == 'pre_progress')" :href="`/user/order/${userOrder.id}/cancel`" class="d-flex align-center mobile-button">
                                        <span class="text-grey-darken-1 t13 w400">
                                            <template v-if="userOrder.status == 'pre_progress'">
                                                درخواست لغو
                                            </template>
                                            <template v-if="userOrder.status == 'received-dd'">
                                                درخواست مرجوعی
                                            </template>
                                        </span>
                                        <v-icon icon="mdi-chevron-left" color="grey-darken-1" />
                                    </a>

                                    <template v-if="userOrder && userOrder.status == 'payment_in_progress'">
                                        <v-btn @click="repeatPayment" height="28" style="height: 32px !important;" title="پرداخت مجدد" class="btn btn--submit">
                                            پرداخت مجدد
                                        </v-btn>
                                    </template>

                                    <template v-if="userOrder && userOrder.status == 'payment_out_date'">
                                        <v-btn @click="reOrder()" :loading="reCreateOrderLoading" height="28" style="height: 32px !important;" title="سفارش مجدد" class="btn btn--submit">
                                            سفارش مجدد
                                        </v-btn>
                                    </template>
                                </v-col>
                            </v-row>

                            <v-divider color="grey" />

                            <v-row class="order-details my-0">
                                <v-col cols="12" sm="4" lg="3" class="d-flex align-center order-details__item py-5">
                                    <v-icon icon="mdi-circle ml-1" color="grey-darken-1" />
                                    <span class="t13 w400 text-grey-darken-1 ml-1">شماره تماس:</span>
                                    <span v-if="userOrder && userOrder.receiver_mobile" class="t13 w400 text-grey-darken-3 number-font">{{ userOrder.receiver_mobile }}</span>
                                </v-col>

                                <v-col cols="12" sm="5" lg="3" class="d-flex align-center order-details__item py-5">
                                    <v-icon icon="mdi-circle ml-1" color="grey-darken-1" />
                                    <span class="t13 w400 text-grey-darken-1 ml-1">تحویل‌گیرنده:</span>
                                    <span v-if="userOrder && userOrder.receiver_name" class="t13 w400 text-grey-darken-3">{{ userOrder.receiver_name }}</span>
                                </v-col>

                                <v-col cols="12" class="d-flex align-center order-details__item py-5">
                                    <v-icon icon="mdi-circle ml-1" color="grey-darken-1" />
                                    <span class="t13 w400 text-grey-darken-1 ml-1">آدرس:</span>
                                    <span v-if="userOrder && userOrder.receiver_address" class="t13 w400 text-grey-darken-3 number-font">{{
                        userOrder.receiver_address
                        }}</span>
                                </v-col>
                            </v-row>

                            <v-divider color="grey" />

                            <v-row class="order-details my-0">
                                <v-col cols="12" sm="3" lg="3" class="d-flex align-center order-details__item py-5">
                                    <v-icon icon="mdi-circle ml-1" color="grey-darken-1" />
                                    <span class="t13 w400 text-grey-darken-1 ml-1">مبلغ:</span>
                                    <span v-if="userOrder" class="t13 w400 text-grey-darken-3 number-font">{{
                        splitChar(Number(String(userOrder.total_price).slice(0, -1)))
                        }} تومان</span>
                                </v-col>

                                <v-col cols="12" sm="3" lg="3" class="d-flex align-center order-details__item py-5">
                                    <v-icon icon="mdi-circle ml-1" color="grey-darken-1" />
                                    <span class="t13 w400 text-grey-darken-1 ml-1">سود شما:</span>
                                    <span v-if="userOrder" class="t13 w400 text-grey-darken-3 number-font">
                                        {{ splitChar(Number(String(userOrder.total_discount).slice(0, -1))) }}
                                        تومان</span>
                                </v-col>

                                <v-col cols="12" sm="3" lg="3" class="d-flex align-center order-details__item py-5">
                                    <v-icon icon="mdi-circle ml-1" color="grey-darken-1" />
                                    <span class="t13 w400 text-grey-darken-1 ml-1">هزینه ارسال:</span>
                                    <span v-if="userOrder && userOrder.sending_price" class="t13 w400 text-grey-darken-3 number-font">{{
                        splitChar(Number(String(userOrder.sending_price).slice(0, -1)))
                        }} تومان</span>
                                    <span v-else-if="userOrder?.sending_price == 0" class="t13 w400 text-grey-darken-3 number-font">رایگان</span>
                                </v-col>

                                <v-col cols="12" sm="3" lg="3" class="d-flex align-center order-details__item justify-end py-3">
                                    <generalOrdersInterceptionModal />
                                </v-col>
                            </v-row>

                            <v-divider color="grey" />

                            <div v-if="userOrder && userOrder.details && userOrder.details.length">
                                <template v-for="(order, index) in userOrder.details" :key="`order${order.id}`">
                                    <generalProductOrderCard :content="order" />
                                    <v-divider v-if="index + 1 < userOrder.details.length " color="grey-lighten-1" />
                                </template>
                            </div>

                            <template v-else>
                                <generalLoading />
                            </template>
                        </div>

                    </v-card>
               </div>
            </div>
        </v-row>
    </v-container>
    <generalOrdersPaymentMethodModal ref="selectPaymentMethod" :view="screenType === 'desktop' ? 'desktop' : 'mobile'" :orderId ="userOrder?.id" :paidPrice = "userOrder?.paid_price"/>
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
    watch:{
    reCreateOrderLoading(newVal){
      if (!newVal){
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
