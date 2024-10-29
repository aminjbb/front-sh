<template>
  <header class="v-user__mobile-page-head xs-show justify-space-between">
    <div class="d-flex align-center">
      <a @click="previousStep()" class="ml-3">
        <v-icon icon="mdi-arrow-right" color="grey-darken-3"/>
      </a>
      <span class="grey-darken-3 t14 number-font">
            <template v-if="activeStep - 1 === 0">
                سبد خرید ({{ skuCount }} کالا)
            </template>
            <template v-else>
                {{ steps[activeStep - 1] }}
            </template>
        </span>
    </div>

    <v-icon v-if="activeStep - 1 === 0" icon="mdi-trash-can-outline" color="grey" @click="deleteAllOrders()"
            size="small"/>
  </header>

  <div class="stepper__content">
    <v-alert
        v-if="ipCountry !== 'IR' "
        color="sWarningLighten2"
        class="mb-3"
    >
      <p class="t12 w400 text-sWarning">
        در صورت روشن بودن نرم افزار های تغییر ip لطفا آن را خاموش کنید!
      </p>
    </v-alert>
    <template v-if="activeStep === 1">
      <template v-if="screenType === 'mobile'">
        <template v-for="(item, index) in data.details" :key="`header-product${index}`">
          <mobileCartProductCard noLazy :content="item"/>

          <v-divider v-if="index + 1 < data.details.length" color="grey"/>
        </template>
      </template>

      <template v-if="screenType === 'tablet'">
        <desktopCartSkuListStep :count="dataCount" :productList="data.details"/>
      </template>
    </template>

    <template v-if="activeStep === 2">
      <mobileCartSendingInformationAddress @selectedAddress="getAddress" :userDetail="userDetail"/>

