<template>
<main class="v-order v-order--return">
    <header class="v-user__mobile-page-head xs-show">
        <a href="/user/order" class="ml-3">
            <v-icon icon="mdi-arrow-right" color="grey-darken-3" />
        </a>
        <span class="grey-darken-3 t14">درخواست مرجوعی</span>
    </header>

    <v-container>
        <v-row>
            <div class="col-3 pa-4 xs-hide">
                <generalUserSidebar />
            </div>
            <div class="col-9 pa-4 mobile-pa-0">
                <v-card class="py-5 mobile-pa-0 mobile-no-border v-order__inner d-flex flex-column">
                    <header class="d-flex align-center justify-space-between mb-5 xs-hide px-5">
                        <div class="d-flex align-center">
                            <a href="/user/dashboard" class="ml-3">
                                <v-icon icon="mdi-arrow-right" color="grey-darken-3" />
                            </a>
                            <span>درخواست مرجوعی</span>
                        </div>
                    </header>

                    <v-divider color="grey" />

                    <div v-if="returnStep === 1" class="px-5">
                        <template v-for="(order, index) in userOrder?.details" :key="`order${order.id}`">
                            <div class="d-flex align-center justify-start">
                                <div class="w-checkbox">
                                    <v-checkbox
                                        v-model="selectedValue"
                                        hide-details
                                        @change="addToSelectedProduct(index,order)"
                                        :value="order.id" />
                                </div>

                                <generalProductOrderCard
                                    :ref="`orderCancelCard${order.id}`"
                                    class="flex-grow-1"
                                    :content="order"
                                    cancel
                                    hideButtons
                                    :index="index"
                                    :showCount="value[index] !== false && value[index]=== order.id && chooseAll !== true ? true : false"
                                    :showAllCount="value[index] !== false && value[index]=== order.id && chooseAll === true ? true : false"
                                    @changeProductCount="changeProductCount" />
                            </div>

                            <div v-if="value[index] !== false && value[index] === order.id && chooseAll !== true" class="v-order--return__accordion">
                                <div class="mb-5">
                                    <label class="d-block t13 text-grey-darken-1 mb-2">علت مرجوعی<span class="text-red-accent-4">*</span> </label>
                                    <v-select
                                        density="compact"
                                        variant="outlined"
                                        single-line
                                        :rules="rule"
                                        item-title="label"
                                        item-value="value"
                                        hide-details
                                        return-object
                                        :items="returnReasonItems"
                                        @update:menu="onUpdateMenu"
                                        v-model="returnReasonValueTitle[index]" />
                                </div>

                                <div>
                                    <label class="d-block t13 text-grey-darken-1 mb-2">توضیحات</label>
                                    <v-textarea
                                        variant="outlined"
                                        v-model="returnReasonValueDesc[index]"
                                        rows="3" />
                                </div>

                                <div class="mb-5">
                                    <label class="d-block t13 text-grey-darken-1 mb-2">تصویر یا ویدیو </label>
                                    <span class="t12 w500 text-grey mb-4 d-block">در صورت قابل رویت بودن ایراد کالا در ظاهر، به صورتی عکس بگیرید که مشخص باشد.</span>

                                    <generalUploader :ref="`imageUploader${index}`" @getImage="(image) => getImage(image, index)" />
                                </div>

                                <div class="mb-5">
                                    <label class="d-block t13 text-grey-darken-1 mb-2">روش بازگشت وجه<span class="text-red-accent-4">*</span> </label>
                                    <v-select
                                        density="compact"
                                        variant="outlined"
                                        :rules="rule"
                                        item-title="label"
                                        item-value="value"
                                        hide-details
                                        return-object
                                        :items="catchItems"
                                        @update:menu="onUpdateMenu"
                                        v-model="returnReasonValueCatch[index]" />
                                </div>
                            </div>

                            <v-divider color="grey-lighten-1" />
                        </template>

                        <div class="d-flex align-center justify-space-between">
                            <div class="d-flex flex-column">
                                <span class="t12 w400 text-grey-darken-1 mb-2 mt-4">مبلغ مرجوعی</span>
                                <div>
                                    <span class="t18 w400 text-grey-darken-2 number-font">
                                        {{ splitChar(SelectedProductPrice(selectedProducts)) }}</span>
                                    <span class="t12 w300 text-grey-darken-2">تومان</span>
                                </div>
                            </div>

                            <div class="d-flex align-center justify-end mt-5">
                                <v-btn
                                    @click="$router.go(-1)"
                                    height="44"
                                    title="بازگشت"
                                    class="btn btn--cancel ml-3">
                                    بازگشت
                                </v-btn>

                                <v-btn
                                    :loading="loadingStep1"
                                    @click="selectProducts()"
                                    height="44"
                                    :disabled="activeSubmit === true ? true : false"
                                    title="ادامه"
                                    class="btn btn--submit">
                                    ادامه
                                </v-btn>
                            </div>
                        </div>
                    </div>

                    <div v-if="returnStep === 2" class="px-5">
                        <template v-for="(selected, index) in selectedProducts" :key="`orders${index}`">
                            <generalProductOrderCard
                                :hideButtons="true"
                                :content="selected.item"
                                :count="selected.count"
                                :title="returnReasonValueTitleStep2[index]"
                                :description="returnReasonValueDescStep2[index]" />
                            <v-divider v-if="index < selectedProducts.length" color="grey-lighten-1" />
                        </template>

                        <v-row class="mt-1 mb-1">
                            <v-col
                                cols="4"
                                md="3"
                                class="d-flex flex-column">
                                <div class="t13 w400 text-grey mb-2">هزینه مرجوعی:</div>
                                <div class="d-flex align-center">
                                    <span class="t19 w400 text-grey-darken-2 product-card__price-info__price product-card__price-info__price--main number-font ml-1">
                                        {{ splitChar(SelectedProductPrice(selectedProducts)) }}
                                    </span>
                                    <span class="t12 w300 text-grey-darken-2 currency">تومان</span>
                                </div>
                            </v-col>
                        </v-row>

                        <v-divider color="grey-lighten-1" />

                        <div class="d-flex align-center justify-end mt-5">
                            <v-btn
                                @click="backToFirstStep()"
                                height="44"
                                title="بازگشت"
                                class="btn btn--cancel ml-3">
                                بازگشت
                            </v-btn>

                            <v-btn
                                :loading="loadingStep2"
                                @click="submit()"
                                height="44"
                                title="ثبت درخواست"
                                class="btn btn--submit">
                                ثبت درخواست
                            </v-btn>
                        </div>
                    </div>

                    <div v-if="returnStep === 3" class="px-5">
                        <h2 class="t15 w400 text-grey-darken-3 mt-3 mb-3">درخواست مرجوعی شما ثبت شد.</h2>
                        <p class="t14 w400 text-grey-darken-1 mb-3">درخواست شما در حال بررسی است.در صورت تایید یا رد درخواست از
                            طریق پیامک به شما اطلاع خواهیم داد.</p>

                        <div class="d-flex align-center">
                            <span class="t13 w400 text-grey ml-2">کد پیگیری مرجوعی:</span>
                            <span v-if="orderReturnOrRejectObject.data.data && orderReturnOrRejectObject.data.data.id" class="t13 w500 text-grey-darken-3 number-font">{{orderReturnOrRejectObject.data.data.id}}</span>
                        </div>

                        <div class="d-flex align-center justify-end mt-5">
                            <v-btn
                                height="44"
                                title="بازگشت به صفحه اصلی"
                                class="btn btn--cancel ml-3">
                                بازگشت به صفحه اصلی
                            </v-btn>

                            <v-btn
                                :href="`/user/order/${orderReturnOrRejectObject.data.data.id}/return/details`"
                                height="44"
                                title="پیگیری درخواست"
                                class="btn btn--submit">
                                پیگیری درخواست
                            </v-btn>
                        </div>
                    </div>
                </v-card>

                <div v-if="returnStep === 2 || returnStep === 1">
                    <generalWarning text="ثبت درخواست مرجوعی به معنی تایید درخواست نیست. در صورت تایید درخواست مرجوعی، از طریق پیامک به شما اطلاع خواهیم داد." />
                </div>
            </div>
        </v-row>
    </v-container>
