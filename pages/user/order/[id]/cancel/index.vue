<template>
<main class="v-order v-order--canceling">
    <header class="v-user__mobile-page-head xs-show">
        <a href="/user/dashboard" class="ml-3">
            <v-icon icon="mdi-arrow-right" color="grey-darken-3" />
        </a>
        <span class="grey-darken-3 t14">درخواست لغو</span>
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
                            <span>درخواست لغو</span>
                        </div>
                    </header>

                    <v-divider color="grey" />

                    <div v-if="cancelingStep === 1" class="px-5">
                        <div class="">
                            <v-checkbox
                                v-model="checkAllProducts"
                                @click="chooseAllProducts()"
                                hide-details
                                label="لغو کل سفارش" />
                        </div>

                        <v-divider color="grey" />

                        <template v-for="(item, index) in mocketProducts" :key="`order${index}`">
                            <div class="d-flex align-center justify-start">
                                <div>
                                    <v-checkbox
                                        hide-details
                                        @click="addToSelectedProduct(index,item)"
                                        :value="item.id" />
                                </div>

                                <generalProductOrderCard
                                    class="flex-grow-1"
                                    :content="item"
                                    cancel
                                    hideButtons
                                    :index="index"
                                    :showCount="value[index] !== false && value[index] && chooseAll !== true ? true : false"
                                    :showAllCount="value[index] !== false && value[index] && chooseAll === true ? true : false"
                                    @productCount="changeProductCount" />
                            </div>

                            <div v-if="value[index] !== false && value[index] && chooseAll !== true" class="v-order--canceling__accordion">
                                <div class="mb-5">
                                    <label class="d-block t13 text-grey-darken-1 mb-2">علت لغو<span class="text-red-accent-4">*</span> </label>
                                    <v-select
                                        density="compact"
                                        variant="outlined"
                                        single-line
                                        :rules="rule"
                                        item-title="label"
                                        item-value="value"
                                        hide-details
                                        :items="cancelReasonItems"
                                        v-model="cancelReasonValueTitle[index]" />
                                </div>

                                <div>
                                    <label class="d-block t13 text-grey-darken-1 mb-2">توضیحات</label>
                                    <v-textarea
                                        variant="outlined"
                                        v-model="cancelReasonValueDesc[index]"
                                        rows="3" />
                                </div>
                            </div>

                            <v-divider color="grey-lighten-1" />
                        </template>

                        <div v-if="chooseAll === true" class="v-order--canceling__accordion mt-5">
                            <div class="mb-5">
                                <label class="d-block t13 text-grey-darken-1 mb-2">علت لغو<span class="text-red-accent-4">*</span> </label>
                                <v-select
                                    density="compact"
                                    variant="outlined"
                                    single-line
                                    :rules="rule"
                                    item-title="label"
                                    item-value="value"
                                    hide-details
                                    :items="cancelReasonItems"
                                    v-model="cancelReasonValueTitleAll" />
                            </div>

                            <div>
                                <label class="d-block t13 text-grey-darken-1 mb-2">توضیحات</label>
                                <v-textarea
                                    variant="outlined"
                                    v-model="cancelReasonValueDescAll"
                                    rows="3" />
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
                                :loading="loading"
                                @click="selectProducts()"
                                height="44"
                                :disabled="activeSubmit === true ? true : false"
                                title="ادامه"
                                class="btn btn--submit">
                                ادامه
                            </v-btn>
                        </div>
                    </div>

                    <div v-if="cancelingStep === 2" class="px-5">
                        <template v-for="(selected, index) in selectedProducts" :key="`orders${index}`">
                            <generalProductOrderCard
                                :hideButtons="true"
                                :content="selected.item"
                                :count="selected.count"
                                title=" از خرید این کالا منصرف شدم"
                                description="این کالا را در سفارش شماره 64920 هم اضافه کردم بخاطر همین میخوام از این سفارش کنسل کنم" />
                            <v-divider v-if="index < selectedProducts.length" color="grey-lighten-1" />
                        </template>

                        <v-row class="mt-1 mb-1">
                            <v-col cols="4" md="3" class="d-flex flex-column">
                                <div class="t13 w400 text-grey mb-2">مبلغ مرجوعی کالا:</div>
                                <div class="d-flex align-center">
                                    <span class="t19 w400 text-grey-darken-2 product-card__price-info__price product-card__price-info__price--main number-font ml-1">
                                        {{splitChar('85116')}}
                                    </span>
                                    <span class="t12 w300 text-grey-darken-2 currency">تومان</span>
                                </div>
                            </v-col>

                            <v-col cols="4" md="3" class="d-flex flex-column">
                                <div class="t13 w400 text-grey mb-2">هزینه ارسال:</div>
                                <div class="d-flex align-center">
                                    <span class="t19 w400 text-grey-darken-2 product-card__price-info__price product-card__price-info__price--main number-font ml-1">
                                        {{splitChar('35000')}}
                                    </span>
                                    <span class="t12 w300 text-grey-darken-2 currency">تومان</span>
                                </div>
                            </v-col>

                            <v-col cols="4" md="3" class="d-flex flex-column">
                                <div class="t13 w400 text-grey mb-2">هزینه مرجوعی:</div>
                                <div class="d-flex align-center">
                                    <span class="t19 w400 text-grey-darken-2 product-card__price-info__price product-card__price-info__price--main number-font ml-1">
                                        {{splitChar('50116')}}
                                    </span>
                                    <span class="t12 w300 text-grey-darken-2 currency">تومان</span>
                                </div>
                            </v-col>
                            
                        </v-row>

                        <v-divider color="grey-lighten-1" />

                        <div class="d-flex align-center justify-end mt-5">
                            <v-btn
                                @click="cancelingStep = 1"
                                height="44"
                                title="بازگشت"
                                class="btn btn--cancel ml-3">
                                بازگشت
                            </v-btn>
                            <v-btn
                                :loading="loading"
                                @click="submit()"
                                height="44"
                                title="ثبت درخواست"
                                class="btn btn--submit">
                                ثبت درخواست
                            </v-btn>
                        </div>
                    </div>
                </v-card>

                <div>
                    <generalWarning text="در صورت کاهش قیمت سفارش به کمتر از مبلغ ارسال رایگان، هزینه ارسال از مبلغ مرجوعی کسر خواهد شد." />
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
export default {
    data() {
        return {
            cancelingStep: 1,
            checkAllProducts: false,
            activeSubmit: false,
            chooseAll: false,
            products: [],
            mocketProducts: [{
                    image: {
                        image_url: 'products.jpg'
                    },
                    label: 'ماشین اصلاح موی صورت لکسیکال مدل LHC-5631',
                    brand: 'لکسیکال',
                    color: {
                        label: 'سبز',
                        code: '#388E3C',
                    },
                    seller: 'سلامت‌گستران نفیس',
                    count: '2',
                    customer_price: '42558',
                    site_price: '51900',
                    status: 'return-request',
                    discount: '1',
                    id: '658'
                },
                {
                    image: {
                        image_url: 'products.jpg'
                    },
                    label: 'شامپو تقویت‌کننده و ضدریزش مو فولیکا',
                    brand: 'لکسیکال',
                    color: {
                        label: 'توسی',
                        code: '#aaaaaa',
                    },
                    seller: 'سلامت‌گستران نفیس',
                    count: '5',
                    customer_price: '42558',
                    site_price: '51900',
                    status: 'return-cancel',
                    discount: '1',
                    id: '545'
                }
            ],
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
            cancelReasonValueTitle: [],
            cancelReasonValueDesc: [],
            cancelReasonValueTitleAll: null,
            cancelReasonValueDescAll: null,
            selectedProducts: [],
        }
    },

    setup() {
        const title = ref('فروشگاه اینترنتی شاواز | درخواست لغو سفارش')
        const description = ref("لیست سفارشات کاربر - سفارشات تایید شده - سفارشات در حال پردازش - سفارشات ارسال شده - سفارشات در حال ارسال - سفارشات مرجوعی")

        useHead({
            title,
            meta: [{
                name: 'description',
                content: description
            }]
        })
    },

    methods: {
        splitChar,

        /**
         * Check checkbox and select item
         * @param {*} productIndex 
         * @param {*} item 
         */
        addToSelectedProduct(productIndex, item) {
            if (this.checkAllProducts == true) {
                this.checkAllProducts = false;
                this.chooseAll = false;
                this.value = [];
                this.selectedProducts = [];
            }

            const valuesIndex = this.value.findIndex(element => element == item.id);
            if (valuesIndex == -1) {
                this.value[productIndex] = item.id;
                const obj = {
                    count: 1,
                    id: item.id,
                    item: item,
                }
                this.selectedProducts.push(obj);
            } else {
                this.value.splice(valuesIndex, 1);
                this.selectedProducts.splice(valuesIndex, 1);
            }
        },

        /**
         * Checked checkbox for choose all products
         */
        chooseAllProducts() {
            this.chooseAll = !this.chooseAll;
            this.value = [];
            this.selectedProducts = [];

            if (this.chooseAll == true) {

                this.mocketProducts.forEach((product, index) => {
                    this.value[index] = product.id;

                    const obj = {
                        count: product.count,
                        id: product.id,
                        item: product,
                    }
                    this.selectedProducts.push(obj);
                })
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
         * Submit selected product
         */
        selectProducts() {
            //To Do: After submit should fill this method and fill 
            this.cancelingStep = 2;
        },

        submit(){
            //To Do: Send request for order canceling
        }
    },
}
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";
@import '~/assets/scss/views/user.scss';
@import '~/assets/scss/views/order.scss';
</style>
