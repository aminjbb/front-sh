<template lang="">
<section v-if="content" class="order-row pt-5">
    <header class="d-flex justify-space-between align-center mb-8">
        <div class="order-row__details d-flex align-center flex-grow-1">
            <div class="d-flex align-center flex-grow-1">
                <span class="t12 w400 text-pink-darken-2 d-flex align-center">
                    <v-icon icon="mdi-circle ml-1" color="pink-darken-2" />
                    وضعیت:
                </span>
                <span v-if="content.status" class="t12 w400 text-pink-darken-2">{{content.status}}</span>
            </div>

            <div class="d-flex align-center flex-grow-1">
                <span class="t12 w400 text-pink-darken-2 d-flex align-center">
                    <v-icon icon="mdi-circle ml-1" color="pink-darken-2" />
                    تاریخ:
                </span>
                <span v-if="content.date" class="t12 w400 text-pink-darken-2 number-font">{{content.date}}</span>
            </div>

            <div class="d-flex align-center flex-grow-1">
                <span class="t12 w400 text-pink-darken-2 d-flex align-center">
                    <v-icon icon="mdi-circle ml-1" color="pink-darken-2" />
                    کد سفارش:
                </span>
                <span v-if="content.order_id" class="t12 w400 text-pink-darken-2 number-font">{{content.order_id}}</span>
            </div>

            <div class="d-flex align-center flex-grow-1">
                <span class="t12 w400 text-pink-darken-2 d-flex align-center">
                    <v-icon icon="mdi-circle ml-1" color="pink-darken-2" />
                    مبلغ:
                </span>
                <span v-if="content.price" class="t12 w400 text-pink-darken-2  number-font">{{content.price}} تومان</span>
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
            <template v-if="content.skus && content.skus.length">
                <generalProductSimpleCard
                    v-for="(sku, index) in content.skus"
                    :key="`sku${index}`"
                    :content="sku" />
            </template>
        </div>
    </div>
</section>
</template>

<script>
export default {
    props: {
        /**
         * Content
         */
        content: Object,
    }
}
</script>

<style lang="scss">
@import '~/assets/scss/components/general/user/order-row.scss';
</style>
