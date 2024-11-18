<template>
<v-bottom-sheet v-if="sheet" v-model="sheet" class="c-modal">
    <div class="pt-4 px-3 pb-8 bg-white">
        <header class="c-modal__header d-flex justify-space-between align-center pb-1">
            <span class="t16 w700 text-sGrayDarken2">
                راهنمای مرجوع سفارش
            </span>

            <v-btn class="c-modal__header__btn pa-0 text-none" @click="closeModal()" color="grey-darken-1" size="large" variant="icon">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </header>

        <div class="mt-6">
            <swiper
                :pagination="true"
                :navigation="true"
                :modules="modules"
                :autoHeight="true"
                id="returnOrderMessageSheetSlider">
                <swiper-slide>
                    <div class="return-order-message__item">
                        <h3 class="t16 w700 text-sGrayDarken2 mb-2">
                            پیدا کردن لیست سفارشات
                        </h3>
                        <p class="t12 w500 text-sGray l18">
                            از قسمت پروفایل گزینه‌ لیست سفارشات را پیدا کنید.
                        </p>
                        <div class="return-order-message__image d-flex justify-center mt-4">
                            <img src="~/assets/images/returnOrder8.svg" width="275" height="261"/>
                        </div>
                    </div>
                </swiper-slide>

                <swiper-slide>
                    <div class="return-order-message__item">
                        <h3 class="t16 w700 text-sGrayDarken2 mb-2">
                            انتخاب سفارشات تحویل داده شده
                        </h3>
                        <p class="t12 w500 text-sGray l18">
                            از بین سفارشات تحویل شده سفارش مورد نظرتان را پیدا کنید.
                        </p>
                        <div class="return-order-message__image d-flex justify-center mt-4">
                            <img src="~/assets/images/returnOrder9.svg" width="275" height="261"/>
                        </div>
                    </div>
                </swiper-slide>

                <swiper-slide>
                    <div class="return-order-message__item">
                        <h3 class="t16 w700 text-sGrayDarken2 mb-2">
                            انتخاب محصول برای مرجوعی
                        </h3>
                        <p class="t12 w500 text-sGray l18">
                            در این قسمت باید کالایی که قصد مرجوع کردن دارید را انتخاب کنید.
                        </p>
                        <div class="return-order-message__image d-flex justify-center mt-4">
                            <img src="~/assets/images/returnOrder10.svg" width="275" height="261"/>
                        </div>
                    </div>
                </swiper-slide>

                <swiper-slide>
                    <div class="return-order-message__item">
                        <h3 class="t16 w700 text-sGrayDarken2 mb-2">
                            ذخیره ی مدارک مرجوعی
                        </h3>
                        <p class="t12 w500 text-sGray l18">
                            پس از انتخاب محصول موردنظر مدارک خواسته شده را بارگذاری می‌کنید تا بتوانید درخواستتان را ثبت کنید.
                        </p>
                        <div class="return-order-message__image d-flex justify-center mt-4">
                            <img src="~/assets/images/returnOrder11.svg" width="275" height="261"/>
                        </div>
                    </div>
                </swiper-slide>

                <swiper-slide>
                    <div class="return-order-message__item">
                        <h3 class="t16 w700 text-sGrayDarken2 mb-2">
                            انتخاب محصول مورد نظر
                        </h3>
                        <p class="t12 w500 text-sGray l18">
                            اگر از یک محصول بیشتر از یک عدد در سفارشتان وجود داشت می‌توانید طبق بارکد درج شده روی محصول، کالای مرجوعی مدنظرتان را انتخاب کنید.
                        </p>
                        <div class="return-order-message__image d-flex justify-center mt-3">
                            <img src="~/assets/images/returnOrder12.svg" width="275" height="261"/>
                        </div>
                    </div>
                </swiper-slide>

                <swiper-slide>
                    <div class="return-order-message__item">
                        <h3 class="t16 w700 text-sGrayDarken2 mb-2">
                            ثبت نهایی مرجوعی سفارش
                        </h3>
                        <p class="t12 w500 text-sGray l18">
                            پس از انتخاب کالاهای موردنظر و بارگذاری اطلاعات مربوطه درخواستتان را ثبت نهایی کنید.
                        </p>
                        <div class="return-order-message__image d-flex justify-center mt-4">
                            <img src="~/assets/images/returnOrder13.svg" width="275" height="261"/>
                        </div>
                    </div>
                </swiper-slide>

                <swiper-slide>
                    <div class="return-order-message__item">
                        <h3 class="t16 w700 text-sGrayDarken2 mb-2">
                            پیگیری مرجوعی سفارش
                        </h3>
                        <p class="t12 w500 text-sGray l18">
                            همچنین میتوانید از قسمت سفارشات مرجوعی وضعیت درخواستتان را پیگیری کنید.
                        </p>
                        <div class="return-order-message__image d-flex justify-center mt-4">
                            <img src="~/assets/images/returnOrder14.svg" width="275" height="261"/>
                        </div>
                    </div>
                </swiper-slide>
            </swiper>
        </div>
    </div>
</v-bottom-sheet>
</template>

<script>
// Import Swiper Vue.js components
import {
    Swiper,
    SwiperSlide
} from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import {
    Pagination,
    Navigation
} from 'swiper/modules';

export default {

    data() {
        return {
            sheet: false,
            loading: false,
        }
    },

    components: {
        Swiper,
        SwiperSlide,
    },


    methods: {
        openModal() {
            this.sheet = true;

            setTimeout(() => {
                const slider = document.getElementById("returnOrderMessageSheetSlider");
                if(slider){
                    const nextClass = slider.getElementsByClassName('swiper-button-next')
                    if(nextClass){
                        nextClass[0].innerHTML = 'بعدی';
                    }

                    const prevClass = slider.getElementsByClassName('swiper-button-prev')
                    if(prevClass){
                        prevClass[0].innerHTML = 'قبلی';
                    }
                }
            }, 50);
        },

        closeModal() {
            this.sheet = false;
        },
    },

    setup() {
        return {
            modules: [Pagination, Navigation],
        };
    },
}
</script>

<style lang="scss">
.c-modal {
    .v-bottom-sheet__content{
        border-top-right-radius: 16px !important;
        border-top-left-radius: 16px !important;
        overflow: hidden !important;
    }

    &__header {
        &__btn {
            min-width: auto !important;

            .v-btn__content {
                background: #ddd;
                border-radius: 50%;
            }
        }
    }

    #returnOrderMessageSheetSlider{
        padding-bottom: 100px !important;

        .return-order-message__image{
            img{
                height: 261px !important;
                width: auto !important;

            }
        }

        .swiper-button-next,
        .swiper-button-prev{
            bottom: 0 !important;
            top: unset !important;
            &::after{
                display: none;
            }
        }

        .swiper-button-next{
            border: none;
            border-radius: 12px !important;
            box-shadow: none !important;
            background-color: #D72685 !important;
            color: white;
            width: 80px;
            height: 45px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            font-variation-settings: "wght" 700;
        }

        .swiper-button-prev{
            border: 2px solid #D72685 !important;
            border-radius: 12px !important;
            box-shadow: none !important;
            color: #D72685;
            width: 80px;
            height: 45px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            font-variation-settings: "wght" 700;
        }

        .swiper-pagination{
            bottom: 75px !important;
            top: unset !important;

            .swiper-pagination-bullet {
                width: 6px !important;
                height: 6px !important;
                background-color: #EFA8CE !important;

                &.swiper-pagination-bullet-active {
                    background-color: #D72685 !important;
                }
            }
        }
    }
}
</style>
