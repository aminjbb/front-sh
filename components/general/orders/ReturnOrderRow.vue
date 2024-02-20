<template>
<section v-if="content" class="order-row pt-5">
    <header class="d-flex justify-space-between align-center mb-8">
        <div class="order-row__details d-flex align-center flex-grow-1">
            <div class="d-flex align-center flex-grow-1">
                <span class="t12 w400 text-pink-darken-2 d-flex align-center">
                    <v-icon icon="mdi-circle ml-1" color="pink-darken-2" />
                    وضعیت:
                </span>
                <span v-if="content.order.status" class="t12 w400 text-pink-darken-2 mr-1">{{findOrderStatus(content.order.status)}}</span>
            </div>

            <div class="d-flex align-center flex-grow-1">
                <span class="t12 w400 text-pink-darken-2 d-flex align-center">
                    <v-icon icon="mdi-circle ml-1" color="pink-darken-2" />
                    تاریخ مرجوعی:
                </span>
                <span v-if="content.created_at_fa" class="t12 w400 text-pink-darken-2 number-font">{{content.created_at_fa}}</span>
            </div>

            <div class="d-flex align-center flex-grow-1">
                <span class="t12 w400 text-pink-darken-2 d-flex align-center">
                    <v-icon icon="mdi-circle ml-1" color="pink-darken-2" />
                    کد پیگیری مرجوعی:
                </span>
                <span v-if="content.id" class="t12 w400 text-pink-darken-2 number-font">{{content.id}}</span>
            </div>

            <div class="d-flex align-center flex-grow-1">
                <span class="t12 w400 text-pink-darken-2 d-flex align-center">
                    <v-icon icon="mdi-circle ml-1" color="pink-darken-2" />
                    مبلغ:
                </span>
                <span v-if="content.price !== null" class="t12 w400 text-pink-darken-2 number-font">{{ splitChar(Number(String(content.price).slice(0, -1))) }} تومان</span>
            </div>
        </div>
        <div class="order-row__show-details mr-10">
            <a class="d-flex align-center" :href="`/user/order/${content.id}/return/details`">
                <span class="text-grey-darken-1 t12 w400 xs-hide">مشاهده جزئیات</span>
                <v-icon icon="mdi-chevron-left mr-2" color="grey-darken-1" />
            </a>
        </div>
    </header>

    <div>
        <template v-for="(order, index) in content.details" :key="`order${order.id}`">
            <generalProductOrderCard
                :content="order"
                orderStatus="return"
                hideButtons
                :title="findOrderTitle(order.return_reason)"
                returnTab />
            <v-divider v-if="index + 1 < content.details.length " color="grey-lighten-1" />
        </template>
    </div>
</section>
</template>

<script>
import {
    splitChar
} from "~/utils/functions.js";

export default {
    props: {
        /**
         * Content
         */
        content: Object,
    },
    data() {
        return {
            /**
             * order statuses
             */
            orderStatus: [{
                    text: 'پرداخت شده',
                    value: 'paid'
                },
                {
                    text: 'پیش پردازش',
                    value: 'pre_progress'
                },
                {
                    text: 'در حال ارسال',
                    value: 'sending'
                },
                {
                    text: 'در حال پردازش',
                    value: 'processing'
                },
                {
                    text: 'لغو شده',
                    value: 'cancelled'
                },
                {
                    text: 'تحویل شده',
                    value: 'received'
                },
                {
                    text: 'مرجوعی',
                    value: 'returned'
                }
            ],

            returnReasonItems: [{
                    label: 'کالا اشتباه ارسال شده است',
                    value: 'wrong'
                },
                {
                    label: 'کالا خراب است.',
                    value: 'broken'
                },
                {
                    label: 'کالا به دستم نرسیده است.',
                    value: 'lost'
                }
            ],
        }
    },

    methods: {
        splitChar,

        /**
         * find order status
         */
        findOrderStatus(status) {
            const findStatus = this.orderStatus.find(element => element.value === status)
            if (findStatus) return findStatus.text
        },

        /**
         * find return order title
         */
        findOrderTitle(status) {
            const findStatus = this.returnReasonItems.find(element => element.value === status)
            if (findStatus) return findStatus.label
        }
    }
}
</script>

<style lang="scss">
@import '~/assets/scss/components/general/user/order-row.scss';
</style>
