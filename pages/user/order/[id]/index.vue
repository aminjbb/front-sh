<template lang="">
<main class="v-order v-order--single">
    <header class="v-user__mobile-page-head xs-show">
        <a href="/user/dashboard" class="ml-3">
            <v-icon icon="mdi-arrow-right" color="grey-darken-3" />
        </a>
        <span class="grey-darken-3 t14">جزئیات سفارش</span>
    </header>

    <v-container>
        <v-row>
            <div class="col-3 pa-4 xs-hide">
                <generalUserSidebar />
            </div>
            <div class="col-9 pa-4 mobile-pa-0">
                <v-card class="py-5 mobile-pa-0 mobile-no-border v-order__inner d-flex flex-column">
                    <header class="d-flex align-center justify-space-between mb-5 xs-hide px-5">
                        <div class="d-flex align-center">
                            <a href="/user/dashboard" class="ml-3">
                                <v-icon icon="mdi-arrow-right" color="grey-darken-3" />
                            </a>
                            <span>جزئیات سفارش</span>
                        </div>

                        <div class="d-flex align-center">
                            <v-icon icon="mdi-receipt-text-check-outline ml-2" color="grey" />
                            <span class="t13 w400 text-grey">مشاهده فاکتور</span>
                        </div>
                    </header>

                    <v-divider color="grey" />

                    <div class="px-5">
                        <v-row class="order-details my-0">
                            <v-col
                                cols="12"
                                md="4"
                                lg="2"
                                class="d-flex align-center order-details__item py-5">
                                <v-icon icon="mdi-circle ml-1" color="grey-darken-1" />
                                <span class="t13 w400 text-grey-darken-1">کد سفارش:</span>
                                <span v-if="order && order.id" class="t13 w400 text-grey-darken-3 number-font">{{order.id}}</span>
                            </v-col>
                            <v-col
                                cols="12"
                                md="5"
                                lg="3"
                                class="d-flex align-center order-details__item py-5">
                                <v-icon icon="mdi-circle ml-1" color="grey-darken-1" />
                                <span class="t13 w400 text-grey-darken-1">تاریخ تحویل:</span>
                                <span v-if="order && order.date" class="t13 w400 text-grey-darken-3 number-font">{{order.date}}</span>
                            </v-col>
                        </v-row>

                        <v-divider color="grey" />

                        <v-row class="order-details my-0">
                            <v-col
                                cols="12"
                                md="4"
                                lg="3"
                                class="d-flex align-center order-details__item py-5">
                                <v-icon icon="mdi-circle ml-1" color="grey-darken-1" />
                                <span class="t13 w400 text-grey-darken-1">شماره تماس:</span>
                                <span v-if="order && order.phone" class="t13 w400 text-grey-darken-3 number-font">{{order.phone}}</span>
                            </v-col>

                            <v-col
                                cols="12"
                                md="5"
                                lg="3"
                                class="d-flex align-center order-details__item py-5">
                                <v-icon icon="mdi-circle ml-1" color="grey-darken-1" />
                                <span class="t13 w400 text-grey-darken-1">تحویل‌گیرنده:</span>
                                <span v-if="order && order.receiver_name" class="t13 w400 text-grey-darken-3">{{order.receiver_name}}</span>
                            </v-col>

                            <v-col cols="12" class="d-flex align-center order-details__item py-5">
                                <v-icon icon="mdi-circle ml-1" color="grey-darken-1" />
                                <span class="t13 w400 text-grey-darken-1">آدرس:</span>
                                <span v-if="order && order.address" class="t13 w400 text-grey-darken-3 number-font">{{order.address}}</span>
                            </v-col>
                        </v-row>

                        <v-divider color="grey" />

                        <v-row class="order-details my-0">
                            <v-col
                                cols="12"
                                md="4"
                                lg="3"
                                class="d-flex align-center order-details__item py-5">
                                <v-icon icon="mdi-circle ml-1" color="grey-darken-1" />
                                <span class="t13 w400 text-grey-darken-1">مبلغ:</span>
                                <span v-if="order && order.price" class="t13 w400 text-grey-darken-3 number-font">{{splitChar(order.price)}} تومان</span>
                            </v-col>
                            <v-col
                                cols="12"
                                md="5"
                                lg="3"
                                class="d-flex align-center order-details__item py-5">
                                <v-icon icon="mdi-circle ml-1" color="grey-darken-1" />
                                <span class="t13 w400 text-grey-darken-1">سود شما:</span>
                                <span v-if="order && order.profit" class="t13 w400 text-grey-darken-3 number-font">{{order.profit}} تومان</span>
                            </v-col>

                            <v-col
                                cols="12"
                                md="5"
                                lg="3"
                                class="d-flex align-center order-details__item py-5">
                                <v-icon icon="mdi-circle ml-1" color="grey-darken-1" />
                                <span class="t13 w400 text-grey-darken-1">هزینه ارسال:</span>
                                <span v-if="order && order.shipping" class="t13 w400 text-grey-darken-3 number-font">{{splitChar(order.shipping)}} تومان</span>
                            </v-col>
                        </v-row>

                        <v-divider color="grey" />

                        <div>
                            <template v-for="(item, index) in mocketData" :key="`order${index}`">
                                <generalProductOrderCard :content="item" />
                                <v-divider v-if="index + 1 < mocketData.length " color="grey-lighten-1" />
                            </template>
                        </div>
                    </div>
                </v-card>
            </div>
        </v-row>
    </v-container>
</main>
</template>

    
    
<script>
import {
    splitChar
} from "~/utils/functions.js";

export default {
    data() {
        return {
            order: null,
            products:null,/* after set api data be in this data */
            mocketData: [{
                    image: {
                        image_url: 'products.jpg'
                    },
                    label: 'ماشین اصلاح موی صورت لکسیکال مدل LHC-5631',
                    brand: 'لکسیکال',
                    color: {
                        label: 'سبز',
                        code: '#388E3C',
                    },
                    seller: 'سلامت‌گستران نفیس',
                    count: '2',
                    customer_price: '42558',
                    site_price: '51900',
                    status: 'return-request',
                    discount: '1'

                },
                {
                    image: {
                        image_url: 'products.jpg'
                    },
                    label: 'شامپو تقویت‌کننده و ضدریزش مو فولیکا',
                    brand: 'لکسیکال',
                    color: {
                        label: 'توسی',
                        code: '#aaaaaa',
                    },
                    seller: 'سلامت‌گستران نفیس',
                    count: '5',
                    customer_price: '42558',
                    site_price: '51900',
                    status: 'return-cancel',
                    discount: '1'
                }
            ]
        }
    },

    setup() {
        const title = ref('فروشگاه اینترنتی شاواز | جزئیات سفارش')
        const description = ref("لیست سفارشات کاربر - سفارشات تایید شده - سفارشات در حال پردازش - سفارشات ارسال شده - سفارشات در حال ارسال - سفارشات مرجوعی")

        useHead({
            title,
            meta: [{
                name: 'description',
                content: description
            }]
        })
    },

    methods: {
        splitChar,
    }
}
</script>
    
<style lang="scss">
@import "~/assets/scss/tools/bp";
@import '~/assets/scss/views/user.scss';
@import '~/assets/scss/views/order.scss';
</style>
