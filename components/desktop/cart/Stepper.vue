<template>
<div class="stepper">
    <header class="stepper__header d-flex align-center w-100">
        <div v-for="(step, index) in steps" :key="`step${index}`" class="d-flex align-center cur-p" :class="index + 1 < steps.length ? 'flex-grow-1' : ''" @click="previousStep(index+1)">
            <div class="stepper__header__content">
                <v-badge :color="active[index+1] ? 'primary': previousSteps[index+1] ? 'grey-darken-3' : 'grey'" :content="index+1" class="ml-2 mr-2" inline />
                <span class="t15 w400 pl-2" :class="active[index+1] ? 'text-primary': previousSteps[index+1] ? 'text-grey-darken-3' : 'text-grey'">
                  {{ step }}
                </span>
            </div>

            <v-divider v-if="index + 1 < steps.length" color="grey" class="flex-grow-1" />
        </div>
    </header>

    <div class="stepper__content mt-7">
        <v-row v-if="activeStep !== 4">
            <v-col md="9">
              <v-alert
                  v-if="ipCountry !== 'IR' "
                  color="sWarningLighten2"
                  class="mb-3"
              >
                  <p class="t14 w500 text-sWarning">
                    در صورت روشن بودن نرم افزار های تغییر ip لطفا آن را خاموش کنید!
                  </p>
              </v-alert>
                <template v-if="activeStep === 1">
                    <desktopCartSkuListStep :count="dataCount" :productList="data.details" />
                </template>

                <template v-if="activeStep === 2">
                    <desktopCartSendingInformationAddress @selectedAddress="getAddress" />
                    <desktopCartSendingInformationTime v-if="orderAddressId" :sendingMethods="sendingMethods" @selectedDate="getTime" @selectedWay="getWay" />
                </template>

                <template v-if="activeStep === 3">
                    <desktopCartPaymentStep :paymentMethods="paymentMethods" :voucherBasket="data.voucher" ref="paymentStep" @selectedPayment="getPayment" @setDiscountCode="getDiscountCode" :paymentMount="voucher && voucher?.paid_price ? voucher.paid_price + voucher.sending_price : data.paid_price + data.sending_price" @deleteBasketVoucher="deleteBasketVoucher" />
                    <generalModalsErrorOrder :orderSendingMethod="orderSendingMethod" :orderAddressId="orderAddressId" :orderPaymentMethod="orderPaymentMethod" />
                </template>
            </v-col>

            <v-col md="3">
                <v-card class="py-5 px-3">
                    <div class="d-flex align-center justify-space-between">
                        <span class="t14 w500 text-grey-darken-2">مبلغ قابل پرداخت:</span>
                        <span class="t24 w500 text-grey-darken-4 number-font">
                            <template v-if="voucher && voucher.paid_price">
                                {{ splitChar(Number(String(voucher.paid_price + voucher.sending_price).slice(0, -1))) }}
                            </template>

                            <template v-else>
                                {{ splitChar(Number(String(data.paid_price + data.sending_price).slice(0, -1))) }}
                            </template>

                            <span class="t12 w400 text-grey-darken-4">تومان</span>
                        </span>
                    </div>

                    <v-divider color="grey-lighten-1" class="my-3 cart-hr" />

                    <div class="d-flex align-center justify-space-between mb-4">
                    <span class="t14 w400 text-grey-darken-1">جمع سبد خرید:</span>

                    <span class="t19 w400 text-grey-darken-3 number-font">
                            <template v-if="voucher && voucher.total_price">
                                {{ splitChar(Number(String(voucher.total_price).slice(0, -1))) }}
                            </template>

                            <template v-else>
                                {{ splitChar(Number(String(data.total_price).slice(0, -1))) }}
                            </template>
                            <span class="t12 w400 text-grey-darken-3">تومان</span>
                        </span>
                  </div>

                  <div class="d-flex align-center justify-space-between mb-4">
                    <span class="t14 w400 text-success">مجموع تخفیف ها:</span>

                    <span class="t19 w400 text-success number-font">
                            <template v-if="voucher && voucher.total_price && voucher.paid_price">
                                {{ splitChar(Number(String(voucher.total_price - voucher.paid_price).slice(0, -1))) }}
                            </template>

                            <template v-else>
                                {{ splitChar(Number(String(data.total_price - data.paid_price).slice(0, -1))) }}
                            </template>
                            <span class="t12 w400 text-success">تومان</span>
                        </span>
                  </div>
                   <div v-if="data?.voucher?.discount" class="d-flex align-center justify-space-between mb-4">
                    <span class="t14 w400 text-success">کد تخفیف:</span>

                    <span class="t19 w400 text-success number-font">
                            <template v-if="voucher && data?.voucher && data?.voucher?.discount">
                                {{ splitChar(Number(String(data?.voucher?.discount).slice(0, -1))) }}
                            </template>

                            <template v-else>
                                {{ splitChar(Number(String(data.voucher.discount).slice(0, -1))) }}
                            </template>
                            <span class="t12 w400 text-success">تومان</span>
                        </span>
                  </div>

                    <div v-if="!freeDelivery && data.sending_price !== 0 && data.sending_price !== null" class="d-flex align-center justify-space-between mb-4">
                        <span class="t14 w400 text-grey-darken-1">هزینه ارسال:</span>
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

                        <span>
                            <template v-if="voucher">
                                <span v-if="voucher.sending_price == 0"> رایگان</span>
                                <span v-else class="number-font">
                                    {{ splitChar(Number(String(voucher.sending_price).slice(0, -1))) }}
                                </span>
                                <span v-if="voucher.sending_price != 0" class="t12 w400 text-grey-darken-3">تومان</span>
                            </template>

                            <template v-else>

                                <span class="t16 w400 text-grey-darken-3 number-font">رایگان</span>
                            </template>
                        </span>
                    </div>

                    <p class="t14 w400 text-grey-darken-1">
                        هزینه ارسال پس از انتخاب آدرس به مبلغ قابل پرداخت افزوده خواهد شد.
                    </p>

                    <v-btn @click="nextStep()" height="44" :title="buttonText[activeStep - 1]" class="btn btn--submit w-100 mt-5">
                        {{ buttonText[activeStep - 1] }}
                    </v-btn>
                </v-card>

                <p class="t13 w400 text-deep-purple">
                    کالاهای موجود در سبد خرید شما رزرو نشده‌اند و در صورت اتمام موجودی از سبد خرید حذف خواهند شد.
                </p>
            </v-col>
        </v-row>

        <template v-if="activeStep === 4">
            <desktopCartLastStep />
        </template>
    </div>
