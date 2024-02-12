<template lang="">
<footer class="footer footer--desktop">
    <v-container>
        <div class="footer__logo">
            <a href="/" title="Shavaz logo">
                <img src="~/assets/images/shavaz-logo.svg" class="logo-shz" alt="Shavaz Logo" width="107" height="38" title="Shavaz Logo" />
            </a>

            <button @click="scrollToTop">
                <span class="t12 text-grey-darken-1">
                    بازگشت به بالا
                </span>
                <v-icon icon="mdi-arrow-up-thin" />
            </button>
        </div>

        <v-row>
            <v-col cols="12" md="7">
                <div class="footer__menus">
                    <div>
                        <header class="t16 mb-4">دسترسی سریع</header>
                        <ul>
                            <li><a href="/" class="t13 text-grey">لوازم آرایشی</a></li>
                            <li><a href="/" class="t13 text-grey">مراقبت از پوست</a></li>
                            <li><a href="/" class="t13 text-grey">بهداشت خانگی</a></li>
                            <li><a href="/" class="t13 text-grey">مراقبت از کودکان</a></li>
                            <li><a href="/" class="t13 text-grey">لوازم بهداشتی</a></li>
                        </ul>
                    </div>

                    <div>
                        <header class="mb-4">
                            <h4 class="t16">درباره شاواز</h4>
                        </header>
                        <ul>
                            <li><a href="/" class="t13 text-grey">درباره ما</a></li>
                            <li><a href="/contact" class="t13 text-grey">تماس با ما</a></li>
                            <li><a href="/faq" class="t13 text-grey">سوالات متدال</a></li>
                            <li><a href="/" class="t13 text-grey">فرصت‌های شغلی</a></li>
                            <li><a href="/" class="t13 text-grey">فروشنده شوید</a></li>
                        </ul>
                    </div>

                    <div>
                        <header class="mb-4">
                            <h4 class="t16">راهنمای خرید</h4>
                        </header>
                        <ul>
                            <li><a href="/" class="t13 text-grey">نحوه ثبت سفارش</a></li>
                            <li><a href="/" class="t13 text-grey">روش‌های پرداخت</a></li>
                            <li><a href="/" class="t13 text-grey">شیوه‌های ارسال</a></li>
                            <li><a href="/" class="t13 text-grey">شرایط مرجوعی</a></li>
                        </ul>
                    </div>
                </div>
            </v-col>
            <v-col cols="12" md="5">
                <header class="mb-4 mt-4">
                   <h4 class="t16"> با ما در ارتباط باشید</h4>
                </header>

                <div class="footer__social-media mb-7" title="Shavaz instagram">
                    <a href="/" title="instagram">
                        <v-icon icon="mdi-instagram" />
                    </a>

                    <a href="/" title="Shavaz youtube">
                        <v-icon icon="mdi-youtube" />
                    </a>

                    <a href="/" title="Shavaz telegram">
                        <svg class="custom-svg-icon" xmlns="http://www.w3.org/2000/svg" width="30" height="29" viewBox="0 0 28 28" fill="gray">
                            <g clip-path="url(#clip0_322_133)">
                                <path d="M28 14C28 17.713 26.525 21.274 23.8995 23.8995C21.274 26.525 17.713 28 14 28C10.287 28 6.72601 26.525 4.10051 23.8995C1.475 21.274 0 17.713 0 14C0 10.287 1.475 6.72601 4.10051 4.10051C6.72601 1.475 10.287 0 14 0C17.713 0 21.274 1.475 23.8995 4.10051C26.525 6.72601 28 10.287 28 14ZM14.5022 10.3355C13.1407 10.9025 10.4178 12.075 6.33675 13.853C5.67525 14.1155 5.327 14.3745 5.2955 14.6265C5.243 15.0517 5.77675 15.2198 6.503 15.449L6.80925 15.5453C7.52325 15.778 8.48575 16.0492 8.9845 16.0597C9.4395 16.0702 9.94525 15.8848 10.5035 15.4998C14.3167 12.9255 16.2855 11.6252 16.408 11.5972C16.4955 11.5763 16.618 11.5518 16.6985 11.6252C16.7808 11.697 16.772 11.8352 16.7633 11.872C16.7108 12.0977 14.616 14.0437 13.5327 15.0518C13.195 15.3667 12.9552 15.589 12.9062 15.6398C12.7984 15.75 12.6887 15.8585 12.5772 15.9653C11.9122 16.6058 11.4152 17.0853 12.6035 17.8693C13.1757 18.2473 13.6342 18.557 14.091 18.8685C14.588 19.208 15.085 19.5457 15.729 19.9692C15.8917 20.0743 16.0493 20.188 16.2015 20.2965C16.7808 20.7095 17.304 21.0805 17.9463 21.021C18.3207 20.986 18.7075 20.636 18.9035 19.586C19.3673 17.1063 20.279 11.7355 20.489 9.52175C20.5018 9.33772 20.4942 9.15284 20.4662 8.9705C20.4498 8.82336 20.3786 8.6878 20.2668 8.59075C20.1075 8.48083 19.9177 8.42389 19.7243 8.428C19.1992 8.43675 18.389 8.7185 14.5022 10.3355Z" fill="#616161" />
                            </g>
                            <defs>
                                <clipPath id="clip0_322_133">
                                    <rect
                                        width="28"
                                        height="28"
                                        fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </a>

                    <a href="/" title="Shavaz twitter">
                        <v-icon icon="mdi-twitter" />
                    </a>

                    <a href="/" title="Shavaz linkdin">
                        <v-icon icon="mdi-linkedin" />
                    </a>
                </div>

                <div class="footer__search-box">
                    <p class="t12 text-grey-darken-1 mb-3">برای اطلاع از آخرین تخفیف‌ها، ایمیل خود را ثبت نمایید.</p>
                    <v-text-field
                        :loading="loading"
                        color="grey-lighten-3"
                        density="compact"
                        variant="solo"
                        label="ثبت ایمیل "
                        append-inner-icon="mdi-email-outline"
                        single-line
                        hide-details
                        @click:append-inner="onClick" />
                </div>
            </v-col>
        </v-row>

        <v-row class="footer__row2" align="center">
            <v-col cols="12" lg="6">
                <div class="footer__contact-us d-flex align-center">
                    <v-icon color="grey-darken-1" icon="mdi-phone-in-talk-outline" />
                    <span class="t14 text-grey-darken-1 ml-2 d-block"> پشتیبانی شاواز:۹۱۰۳۲۳۴۳-۰۲۱</span>
                    <span class="t14 text-grey-darken-1">| ۲۴ ساعته در ۷ روز هفته پاسخگوی شما هستیم.</span>
                </div>
            </v-col>

            <v-col cols="12" lg="6">
                <div class="footer__logo-hologram">
                    <a href="/" title="Shavaz hologram">
                        <img src="~/assets/images/should-delete/snappay.png" class="" alt="snappay" width="52" height="61" title="" />
                    </a>

                    <a href="/" title="Shavaz hologram">
                        <img src="~/assets/images/should-delete/1d2ab0.png" class="" alt="hologram" width="52" height="61" title="" />
                    </a>

                    <a href="/" title="Shavaz hologram">
                        <img src="~/assets/images/should-delete/logonama(1).png" class="frame-hologram" alt="" width="52" height="61" title="" />
                    </a>

                    <a href="/" title="Shavaz hologram">
                        <img src="~/assets/images/should-delete/samandehi.png" class="" alt="samandehi" width="52" height="61" title="" />
                    </a>
                </div>
            </v-col>
        </v-row>

        <div class="footer__copy-right-text">
            <p>استفاده از مطالب <h5 class="d-inline t12">فروشگاه اینترنتی شاواز</h5> فقط برای مقاصد غیرتجاری و باذکر منبع بلامانع است. کلیه حقوق این سایت متعلق به شرکت سلامت آوران یزدان نفیس می باشد.</p>
        </div>
    </v-container>
