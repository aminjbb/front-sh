<template>
<client-only>
    <footer class="footer footer--desktop">
      <div class="footer__logo">
        <button @click="scrollToTop">
          <span class="t12 text-grey-darken-1">بازگشت به بالا</span>
          <v-icon icon="mdi-chevron-up" />
        </button>
      </div>
    <v-container>
      <v-divider class="mb-8"/>
      <v-row>
        <v-col cols="7">
          <p :class="{'show': show}" class="t14 w500 l32 text-sGray" v-html="show ? fullText : shortText" />
          <span class="d-flex align-center justify-end t12 w700 text-primary l32 cursor-pointer" @click="showMore()">
            <span class="t12 w700">{{ show ? 'بستن' : 'نمایش بیشتر' }}</span>
             <v-icon
                 class="mr-1 cursor-pointer"
                 :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                 size="16"
                 color="primary" />
          </span>

          <div class="footer__menus">
            <div>
              <p class="t14 w700 mb-4 text-sGrayDarken2">درباره شاواز</p>
              <ul>
                <li><a href="/about" class="t12 w700 mb-4 text-sGrayLighten2">درباره ما</a></li>
                <li><a href="/contact" class="t12 w700 mb-4 text-sGrayLighten2">تماس با ما</a></li>
                <li><a href="/faq" class="t12 w700 mb-4 text-sGrayLighten2">سوالات متداول</a></li>
                <li><a href="/" class="t12 w700 mb-4 text-sGrayLighten2">فرصت‌های شغلی</a></li>
                <li><a href="/" class="t12 w700 mb-4 text-sGrayLighten2">قوانین و مقررات</a></li>
              </ul>
            </div>

            <div>
              <p class="t14 w700 mb-4 text-sGrayDarken2">راهنمای خرید</p>
              <ul>
                <li><a href="/faq" class="t12 w700 mb-4 text-sGrayLighten2">نحوه ثبت سفارش</a></li>
                <li><a href="/faq" class="t12 w700 mb-4 text-sGrayLighten2">روش‌های پرداخت</a></li>
                <li><a href="/faq" class="t12 w700 mb-4 text-sGrayLighten2">شیوه‌های ارسال</a></li>
                <li><a href="/faq" class="t12 w700 mb-4 text-sGrayLighten2">فرآیند مرجوعی</a></li>
                <li><a href="/faq" class="t12 w700 mb-4 text-sGrayLighten2">خرید اقساطی</a></li>
              </ul>
            </div>

            <div>
              <p class="t14 w700 mb-4 text-sGrayDarken2">دسترسی سریع</p>
              <ul>
                <li><a href="/category/category-cosmetic/" class="t12 w700 mb-4 text-sGrayLighten2">لوازم آرایشی</a></li>
                <li><a href="/category/category-skin-care" class="t12 w700 mb-4 text-sGrayLighten2">مراقبت از پوست</a></li>
                <li><a href="/category/category-detergents" class="t12 w700 mb-4 text-sGrayLighten2">بهداشت خانگی</a></li>
                <li><a href="/category/category-baby-care" class="t12 w700 mb-4 text-sGrayLighten2">مراقبت از کودکان</a></li>
                <li><a href="/category/category-personal-care" class="t12 w700 mb-4 text-sGrayLighten2">لوازم بهداشتی</a></li>
                <li><a href="/category/category-personal-care" class="t12 w700 mb-4 text-sGrayLighten2">گردونه شانس</a></li>
              </ul>
            </div>
          </div>
        </v-col>

        <v-col cols="5">
          <div class="d-flex align-center justify-end">
            <a href="/" title="Shavaz logo">
              <img data-not-lazy src="~/assets/images/shavaz-logo.svg" class="logo-shz" alt="Shavaz Logo" width="88.94" height="31.59" title="Shavaz Logo" />
            </a>
          </div>

          <div class="bg-sGrayLighten3 py-3 br16 mt-8 text-center">
            <span class="t14 w700 text-sGrayDarken2 text-center">
              پشتیبانی شاواز
              <span class="t14 w500 text-sGray mr-1">شنبه تا چهارشنبه از ساعت ۹ الی ۲۴ و پنجشنبه ها از ۹ الی ۲۲</span>
            </span>

            <div class="d-flex justify-center mt-1">
              <span class="ml-1">
                <img src="@/assets/images/icons/call.svg">
              </span>
              <span class="t14 w700 text-sGray ml-2 d-block"> ۰۲۱-۹۱۰۳۲۳۴۳ </span>
              <span class="t14 w700 text-sGray ml-2 d-block">و ۹۱۵۵۲۳۴۳-۰۲۱</span>
            </div>
          </div>

          <div class="footer__search-box d-flex align-center ga-2 mt-8">
            <v-text-field
                color="grey-lighten-3"
                density="compact"
                variant="text"
                label="برای اطلاع از آخرین تخفیف‌‌ها ایمیل خود را وارد کنید"
                single-line
                hide-details
                @click:append-inner="onClick" />
            <div>
              <v-btn
                  @click="onClick"
                  class="br12 t14 w700"
                  height="45"
                  width="108"
                  color="primary"
                  flat
                  type="submit">
                ثبت ایمیل
              </v-btn>
          </div>
          </div>
          
          <div class="d-flex justify-space-between mt-8">
            <p class="t14 w700 mb-4 mt-4 text-sGrayDarken2">شبکه‌های اجتماعی</p>

            <div class="footer__social-media mb-7">
              <a href="https://t.me/shavazcomm" title="Shavaz telegram account | اکانت تلگرام شاواز">
                <svg class="custom-svg-icon" width="30" height="30" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 6.58594C0 3.27223 2.68629 0.585938 6 0.585938H26C29.3137 0.585938 32 3.27223 32 6.58594V26.5859C32 29.8996 29.3137 32.5859 26 32.5859H6C2.68629 32.5859 0 29.8996 0 26.5859V6.58594Z" fill="#3C3C3C"/>
                  <path d="M24.3044 8.41118C21.6661 9.56857 10.3517 14.5291 7.22592 15.8809C5.12974 16.7467 6.35708 17.5581 6.35708 17.5581C6.35708 17.5581 8.14598 18.2088 9.68059 18.695C11.2152 19.183 12.0328 18.6407 12.0328 18.6407L19.2414 13.497C21.7985 11.6571 21.184 13.1716 20.5712 13.8223C19.2414 15.2303 17.0428 17.4497 15.2027 19.2353C14.3851 19.9926 14.793 20.6433 15.1515 20.9667C16.4813 22.1578 20.112 24.5941 20.3151 24.7568C21.3959 25.5664 23.5203 26.7313 23.8435 24.2688L25.122 15.7688C25.5317 12.9005 25.9397 10.2473 25.9909 9.49004C26.1445 7.64831 24.3044 8.40744 24.3044 8.40744V8.41118Z" fill="#F5F5F5"/>
                </svg>
              </a>

              <a href="https://www.instagram.com/shavazcom" title="Shavaz instagram account | اکانت اینستاگرام شاواز ">
                <v-icon icon="mdi-instagram" />
              </a>

              <a href="https://twitter.com/ShavazCom" title="Shavaz twitter account | اکانت تویتر شاواز ">
                <v-icon icon="mdi-twitter" />
              </a>

              <a href="https://www.youtube.com/channel/UCh1GzMPHJXoIvTP9DtUli4" title="Shavaz youtube account | اکانت یونیوب شاواز ">
                <v-icon icon="mdi-youtube" />
              </a>

              <a href="https://www.linkedin.com/company/shavaz/about" title="shavaz linkedin account | اکانت لینکدین شاواز ">
                <v-icon icon="mdi-linkedin" />
              </a>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <div class="footer-copy-right d-flex justify-space-between align-center bg-sGrayLighten3">
      <p class="footer__copy-right-text t12 w700 text-sGrayLighten2">استفاده از مطالب فروشگاه شاواز فقط برای مقاصد غیرتجاری و با ذکر منبع بلامانع است. کلیه حقوق این سایت متعلق به شرکت سلامت آوران یزدان نفیس می‌باشد.</p>
        <div class="footer__logo-hologram">
          <a href="/" title="Shavaz hologram">
            <img data-not-lazy src="~/assets/images/should-delete/snappay.png" class="" alt="snappay" width="52" height="31" title="" />
          </a>

          <a title="Shavaz Enamad" referrerpolicy='origin' target='_blank' href='https://trustseal.enamad.ir/?id=221799&Code=NdHOlUV0i4UFPJJJ5LXF'>
            <img width="52" height="52" referrerpolicy='origin' src='https://trustseal.enamad.ir/logo.aspx?id=221799&Code=NdHOlUV0i4UFPJJJ5LXF' alt='' style='cursor:pointer' Code='NdHOlUV0i4UFPJJJ5LXF'>
          </a>


          <a href="/" >
            <img data-not-lazy src="~/assets/images/should-delete/logonama(1).png" class="frame-hologram" alt="" width="44" height="51" title="" />
          </a>

          <a href="/" title="Shavaz hologram">
            <img data-not-lazy src="~/assets/images/should-delete/samandehi.png" class="" alt="samandehi" width="52" height="50" title="" />
          </a>
        </div>
      </div>
