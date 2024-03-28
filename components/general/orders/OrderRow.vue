<template>
<section v-if="content" class="order-row pt-5">
    <header class="d-flex justify-space-between align-center mb-8">
        <div class="order-row__details d-flex align-center flex-grow-1">
            <div class="d-flex align-center flex-grow-1">
                <span class="t12 w400 text-pink-darken-2 d-flex align-center">
                    <v-icon icon="mdi-circle ml-1" color="pink-darken-2" />
                    وضعیت:
                </span>
                <span v-if="content.status" class="t12 w400 text-pink-darken-2 mr-1">{{findOrderStatus(content.status)}}</span>
            </div>

            <div class="d-flex align-center flex-grow-1">
                <span class="t12 w400 text-pink-darken-2 d-flex align-center">
                    <v-icon icon="mdi-circle ml-1" color="pink-darken-2" />
                    تاریخ:
                </span>
                <span v-if="content.submit_date_fa" class="t12 w400 text-pink-darken-2 number-font">{{content.submit_date_fa}}</span>
            </div>

            <div class="d-flex align-center flex-grow-1">
                <span class="t12 w400 text-pink-darken-2 d-flex align-center">
                    <v-icon icon="mdi-circle ml-1" color="pink-darken-2" />
                    کد سفارش:
                </span>
                <span v-if="content.order_number" class="t12 w400 text-pink-darken-2 number-font">{{content.order_number}}</span>
            </div>

            <div class="d-flex align-center flex-grow-1">
                <span class="t12 w400 text-pink-darken-2 d-flex align-center">
                    <v-icon icon="mdi-circle ml-1" color="pink-darken-2" />
                    مبلغ:
                </span>
                <span v-if="content.paid_price !== null" class="t12 w400 text-pink-darken-2 number-font">{{ splitChar(Number(String(content.paid_price).slice(0, -1))) }} تومان</span>
            </div>
        </div>
        <div class="order-row__show-details mr-10">
            <a class="d-flex align-center" :href="`/user/order/${content.id}`">
                <span class="text-grey-darken-1 t12 w400 xs-hide">مشاهده جزئیات</span>
                <v-icon icon="mdi-chevron-left mr-2" color="grey-darken-1" />
            </a>
        </div>
    </header>

    <div class="scroll--x">
        <div class="order-row__items d-flex flex-nowrap pb-5">
            <template v-if="content.details && content.details.length">
                <generalProductSimpleCard
                    v-for="(sku, index) in content.details"
                    :key="`sku${index}`"
                    tag="div"
                    :image="sku.shps?.sku?.image_url"
                    :label="sku.shps?.sku?.label" />
            </template>
        </div>
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
                },
                {
                    text: 'در انتظار پرداخت',
                    value: 'payment_in_progress'
                }
            ]
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
        }
    }
}
</script>

<style lang="scss">
@import '~/assets/scss/components/general/user/order-row.scss';
</style>
