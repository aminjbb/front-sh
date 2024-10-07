<template>
<main class="v-order v-order--list">
    <header class="v-user__mobile-page-head xs-show">
        <a href="/user/dashboard" class="ml-1">
            <v-icon icon="mdi-chevron-right" color="grey-darken-3" />
        </a>
        <span class="text-sGrayDarken2 t14 w700">لیست سفارش ها</span>
    </header>

    <v-container>
        <v-row>
            <div class="col-3 py-4 xs-hide">
                <generalUserSidebar />
            </div>
            <div class="col-9 pa-4 mobile-pa-0">
                <div>
                    <v-card class="pa-8 mobile-pa-0 v-order__card">
                        <template v-if="userOrders && userOrders.length">
                            <header class="d-flex align-center justify-space-between xs-hide card__header pt-6">
                                <span class="w700 t18 text-sGrayDarken2">لیست سفارشات</span>
                            </header>

                            <div class="px-3" :class="screenType === 'desktop' ? 'pb-5' : ''">
                                <GeneralTab :class="screenType === 'desktop' ? 'pr-5' : ''" :scroll="screenType === 'desktop' ? true : false" :height="screenType === 'desktop' ? '500px' : 'auto'" :tabHeader="statusList" :items="categorizedOrders" showAll :allItems="userOrders" AllTitle="همه سفارشات" allIcon="mdi-cart-outline" componentName="generalOrdersCard" activeExtraComponent extraComponentName="generalOrdersGiftCard" emptyTitle="سفارشی" :hideButton="true" emptyImage="emptyOrder.svg" @updateList="updateList"/>
                            </div>
                        </template>
                        <template v-else>
                            <div class="d-flex flex-column justify-center align-center pt-15 pb-15">
                                <svgEmptyOrder />

                                <span class="t18 w700 text-sGrayDarken2 mt-2 text-center mb-4">سفارشی در این بخش موجود نیست.</span>

                                <v-btn href="/" height="44" title="بازدید از سایت" color="primary" prepend-icon="mdi-message-processing-outline" class="btn btn--submit br12 px-7" :block="screenType === 'mobile' ? true : false">
                                    بازدید از سایت
                                </v-btn>
                            </div>
                        </template>
                    </v-card>
                </div>
            </div>
        </v-row>
    </v-container>
</main>
</template>

<script>
import Order from '@/composables/Order.js'

export default {
    data() {
        return {
            screenType: null,
            buttonLink:'https://old.shavaz.com/profile/my-orders',
            statusList: [{
                    name: 'processing',
                    label: 'درحال پردازش',
                    icon: 'mdi-basket-outline'
                },
                {
                    name: 'sending',
                    label: 'درحال ارسال',
                    icon: 'mdi-truck-fast-outline'
                },
                {
                    name: 'received',
                    label: 'تحویل شده',
                    icon: 'mdi-bag-personal-outline'
                },
                {
                    name: 'returned',
                    label: 'مرجوعی',
                    icon: 'mdi-sync'
                }
            ]
        }
    },

    setup() {
        const title = ref('فروشگاه اینترنتی شاواز | لیست سفارشات من')
        const description = ref("لیست سفارشات کاربر - سفارشات تایید شده - سفارشات در حال پردازش - سفارشات ارسال شده - سفارشات در حال ارسال - سفارشات مرجوعی")
        const {
            getOrderList,
            orderList,
            getReturnedOrderList,
            returnedOrderList
        } = new Order()
        useHead({
            title,
            meta: [{
                name: 'description',
                content: description
            }]
        })
        return {
            getOrderList,
            orderList,
            getReturnedOrderList,
            returnedOrderList
        }
    },

    computed: {
        categorizedOrders() {
            let arr = []
            if (this.orderList ?.data ?.data ?.data && this.orderList ?.data ?.data ?.data.length) {
                arr = this.orderList ?.data ?.data ?.data.reduce((acc, order) => {
                    if (!acc[order.status]) {
                        acc[order.status] = [];
                    }
                    acc[order.status].push(order);
                    return acc;
                }, {});
                arr['returned'] = this.returnedOrderList ?.data ?.data ?.data && this.returnedOrderList ?.data ?.data ?.data.length ? this.returnedOrderList ?.data ?.data ?.data  : [];

                return arr;

            } else {
                return null;
            }
        },

        /** user order list **/
        userOrders() {
            try {
                if(this.orderList && this.orderList ?.data ?.data ?.data){
                    return this.orderList ?.data ?.data ?.data
                }
            } catch (e) {
                return []
            }
        },
    },

    methods: {
        updateList(value){
            if(value === true){
                this.getOrderList()
                this.getReturnedOrderList()
            }
        }
    },

    beforeMount() {
        this.getOrderList()
        this.getReturnedOrderList()
    },

    mounted() {
        /**
         * Check screen size
         */
        window.innerWidth < 769 ? this.screenType = 'mobile' : this.screenType = 'desktop';
    },

}
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";
@import '~/assets/scss/views/user.scss';
@import '~/assets/scss/views/order.scss';
</style>
