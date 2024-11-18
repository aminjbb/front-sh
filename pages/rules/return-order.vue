<template>
<client-only>
    <v-main class="v-rules">
        <v-container>
            <v-row>
                <v-col cols="12" md="3">
                    <generalRulesMenu />
                </v-col>

                <v-col cols="12" md="9">
                    <div class="br16" :class="screenType === 'desktop' ? 's-border--dark-gray bg-white s-border px-4 py-8' : 'py-1 px-1'">
                        <h1 class="t18 w700 text-sGrayDarken2 mb-6 xs-hide">فرآیند مرجوعی</h1>

                        <div class="return-order-message__item pt-4" :class="screenType === 'desktop' ? 'mb-8' : 'mb-4'">
                            <h3 class="w700 text-sGrayDarken2" :class="screenType === 'desktop' ? 't16 mb-3' : 't14 mb-2'">
                                پیدا کردن لیست سفارشات
                            </h3>
                            <p class="w500 text-sGray" :class="screenType === 'desktop' ? 't14' : 't12'">
                                از قسمت پروفایل گزینه‌ لیست سفارشات را پیدا کنید.
                            </p>
                            <div class="main-slider__image d-flex justify-center" :class="screenType === 'desktop' ? 'mt-8' : 'mt-4'">
                                <img v-if="screenType === 'desktop'" src="~/assets/images/returnOrder1.svg" width="432" alt="راهنمای مرجوعی کالا در شاواز" />
                                <img v-if="screenType === 'mobile'" src="~/assets/images/returnOrder8.svg" width="275" alt="راهنمای مرجوعی کالا در شاواز" />
                            </div>
                        </div>

                        <div class="return-order-message__item pt-4" :class="screenType === 'desktop' ? 'mb-8' : 'mb-4'">
                            <h3 class="w700 text-sGrayDarken2" :class="screenType === 'desktop' ? 't16 mb-3' : 't14 mb-2'">
                                انتخاب سفارشات تحویل داده شده
                            </h3>
                            <p class="w500 text-sGray" :class="screenType === 'desktop' ? 't14' : 't12'">
                                از بین سفارشات تحویل شده سفارش مورد نظرتان را پیدا کنید.
                            </p>
                            <div class="main-slider__image d-flex justify-center" :class="screenType === 'desktop' ? 'mt-8' : 'mt-4'">
                                <img v-if="screenType === 'desktop'" src="~/assets/images/returnOrder2.svg" width="432" alt="راهنمای مرجوعی کالا در شاواز" />
                                <img v-if="screenType === 'mobile'" src="~/assets/images/returnOrder9.svg" width="275" alt="راهنمای مرجوعی کالا در شاواز" />
                            </div>
                        </div>

                        <div class="return-order-message__item pt-4" :class="screenType === 'desktop' ? 'mb-8' : 'mb-4'">
                            <h3 class="w700 text-sGrayDarken2" :class="screenType === 'desktop' ? 't16 mb-3' : 't14 mb-2'">
                                انتخاب محصول برای مرجوعی
                            </h3>
                            <p class="w500 text-sGray" :class="screenType === 'desktop' ? 't14' : 't12'">
                                در این قسمت باید کالایی که قصد مرجوع کردن دارید را انتخاب کنید.
                            </p>
                            <div class="main-slider__image d-flex justify-center" :class="screenType === 'desktop' ? 'mt-8' : 'mt-4'">
                                <img v-if="screenType === 'desktop'" src="~/assets/images/returnOrder3.svg" width="432" alt="راهنمای مرجوعی کالا در شاواز" />
                                <img v-if="screenType === 'mobile'" src="~/assets/images/returnOrder10.svg" width="275" alt="راهنمای مرجوعی کالا در شاواز" />
                            </div>
                        </div>

                        <div class="return-order-message__item pt-4" :class="screenType === 'desktop' ? 'mb-8' : 'mb-4'">
                            <h3 class="w700 text-sGrayDarken2" :class="screenType === 'desktop' ? 't16 mb-3' : 't14 mb-2'">
                                ذخیره ی مدارک مرجوعی
                            </h3>
                            <p class="w500 text-sGray" :class="screenType === 'desktop' ? 't14' : 't12'">
                                پس از انتخاب محصول موردنظر مدارک خواسته شده را بارگذاری می‌کنید تا بتوانید درخواستتان را ثبت کنید.
                            </p>
                            <div class="main-slider__image d-flex justify-center" :class="screenType === 'desktop' ? 'mt-8' : 'mt-4'">
                                <img v-if="screenType === 'desktop'" src="~/assets/images/returnOrder4.svg" width="432" alt="راهنمای مرجوعی کالا در شاواز" />
                                <img v-if="screenType === 'mobile'" src="~/assets/images/returnOrder11.svg" width="275" alt="راهنمای مرجوعی کالا در شاواز" />
                            </div>
                        </div>

                        <div class="return-order-message__item pt-4" :class="screenType === 'desktop' ? 'mb-8' : 'mb-4'">
                            <h3 class="w700 text-sGrayDarken2" :class="screenType === 'desktop' ? 't16 mb-3' : 't14 mb-2'">
                                انتخاب محصول مورد نظر
                            </h3>
                            <p class="w500 text-sGray" :class="screenType === 'desktop' ? 't14' : 't12'">
                                اگر از یک محصول بیشتر از یک عدد در سفارشتان وجود داشت می‌توانید طبق بارکد درج شده روی محصول، کالای مرجوعی مدنظرتان را انتخاب کنید.
                            </p>
                            <div class="main-slider__image d-flex justify-center" :class="screenType === 'desktop' ? 'mt-8' : 'mt-4'">
                                <img v-if="screenType === 'desktop'" src="~/assets/images/returnOrder5.svg" width="432" alt="راهنمای مرجوعی کالا در شاواز" />
                                <img v-if="screenType === 'mobile'" src="~/assets/images/returnOrder12.svg" width="275" alt="راهنمای مرجوعی کالا در شاواز" />
                            </div>
                        </div>

                        <div class="return-order-message__item pt-4" :class="screenType === 'desktop' ? 'mb-8' : 'mb-4'">
                            <h3 class="w700 text-sGrayDarken2" :class="screenType === 'desktop' ? 't16 mb-3' : 't14 mb-2'">
                                ثبت نهایی مرجوعی سفارش
                            </h3>
                            <p class="w500 text-sGray" :class="screenType === 'desktop' ? 't14' : 't12'">
                                پس از انتخاب کالاهای موردنظر و بارگذاری اطلاعات مربوطه درخواستتان را ثبت نهایی کنید.
                            </p>
                            <div class="main-slider__image d-flex justify-center" :class="screenType === 'desktop' ? 'mt-8' : 'mt-4'">
                                <img v-if="screenType === 'desktop'" src="~/assets/images/returnOrder6.svg" width="432" alt="راهنمای مرجوعی کالا در شاواز" />
                                <img v-if="screenType === 'mobile'" src="~/assets/images/returnOrder13.svg" width="275" alt="راهنمای مرجوعی کالا در شاواز" />
                            </div>
                        </div>

                        <div class="return-order-message__item pt-4" :class="screenType === 'desktop' ? 'mb-8' : 'mb-4'">
                            <h3 class="w700 text-sGrayDarken2" :class="screenType === 'desktop' ? 't16 mb-3' : 't14 mb-2'">
                                پیگیری مرجوعی سفارش
                            </h3>
                            <p class="w500 text-sGray" :class="screenType === 'desktop' ? 't14' : 't12'">
                                همچنین میتوانید از قسمت سفارشات مرجوعی وضعیت درخواستتان را پیگیری کنید.
                            </p>
                            <div class="main-slider__image d-flex justify-center" :class="screenType === 'desktop' ? 'mt-8' : 'mt-4'">
                                <img v-if="screenType === 'desktop'" src="~/assets/images/returnOrder7.svg" width="406" alt="راهنمای مرجوعی کالا در شاواز" />
                                <img v-if="screenType === 'mobile'" src="~/assets/images/returnOrder14.svg" width="275" alt="راهنمای مرجوعی کالا در شاواز"/>
                            </div>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</client-only>
</template>

    
    
<script>
export default {
    data() {
        return {
            screenType: 'desktop',
        }
    },

    setup() {
        const title = ref('فروشگاه اینترنتی شاواز | قوانین - بازگشت محصول')
        const description = ref("بخش قوانی شاواز ، بازگشت محصول شاواز")

        useHead({
            title,
            meta: [{
                name: 'description',
                content: description
            }]
        })
    },

    beforeMount() {
        /**
         * Check screen size
         */
        window.innerWidth < 769 ? this.screenType = 'mobile' : this.screenType = 'desktop';
    },
}
</script>
    
    
<style>
@import '~/assets/scss/views/rules.scss';
</style>
