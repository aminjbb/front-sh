<template lang="">
<footer class="footer footer--desktop">
    <v-container>
        <nav class="footer__menu">
            <div class="footer__logo">
                <a href="/" title="Shavaz logo">
                    <img src="~/assets/images/shavaz-logo.png" class="logo-shz" alt="Shavaz Logo" width="107" height="38" title="Shavaz Logo" />
                </a>

                <button @click="scrollToTop">
                    <span>
                        بازگشت به بالا
                    </span>
                    <v-icon>mdi-arrow-up-thin</v-icon>
                </button>
            </div>

            <div class="footer__content">
                <div class="footer__links">
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
                        <header class="t16 mb-4">
                            درباره شاواز
                        </header>
                        <ul>
                            <li><a href="/" class="t13 text-grey">درباره ما</a></li>
                            <li><a href="/" class="t13 text-grey">تماس با ما</a></li>
                            <li><a href="/" class="t13 text-grey">سوالات متدال</a></li>
                            <li><a href="/" class="t13 text-grey">فرصت‌های شغلی</a></li>
                            <li><a href="/" class="t13 text-grey">فروشنده شوید</a></li>
                        </ul>
                    </div>

                    <div>
                        <header class="t16 mb-4">راهنمای خرید</header>
                        <ul>
                            <li><a href="/" class="t13 text-grey">نحوه ثبت سفارش</a></li>
                            <li><a href="/" class="t13 text-grey">روش‌های پرداخت</a></li>
                            <li><a href="/" class="t13 text-grey">شیوه‌های ارسال</a></li>
                            <li><a href="/" class="t13 text-grey">شرایط مرجوعی</a></li>
                        </ul>
                    </div>
                </div>

                <div class="logos_email">
                    <h3 class="t16">با ما در ارتباط باشید</h3>

                    <div class="social-media mb-7">
                        <a href="/" title="instagram">
                            <v-icon>mdi-instagram </v-icon>
                        </a>

                        <a href="/" title="youtube">
                            <v-icon>mdi-youtube</v-icon>
                        </a>

                        <a href="/" title="telegram">
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

                        <a href="/" title="twitter">
                            <v-icon>mdi-twitter</v-icon>
                        </a>

                        <a href="/" title="linkdin">
                            <v-icon>mdi-linkedin </v-icon>
                        </a>
                    </div>

                    <div>
                        <p class="t12">برای اطلاع از آخرین تخفیف‌ها، ایمیل خود را ثبت نمایید.</p>

                        <div class="email-envelop">
                            <v-text-field placeholder="ثبت ایمیل" variant="solo"></v-text-field>

                            <button type="submit">
                                <v-icon class="envelope-icon">mdi-email-outline</v-icon>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="footer__hologram">
                <div class="hologram-text">
                    <v-icon>mdi-phone-in-talk-outline</v-icon>
                    <span> پشتیبانی شاواز:۹۱۰۳۲۳۴۳-۰۲۱</span>
                    <span class="icon-separator">|</span>
                    <span>۲۴ ساعته در ۷ روز هفته پاسخگوی شما هستیم.</span>

                </div>

                <div class="logo-hologram">
                    <div class="logo-hologram">
                        <a href="/" title="Shavaz logo">
                            <img src="~/assets/images/should-delete/snappay.png" class="" alt="Shavaz Logo" width="52" height="61" title="linkdin" />
                        </a>

                        <a href="/" title="Shavaz logo">
                            <img src="~/assets/images/should-delete/1d2ab0.png" class="" alt="Shavaz Logo" width="52" height="61" title="linkdin" />
                        </a>

                        <a href="/" title="Shavaz logo">
                            <img src="~/assets/images/should-delete/logonama(1).png" class="frame-hologram" alt="Shavaz Logo" width="52" height="61" title="linkdin" />
                        </a>

                        <a href="/" title="Shavaz logo">
                            <img src="~/assets/images/should-delete/samandehi.png" class="" alt="Shavaz Logo" width="52" height="61" title="linkdin" />
                        </a>
                    </div>
                </div>
            </div>

            <div class="footer__text">
                <p>استفاده از مطالب فروشگاه شاواز فقط برای مقاصد غیرتجاری و باذکر منبع بلامانع است. کلیه حقوق این سایت متعلق به شرکت سلامت آوران یزدان نفیس می باشد.</p>
            </div>
        </nav>
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
        @include gbp("lg") {
            width: 100%;
            background: #fff;
            display: flex;

            flex-direction: column;

            .#{$parent}__logo {
                position: relative;
                display: flex;
                top: 0;
                justify-content: space-between;
                align-items: center;

                button {
                    color: #9f9b9b;
                    margin-top: 35px;
                }

                &:before {
                    content: "";
                    position: absolute;
                    width: 90%;
                    margin-right: 20px;
                    display: flex;
                    top: 25px;
                    left: 0;
                    right: 8.5rem;
                    border-top: 0.5px solid var(--gray-400, #DDDDDD);
                }
            }
        }

        .#{$parent}__content {
            display: flex;

            width: 100%;
            margin-top: 20px;

            .logos_email {
                color: var(--grey-grey-darken-3, #424242);
                width: 90%;
                margin-right: 200px;
                font-size: 16px;

                .v-field {
                    position: relative;
                    box-shadow: none;
                    background: #eeeeee;
                    border-radius: 4px;
                }

                .h3 {
                    margin-bottom: 10px;
                }

                .social-media {
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

                .email-envelop {
                    position: relative;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    margin-top: 1rem;
                    margin-bottom: 1rem;
                }

                .email-box {
                    width: 100%;
                    padding: 0.5rem;
                    padding-right: 1rem;
                    background-color: #f5f5f5;
                    border-radius: 4px;
                }

                .email-box::placeholder {
                    color: var(--gray-400, #bdbdbd);
                }

                .envelope-icon {
                    position: absolute;
                    left: 30px;
                    margin-top: -20px;
                    color: #9e9e9e;
                    border-right: 1px solid var(--grey-grey-lighten-1, #bdbdbd);
                    padding: 28px;
                    margin-top: -39px;
                    box-sizing: border-box;
                    margin-left: -30px;
                }

                .icon-separator-email {
                    position: absolute;
                    left: 40px;
                    margin-left: 30px;
                    top: 55%;
                    transform: translateY(-50%) scaleY(1.5);
                    font-size: 30px;
                    color: var(--grey-grey-lighten-1, #bdbdbd);
                }
            }

            ul {
                list-style-type: none;
                padding-left: 0;
                width: 100%;

                li {
                    color: var(--grey-grey, #9e9e9e);
                    font-size: 12px;
                    margin-top: 10px;
                    width: 100px;
                }
            }

            .#{$parent}__links {
                display: flex;
                gap: 170px;
                width: 120%;

                ul {
                    li {
                        width: 100px;

                        a{
                            text-decoration: none;
                        }

                    }
                }
            }
        }

        .#{$parent}__hologram {
            position: relative;
            display: flex;
            width: 100%;
            justify-content: space-between;

            .icon-separator {
                font-size: 24px;
                transform: translateY(-50%) scaleY(1.5) scaleX(0.5);
                line-height: 1;
                margin-left: 5px;
                margin-right: 5px;
            }

            .hologram-text {
                margin-top: 40px;

                width: 100%;

                font-size: 14px;
                color: var(--grey-grey-darken-1, #757575);
            }

            .logo-hologram {
                position: relative;
                display: flex;
                width: 100%;
                justify-content: flex-end;
                align-items: center;
                margin-left: -10px;

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
        }

        .footer__text {
            width: 100%;

            font-size: 12px;
            text-align: center;
            padding: 10px 0;
            color: var(--grey-grey-darken-1, #757575);
        }
    }
}
</style>