</footer>
</client-only>
</template>

<script>
export default {

  data() {
    return {
      show: false,
      fullText: ' فروشگاه اینترنتی لوازم آرایشی و بهداشتی شاواز، مرجع مطمئن شما برای خرید لوازم آرایشی، بهداشتی و انواع محصولات مراقبتی برای آقایان، خانم‌ها و کودکان با کیفیت بالا است.<br>' +
          '             با گشت‌و‌گذار در سایت لوازم آرایشی و بهداشتی ما، می‌توانید از برترین برندهای لوازم آرایشی با ضمانت اصالت کالا و پایین‌ترین قیمت بهره‌مند شوید. همچنین، با 7 روز ضمانت بازگشت کالا و ارسال سریع، تجربه‌ای متفاوت از خرید اینترنتی لوازم آرایشی و بهداشتی را برای خود رقم بزنید.',
      shortText: 'فروشگاه اینترنتی لوازم آرایشی و بهداشتی شاواز، مرجع مطمئن شما برای خرید لوازم آرایشی، بهداشتی و انواع محصولات مراقبتی برای آقایان، خانم‌ها و کودکان با کیفیت بالا است...'
    }
  },

    methods: {
        /**
         * Scroll top
         */
        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        },

        /**
         * Sumbit email for newsletter
         */
        onClick(){
            useNuxtApp().$toast.success('ایمیل شما با موفقیت ثبت شد.', {
                rtl: true,
                position: 'top-center',
                theme: 'dark'
            });
        },

      showMore() {
        this.show = !this.show;
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
        background: #FAFAFA;
        .#{$parent}__logo {
            position: relative;
            display: flex;
            justify-content: end;
            align-items: center;

            button {
              border: 2px solid #F3F3F3;
              border-radius: 12px;
              margin-left: 112px;
              padding: 8px 16px 8px 16px;
              color: #6A6A6A;
              font-size: 12px;
              font-weight: 500;
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
                height: 42px;
                border-radius: 8px;
            }

            .v-field {
              border: 1px solid #CBCBCB;
              border-radius: 8px;
              box-shadow: none;
            }

            .v-field__input,
            .v-field-label {
                font-size: 14px !important;
                color: #6A6A6A;
            }
        }

        .#{$parent}__logo-hologram {
            display: flex;
            justify-content: flex-end;
            align-items: center;

            @include gbp(769, 1280) {
                justify-content: flex-start;
                margin-bottom: 20px;
            }

            a {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 64px;
                height: 64px;
                border: 1px solid var(--grey-grey-lighten-1, #E8E8E8);
                margin: 5px;
                border-radius: 12px;
                padding: 5px;
                box-sizing: border-box;
                background-color: #FFFFFF;

                img {
                    object-fit: contain;
                }
            }
        }

        .#{$parent}__social-media {
            margin-top: 10px;

            .v-icon {
                color: white;
                background-color: #3c3c3c;
                border-radius: 6px;
                padding: 15px;
                margin-left: 12px;
                margin-bottom: 23px;
                font-size: 22px;
            }

            .custom-svg-icon {
              margin-left: 12px;
              color: white;
              border-radius: 6px;
              background-color: #3c3c3c;
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

.footer-copy-right {
  padding-left: 7rem;
  padding-right: 7rem;
  padding-top: 24px;
  padding-bottom: 24px;
}
</style>
