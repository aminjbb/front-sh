<template>
<main class="v-order v-order--list">
    <header class="v-user__mobile-page-head xs-show">
        <a href="/user/dashboard" class="ml-3">
            <v-icon icon="mdi-arrow-right" color="grey-darken-3" />
        </a>
        <span class="grey-darken-3 t14">لیست سفارشات</span>
    </header>

    <v-container>
      <v-row>
        <div class="col-3 pa-4 xs-hide">
          <generalUserSidebar/>
        </div>
        <div class="col-9 pa-4 mobile-pa-0">
          <v-card class="pa-5 mobile-pa-0 mobile-no-border v-order__inner d-flex flex-column">
            <header class="d-flex align-center justify-space-between mb-5 xs-hide">
              <span>لیست سفارشات</span>
            </header>

            <div class="order-tab flex-grow-1 d-flex flex-column" ref="orderRef">
              <div class="order-tab__items-scroll">
                <div class="order-tab__items d-flex">
                  <div
                      class="order-tab__item order-tab__item--one flex-grow-1 active"
                      @click="showTab(1)"
                      id="order-tab__item-1">
                    <span class="t13 w500 text-grey text-center d-block">همه سفارشات</span>
                  </div>

                  <div
                      class="order-tab__item order-tab__item--two flex-grow-1"
                      @click="showTab(2)"
                      id="order-tab__item-2">
                    <span class="t13 w500 text-grey text-center d-block">در حال پردازش</span>
                  </div>

                  <div
                      class="order-tab__item order-tab__item--three flex-grow-1"
                      @click="showTab(3)"
                      id="order-tab__item-3">
                    <span class="t13 w500 text-grey text-center d-block">در حال ارسال</span>
                  </div>

                  <div
                      class="order-tab__item order-tab__item--four flex-grow-1"
                      @click="showTab(4)"
                      id="order-tab__item-4">
                    <span class="t13 w500 text-grey text-center d-block">تحویل شده</span>
                  </div>

                  <div
                      class="order-tab__item order-tab__item--five flex-grow-1"
                      @click="showTab(5)"
                      id="order-tab__item-5">
                    <span class="t13 w500 text-grey text-center d-block">مرجوعی</span>
                  </div>
                </div>
              </div>

              <div class="order-tab__contents flex-grow-1">
                <div class="order-tab__content active" id="order-tab__content-1">
                  <template v-if="userOrders && userOrders.length">
                    <generalOrdersOrderRow
                        v-for="(order, index) in userOrders"
                        :key="`all-order${order.id}`"
                        :content="order"/>
                  </template>
                  <template v-else>
                    <div class="d-flex flex-column justify-center align-center pt-15">
                      <svgEmptyOrder/>
                      <span class="t14 w400 text-grey-darken-1 mt-2">سفارشی در این بخش موجود نیست.</span>
                      <v-btn
                          href="/"
                          color="primary"
                          title="بازدید از سایت"
                          class="mt-5 order-tab__content__empty-button">
                        بازدید از سایت
                      </v-btn>
                    </div>
                  </template>
                </div>

                <div class="order-tab__content" id="order-tab__content-2">
                  <template v-if="preProgressOrder && preProgressOrder.length">
                    <generalOrdersOrderRow
                        v-for="(item, index) in preProgressOrder"
                        :key="`all-order${index}`"
                        :content="item"/>
                  </template>
                  <template v-else>
                    <div class="d-flex flex-column justify-center align-center pt-15">
                      <svgEmptyOrder/>
                      <span class="t14 w400 text-grey-darken-1 mt-2">سفارشی در این بخش موجود نیست.</span>
                      <v-btn
                          href="/"
                          color="primary"
                          title="بازدید از سایت"
                          class="mt-5 order-tab__content__empty-button">
                        بازدید از سایت
                      </v-btn>
                    </div>
                  </template>
                </div>

                <div class="order-tab__content" id="order-tab__content-3">
                  <template v-if="sendingOrder && sendingOrder.length">
                    <generalOrdersOrderRow
                        v-for="(item, index) in sendingOrder"
                        :key="`all-order${index}`"
                        :content="item"/>
                  </template>
                  <template v-else>
                    <div class="d-flex flex-column justify-center align-center pt-15">
                      <svgEmptyOrder/>
                      <span class="t14 w400 text-grey-darken-1 mt-2">سفارشی در این بخش موجود نیست.</span>
                      <v-btn
                          href="/"
                          color="primary"
                          title="بازدید از سایت"
                          class="mt-5 order-tab__content__empty-button">
                        بازدید از سایت
                      </v-btn>
                    </div>
                  </template>
                </div>

                <div class="order-tab__content" id="order-tab__content-4">
                  <template v-if="userReturnedOrderList && userReturnedOrderList.length">
                    <generalOrdersOrderRow
                        v-for="(order, index) in userReturnedOrderList"
                        :key="`all-order${order.id}`"
                        :content="order"/>
                  </template>
                  <template v-else>
                    <div class="d-flex flex-column justify-center align-center pt-15">
                      <svgEmptyOrder/>
                      <span class="t14 w400 text-grey-darken-1 mt-2">سفارشی در این بخش موجود نیست.</span>
                      <v-btn
                          href="/"
                          color="primary"
                          title="بازدید از سایت"
                          class="mt-5 order-tab__content__empty-button">
                        بازدید از سایت
                      </v-btn>
                    </div>
                  </template>
                </div>

                <div class="order-tab__content" id="order-tab__content-5">
                  <template v-if="userReturnedOrderList && userReturnedOrderList.length">
                    <generalOrdersOrderRow
                        v-for="(order, index) in userReturnedOrderList"
                        :key="`all-order${index}`"
                        :content="order.id"/>
                  </template>
                  <template v-else>
                    <div class="d-flex flex-column justify-center align-center pt-15">
                      <svgEmptyOrder/>
                      <span class="t14 w400 text-grey-darken-1 mt-2">سفارشی در این بخش موجود نیست.</span>
                      <v-btn
                          href="/"
                          color="primary"
                          title="بازدید از سایت"
                          class="mt-5 order-tab__content__empty-button">
                        بازدید از سایت
                      </v-btn>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </v-card>
        </div>
      </v-row>
    </v-container>