</footer>
</template>

<script>
export default {
    methods: {
        /**
         * Scoll top
         */
        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        },
    },
};
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";

$parent: "footer";

.#{$parent} {
    &--desktop {
        width: 100%;
        background: #fff;
        display: flex;

        flex-direction: column;

        .#{$parent}__logo {
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items: center;

            img {
                width: 107px;
            }

            button {
                color: #9f9b9b;
                margin-top: 35px;

                &:hover{
                    text-shadow: 0px 0px 10px #808080 !important;
                }
            }

            &:before {
                content: "";
                position: absolute;
                width: calc(100% - 144px);
                margin-right: 20px;
                display: flex;
                top: 25px;
                left: 0;
                right: 8.5rem;
                border-top: 0.5px solid var(--gray-400, #DDDDDD);
            }
        }

        .#{$parent}__menus {
            display: flex;
            margin: 20px 0 0 0 !important;

            >div {
                flex: 1;
            }

            ul {
                list-style-type: none;
                padding-left: 0;
                width: 100%;

                li {
                    font-size: 12px;
                    margin-top: 10px;

                    a {
                        color: var(--grey-grey, #9e9e9e);
                        text-decoration: none;

                        &:hover{
                            color: #D72685 !important; 
                        }
                    }
                }
            }
        }

        .#{$parent}__search-box {

            .v-input__control,
            .v-field__prepend-inner,
            .v-field__field {
                height: 40px;
            }

            .v-field {
                box-shadow: none;
                background: #F5F5F5;
                border-radius: 2px;
                border-radius: 4px !important;
            }

            .v-field__input,
            .v-field-label {
                font-size: 13px !important;
            }

            .v-field__append-inner {
                padding-right: 9px;
                border-right: 1px solid #BDBDBD;

                i {
                    color: #BDBDBD;
                }
            }
        }

        .#{$parent}__logo-hologram {
            display: flex;
            justify-content: flex-end;
            align-items: center;

            @include gbp(768, 1280) {
                justify-content: flex-start;
                margin-bottom: 20px;
            }

            a {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 67px;
                height: 79px;
                border: 1px solid var(--grey-grey-lighten-2, #e0e0e0);
                margin: 5px;
                border-radius: 4px;
                padding: 5px;
                box-sizing: border-box;

                img {
                    object-fit: contain;
                }
            }
        }

        .#{$parent}__social-media {
            margin-top: 10px;

            .v-icon {
                color: white;
                background-color: #616161;
                border-radius: 50%;
                padding: 15px;
                margin-left: 12px;
                margin-bottom: 23px;
                font-size: 22px;
            }

            .custom-svg-icon {
                margin-left: 12px;
            }
        }

        .#{$parent}__copy-right-text {
            font-size: 12px;
            text-align: center;
            padding: 10px 0;
            color: var(--grey-grey-darken-1, #757575);
        }
    }
}
</style>