<!--        <generalNotification class="mb-3" borderColorCode="E91E63" color="pink" icon="mdi-alert-outline" text="کاربران عزیز، تمام سفارشات ثبت شده در بازه 1402/12/23 الی 1403/01/14، به ترتیب اولویت از 15 فروردین ارسال خواهد شد."/>-->
        <mobileCartSendingInformationTime v-if="orderAddressId" :sendingMethods="sendingMethods" @selectedDate="getTime" @selectedWay="getWay" />
    </template>

    <template v-if="activeStep === 3">
      <desktopCartPaymentStep :paymentMethods="paymentMethods" :voucherBasket="data.voucher" ref="paymentStep" @selectedPayment="getPayment"
                              @setDiscountCode="getDiscountCode"
                              :paymentMount="voucher && voucher?.paid_price ? voucher.paid_price + voucher.sending_price : data.paid_price + data.sending_price"
                              @deleteBasketVoucher="deleteBasketVoucher"/>

      <generalModalsErrorOrder :orderSendingMethod="orderSendingMethod" :orderAddressId="orderAddressId.id"
                               :orderPaymentMethod="orderPaymentMethod"/>

    </template>

    <template v-if="activeStep === 4">
      <desktopCartLastStep/>
    </template>
  </div>

  <v-divider v-if="activeStep !== 4" color="grey-lighten-1" class="my-3"/>

  <v-card v-if="activeStep !== 4" class="px-3 mobile-pa-0 mobile-no-border pb-10 cart-payment-details">
    <div class="d-flex align-center justify-space-between mb-3">
      <span class="t12 w500 text-grey-darken-2">مبلغ قابل پرداخت:</span>
      <span class="t22 w500 text-grey-darken-4 number-font">
            <template v-if="voucher && voucher.total_price && voucher.paid_price">
                {{ splitChar(Number(String(voucher.paid_price + voucher.sending_price).slice(0, -1))) }}
            </template>

            <template v-else>
                {{ splitChar(Number(String(data.paid_price + data.sending_price).slice(0, -1))) }}
            </template>
            <span class="t12 w400 text-grey-darken-4">تومان</span>
        </span>
    </div>

    <v-divider color="grey-li.ghten-1" class="my-3 cart-hr"/>
    <div class="d-flex align-center justify-space-between mb-3">
      <span class="t12 w400 text-grey-darken-1">جمع سبد خرید:</span>
      <span class="t16 w400 text-grey-darken-3 number-font">
            <template v-if="voucher && voucher.total_price">
                {{ splitChar(Number(String(voucher.total_price).slice(0, -1))) }}
            </template>
            <template v-else>
                {{ splitChar(Number(String(data.total_price).slice(0, -1))) }}
            </template>
            <span class="t12 w400 text-grey-darken-3">تومان</span>
        </span>
    </div>

    <div class="d-flex align-center justify-space-between mb-3">
      <span class="t12 w400 text-success">مجموع تخفیف ها:</span>
      <span class="t16 w400 text-success number-font">
            <template v-if="voucher && voucher.total_price && voucher.paid_price">
                {{ splitChar(Number(String(voucher.total_price - voucher.paid_price).slice(0, -1))) }}
            </template>
            <template v-else>
                {{ splitChar(Number(String(data.total_price - data.paid_price).slice(0, -1))) }}
            </template>
            <span class="t12 w400 text-success">تومان</span>
        </span>
    </div>
    <div v-if="data?.voucher?.discount" class="d-flex align-center justify-space-between mb-3">
      <span class="t12 w400 text-success">کد تخفیف:</span>
      <span class="t16 w400 text-success number-font">
            <template v-if="voucher && data?.voucher">
              {{ splitChar(Number(String(data?.voucher?.discount).slice(0, -1))) }}
            </template>

        <template v-else>
          {{ splitChar(Number(String(data.voucher.discount).slice(0, -1))) }}
        </template>
            <span class="t12 w400 text-success">تومان</span>
        </span>
    </div>

    <div v-if="!freeDelivery && (data && data.sending_price) || (voucher && voucher.sending_price)"
         class="d-flex align-center justify-space-between mb-3">
      <span class="t12 w400 text-grey-darken-1">هزینه ارسال:</span>
      <span class="t16 w400 text-grey-darken-3 number-font">
            <template v-if="voucher">
              <span v-if="voucher.sending_price == 0"> رایگان</span>
                <span v-else class="number-font">
                  {{ splitChar(Number(String(voucher.sending_price).slice(0, -1))) }}
                </span>
                <span v-if="voucher.sending_price != 0" class="t12 w400 text-grey-darken-3">تومان</span>
            </template>

            <template v-else>
                {{ splitChar(Number(String(data.sending_price).slice(0, -1))) }}
                <span class="t12 w400 text-grey-darken-3">تومان</span>
            </template>

        </span>
    </div>
    <div v-if="freeDelivery" class="d-flex align-center justify-space-between mb-4">
      <span class="t14 w400 text-grey-darken-1">هزینه ارسال:</span>
      <span class="t16 w400 text-grey-darken-3 number-font">رایگان</span>
    </div>





    <v-divider color="grey-lighten-1" class="mb-3"/>

    <p class="t12 w400 text-grey-darken-1 bg-grey-lighten-4 pa-2 mb-2">
      هزینه ارسال پس از انتخاب آدرس به مبلغ قابل پرداخت افزوده خواهد شد.
    </p>

    <p class="t12 w400 text-deep-purple bg-deep-purple-lighten-5 pa-2">
      کالاهای موجود در سبد خرید شما رزرو نشده‌اند و در صورت اتمام موجودی از سبد خرید حذف خواهند شد.
    </p>
  </v-card>

  <div v-if="activeStep !== 4" class="cart-mobile-stepper">
    <div class="d-flex align-center justify-space-between">
      <span class="t12 w400 text-grey-darken-1">جمع قابل پرداخت:</span>
      <span class="t16 w400 text-grey-darken-3 number-font">
            <template v-if="voucher && voucher.paid_price">
                {{ splitChar(Number(String(voucher.paid_price + voucher.sending_price).slice(0, -1))) }}
            </template>

            <template v-else>
                {{ splitChar(Number(String(data.paid_price + data.sending_price).slice(0, -1))) }}
            </template>
            <span class="t11 w400 text-grey-darken-3">تومان</span></span>
    </div>

    <div>
      <v-btn @click="nextStep()" height="44" :title="buttonText[activeStep - 1]" class="btn btn--submit w-100 mt-3">
        {{ buttonText[activeStep - 1] }}
      </v-btn>
    </div>
  </div>

  <MobileCartBottomSheet ref="cartLogin" />
