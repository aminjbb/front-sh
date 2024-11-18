<template>
<client-only>
    <footer class="footer footer--desktop">
      <div class="footer__logo">
        <button @click="scrollToTop">
          <span class="t12 text-grey-darken-1 w700">بازگشت به بالا</span>
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
                <li class="mb-4"><a href="/about" class="t12 w700 text-sGrayLighten2">درباره ما</a></li>
                <li class="mb-4"><a href="/contact" class="t12 w700 text-sGrayLighten2">تماس با ما</a></li>
                <li class="mb-4"><a href="/faq" class="t12 w700 text-sGrayLighten2">سوالات متداول</a></li>
                <li class="mb-4"><a href="/" class="t12 w700 text-sGrayLighten2">فرصت‌های شغلی</a></li>
                <li class="mb-4"><a href="/" class="t12 w700 text-sGrayLighten2">قوانین و مقررات</a></li>
              </ul>
            </div>

            <div>
              <p class="t14 w700 mb-4 text-sGrayDarken2">راهنمای خرید</p>
              <ul>
                <li class="mb-4"><a href="/faq" class="t12 w700 text-sGrayLighten2">نحوه ثبت سفارش</a></li>
                <li class="mb-4"><a href="/faq" class="t12 w700 text-sGrayLighten2">روش‌های پرداخت</a></li>
                <li class="mb-4"><a href="/faq" class="t12 w700 text-sGrayLighten2">شیوه‌های ارسال</a></li>
                <li class="mb-4"><a href="/faq" class="t12 w700 text-sGrayLighten2">فرآیند مرجوعی</a></li>
                <li class="mb-4"><a href="/faq" class="t12 w700 text-sGrayLighten2">خرید اقساطی</a></li>
              </ul>
            </div>

            <div>
              <p class="t14 w700 mb-4 text-sGrayDarken2">دسترسی سریع</p>
              <ul>
                <li class="mb-4"><a href="/category/category-cosmetic/" class="t12 w700 text-sGrayLighten2">لوازم آرایشی</a></li>
                <li class="mb-4"><a href="/category/category-skin-care" class="t12 w700 text-sGrayLighten2">مراقبت از پوست</a></li>
                <li class="mb-4"><a href="/category/category-detergents" class="t12 w700 text-sGrayLighten2">بهداشت خانگی</a></li>
                <li class="mb-4"><a href="/category/category-baby-care" class="t12 w700 text-sGrayLighten2">مراقبت از کودکان</a></li>
                <li class="mb-4"><a href="/category/category-personal-care" class="t12 w700 text-sGrayLighten2">لوازم بهداشتی</a></li>
                <li class="mb-4"><a href="/category/category-personal-care" class="t12 w700 text-sGrayLighten2">گردونه شانس</a></li>
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
          
          <div class="d-flex justify-space-between align-center mt-8">
            <p class="t14 w700 mb-4 mt-4 text-sGrayDarken2">شبکه‌های اجتماعی</p>

            <div class="footer__social-media">
              <a href="https://t.me/shavazcomm" title="Shavaz telegram account | اکانت تلگرام شاواز">
                <svg class="custom-svg-icon" width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 6.58594C0 3.27223 2.68629 0.585938 6 0.585938H26C29.3137 0.585938 32 3.27223 32 6.58594V26.5859C32 29.8996 29.3137 32.5859 26 32.5859H6C2.68629 32.5859 0 29.8996 0 26.5859V6.58594Z" fill="#3C3C3C"/>
                  <path d="M24.3044 8.41118C21.6661 9.56857 10.3517 14.5291 7.22592 15.8809C5.12974 16.7467 6.35708 17.5581 6.35708 17.5581C6.35708 17.5581 8.14598 18.2088 9.68059 18.695C11.2152 19.183 12.0328 18.6407 12.0328 18.6407L19.2414 13.497C21.7985 11.6571 21.184 13.1716 20.5712 13.8223C19.2414 15.2303 17.0428 17.4497 15.2027 19.2353C14.3851 19.9926 14.793 20.6433 15.1515 20.9667C16.4813 22.1578 20.112 24.5941 20.3151 24.7568C21.3959 25.5664 23.5203 26.7313 23.8435 24.2688L25.122 15.7688C25.5317 12.9005 25.9397 10.2473 25.9909 9.49004C26.1445 7.64831 24.3044 8.40744 24.3044 8.40744V8.41118Z" fill="#F5F5F5"/>
                </svg>
              </a>

              <a href="https://www.instagram.com/shavazcom" title="Shavaz instagram account | اکانت اینستاگرام شاواز ">
                <svg class="custom-svg-icon" width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 6.58594C0 3.27223 2.68629 0.585938 6 0.585938H26C29.3137 0.585938 32 3.27223 32 6.58594V26.5859C32 29.8996 29.3137 32.5859 26 32.5859H6C2.68629 32.5859 0 29.8996 0 26.5859V6.58594Z" fill="#3C3C3C"/>
                  <g clip-path="url(#clip0_4167_256)">
                    <path d="M21.6523 10.064H21.6616C22.1385 10.064 22.5265 10.452 22.5218 10.9382C22.5218 11.4151 22.1244 11.8031 21.6429 11.8031C21.1614 11.7984 20.7781 11.4057 20.7828 10.9289C20.7828 10.4473 21.1754 10.064 21.6523 10.064Z" fill="#F5F5F5"/>
                    <path d="M25.8775 11.6021C26.0259 13.1773 26.1226 20.6143 25.6581 22.3574C25.0387 24.6363 23.5483 25.9855 21.245 26.36C20.3805 26.502 18.0578 26.5859 15.7287 26.5859C13.3995 26.5859 10.9736 26.4956 10.1736 26.289C7.909 25.7015 6.5541 24.2231 6.1928 21.9249C5.92182 20.2399 5.89601 12.3961 6.3799 10.6983C7.01218 8.48394 8.49611 7.17987 10.7349 6.81189C11.7479 6.64404 13.735 6.58594 15.7416 6.58594C17.6062 6.58594 19.4901 6.63758 20.6256 6.69568C21.9999 6.7667 23.2516 7.21215 24.2774 8.18697C25.2516 9.1166 25.7484 10.2851 25.871 11.6021H25.8775ZM23.9548 21.5956C24.2387 19.8396 24.2387 13.4162 24.0774 11.7699C23.8967 10.014 22.8257 8.85192 21.0837 8.58077C20.2256 8.45166 18.1481 8.39355 16.0835 8.39355C14.0189 8.39355 12.1092 8.4452 11.2382 8.54204C9.49615 8.74217 8.32191 9.82028 8.04448 11.5569C7.7606 13.3968 7.7606 20.2722 7.97351 21.6537C8.19288 23.0934 9.00582 24.0811 10.4381 24.4814C11.2124 24.7008 13.535 24.7783 15.8125 24.7783C17.9094 24.7783 19.9676 24.7138 20.7418 24.6298C22.5031 24.4362 23.6645 23.3516 23.9419 21.6021" fill="#F5F5F5"/>
                    <path d="M16.039 11.8032C18.6756 11.8032 20.8004 13.9462 20.7824 16.5888C20.7643 19.2254 18.6033 21.3684 15.9608 21.3684C13.3182 21.3684 11.1993 19.2255 11.2174 16.5828C11.2355 13.9402 13.3965 11.7972 16.039 11.8032ZM15.9668 19.6769C17.6643 19.6769 19.0548 18.3105 19.0849 16.6129C19.115 14.8973 17.7546 13.5068 16.045 13.4887C16.033 13.4887 16.027 13.4887 16.0149 13.4887C14.3174 13.4887 12.9269 14.8552 12.8968 16.5527C12.8667 18.2623 14.2271 19.6589 15.9367 19.6769C15.9487 19.6769 15.9547 19.6769 15.9668 19.6769Z" fill="#F5F5F5"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_4167_256">
                      <rect width="20" height="20" fill="white" transform="translate(6 6.58594)"/>
                    </clipPath>
                  </defs>
                </svg>
              </a>

              <a href="https://twitter.com/ShavazCom" title="Shavaz twitter account | اکانت تویتر شاواز ">
                <svg class="custom-svg-icon" width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 6.58594C0 3.27223 2.68629 0.585938 6 0.585938H26C29.3137 0.585938 32 3.27223 32 6.58594V26.5859C32 29.8996 29.3137 32.5859 26 32.5859H6C2.68629 32.5859 0 29.8996 0 26.5859V6.58594Z" fill="#3C3C3C"/>
                  <path d="M26 10.9749C25.8523 11.1914 25.7046 11.396 25.5385 11.5885C25.1077 12.1118 24.6031 12.575 24.0431 12.9721L23.9754 13.0984C23.9939 13.688 23.9692 14.2835 23.8831 14.873C23.7231 16.1183 23.3538 17.3034 22.8062 18.4343C22.2277 19.6014 21.4954 20.6602 20.5662 21.5866C18.9908 23.1687 17.1077 24.1854 14.9169 24.6546C14.1662 24.811 13.4092 24.8952 12.6338 24.9193C12.5108 24.9193 12.3877 24.9193 12.2646 24.9193C10.0492 24.9193 7.99384 24.3418 6.09846 23.1928L6 23.1326C6.32615 23.1687 6.64615 23.1807 6.96 23.1807C8.04308 23.1807 9.08307 22.9822 10.0985 22.5852C10.8 22.3024 11.4462 21.9415 12.0492 21.4723C9.92616 21.4061 8.60923 19.9082 8.26462 18.693C8.51692 18.7411 8.76923 18.7652 9.02769 18.7652C9.36 18.7652 9.69231 18.7231 10.0185 18.6509L10.08 18.6208C8.92308 18.3561 8.04307 17.7606 7.44 16.786C7.03384 16.1424 6.84308 15.4325 6.84923 14.6625C7.42769 14.9633 8.02461 15.1257 8.67077 15.1438C7.80923 14.5362 7.23692 13.7361 7.00308 12.7194C6.77538 11.7028 6.93538 10.7342 7.47077 9.81985C9.66154 12.3705 12.4554 13.7722 15.8769 14.0068C15.8523 13.8444 15.8338 13.706 15.8092 13.5676C15.7046 12.6232 15.9077 11.7509 16.4369 10.9568C17.0954 9.9522 18.0246 9.33258 19.2246 9.1461C19.4769 9.10399 19.7292 9.08594 19.9692 9.08594C21.04 9.08594 21.9877 9.48899 22.8 10.265C22.8492 10.3071 22.8923 10.3312 22.9477 10.3312C22.9662 10.3312 22.9908 10.3312 23.0092 10.3252C23.8523 10.1507 24.6523 9.85595 25.3969 9.43485L25.4523 9.40477C25.1569 10.3312 24.56 11.0531 23.7108 11.5825C24.5108 11.4982 25.2615 11.2877 26 10.9809V10.9749Z" fill="#F5F5F5"/>
                </svg>
              </a>

              <a href="https://www.youtube.com/channel/UCh1GzMPHJXoIvTP9DtUli4" title="Shavaz youtube account | اکانت یونیوب شاواز ">
                <svg class="custom-svg-icon" width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 6.58594C0 3.27223 2.68629 0.585938 6 0.585938H26C29.3137 0.585938 32 3.27223 32 6.58594V26.5859C32 29.8996 29.3137 32.5859 26 32.5859H6C2.68629 32.5859 0 29.8996 0 26.5859V6.58594Z" fill="#3C3C3C"/>
                  <path d="M25.4925 11.6544C26.2106 13.4488 26.1794 19.9907 25.3176 21.7257C25.0803 22.2011 24.7056 22.5219 24.2311 22.7655C23.5567 23.0983 19.6476 23.2528 15.8134 23.2528C12.2853 23.2528 8.82582 23.1221 8.01403 22.8666C7.26469 22.6289 6.75263 22.1595 6.48411 21.4465C5.83468 19.7115 5.69107 12.4328 6.98993 11.0008C7.42704 10.5136 7.99529 10.2225 8.6697 10.1571C10.2059 9.99667 13.172 9.91943 16.1007 9.91943C19.7412 9.91943 23.3194 10.0383 24 10.2759C24.7181 10.5195 25.2302 10.9711 25.4987 11.6485L25.4925 11.6544ZM13.5217 19.4619C15.5949 18.434 17.6618 17.4239 19.7537 16.396C17.6805 15.3621 15.6261 14.3401 13.5717 13.3122C13.5529 15.368 13.5404 17.4001 13.5217 19.4619Z" fill="#F5F5F5"/>
                </svg>
              </a>

              <a href="https://www.linkedin.com/company/shavaz/about" title="shavaz linkedin account | اکانت لینکدین شاواز ">
                <svg class="custom-svg-icon" width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 6.58594C0 3.27223 2.68629 0.585938 6 0.585938H26C29.3137 0.585938 32 3.27223 32 6.58594V26.5859C32 29.8996 29.3137 32.5859 26 32.5859H6C2.68629 32.5859 0 29.8996 0 26.5859V6.58594Z" fill="#3C3C3C"/>
                  <g clip-path="url(#clip0_4167_245)">
                    <path d="M8.52199 6.58594C9.90754 6.58594 11.0145 7.70763 10.9999 9.08593C10.9925 10.4642 9.87089 11.5859 8.47801 11.5859C7.08512 11.5859 5.98548 10.4642 6.00014 9.08593C6.01481 7.70763 7.14377 6.58594 8.52199 6.58594Z" fill="#F5F5F5"/>
                    <path d="M10.1667 13.2524L10.0699 26.5858H6L6.10365 13.2524H10.1667Z" fill="#F5F5F5"/>
                    <path d="M20.9401 13.2524C25.2541 13.2524 26.0214 15.9411 25.9996 19.4481L25.9417 26.5858H21.6929L21.7435 20.2664C21.758 18.7536 21.7363 16.8075 19.5576 16.8075C17.3789 16.8075 16.9952 18.451 16.9808 20.1495L16.9301 26.5858H12.6667L12.7681 13.5756H16.8505L16.836 15.3566H16.9011C17.4802 14.3389 18.8699 13.2593 20.9401 13.2593V13.2524Z" fill="#F5F5F5"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_4167_245">
                      <rect width="20" height="20" fill="white" transform="translate(6 6.58594)"/>
                    </clipPath>
                  </defs>
                </svg>
              </a>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <div class="bg-sGrayLighten3">
      <v-container class="d-flex justify-space-between align-center">
        <p class="footer__copy-right-text w700 text-sGrayLighten2 t12">استفاده از مطالب فروشگاه شاواز فقط برای مقاصد غیرتجاری و با ذکر منبع بلامانع است. کلیه حقوق این سایت متعلق به شرکت سلامت آوران یزدان نفیس می‌باشد.</p>
        <div class="d-flex justify-center align-center ga-4">
          <a href="/" title="Shavaz hologram">
            <img data-not-lazy src="~/assets/images/snap-pay.png" class="" alt="snappay" title="" />
          </a>

          <a class="enamad-logo" title="Shavaz Enamad" referrerpolicy='origin' target='_blank' href='https://trustseal.enamad.ir/?id=221799&Code=NdHOlUV0i4UFPJJJ5LXF'>
            <img referrerpolicy='origin' src='https://trustseal.enamad.ir/logo.aspx?id=221799&Code=NdHOlUV0i4UFPJJJ5LXF' alt='' style='cursor:pointer' Code='NdHOlUV0i4UFPJJJ5LXF'>
          </a>


          <a href="/" >
            <img data-not-lazy src="~/assets/images/logo-nama.png" class="frame-hologram" alt="" title="" />
          </a>

          <a href="/" title="Shavaz hologram">
            <img data-not-lazy src="~/assets/images/samandehi.png" class="" alt="samandehi" title="" />
          </a>
        </div>
      </v-container>
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
          this.$store.commit('set_snackBar', {
            show:true , text:'ایمیل شما با موفقیت ثبت شد.' , status:'success'
          })

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

        .#{$parent}__social-media {
            .custom-svg-icon {
              margin-left: 8px;
            }
        }

        .#{$parent}__copy-right-text {
            text-align: center;
            padding: 10px 0;
            color: var(--grey-grey-darken-1, #757575);
        }
    }
}
.enamad-logo {
  width: 64px;
  height: 64px;
  background-color: #FFFFFF;
  border: 0.7px solid #E8E8E8;
  border-radius: 12px;
  padding: 6px 10px 6px 10px;
  margin-bottom: 8px;
}

</style>