</main>
</template>

<script>
import {
    splitChar
} from "~/utils/functions.js";
import Order from '@/composables/Order.js'

export default {
    data() {
        return {
            returnStep: 1,
            activeSubmit: false,
            chooseAll: false,
            products: [],
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
            catchItems: [{
                    label: 'مبلغ کالا به کیف پول مرجوع شود.',
                    value: 'order'
                },
                {
                    label: 'کالا مجددا ارسال شود.',
                    value: 'wallet'
                }
            ],
            value: [],
            selectedValue: [],
            returnReasonValueTitle: [],
            returnReasonValueDesc: [],
            returnReasonValueCatch: [],
            returnImageId: [],
            selectedProducts: [],
            trackingCode: null,
            returnReasonValueTitleStep2: [],
            returnReasonValueDescStep2: [],
            returnReasonValueCatchStep2: [],
            accept:null,
            loadingStep1:false,
            loadingStep2:false
        }
    },

    setup() {
        const title = ref('فروشگاه اینترنتی شاواز | درخواست مرجوعی سفارش')
        const description = ref("لیست سفارشات کاربر - سفارشات تایید شده - سفارشات در حال پردازش - سفارشات ارسال شده - سفارشات در حال ارسال - سفارشات مرجوعی")
        const {
            getOrder,
            order,
            returnOrRejectOrder,
            orderReturnOrRejectObject
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
            orderReturnOrRejectObject
        }
    },

    computed: {
        /** single order object **/
        userOrder() {
            try {
                return this.order ?.data ?.data
            } catch (e) {

            }
        }
    },

    watch:{
        orderReturnOrRejectObject(newValue) {
            if(newValue.status === 200 && this.accept === 0){
                this.returnStep = 2;
            }

            if(newValue.status === 200 && this.accept === 1){
                this.returnStep = 3;
            }
        }
    },

    methods: {
        splitChar,

        /**
         * Check checkbox and select item
         * @param {*} productIndex
         * @param {*} item
         */
        addToSelectedProduct(productIndex, item) {
            const valuesIndex = this.value.findIndex(element => element == item.id);
             const selectedProductIndex = this.selectedProducts.findIndex(element => element.id == item.id);

            if (valuesIndex == -1) {
                this.value[productIndex] = item.id;
                const obj = {
                    count: 1,
                    id: item.id,
                    item: item,
                }
                this.selectedProducts.push(obj);
            } else {
                if (selectedProductIndex !== -1) {
                    this.selectedProducts.splice(selectedProductIndex, 1);
                }
                //this.value.splice(valuesIndex, 1);
                this.value[valuesIndex] = null;
                //this.selectedProducts.splice(valuesIndex, 1);
                this.$refs[`orderCancelCard${item.id}`][0].productCount = 1;
            }
        },

        /**
         * Change product count
         * @param {*} item
         */
        changeProductCount(item) {
            const findProduct = this.selectedProducts.findIndex(element => element.id == item.id);

            if (findProduct !== -1) {
                this.selectedProducts.splice(findProduct, 1);
                this.selectedProducts.push(item);
            }
        },

        /**
         * Get image from emit
         */
        getImage(image, index) {
            const form = {
                file_id: image.file_id,
                index: index
            }
            this.returnImageId.push(form)
        },
           

        /**
         * Submit selected product
         */
        selectProducts() {
            this.createFormDataAndSendToServer(0)
        },

        /**
         * create formData and send to api
         */
        createFormDataAndSendToServer(accept) {
            this.returnReasonValueTitleStep2 = [];
            this.returnReasonValueDescStep2 = [];
            this.returnReasonValueCatchStep2 = [];

            if(accept === 0){
                this.loadingStep1 = true;
            }else{
                this.loadingStep2 = true;
            }
            const formData = new FormData()
            this.selectedProducts.forEach((product, index) => {
                const findIndex = this.userOrder.details.findIndex(item => item.id === product.id)

                formData.append(`shps_list[${index}][shps]`, product ?.item ?.shps ?.id)
                formData.append(`shps_list[${index}][returned_count]`, product ?.count)
                formData.append(`shps_list[${index}][return_reason]`, this.returnReasonValueTitle[findIndex].value)
                formData.append(`shps_list[${index}][description]`, this.returnReasonValueDesc[findIndex])
                formData.append(`shps_list[${index}][payback_method]`, this.returnReasonValueCatch[findIndex].value)

                const returnImages = this.returnImageId.filter((image) => image.index === findIndex)
                

                if (returnImages) {
                    returnImages.forEach((image, imageIndex) => {
                        formData.append(`shps_list[${index}][files][${imageIndex}]`, image.file_id)
                    })
                }

                this.returnReasonValueTitleStep2.push(this.returnReasonValueTitle[findIndex].label);
                this.returnReasonValueDescStep2.push(this.returnReasonValueDesc[findIndex]);
                this.returnReasonValueCatchStep2.push(this.returnReasonValueCatch[findIndex].value);

                
            })
            console.log('this.returnReasonValueTitleStep2',this.returnReasonValueTitleStep2)
            console.log('this.returnReasonValueDescStep2',this.returnReasonValueDescStep2)

            console.log('this.returnReasonValueCatchStep2',this.returnReasonValueCatchStep2)
            formData.append(`order_id`, this.$route.params.id)
            formData.append(`accept`, accept)
            this.accept = accept;
            this.returnOrRejectOrder(formData, '/order/returned/crud/create');
            this.loadingStep1 = false;
        },

        /**
         * Submit return request
         */
        submit() {
            this.createFormDataAndSendToServer(1)
        },

        /**
         * Sum selected products price
         * @param {*} array 
         */
        SelectedProductPrice(array){
            let sum = 0;
            if(array){
                    array.forEach(element => {
                    sum = sum + element?.item?.site_price;
                })
            }
            
            return Number(String(sum).slice(0, -1))
        },

        /**
         * Fix bug for select in c-select
         */
         onUpdateMenu(open) {
            if (open) {
                // WORKAROUND: fixes dialog menu popup position
                setTimeout(() => window.dispatchEvent(new Event("resize")), 50);
            }
        },

        backToFirstStep() {
            this.returnStep = 1;
            setTimeout(() => {
                this.selectedProducts.forEach((product) => {
                this.$refs[`orderCancelCard${product.id}`][0].productCount = product.count;
                })
            }, 1000)

        }
    },

    beforeMount() {
        this.getOrder()
    }
}
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";
@import '~/assets/scss/views/user.scss';
@import '~/assets/scss/views/order.scss';
</style>