</template>

<script>
import Basket from '@/composables/Basket.js'
import axios from "axios";
import Order from "~/composables/Order.js";

export default {
  data() {
    return {
      steps: [
        'مشاهده سبد خرید',
        'تکمیل اطلاعات ارسال',
        'انتخاب روش پرداخت',
        'اتمام خرید'
      ],
      screenType: null,
      activeStep: 1,
      profit: 0,
      buttonText: [
        'تایید و تکمیل سفارش',
        'تایید اطلاعات ارسال',
        'پرداخت'
      ],
      activeButton: false,
      discountCode: null,
    }
  },

  props: {
    /**
     * Basket data
     */
    data: Object
  },

  computed: {
    ipCountry(){
      return this.$store.getters['get_country']
    },
    /**
     * Get user details
     */
    userDetail() {
      try {
        return this.$store.getters['get_userData']
      } catch (e) {
        return null
      }
    },
    orderSendingMethod() {
      return this.$store.getters['get_orderSendingMethod']
    },

    orderPaymentMethod() {
      return this.$store.getters['get_orderPayMethod']
    },

    orderAddressId() {
      return this.$store.getters['get_orderAddress']
    },

    dataCount() {
      try {
        return this.data.details.length
      } catch (e) {
        return 0
      }
    }
  },

  setup() {
    const userToken = useCookie('userToken')
    const runtimeConfig = useRuntimeConfig()
    const randomNumberForBasket = useCookie('randomNumberForBasket')

    const {
      deleteVoucherFromBasket,
      calculateSendingPrice,
      calculateVoucher,
      createOrder,
      voucher,
      getSendingMethods,
      sendingMethods,
      freeDelivery
    } = new Basket()
    const {paymentMethods, getPaymentMethods} = new Order()
    return {
      randomNumberForBasket,
      deleteVoucherFromBasket,
      calculateSendingPrice,
      calculateVoucher,
      createOrder,
      voucher,
      userToken,
      runtimeConfig,
      getSendingMethods,
      sendingMethods,
      freeDelivery,
      paymentMethods,
      getPaymentMethods
    }

  },

  methods: {
    nextStep() {
      if (this.activeStep < 5) {
        if (this.activeStep === 2 || this.activeStep === 3) {
          const text = this.activeStep === 2 ? 'آدرس تحویل گیرنده یا روش ارسال انتخاب نشده است.' : this.activeStep === 3 ? 'روش پرداخت مورد نظر خود را انتخاب کنید.' : '';

          if (!this.activeButton) {
            useNuxtApp().$toast.error(text, {
              rtl: true,
              position: 'top-center',
              theme: 'dark'
            });
          } else {
            if (this.activeStep === 3) {
              this.createOrder(this.orderSendingMethod, '', this.orderAddressId.id, this.orderPaymentMethod)
              this.enhanceECommerceGetPayment();
            } else {
              this.activeStep++;

              if(this.activeStep === 3){
                this.enhanceECommerceGetWay();
              }
            }
          }
        }
        else {
          if (this.userToken){
            this.activeStep++;

            if(this.activeStep === 2){
              this.enhanceECommerceStartCart()
            }
          }
          else{
            /* Open bottom sheet */
            this.$refs.cartLogin.sheet =true;
          }
        }
      }
    },

    previousStep(){
      if (this.activeStep === 1){
        window.location = '/'
      }
      else{
        this.activeStep = this.activeStep -1
        this.$store.commit('set_orderSendingMethod', null);
        this.emitWay = false
      }
    },

    /**
     * fetch user data
     */
    async fetchUserProfile() {
      try {
        const response = await auth.getUserProfile(this.userToken)
        {
          this.userDetail = response.data.data
        }
      } catch (error) {
        // Handle errors
      }
    },

    /**
     * Selected address from SendingInformationAddress component
     * @param {*} address
     */
    getAddress(address) {
      if (address && address !== false) {
        this.$store.commit('set_orderAddress', address)

        this.getSendingMethods(address.id)
        this.emitAddress = true;

        if (this.$store.getters['get_orderSendingMethod']){
          this.calculateSendingPrice(address.id, this.$store.getters['get_orderSendingMethod'])
        }
      } else {
        this.$store.commit('set_orderAddress', null)
        this.activeButton = false;
      }

      if (address && address !== false && this.emitWay) {
        this.activeButton = true;
      } else{
        this.activeButton = false;
      }
    },

    /**
     * Selected way from SendingInformationTime component
     * @param {*} way
     */
    getWay(way) {
      if (way && way !== false) {
        this.$store.commit('set_orderSendingMethod', way)
        this.calculateSendingPrice(this.orderAddressId.id, way)
        this.emitWay = true
      } else {
        this.$store.commit('set_orderSendingMethod', null)
      }

      if (way && way !== false && this.emitAddress) {
        this.activeButton = true;
      }else{
        this.activeButton = false;
      }
    },

    /**
     * Selected time from SendingInformationTime component
     * @param {*} arr
     */
    getTime(arr) {
      //TODO: Add set time to cart
      this.activeButton = true;
    },

    /**
     * Selected address from SendingInformationAddress component
     * @param {*} id
     */
    getPayment(id) {
      this.$store.commit('set_orderPayMethod', id)
      this.activeButton = true;
    },

    /**
     * Delete all orders from vuex
     */
    deleteAllOrders() {
      let endpoint = ''
      console.log(this.randomNumberForBasket)
      if (this.randomNumberForBasket && this.randomNumberForBasket != ""){
        endpoint = `/basket/crud/delete?identifier=${this.randomNumberForBasket}`
      }
      else{
        endpoint = `/basket/crud/delete`
      }
      axios.delete(this.runtimeConfig.public.apiBase + endpoint, {
        headers: {
          Authorization: `Bearer ${this.userToken}`,
        },

      }, )
          .then((response) => {
            this.$store.commit('set_basket' , '')
            if (this.randomNumberForBasket && this.randomNumberForBasket != ""){
              this.randomNumberForBasket = ''
            }
          })
          .catch((err) => {

          }).finally(() => {

      })
    },

    /**
     * Get discount code
     * @param {*} id
     */
    getDiscountCode(code) {
      this.discountCode = null;
      this.calculateVoucher(code);
      this.discountCode = code;
    },

    /**
     * Delete voucher from basket
     */
    deleteBasketVoucher(active){
      if(active){
        this.deleteVoucherFromBasket();
      }
    },

    /**
     * Enhance E-commerce for Seo - when user visit cart page
     */
    enhanceECommerceSkuList(){
      let productArr = [];
      this.data.details.forEach(item =>{
        const obj={
          item_id: item.shps?.sku?.id,
          price: Number(String(item.current_site_price).slice(0, -1)),
          item_brand: item?.shps?.sku?.brand?.name,
          quantity: item.count
        }
        productArr.push(obj);
      });

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'view_cart',  // name of the event. In this case, it always must be view_cart
        ecommerce: {
          items: productArr
        }
      });
      window.zebline.event.track('view_cart' , {
        items: productArr
      })
    },

    /**
     * Enhance E-commerce for Seo - when user visit cart page
     */
    enhanceECommerceStartCart(){
      let productArrBeginCheckout = [];

      this.data.details.forEach(item =>{
        const obj={
          item_id: item.shps?.sku?.id,
          price: Number(String(item.current_site_price).slice(0, -1)),
          item_brand: item?.shps?.sku?.brand?.name,
          quantity: item.count,
          name: item?.shps?.sku?.label
        }
        productArrBeginCheckout.push(obj);
      });

      window.dataLayer = window.dataLayer || [];
      const beginCheckout = {
        userID: this.$store.getters['get_userData']?.id,
        items: productArrBeginCheckout
      }
      window.dataLayer.push({
        event: 'begin_checkout',
        ecommerce:beginCheckout
      });
      window.zebline.event.track('begin_checkout', beginCheckout)
    },

    /**
     * Enhance E-commerce for Seo in Checkout Step 2 when ways selected
     */
    enhanceECommerceGetWay(){
      let productArrAddShipping = [];
      this.data.details.forEach(item =>{
        const obj={
          item_id: item.shps?.sku?.id,
          price: Number(String(item.current_site_price).slice(0, -1)),
          item_brand: item?.shps?.sku?.brand?.name,
          quantity: item.count,
          name: item?.shps?.sku?.label
        }
        productArrAddShipping.push(obj);
      });

      window.dataLayer = window.dataLayer || [];
      const addShippingInfo = {
        value: this.voucher && this.voucher?.paid_price ? Number(String(this.voucher.paid_price + this.voucher.sending_price).slice(0, -1)) : Number(String(this.data.paid_price + this.data.sending_price).slice(0, -1)),
        shipping_tier: this.$store.getters['get_orderSendingMethod'], //post | tipax | nafis
        userID: this.$store.getters['get_userData']?.id,
        items: productArrAddShipping
      }
      window.dataLayer.push({
        event: 'add_shipping_info',// name of the event.
        ecommerce:addShippingInfo
      });
      window.zebline.event.track('add_shipping_info' , addShippingInfo)
    },

    /**
     * Enhance E-commerce for Seo in Checkout Step 3 when payment way selected
     */
    enhanceECommerceGetPayment(){
      let productArr = [];
      this.data.details.forEach(item =>{
        const obj={
          item_id: item.shps?.sku?.id,
          price: Number(String(item.current_site_price).slice(0, -1)),
          item_brand: item?.shps?.sku?.brand?.name,
          quantity: item.count,
          name: item?.shps?.sku?.label
        }
        productArr.push(obj);
      });

      window.dataLayer = window.dataLayer || [];
      const addPayInfo = {
        value: this.voucher && this.voucher?.paid_price ? Number(String(this.voucher.paid_price + this.voucher.sending_price).slice(0, -1)) : Number(String(this.data.paid_price + this.data.sending_price).slice(0, -1)),
        coupon: this.discountCode,
        payment_type: this.orderPaymentMethod,
        userID: this.$store.getters['get_userData']?.id,
        items: productArr
      }
      window.dataLayer.push({
        event: 'add_payment_info',// name of the event.
        ecommerce:addPayInfo
      });
      window.zebline.event.track('add_payment_info' , addPayInfo)
    },
  },
  
  created() {
    const token = this.$route.query.token

    if (token) {
      this.activeStep = 4;
    }
  },

  beforeMount() {
    this.fetchUserProfile()
  },

  mounted() {
    /**
     * Check screen size
     */
    this.getPaymentMethods()
    window.innerWidth <= 540 ? this.screenType = 'mobile' : 540 < window.innerWidth <= 768 ? this.screenType = 'tablet' : this.screenType = 'desktop';

    this.$store.commit('set_orderAddress', null);
    this.$store.commit('set_orderSendingMethod', null);
    this.$store.commit('set_orderPayMethod', null);
    if(this.activeStep === 1){
      this.enhanceECommerceSkuList();
    }
  },

  watch: {
    voucher(newVal) {
      this.getPaymentMethods()
      if (newVal && newVal.paid_price) {
        this.$refs.paymentStep.deleteVoucher = true;
      } else {
        this.$refs.paymentStep.deleteVoucher = false;
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@import "~/assets/scss/tools/bp";

.cart-payment-details {
  padding-bottom: 100px !important;

  .cart-hr {
    opacity: 1 !important;
    height: 1px !important;
    max-height: 1px !important;
  }
}

.cart-mobile-stepper {
  border-radius: 8px 8px 0px 0px;
  background: #FFF;
  box-shadow: 0px 0px 15px 0px rgba(89, 89, 89, 0.50);
  display: flex;
  align-items: center;
  position: fixed;
  right: 0;
  bottom: 0;
  width: 100%;
  padding: 16px 36px;

  @include gbp(0, 540) {
    flex-direction: column;
  }

  > div:first-child {
    width: 100%;

    @include gbp(540, 768) {
      order: 1;
      width: 20%;
      flex-direction: column;
    }
  }

  > div:last-child {
    width: 100%;

    @include gbp(541, 768) {
      width: 80%;
      margin-left: 15px;
    }
  }

}
</style>
