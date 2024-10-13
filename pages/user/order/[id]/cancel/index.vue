<template>
<main class="v-order v-order--canceling">
    <header class="v-user__mobile-page-head xs-show">
        <a :href="`/user/order/${$route.params.id}`" class="ml-1">
            <v-icon icon="mdi-chevron-right" color="grey-darken-3" />
        </a>
        <span class="text-sGrayDarken2 t14 w700">درخواست لغو</span>
    </header>

    <v-container>
        <v-row>
            <div class="col-3 py-4 xs-hide">
                <generalUserSidebar />
            </div>
            <div class="col-9 pa-4 mobile-pa-0">
                <div>
                    <v-card class="pa-8 mobile-pa-0 v-order__card">
                        <header class="v-ticket__header d-flex align-center justify-space-between xs-hide card__header pt-6">
                            <h1 class="t18 w700 text-sGrayDarken2 number-font bold ltr">{{ orderId }} جزئیات سفارش</h1>

                            <v-btn :href="`/user/order/${$route.params.id}`" height="45" title="بازگشت" class="btn--cancel px-6 br12 no-shadow">
                                <span class="w700"> بازگشت</span>
                            </v-btn>
                        </header>

                        <div class="px-5 mb-7">
                            <div class="v-order--canceling__accordion mt-5">

                                <template v-for="(reason , index) in cancelReasonItems" :key="`reason${index}`">
                                    <v-radio-group v-model="cancelReasonValueTitleAll" @change="selectReason()" hide-details>
                                        <v-radio hide-details :value="reason" color="primary" size="small" class="py-2">
                                            <template v-slot:label>
                                                <div class="d-flex align-center">
                                                    <span class="t14 w500 text-sGrayDarken2 mb-1">{{ reason.label }}</span>
                                                </div>
                                            </template>
                                        </v-radio>
                                        <div v-if="index + 1 < cancelReasonItems.length" class="s-border s-border--bottom"></div>
                                    </v-radio-group>    
                                </template> 

                                <div>
                                    <v-textarea variant="outlined" v-model="cancelReasonValueDescAll" rows="4" placeholder="توضیحات" class="mt-3 t13"/>
                                </div>
                            </div>

                            <div class="d-flex align-center w-100 justify-end cancel-button">
                                <v-btn class="s-btn s-btn--fill s-btn--fill-primary ml-3" width="49%" @click="changeStatus" :disabled="activeSubmit === true ? true : false" :loading="loading">
                                    <span class="text-white t12 w700"> لغو سفارش</span>
                                </v-btn>

                                <v-btn class="s-btn s-btn--outline s-btn--outline-primary s-btn--bg-white" width="49%" :href="`/user/order/${$route.params.id}`">
                                    <span class="text-primary t12 w700">انصراف</span>
                                </v-btn>
                            </div>

                            <generalModalsDelete ref="cancelOrderModal" title="تغییر وضعیت سفارش" text="آیا از لغو سفارش خود مطمئن هستید؟ در صورت لغو سفارش، مبلغ سفارش به کیف پول شما بازگشت داده خواهد شد" submitText="بله" @removeProduct="createFormDataAndSendToServer(1)" />
                            <generalSheetsDelete ref="cancelOrderSheet" title="تغییر وضعیت سفارش" text="آیا از لغو سفارش خود مطمئن هستید؟ در صورت لغو سفارش، مبلغ سفارش به کیف پول شما بازگشت داده خواهد شد" submitText="بله" @removeProduct="createFormDataAndSendToServer(1)" />
                        </div>
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
            activeSubmit: false,
            chooseAll: false,
            products: [],
            screenType: 'desktop',
            cancelReasonItems: [{
                    label: 'از خرید این کالا منصرف شده‌ام',
                    value: '1'
                },
                {
                    label: 'سفارش تکراری ثبت کرده‌ام',
                    value: '3'
                },
                {
                    label: 'کد تخفیفم اعمال نشده است',
                    value: '2'
                }
            ],
            value: [],
            selectedValue: [],
            cancelReasonValueTitleAll: null,
            cancelReasonValueDescAll: null,
            selectedProducts: [],
            orderId : null,
            activeSubmit: true
        }
    },

    setup() {
        const title = ref('فروشگاه اینترنتی شاواز | درخواست لغو سفارش')
        const description = ref("لیست سفارشات کاربر - سفارشات تایید شده - سفارشات در حال پردازش - سفارشات ارسال شده - سفارشات در حال ارسال - سفارشات مرجوعی")
        const {
            getOrder,
            order,
            returnOrRejectOrder,
            orderReturnOrRejectObject,
            loading
        } = new Order()
        useHead({
            title,
            meta: [{
                name: 'description',
                content: description
            }]
        })
        return {
            getOrder,
            order,
            returnOrRejectOrder,
            orderReturnOrRejectObject,
            loading
        }
    },

    computed: {
        /** single order object **/
        userOrder() {
            try {
                return this.order ?.data ?.data
            } catch (e) {

            }
        },

        orderReturnOrReject() {
            try {
                return this.orderReturnOrRejectObject ?.data ?.data
            } catch (e) {

            }
        }
    },

    methods: {
        selectReason(){
            if(this.cancelReasonValueTitleAll && this.cancelReasonValueTitleAll.value){
                this.activeSubmit = false
            }
        },

        /**
         * create formData and send to api
         */
        createFormDataAndSendToServer(accept) {
            const formData = new FormData()
            let ChooseAllReason = false;

            this.selectedValue = [];
            this.value = [];
            this.selectedProducts = [];

            this.userOrder ?.details.forEach((product, index) => {
                this.value[index] = product.id;
                this.selectedValue[index] = product.id;

                const obj = {
                    count: product.count,
                    id: product.id,
                    item: product,
                }
                this.selectedProducts.push(obj);
            })

            if (this.selectedProducts && this.selectedProducts.length) {
                this.selectedProducts.forEach((product, index) => {
                    const findIndex = this.userOrder.details.findIndex(item => item.id === product.id)
                    formData.append(`shps_list[${index}][shps]`, product ?.item ?.shps ?.id)
                    formData.append(`shps_list[${index}][count]`, product ?.count)

                    if (this.cancelReasonValueTitleAll && this.cancelReasonValueTitleAll.label) {
                        ChooseAllReason = false;
                        formData.append(`shps_list[${index}][reason]`, this.cancelReasonValueTitleAll.label)
                        formData.append(`shps_list[${index}][description]`, this.cancelReasonValueDescAll)
                    } else {
                        ChooseAllReason = true;
                    }
                })
                if(ChooseAllReason){
                    useNuxtApp().$toast.error('علت لغو انتخاب نشده است', {
                        rtl: true,
                        position: 'top-center',
                        theme: 'dark'
                    });
                }else{
                    formData.append(`order_id`, this.$route.params.id)
                    formData.append(`accept`, accept)
                    this.returnOrRejectOrder(formData, '/order/cancel/crud/create', accept)
                    if (this.screenType === 'desktop') {
                        this.$refs.cancelOrderModal.dialog = false;
                        this.$refs.cancelOrderModal.loading = false;
                    } else {
                        this.$refs.cancelOrderSheet.sheet = false;
                        this.$refs.cancelOrderSheet.loading = false;
                    }
                }
                
            }
        },

        /**
         * Change order status confirm
         */
         changeStatus() {
            if (this.screenType === 'desktop') {
                this.$refs.cancelOrderModal.dialog = true;
            } else {
                this.$refs.cancelOrderSheet.sheet = true;
            }
        },
    },

    beforeMount() {
        this.getOrder();
        this.orderId = this.$route.params.id
        console.log("🚀 ~ beforeMount ~ this.orderId:", this.orderId)
    },
}
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";
@import '~/assets/scss/views/user.scss';
@import '~/assets/scss/views/order.scss';

.cancel-button{
    .v-btn{
        @include gbp(0, 768) {
            height: 45px;
        }

        .v-btn__content span{
            @include gbp(0, 768) {
                font-size: 14px !important;
            }
        }
    }
}
</style>