</div>
</template>

<script>
import Basket from '@/composables/Basket.js'
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
            active: [],
            previousSteps: [],
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
        const {
            paymentMethods,
            getPaymentMethods
        } = new Order()
        return {
            deleteVoucherFromBasket,
            calculateSendingPrice,
            calculateVoucher,
            createOrder,
            voucher,
            userToken,
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
                      this.$store.commit('set_snackBar', {
                        show:true , text:text , status:'error'
                      })
                    } else {
                        if (this.activeStep === 3) {
                            this.createOrder(this.orderSendingMethod, '', this.orderAddressId, this.orderPaymentMethod)
                            this.enhanceECommerceGetPayment();
                        } else {
                            this.active[this.activeStep] = false;
                            this.previousSteps[this.activeStep] = false;
                            this.activeStep++;
                            this.active[this.activeStep] = true;
                            this.previousSteps[this.activeStep - 1] = true;

                            if (this.activeStep === 3) {
                                this.enhanceECommerceGetWay();
                            }
                        }

                    }
                } else {
                    if (this.userToken) {
                        this.active[this.activeStep] = false;
                        this.previousSteps[this.activeStep] = false;
                        this.activeStep++;
                        this.active[this.activeStep] = true;
                        this.previousSteps[this.activeStep - 1] = true;

                        if (this.activeStep === 2) {
                            this.enhanceECommerceStartCart()
                        }
                    } else {
                        localStorage.setItem('returnPathAfterLogin', this.$route.fullPath)
                        this.$router.push('/login')
                    }

                }
            }
        },

        previousStep(step) {
            if (this.activeStep < 5) {
                if (this.userToken) {
                    if (step === this.activeStep - 1) {
                        this.active[this.activeStep] = false;
                        this.previousSteps[this.activeStep] = false;
                        this.activeStep--;
                        this.active[this.activeStep] = true;
                        this.previousSteps[this.activeStep - 1] = true;
                    } else {
                      this.$store.commit('set_snackBar', {
                        show:true , text:'کاربر گرامی شما مجاز به انجام این عملیات نمی باشید.' , status:'error'
                      })
                    }
                }
            }
        },

        /**
         * Enhance E-commerce for Seo - when user visit cart page
         */
        enhanceECommerceSkuList() {
            let productArr = [];
            this.data.details.forEach(item => {
                const obj = {
                    item_id: item.shps ?.sku ?.id,
                    price: Number(String(item.current_site_price).slice(0, -1)),
                    item_brand: item ?.shps ?.sku ?.brand ?.name,
                    quantity: item.count
                }
                productArr.push(obj);
            });

            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: 'view_cart', // name of the event. In this case, it always must be view_cart
                ecommerce: {
                    items: productArr
                }
            });
            try {
              window.zebline.event.track('view_cart' , {
                items: productArr
              })
            }
            catch (e) {

            }
        },

        /**
         * Enhance E-commerce for Seo - when user visit cart page
         */
        enhanceECommerceStartCart() {
            let productArrBeginCheckout = [];

            this.data.details.forEach(item => {
                const obj = {
                    item_id: item.shps ?.sku ?.id,
                    price: Number(String(item.current_site_price).slice(0, -1)),
                    item_brand: item ?.shps ?.sku ?.brand ?.name,
                    quantity: item.count,
                    name: item ?.shps ?.sku ?.label
                }
                productArrBeginCheckout.push(obj);
            });

            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: 'begin_checkout', // name of the event. In this case, it always must be begin_checkout
                ecommerce: {
                    userID: this.$store.getters['get_userData']?.id,
                    items: productArrBeginCheckout
                }
            });
           try {
             window.zebline.event.track('begin_checkout' , {
               userID: this.$store.getters['get_userData']?.id,
               items: productArrBeginCheckout
             })
           }
           catch (e) {
           }
        },

        /**
         * Selected address from SendingInformationAddress component
         * @param {*} address
         */
        getAddress(address) {
          this.activeButton = false;

          if (address !== false) {
                this.$store.commit('set_orderAddress', address)
                this.getSendingMethods(address)
                if (this.$store.getters['get_orderSendingMethod']) {
                    this.calculateSendingPrice(address, this.$store.getters['get_orderSendingMethod'])
                }
            } else {
                this.$store.commit('set_orderAddress', null)
                this.activeButton = false;
            }
        },

        /**
         * Selected way from SendingInformationTime component
         * @param {*} way
         */
        getWay(way) {
            if (way !== false) {
                this.$store.commit('set_orderSendingMethod', way)
                this.calculateSendingPrice(this.orderAddressId, way)
                if (way === 'nafis'){
                  this.activeButton = false;
                }
                else {
                  this.activeButton = true;
                }


            } else {
                this.$store.commit('set_orderSendingMethod', null);
                this.activeButton = false;
            }

        },

        /**
         * Enhance E-commerce for Seo in Checkout Step 2 when ways selected
         */
        enhanceECommerceGetWay() {
            let productArrAddShipping = [];
            this.data.details.forEach(item => {
                const obj = {
                    item_id: item.shps ?.sku ?.id,
                    price: Number(String(item.current_site_price).slice(0, -1)),
                    item_brand: item ?.shps ?.sku ?.brand ?.name,
                    quantity: item.count,
                    name: item ?.shps ?.sku ?.label
                }
                productArrAddShipping.push(obj);
            });

            window.dataLayer = window.dataLayer || [];
            const addShippingInfo= {
              value: this.voucher && this.voucher.paid_price ? Number(String(this.voucher.paid_price + this.voucher.sending_price).slice(0, -1)) : Number(String(this.data.paid_price + this.data.sending_price).slice(0, -1)),
              shipping_tier: this.$store.getters['get_orderSendingMethod'], //post | tipax | nafis
              userID: this.$store.getters['get_userData']?.id,
              items: productArrAddShipping
            }
            window.dataLayer.push({
                event: 'add_shipping_info', // name of the event.
                ecommerce: addShippingInfo
            });
            try {
              window.zebline.event.track('add_shipping_info' , addShippingInfo)

            }
            catch (e) {

            }
        },

        /**
         * Selected time from SendingInformationTime component
         * @param {*} arr
         */
        getTime(arr) {

          if (arr.length){
            this.$store.commit('set_orderSendingMethod', arr[0])
            this.calculateSendingPrice(this.orderAddressId, arr[0] ,arr[1])

            this.activeButton = true;
          }
        },

        /**
         * Selected address from SendingInformationAddress component
         * @param {*} id
         */
        getPayment(id) {
            if (id !== false) {
                this.$store.commit('set_orderPayMethod', id)
                this.activeButton = true;
            } else {
                this.activeButton = false;
            }
        },

        /**
         * Get discount code
         * @param {*} code
         */
        async getDiscountCode(code) {
            this.discountCode = null;
            this.calculateVoucher(code);
            this.discountCode = code;
        },

        /**
         * Enhance E-commerce for Seo in Checkout Step 3 when payment way selected
         */
        enhanceECommerceGetPayment() {
            let productArr = [];
            this.data.details.forEach(item => {
                const obj = {
                    item_id: item.shps ?.sku ?.id,
                    price: Number(String(item.current_site_price).slice(0, -1)),
                    item_brand: item ?.shps ?.sku ?.brand ?.name,
                    quantity: item.count,
                    name: item ?.shps ?.sku ?.label
                }
                productArr.push(obj);
            });

            window.dataLayer = window.dataLayer || [];
            const addPayInfo = {
              value: this.voucher && this.voucher ?.paid_price ? Number(String(this.voucher.paid_price + this.voucher.sending_price).slice(0, -1)) : Number(String(this.data.paid_price + this.data.sending_price).slice(0, -1)),
              coupon: this.discountCode,
              payment_type: this.orderPaymentMethod,
              userID: this.$store.getters['get_userData']?.id,
              items: productArr
            }
            window.dataLayer.push({
                event: 'add_payment_info', // name of the event.
                ecommerce:addPayInfo
            });
            try {
              window.zebline.event.track('add_payment_info' , addPayInfo)
            }
            catch (e) {

            }
        },

        /**
         * Delete voucher from basket
         */
        deleteBasketVoucher(active) {
            if (active) {
                this.deleteVoucherFromBasket();
            }
        },
    },

    watch: {
        voucher(newVal) {
            this.getPaymentMethods();
            if (newVal && newVal.paid_price) {
                this.$refs.paymentStep.deleteVoucher = true;
            } else {
                this.$refs.paymentStep.deleteVoucher = false;
            }
        }
    },

    created() {
        const token = this.$route.query.token

        if (token) {
            this.activeStep = 4;
            this.active[1] = false;
            this.active[4] = true;
        }
    },

    mounted() {
        this.getPaymentMethods()
        this.active[this.activeStep] = true;
        this.$store.commit('set_orderAddress', null);
        this.$store.commit('set_orderSendingMethod', null);
        this.$store.commit('set_orderPayMethod', null);
        if (this.activeStep === 1) {
            this.enhanceECommerceSkuList();
        }
    }
}
</script>

<style lang="scss">
.stepper {
    &__header {
        border-radius: 12px;
        border: 1px solid var(--grey-grey-lighten-3, #EEE);
        box-shadow: 0px 2px 2px 0px rgba(141, 141, 141, 0.15);
        padding: 24px;

        &__content {
            flex: none;

            .v-badge__badge {
                font-family: 'IranSansFaNum' !important;
            }
        }
    }

    .cart-hr {
        opacity: 1 !important;
        height: 1px !important;
        max-height: 1px !important;
    }
}
</style>
