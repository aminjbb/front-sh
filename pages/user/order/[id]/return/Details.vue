<template>
<main class="v-order v-order--return">
    <header class="v-user__mobile-page-head xs-show">
        <a href="/user/dashboard" class="ml-3">
            <v-icon icon="mdi-arrow-right" color="grey-darken-3" />
        </a>
        <span class="grey-darken-3 t14">خلاصه محموله مرجوعی</span>
    </header>

    <v-container>
        <v-row>
            <div class="col-3 pa-4 xs-hide">
                <generalUserSidebar />
            </div>
            <div class="col-9 pa-4 mobile-pa-0">
                <v-card class="py-5 mobile-pa-0 mobile-no-border d-flex flex-column">
                    <header class="d-flex align-center justify-space-between mb-5 xs-hide px-5">
                        <div class="d-flex align-center">
                            <a href="/user/dashboard" class="ml-3">
                                <v-icon icon="mdi-arrow-right" color="grey-darken-3" />
                            </a>
                            <span>خلاصه محموله مرجوعی</span>
                        </div>
                    </header>

                    <v-divider color="grey" class="xs-hide" />

                    <div v-for="item in returnedOrderDetail.data" :key="item.id" class="px-5">

                        <generalProductOrderCard :hideButtons="true" :content="item" :title="changeReason(item.return_reason)" :description="item.description" />

                        <v-divider color="grey-lighten-1" />

                        <div class="v-order__action d-flex align-center justify-end mt-5">
                            <div v-if="item && item.crm_status == 'reject'" class="v-order--return__status v-order--return__status--reject d-flex align-center ml-3">
                                <v-icon icon="mdi-alert-octagon-outline" color="red-darken-2" class="ml-2" />
                                <span class="t14 w600 text-red-darken-2">درخواست رد شد</span>
                            </div>

                            <div v-if="item && item.crm_status == 'accept'" class="v-order--return__status v-order--return__status--accept d-flex align-center ml-3">
                                <v-icon icon="mdi-checkbox-marked-circle" color="green-darken-2" class="ml-2" />
                                <span class="t14 w600 text-green-darken-2">درخواست مورد تایید قرار گرفت</span>
                            </div>

                            <div v-if="item && item.crm_status == 'waiting'" class="v-order--return__status v-order--return__status--loading d-flex align-center ml-3">
                                <v-icon icon="mdi-history" color="orange-darken-3" class="ml-2" />
                                <span class="t14 w600 text-orange-darken-3">درخواست در حال بررسی است</span>
                            </div>

                            <v-btn @click="cancelReturnRequest(item.id)" height="44" :disabled="/* content.status == 'accept' ? true :  */false" title="لغو درخواست" class="btn btn--cancel ml-3">
                                لغو درخواست
                            </v-btn>
                        </div>
                    </div>
                </v-card>

                <v-card v-if="hasAccept" class="py-5 mobile-pa-0 mobile-no-border d-flex flex-column">
                    <header class="d-flex align-center justify-space-between mb-5 xs-hide px-5">
                        <div class="d-flex align-center">
                            <span>جزئیات دریافت مرجوعی</span>
                        </div>
                    </header>

                    <v-divider color="grey" class="xs-hide" />

                    <div class="px-5">
                        <template v-if="returnDetailsMocket.subway === 'shavaz'">
                            <div class="mt-4">
                                <div class="t13 w400 text-grey mb-3">آدرس‌ تحویل کالای مرجوعی</div>
                                <div class="t13 w500 text-grey-darken-3 mb-3">{{ returnDetailsMocket.address }}</div>
                            </div>

                            <v-divider color="grey-lighten-1" />

                            <div class="mt-4 mb-5">
                                <div class="t13 w400 text-grey mb-3">تاریخ‌ تحویل کالای مرجوعی</div>
                                <div class="t13 w400 text-grey-darken-3 mb-3">{{ returnDetailsMocket.date }}</div>
                                <div class="d-flex align-center">
                                    <v-icon icon="mdi-alert-circle-check-outline" color="deep-purple" class="ml-2" />
                                    <span class="text-deep-purple t13 w400 l18 number-font">کالاهای مرجوعی توسط سفیر شاواز، در روزهای زوج بین ساعت ۰۹:۰۰ الی ۲۱:۰۰ جمع‌آوری می‌شود.</span>
                                </div>
                            </div>

                            <v-divider color="grey-lighten-1" />

                            <div class="d-flex align-center mt-3">
                                <v-icon icon="mdi-alert-circle-check" color="success" class="ml-2" />
                                <span class="text-success t14 w500 l18">پس از دریافت کالا توسط انبار، مبلغ مرجوعی به کیف پول شما بازمیگردد. </span>
                            </div>

                        </template>

                        <template v-else>
                            <div class="mt-4">
                                <div class="t13 w400 text-grey mb-3">مراحل مرجوع کردن کالا</div>
                                <nav class="mb-5">
                                    <ul class="pr-4">
                                        <li class="t13 w400 text-grey-darken-3 mb-1">کالا را با بسته بندی اصلی به همراه فاکتور کاغذی به
                                            پست محله خود تحویل دهید
                                        </li>
                                        <li class="t13 w400 text-grey-darken-3 mb-1">آدرس تحویل را به صورت کامل وارد نمایید</li>
                                        <li class="t13 w400 text-grey-darken-3 mb-1">تصویر رسید پرداختی پستی را بارگذاری نمایید</li>
                                    </ul>
                                </nav>
                                <div class="t13 w400 text-grey mb-3">آدرس‌ تحویل کالای مرجوعی</div>
                                <div class="t13 w500 text-grey-darken-3 mb-3">{{ returnDetailsMocket.address }}</div>
                            </div>

                            <v-divider color="grey-lighten-1" />

                            <div class="mt-4 mb-5">
                                <div class="t13 w400 text-grey mb-3">آدرس‌ تحویل کالای مرجوعی <span class="text-red">*</span></div>

                                <generalUploader @getImage="getImage" />

                                <div class="d-flex align-center mt-3">
                                    <v-icon icon="mdi-alert-circle-check-outline" color="deep-purple" class="ml-2" />
                                    <span class="text-deep-purple t12 w400 l18">بارگذاری تصویر کد رهگیری به معنای پذیرفته شدن هزینه ارسال توسط شاواز نمی‌باشد. در صورت بررسی و پذیرش توسط پشتیبانی، هزینه به همراه مجموع کالای مرجوعی به کیف پول شما بازمیگردد. </span>
                                </div>
                            </div>

                            <div class="d-flex align-center justify-end mt-5 mb-5 button-action">
                                <v-btn href="/user/order" height="44" title="بازگشت" class="btn btn--cancel ml-3">
                                    بازگشت
                                </v-btn>
                                <v-btn :loading="loading" @click="addRetrunWay()" height="44" title="ثبت درخواست" class="btn btn--submit">
                                    ثبت درخواست
                                </v-btn>
                            </div>

                            <v-divider color="grey-lighten-1" />

                            <div class="d-flex align-center mt-3">
                                <v-icon icon="mdi-alert-circle-check" color="success" class="ml-2" />
                                <span class="text-success t14 w500 l18">پس از دریافت کالا توسط انبار، مبلغ مرجوعی به کیف پول شما بازمیگردد. </span>
                            </div>
                        </template>
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
    data() {
        return {
            content: null,
            returnDetails: null,
            hasAccept:false,
            returnDetailsMocket: {
                address: 'بزرگراه جلال آل احمد، زیر پل آزمایش، ضلع جنوب شرقی جلال، کوچه کوی نویسندگان، مجتمع کوی نویسندگان، بلوک ۷، واحد ۱۵',
                date: 'دوشنبه - ۲۲ آبان ۱۴۰۲',
                subway: 'shavaz2'
            },

        }
    },
    computed: {
        /* hasAccept() {
            try {
                const findAccept = this.returnedOrderDetail.filter(order => order.status == true)
                if (findAccept) return true
                return false
            } catch (e) {
                return false
            }
        } */
    },

    methods: {
        cancelReturnRequest(id) {
            this.cancelReturnedOrder(id)
        },

        changeReason(item) {
            if (item === 'broken') return 'کالا اشتباه ارسال شده است'
            else if (item === 'wrong') return 'کالا خراب است.'
            else return 'کالا به دستم نرسیده است.'
        }
    },

    setup() {
        const title = ref('فروشگاه اینترنتی شاواز | جزئیات سفارش مرجوعی ')
        const description = ref("لیست سفارشات کاربر - سفارشات تایید شده - سفارشات در حال پردازش - سفارشات ارسال شده - سفارشات در حال ارسال - سفارشات مرجوعی")
        const {
            getReturnedOrderDetails,
            returnedOrderDetail,
            cancelReturnedOrder,
        } = new Order()

        useHead({
            title,
            meta: [{
                name: 'description',
                content: description
            }]
        })
        return {
            getReturnedOrderDetails,
            returnedOrderDetail,
            cancelReturnedOrder
        }

    },

    mounted() {
        this.getReturnedOrderDetails();
    }
}
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";
@import '~/assets/scss/views/user.scss';
@import '~/assets/scss/views/order.scss';

.button-action {
    .v-btn {
        @include gbp(0, 768) {
            width: 49%;
            flex: 0 0 49%;
        }
    }
}
</style>