</main>
</template>

<script>
import Order from '@/composables/Order.js'


  export default {
    setup() {
      const title = ref('فروشگاه اینترنتی شاواز | لیست سفارشات من')
      const description = ref("لیست سفارشات کاربر - سفارشات تایید شده - سفارشات در حال پردازش - سفارشات ارسال شده - سفارشات در حال ارسال - سفارشات مرجوعی")
      const {getOrderList, orderList , getReturnedOrderList , returnedOrderList} = new Order()
      useHead({
        title,
        meta: [{
          name: 'description',
          content: description
        }]
      })
      return {getOrderList, orderList , getReturnedOrderList , returnedOrderList}
    },

    methods: {
      /**
       * Order tab
       * @param {*} id
       */
      showTab(id) {
        const orderTab = this.$refs['orderRef'];

        const liItems = orderTab.querySelectorAll('div.order-tab__item');
        const tabContents = orderTab.querySelectorAll('div.order-tab__content');

        liItems.forEach(item => {
          item.classList.remove('active');
          orderTab.querySelector(`#order-tab__item-${id}`).classList.add('active');
        });

        tabContents.forEach(item => {
          item.classList.remove('active');
          orderTab.querySelector(`#order-tab__content-${id}`).classList.add('active');
        });
      }
    },

    computed:{
      /** user returned Order list **/
      userReturnedOrderList(){
        try {
          return this.returnedOrderList?.data?.data?.data
        }
        catch (e) {
          return []
        }
      },
      /** user order list **/
      userOrders(){
        try {
          return this.orderList?.data?.data?.data
        }
        catch (e) {
          return []
        }
      },

      /** pre_progress order list **/
      preProgressOrder(){
        try {
          const preProgress =  this.userOrders.filter(order => order.status === 'pre_progress')
          if (preProgress.length) return preProgress
        }
        catch (e){
          return []
        }
      },
      /** pre_progress order list **/
      sendingOrder(){
        try {
          const sendingOrder =  this.userOrders.filter(order => order.status === 'sending')
          if (sendingOrder.length) return sendingOrder
        }
        catch (e){
          return []
        }
      },
      /** pre_progress order list **/
      receivedOrder(){
        try {
          const receivedOrder =  this.userOrders.filter(order => order.status === 'received')
          if (receivedOrder.length) return receivedOrder
        }
        catch (e){
          return []
        }
      },
    },

    beforeMount() {
      this.getOrderList()
      this.getReturnedOrderList()
    }

}
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";
@import '~/assets/scss/views/user.scss';
@import '~/assets/scss/views/order.scss';
</style>
