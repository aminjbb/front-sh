<template>
<main class="v-order v-order--canceling">
    <header class="v-user__mobile-page-head xs-show">
        <a :href="`/user/order/${orderId}`" class="ml-1">
            <v-icon icon="mdi-chevron-right" color="grey-darken-3" />
        </a>
        <span class="text-sGrayDarken2 t14 fw700 number-font ltr">{{ orderId }} جزئیات سفارش</span>
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
                            <v-btn @click="goBack(orderId)" height="45" title="بازگشت" class="btn--cancel px-6 br12 no-shadow">
                                <span class="w700"> بازگشت</span>
                            </v-btn>
                        </header>

                        <div class="mb-7" :class="screenType === 'desktop' ? 'px-5' : 'px-2'">
                            <div class="mt-5">
                                <div v-if="selectedSku" class="cancel-order-card d-flex mb-5 align-center" :class="screenType === 'desktop' ? 'justify-space-between' : 'flex-column justify-center'">
                                    <div class="d-flex align-center" :class="screenType === 'desktop' ? 'justify-space-between' : 'flex-column justify-center'">
                                        <a class="cancel-order-card__image ml-2" :href="`/sku/${selectedSku?.shps?.sku?.slug}`">
                                            <img :src="selectedSku?.shps?.sku?.image_url" :title="selectedSku?.shps?.sku?.label" :alt="selectedSku?.shps?.sku?.label" width="65" height="65" />
                                        </a>
                                        <div class="d-flex align-center justify-space-between">
                                            <h2 class="t12 fw500 number-font text-sGray">{{ selectedSku?.shps?.sku?.label }}</h2>
                                        </div>
                                    </div>

                                    <div v-if="selectedSku?.count > 1" class="cancel-order-card__count d-flex align-center" :class="screenType === 'mobile' ? 'bg-white br16 px-2 py-4 flex-column justify-center' : 'justify-space-between'">
                                        <span class="t12 w700 text-sGray ml-4" :class="screenType === 'mobile'? 'mb-2' : ''">تعداد محصول انتخاب شده </span>

                                        <div class="d-flex align-center">
                                            <svg class="cur-p" @click="increaseCount()" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10.668 16H21.3346" stroke="#D72685" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M16 21.3332V10.6665" stroke="#D72685" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path d="M12.0013 29.3332H20.0013C26.668 29.3332 29.3346 26.6665 29.3346 19.9998V11.9998C29.3346 5.33317 26.668 2.6665 20.0013 2.6665H12.0013C5.33464 2.6665 2.66797 5.33317 2.66797 11.9998V19.9998C2.66797 26.6665 5.33464 29.3332 12.0013 29.3332Z" stroke="#D72685" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>

                                            <span class="t15 fw700 text-sGrayDarken2 number-font px-3">
                                                <span class="px-1 t15 fw700 text-sGrayDarken2 number-font d-inline-block">{{count}}</span> از <span class="px-1 t15 fw700 text-sGrayDarken2 number-font d-inline-block">{{ selectedSku?.count }}</span>
                                            </span>

                                            <svg class="cur-p" @click="decreaseCount()" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g id="vuesax/linear/minus-square">
                                                <g id="minus-square">
                                                <path id="Vector" d="M10.668 16H21.3346" :stroke="count === 1 ? '#BDBDBD':'#D72685'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path id="Vector_2" d="M12.0013 29.3332H20.0013C26.668 29.3332 29.3346 26.6665 29.3346 19.9998V11.9998C29.3346 5.33317 26.668 2.6665 20.0013 2.6665H12.0013C5.33464 2.6665 2.66797 5.33317 2.66797 11.9998V19.9998C2.66797 26.6665 5.33464 29.3332 12.0013 29.3332Z" :stroke="count === 1 ? '#BDBDBD':'#D72685'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                </g>
                                                </g>
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div v-if="selectedSku?.count > 1" class="v-order__notification pa-4 bg-sWarningLighten2 br16 mb-4 mt-10">
                                    <v-icon icon="mdi-alert-circle-outline" color="sWarningLighten1" />
                                    <span class="t12 fw500 text-sWarning number-font">
                                        شاوازی عزیز تعداد محصولات جهت لغو مشخص کنید .
                                    </span>
                                </div>

                                <template v-for="(reason , index) in cancelReasonItems" :key="`reason${index}`">
                                    <v-radio-group v-model="cancelReasonValueTitle" @change="selectReason()" hide-details>
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
                                    <v-textarea variant="outlined" v-model="cancelReasonValueDesc" rows="4" placeholder="توضیحات" class="mt-3 t13" />
                                </div>
                            </div>

                            <div class="d-flex align-center w-100 justify-end cancel-button">
                                <v-btn class="s-btn s-btn--fill s-btn--fill-primary ml-3" width="49%" @click="changeStatus" :disabled="activeSubmit === true ? true : false" :loading="loading">
                                    <span class="text-white t12 w700">لغو محصول</span>
                                </v-btn>

                                <v-btn class="s-btn s-btn--outline s-btn--outline-primary s-btn--bg-white" width="49%" :href="`/user/order/${orderId}`">
                                    <span class="text-primary t12 w700">انصراف</span>
                                </v-btn>
                            </div>

                            <generalModalsDelete ref="cancelOrderModal" price :items="refundItems" title="تغییر وضعیت سفارش" text="آیا از لغو درخواست دریافت کالاها مطمئن هستید؟ در صورت لغو، مبلغ پرداخت شده برای کالاها به کیف پول شما بازگشت داده خواهد شد" submitText="تایید" @removeProduct="createFormDataAndSendToServer(1)" />
                            <generalSheetsDelete ref="cancelOrderSheet" price :items="refundItems" title="تغییر وضعیت سفارش" text="آیا از لغو درخواست دریافت کالاها مطمئن هستید؟ در صورت لغو، مبلغ پرداخت شده برای کالاها به کیف پول شما بازگشت داده خواهد شد" submitText="تایید" @removeProduct="createFormDataAndSendToServer(1)" />
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
                    label: 'محصول تکراری ثبت کردم',
                    value: '3'
                },
                {
                    label: 'کد تخفیفم اعمال نشده است',
                    value: '2'
                }
            ],
            cancelReasonValueTitle: null,
            cancelReasonValueDesc: null,
            selectedProducts: [],
            orderId: null,
            skuId: null,
            count: 1,
            activeSubmit: true,
            refundItems:[]
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

        /** single order object **/
        selectedSku() {
            try {
                const sku = this.userOrder ?.details.find(element => element.id == this.skuId)
                return sku
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
        selectReason() {
            if (this.cancelReasonValueTitle && this.cancelReasonValueTitle.value) {
                this.activeSubmit = false
            }
        },

        /**
         * create formData and send to api
         */
        createFormDataAndSendToServer(accept) {
            const formData = new FormData()
            let ChooseAllReason = false;

            if (this.selectedSku) {
                    formData.append(`shps_list[0][shps]`, this.selectedSku ?.shps ?.id)
                    formData.append(`shps_list[0][count]`, this.count)                   

                    if (this.cancelReasonValueTitle && this.cancelReasonValueTitle.label) {
                        ChooseAllReason = false;
                        formData.append(`shps_list[0][reason]`, this.cancelReasonValueTitle.label)
                        formData.append(`shps_list[0][description]`, this.cancelReasonValueDesc)
                    } else {
                        ChooseAllReason = true;
                    }


                if (ChooseAllReason) {
                    useNuxtApp().$toast.error('علت لغو انتخاب نشده است', {
                        rtl: true,
                        position: 'top-center',
                        theme: 'dark'
                    });
                } else {
                    formData.append(`order_id`, this.orderId)
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
            const formData = new FormData()
            let ChooseAllReason = false;

            if (this.selectedSku) {
                    formData.append(`shps_list[0][shps]`, this.selectedSku ?.shps ?.id)
                    formData.append(`shps_list[0][count]`, this.count)                   

                    if (this.cancelReasonValueTitle && this.cancelReasonValueTitle.label) {
                        ChooseAllReason = false;
                        formData.append(`shps_list[0][reason]`, this.cancelReasonValueTitle.label)
                        formData.append(`shps_list[0][description]`, this.cancelReasonValueDesc)
                    } else {
                        ChooseAllReason = true;
                    }

                if (ChooseAllReason) {
                    useNuxtApp().$toast.error('علت لغو انتخاب نشده است', {
                        rtl: true,
                        position: 'top-center',
                        theme: 'dark'
                    });
                } else {
                    formData.append(`order_id`, this.orderId)
                    formData.append(`accept`, 0)
                    this.returnOrRejectOrder(formData, '/order/cancel/crud/create', 0)
                    if (this.screenType === 'desktop') {
                        this.$refs.cancelOrderModal.dialog = true;
                    } else {
                        this.$refs.cancelOrderSheet.sheet = true;
                    }
                }

            }
        },

          /**
         * Increase count of product
         */
         increaseCount() {
            if(this.count < this.selectedSku?.count){
                this.count ++;
            }
        },

        /**
         * Decrease count of product
         */
        decreaseCount() {
            if (this.count > 1 && this.count <= this.selectedSku?.count) {
                this.count --;
            }
        },

        goBack(id){
            this.$router.push(`/user/order/${id}`)
        }
    },

    beforeMount() {
        const routeObject = this.$route.href.split('/')
        this.orderId = digits(routeObject[3], 'en');
        this.skuId = digits(routeObject[5], 'en');
        this.getOrder(this.orderId);
    },

    mounted() {
        /**
         * Check screen size
         */
        window.innerWidth < 769 ? this.screenType = 'mobile' : this.screenType = 'desktop';
    },

    watch:{
        orderReturnOrReject(newVal){
            if(newVal !== null){
                const data = {
                    label: 'مبلغ عودت داده شده : ' ,
                    value: newVal?.refund
                }
                this.refundItems.push(data)
            }
        }
    }
}
</script>
    
    
<style lang="scss">
@import "~/assets/scss/tools/bp";
@import '~/assets/scss/views/user.scss';
@import '~/assets/scss/views/order.scss';

.cancel-button {
    .v-btn {
        @include gbp(0, 768) {
            height: 45px;
        }

        .v-btn__content span {
            @include gbp(0, 768) {
                font-size: 14px !important;
            }
        }
    }
}

.cancel-order-card {
    &__image {
        width: 65px;
        height: 65px;
        flex: 0 0 65px;
        display: block;
        overflow: hidden;
        border-radius: var(--Space_12, 12px);
        border: 1px solid #F3F3F3;
        background: #FAFAFA;
        position: relative;
        margin-left: 6px;

        img {
            width: auto;
            height: 100%;
        }

        @include gbp(0, 768) {
            margin-bottom: 16px;
        }

    }

    &__count{
        @include gbp(0, 768) {
            width: 90%;
            margin-top: 24px;
        }
    }

    h2{
        @include gbp(0, 768) {
            text-align: center;
        }
    }
}
</style>
