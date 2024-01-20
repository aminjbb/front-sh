<template>
<section v-if="content" class="order-row pt-5">
    <header class="d-flex justify-space-between align-center mb-8">
        <div class="order-row__details d-flex align-center flex-grow-1">
            <div class="d-flex align-center flex-grow-1">
                <span class="t12 w400 text-pink-darken-2 d-flex align-center">
                    <v-icon icon="mdi-circle ml-1" color="pink-darken-2" />
                    وضعیت:
                </span>
                <span v-if="content.status" class="t12 w400 text-pink-darken-2">{{findOrderStatus(content.status)}}</span>
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
                <span v-if="content.id" class="t12 w400 text-pink-darken-2 number-font">{{content.id}}</span>
            </div>

            <div class="d-flex align-center flex-grow-1">
                <span class="t12 w400 text-pink-darken-2 d-flex align-center">
                    <v-icon icon="mdi-circle ml-1" color="pink-darken-2" />
                    مبلغ:
                </span>
                <span v-if="content.total_price" class="t12 w400 text-pink-darken-2  number-font">{{splitChar(content.total_price)}} تومان</span>
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
    },
    data(){
      return{
        /**
         * order statuses
         */
        orderStatus:[
          {
            text:'پرداخت شده', value :'paid'
          },
          {
            text:'در حال پردازش', value :'pre_progress'
          },
          {
            text:'ارسال شده', value :'sending'
          },
        ]
      }
    },
    methods:{
      /**
       * find order status
       */
      findOrderStatus(status){
        const findStatus = this.orderStatus.find(element=> element.value === status)
        if (findStatus)  return findStatus.text
      }
    }
}
</script>

<style lang="scss">
@import '~/assets/scss/components/general/user/order-row.scss';
</style>
