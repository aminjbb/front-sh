<template>
<v-card class="pa-5 mobile-pa-0 mobile-no-border ov-v">
    <header class="d-flex align-center mb-5">
        <v-icon
            icon="mdi-credit-card-outline"
            color="primary"
            size="small"
            class="ml-2" />
        <span class="t16 w400 text-grey-darken-3">روش پرداخت</span>
    </header>

    <div>
        <template v-for="(payment , index) in paymentMethods" :key="`payment${index}`">
            <div class="d-flex align-center justify-space-between flex-grow-1">
                <div>
                    <div class="d-flex align-center">
                        <v-checkbox
                            class="address-checkbox"
                            v-model="paymentModal"
                            @change="selectPayment()"
                            hide-details
                            :value="payment.name" />
                        <h3 class="t15 w400 text-grey-darken-2">{{payment.title}}</h3>
                    </div>
                    <p class="number-font t12 w400 text-grey">
                      {{payment.subtitle}}
                    </p>
                </div>

                <img :src="payment.logo" alt="payment-image" width="85" height="54">

            </div>
            <v-divider
                v-if="index+1 < paymentMethods.length"
                color="grey-lighten-1"
                class="my-3" />
        </template>
    </div>
</v-card>

<v-divider class="xs-show" color="grey-lighten-1" />

<v-card class="pa-5 mobile-pa-0 mobile-no-border discount-code">
    <header class="d-flex align-center mb-5">
        <v-icon
            icon="mdi-sale-outline"
            color="primary"
            size="small"
            class="ml-2" />
        <span class="t16 w400 text-grey-darken-3">کد تخفیف</span>
    </header>

    <div>
        <p class="t12 w400 text-grey mb-3">برای هر خرید، امکان اعمال تنها یک کد تخفیف می‌باشد.</p>
        <v-row>
            <v-col
                cols="8"
                md="9"
                lg="10">
                <v-text-field
                    color="grey-lighten-3"
                    density="compact"
                    variant="outlined"
                    hide-details
                    v-model="discountCode" />

                <p class="t12 w400 text-danger my-2">{{discountError}}</p>
            </v-col>
            <v-col
                cols="4"
                md="3"
                lg="2">
                <v-btn
                    @click="setDiscountCode()"
                    height="44"
                    title="اعمال کد"
                    class="btn btn--cancel w-100">
                    اعمال کد
                </v-btn>
            </v-col>
        </v-row>

        <div v-if="deleteVoucher || voucherBasket" class="d-flex align-center mt-3">
            <div class="t13 w500 text-grey-darken-3 ml-2">کد تخفیف اعمال شده: </div>
            <div class="d-flex align-center">
                <div v-if="voucherBasket" class="t14 w400 text-primary ml-3">{{ voucherBasket.code }}</div>
                <div  class="t14 w400 text-primary ml-3">{{ discountCodeShow }}</div>
                <v-icon @click="deleteBasketVoucher()" icon="mdi-delete-outline" color="primary"/>
            </div>
        </div>
    </div>
</v-card>
</template>

<script>
export default {
    setup() {
    const title = ref('فروشگاه اینترنتی شاواز | روشهای پرداخت ')
    const description = ref("انتخا روش پرداخت برای خرید از فروشگاه لوازم آرایشی و بهداشتی شاواز")
    const userToken = useCookie('userToken');
    useHead({
      title,
      meta: [{
        name: 'description',
        content: description
      }]
    })
    return {
      userToken,
    }
  },

  data() {
        return {
            paymentModal: null,
            discountCode: null,
            discountCodeShow: null,
            discountError: null,
            deleteVoucher: false,
        }
    },

    computed:{
        userDetail() {
            try {
                return this.$store.getters['get_userData']
            } catch (e) {
                return null
            }
        }
    },

    props: {
        paymentMount: String,
        voucherBasket: null,
        paymentMethods: []
    },

    watch: {
        deleteVoucher(newVal) {
            if (newVal === true) {
                this.discountCodeShow = this.discountCode
                this.discountCode = null
            }
        },
    },

    methods: {
        /**
         * Selected Payment for send package to customer
         */
        selectPayment() {
            this.$emit('selectedPayment', this.paymentModal);
        },

        /**
         * Set discount code
         */
        setDiscountCode() {
            if (this.discountCode === null ||  this.discountCode === '') {
                useNuxtApp().$toast.error('کد تخفیف را وارد کنید.', {
                    rtl: true,
                    position: 'top-center',
                    theme: 'dark'
                });
            }
            else{
                this.deleteVoucher = false;
                this.$emit('setDiscountCode', this.discountCode);
            }
        },

        deleteBasketVoucher(){
            this.$emit('deleteBasketVoucher', true);
        }

    },

    mounted(){
        if(this.paymentMethods && this.paymentMethods.length > 0){
            this.paymentModal= this.paymentMethods[0].name;
            this.selectPayment();
        }
    }
}
</script>

<style lang="scss">
.discount-code {
    input {
        height: 44px !important;
    }
}
</style>
