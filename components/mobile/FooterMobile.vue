<template>
<client-only>
    <footer class="footer footer--desktop mb-14">
      <div class="footer__logo">
        <button class="btn-logo" @click="scrollToTop">
          <span class="text-sGray w700">بازگشت به بالا</span>
          <v-icon icon="mdi-chevron-up" color="sGray" />
        </button>
      </div>
    <v-container>
      <v-divider class="mb-8"/>
      <div class="d-flex align-center justify-start">
        <a href="/" title="Shavaz logo">
          <img data-not-lazy src="~/assets/images/shavaz-logo-mobile-footer.png"  alt="Shavaz Logo" width="88" height="31" title="Shavaz Logo" />
        </a>
      </div>

      <div class="">
        <p :class="{'show': show}" class="t14 w500 l32 text-sGray" v-html="show ? fullText : shortText" />
        <span class="d-flex align-center justify-end t12 w700 text-primary l32 cursor-pointer" @click="showMore()">
          <span class="t12 w700">{{ show ? 'بستن' : 'نمایش بیشتر' }}</span>
           <v-icon
               class="mr-1 cursor-pointer"
               :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
               size="16"
               color="primary" />
        </span>
      </div>

      <div class="bg-sGrayLighten3 br16 pa-3 rounded-lg mt-8">
        <p class="t14 w700 text-right text-sGrayDarken2">پشتیبانی شاواز</p>
        <p class="t12 w500 text-sGray mt-1 text-center">شنبه تا چهارشنبه از ساعت ۹ الی ۲۴ و پنجشنبه ها از ۹ الی ۲۲</p>
        <div class="d-flex justify-center mt-1">
          <span class="ml-1">
            <img src="@/assets/images/icons/call.svg" alt="call" width="16" height="16">
          </span>
          <span class="t12 w700 text-sGray ml-2">۰۲۱-۹۱۰۳۲۳۴۳ </span>
          <span class="t12 w700 text-sGray ml-2">و ۹۱۵۵۲۳۴۳-۰۲۱</span>
        </div>
      </div>

      <div class="footer__search-box my-4">
        <v-text-field
            color="grey-lighten-3"
            density="compact"
            variant="text"
            label="برای اطلاع از آخرین تخفیف‌‌ها ایمیل خود را وارد کنید"
            single-line
            hide-details
            @click:append-inner="onClick" />
        <v-btn
            @click="onClick"
            class="email-btn t14 w700 mt-2 w-100"
            height="36"
            color="primary"
            flat
            type="submit">
          ثبت ایمیل
        </v-btn>
        </div>

      <v-list v-model:opened="open">
        <v-list-group value="درباره شاواز">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props">
              <span class="t14 w700 text-sGrayDarken2">درباره شاواز</span>
            </v-list-item>
          </template>
          <ul>
            <li class="mt-2"><a href="/about" class="t12 w700 text-sGrayLighten2">درباره ما</a></li>
            <li class="mt-4"><a href="/contact" class="t12 w700 mb-4 text-sGrayLighten2">تماس با ما</a></li>
            <li class="mt-4"><a href="/faq" class="t12 w700 mb-4 text-sGrayLighten2">سوالات متداول</a></li>
            <li class="mt-4"><a href="/" class="t12 w700 mb-4 text-sGrayLighten2">فرصت‌های شغلی</a></li>
            <li class="mt-4"><a href="/" class="t12 w700 mb-4 text-sGrayLighten2">قوانین و مقررات</a></li>
          </ul>
        </v-list-group>
        <v-list-group  class="mt-4"  value="راهنمای خرید">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" class="t14 w700 text-sGrayDarken2">
                <span class="t14 w700 text-sGrayDarken2">راهنمای خرید</span>
            </v-list-item>

          </template>
          <ul>
            <li class="mt-2"><a href="/faq" class="t12 w700 mb-4 text-sGrayLighten2">نحوه ثبت سفارش</a></li>
            <li class="mt-4"><a href="/faq" class="t12 w700 mb-4 text-sGrayLighten2">روش‌های پرداخت</a></li>
            <li class="mt-4"><a href="/faq" class="t12 w700 mb-4 text-sGrayLighten2">شیوه‌های ارسال</a></li>
            <li class="mt-4"><a href="/faq" class="t12 w700 mb-4 text-sGrayLighten2">فرآیند مرجوعی</a></li>
            <li class="mt-4"><a href="/faq" class="t12 w700 mb-4 text-sGrayLighten2">خرید اقساطی</a></li>
          </ul>
        </v-list-group>
        <v-list-group  class="mt-4"  value="دسترسی سریع">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" class="t14 w700 text-sGrayDarken2">
                <span class="t14 w700 text-sGrayDarken2">دسترسی سریع</span>
            </v-list-item>
          </template>
          <ul>
            <li class="mt-2"><a href="/category/category-cosmetic/" class="t12 w700 mb-4 text-sGrayLighten2">لوازم آرایشی</a></li>
            <li class="mt-4"><a href="/category/category-skin-care" class="t12 w700 mb-4 text-sGrayLighten2">مراقبت از پوست</a></li>
            <li class="mt-4"><a href="/category/category-detergents" class="t12 w700 mb-4 text-sGrayLighten2">بهداشت خانگی</a></li>
            <li class="mt-4"><a href="/category/category-baby-care" class="t12 w700 mb-4 text-sGrayLighten2">مراقبت از کودکان</a></li>
            <li class="mt-4"><a href="/category/category-personal-care" class="t12 w700 mb-4 text-sGrayLighten2">لوازم بهداشتی</a></li>
            <li class="mt-4"><a href="/category/category-personal-care" class="t12 w700 mb-4 text-sGrayLighten2">گردونه شانس</a></li>
          </ul>
        </v-list-group>
      </v-list>

      <div class="d-flex justify-space-between align-center mt-4">
        <p class="t14 w700 text-sGrayDarken2">شبکه‌های اجتماعی</p>

        <div class="footer__social-media">
          <a href="https://t.me/shavazcomm" title="Shavaz telegram account | اکانت تلگرام شاواز ">
            <svg class="custom-svg-icon" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 4.58594C0 2.3768 1.79086 0.585938 4 0.585938H20C22.2091 0.585938 24 2.3768 24 4.58594V20.5859C24 22.7951 22.2091 24.5859 20 24.5859H4C1.79086 24.5859 0 22.7951 0 20.5859V4.58594Z" fill="#3C3C3C"/>
              <g clip-path="url(#clip0_4033_44)">
                <path d="M16.9826 7.68118C15.3996 8.37562 8.61099 11.3519 6.73555 12.163C5.47785 12.6825 6.21425 13.1694 6.21425 13.1694C6.21425 13.1694 7.28759 13.5598 8.20836 13.8515C9.12912 14.1443 9.6197 13.8189 9.6197 13.8189L13.9449 10.7327C15.4791 9.62874 15.1104 10.5375 14.7427 10.9279C13.9449 11.7726 12.6257 13.1043 11.5216 14.1757C11.031 14.63 11.2758 15.0204 11.4909 15.2145C12.2888 15.9291 14.4672 17.3909 14.5891 17.4885C15.2375 17.9743 16.5122 18.6732 16.7061 17.1957L17.4732 12.0957C17.719 10.3748 17.9638 8.78285 17.9945 8.3285C18.0867 7.22346 16.9826 7.67894 16.9826 7.67894V7.68118Z" fill="#F5F5F5"/>
              </g>
              <defs>
                <clipPath id="clip0_4033_44">
                  <rect width="12" height="12" fill="white" transform="translate(6 6.58594)"/>
                </clipPath>
              </defs>
            </svg>
          </a>

          <a href="https://www.instagram.com/shavazcom" title="Shavaz instagram account | اکانت اینستاگرام شاواز ">
            <svg class="custom-svg-icon" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 4.58594C0 2.3768 1.79086 0.585938 4 0.585938H20C22.2091 0.585938 24 2.3768 24 4.58594V20.5859C24 22.7951 22.2091 24.5859 20 24.5859H4C1.79086 24.5859 0 22.7951 0 20.5859V4.58594Z" fill="#3C3C3C"/>
              <g clip-path="url(#clip0_4033_38)">
                <path d="M15.3914 8.67285H15.397C15.6831 8.67285 15.9159 8.90567 15.9131 9.1974C15.9131 9.48351 15.6747 9.71633 15.3858 9.71633C15.0969 9.71352 14.8668 9.4779 14.8697 9.19179C14.8697 8.90287 15.1053 8.67285 15.3914 8.67285Z" fill="#F5F5F5"/>
                <path d="M17.9265 9.59562C18.0155 10.5407 18.0736 15.003 17.7949 16.0488C17.4232 17.4161 16.529 18.2257 15.147 18.4504C14.6283 18.5356 13.2347 18.5859 11.8372 18.5859C10.4397 18.5859 8.98418 18.5317 8.50416 18.4078C7.1454 18.0553 6.33246 17.1682 6.11568 15.7893C5.95309 14.7783 5.9376 10.0721 6.22794 9.05334C6.60731 7.72474 7.49767 6.9423 8.84095 6.72151C9.44872 6.6208 10.641 6.58594 11.8449 6.58594C12.9637 6.58594 14.0941 6.61692 14.7754 6.65179C15.5999 6.69439 16.3509 6.96166 16.9664 7.54656C17.551 8.10434 17.8491 8.80543 17.9226 9.59562H17.9265ZM16.7729 15.5917C16.9432 14.5382 16.9432 10.6841 16.8464 9.69633C16.738 8.64275 16.0954 7.94552 15.0502 7.78284C14.5354 7.70537 13.2889 7.67051 12.0501 7.67051C10.8114 7.67051 9.6655 7.7015 9.1429 7.7596C8.09769 7.87967 7.39315 8.52654 7.22669 9.56851C7.05636 10.6724 7.05636 14.7977 7.18411 15.6266C7.31573 16.4904 7.80349 17.083 8.66288 17.3232C9.12742 17.4549 10.521 17.5014 11.8875 17.5014C13.1456 17.5014 14.3805 17.4626 14.8451 17.4123C15.9019 17.2961 16.5987 16.6453 16.7651 15.5956" fill="#F5F5F5"/>
                <path d="M12.0234 9.71632C13.6053 9.71632 14.8803 11.0021 14.8694 12.5877C14.8586 14.1696 13.562 15.4554 11.9765 15.4554C10.3909 15.4554 9.1196 14.1696 9.13044 12.5841C9.14127 10.9985 10.4379 9.7127 12.0234 9.71632ZM11.9801 14.4405C12.9986 14.4405 13.8329 13.6207 13.8509 12.6021C13.869 11.5728 13.0527 10.7385 12.027 10.7276C12.0198 10.7276 12.0162 10.7276 12.009 10.7276C10.9905 10.7276 10.1562 11.5475 10.1381 12.566C10.12 13.5918 10.9363 14.4297 11.962 14.4405C11.9692 14.4405 11.9728 14.4405 11.9801 14.4405Z" fill="#F5F5F5"/>
              </g>
              <defs>
                <clipPath id="clip0_4033_38">
                  <rect width="12" height="12" fill="white" transform="translate(6 6.58594)"/>
                </clipPath>
              </defs>
            </svg>
          </a>

          <a href="https://twitter.com/ShavazCom" title="Shavaz twitter account | اکانت تویتر شاواز ">
            <svg class="custom-svg-icon" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 4.58594C0 2.3768 1.79086 0.585938 4 0.585938H20C22.2091 0.585938 24 2.3768 24 4.58594V20.5859C24 22.7951 22.2091 24.5859 20 24.5859H4C1.79086 24.5859 0 22.7951 0 20.5859V4.58594Z" fill="#3C3C3C"/>
              <path d="M18 9.2193C17.9114 9.34924 17.8228 9.47196 17.7231 9.58746C17.4646 9.90148 17.1618 10.1794 16.8258 10.4176L16.7852 10.4934C16.7963 10.8471 16.7815 11.2045 16.7298 11.5582C16.6338 12.3054 16.4123 13.0164 16.0837 13.695C15.7366 14.3952 15.2972 15.0305 14.7397 15.5863C13.7945 16.5356 12.6646 17.1456 11.3502 17.4271C10.8997 17.521 10.4455 17.5715 9.98031 17.5859C9.90646 17.5859 9.83261 17.5859 9.75877 17.5859C8.42954 17.5859 7.19631 17.2394 6.05908 16.55L6 16.5139C6.19569 16.5356 6.38769 16.5428 6.576 16.5428C7.22585 16.5428 7.84984 16.4237 8.45908 16.1855C8.88 16.0158 9.26769 15.7993 9.62954 15.5177C8.35569 15.478 7.56554 14.5793 7.35877 13.8502C7.51015 13.8791 7.66154 13.8935 7.81661 13.8935C8.016 13.8935 8.21538 13.8682 8.41108 13.8249L8.448 13.8069C7.75385 13.6481 7.22584 13.2907 6.864 12.706C6.62031 12.3198 6.50585 11.8939 6.50954 11.4319C6.85661 11.6123 7.21477 11.7098 7.60246 11.7206C7.08554 11.3561 6.74215 10.876 6.60185 10.266C6.46523 9.65604 6.56123 9.07492 6.88246 8.52629C8.19692 10.0567 9.87323 10.8977 11.9262 11.0384C11.9114 10.941 11.9003 10.858 11.8855 10.775C11.8228 10.2083 11.9446 9.68491 12.2622 9.20847C12.6572 8.6057 13.2148 8.23392 13.9348 8.12203C14.0862 8.09677 14.2375 8.08594 14.3815 8.08594C15.024 8.08594 15.5926 8.32777 16.08 8.79339C16.1095 8.81865 16.1354 8.83309 16.1686 8.83309C16.1797 8.83309 16.1945 8.83309 16.2055 8.82948C16.7114 8.72481 17.1914 8.54794 17.6382 8.29528L17.6714 8.27724C17.4942 8.83309 17.136 9.26622 16.6265 9.58385C17.1065 9.53332 17.5569 9.40699 18 9.22291V9.2193Z" fill="#F5F5F5"/>
            </svg>
          </a>

          <a href="https://www.youtube.com/channel/UCh1GzMPHJXoIvTP9DtUli4" title="Shavaz youtube account | اکانت یونیوب شاواز ">
            <svg class="custom-svg-icon" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 4.58594C0 2.3768 1.79086 0.585938 4 0.585938H20C22.2091 0.585938 24 2.3768 24 4.58594V20.5859C24 22.7951 22.2091 24.5859 20 24.5859H4C1.79086 24.5859 0 22.7951 0 20.5859V4.58594Z" fill="#3C3C3C"/>
              <path d="M17.6955 9.62694C18.1263 10.7036 18.1076 14.6287 17.5906 15.6697C17.4482 15.9549 17.2234 16.1474 16.9386 16.2936C16.534 16.4932 14.1885 16.5859 11.8881 16.5859C9.77117 16.5859 7.69549 16.5075 7.20842 16.3542C6.75881 16.2116 6.45158 15.93 6.29047 15.5022C5.90081 14.4612 5.81464 10.094 6.59396 9.23478C6.85623 8.94244 7.19717 8.76775 7.60182 8.72854C8.52351 8.63228 10.3032 8.58594 12.0604 8.58594C14.2447 8.58594 16.3916 8.65724 16.8 8.79984C17.2309 8.94601 17.5381 9.21695 17.6992 9.62337L17.6955 9.62694ZM10.513 14.3114C11.7569 13.6947 12.9971 13.0886 14.2522 12.4719C13.0083 11.8515 11.7757 11.2383 10.543 10.6216C10.5318 11.8551 10.5243 13.0744 10.513 14.3114Z" fill="#F5F5F5"/>
            </svg>
          </a>

          <a href="https://www.linkedin.com/company/shavaz/about" title="shavaz linkedin account | اکانت لینکدین شاواز ">
            <svg class="custom-svg-icon" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 4.58594C0 2.3768 1.79086 0.585938 4 0.585938H20C22.2091 0.585938 24 2.3768 24 4.58594V20.5859C24 22.7951 22.2091 24.5859 20 24.5859H4C1.79086 24.5859 0 22.7951 0 20.5859V4.58594Z" fill="#3C3C3C"/>
              <g clip-path="url(#clip0_4033_27)">
                <path d="M7.5132 6.58594C8.34453 6.58594 9.00871 7.25895 8.99991 8.08593C8.99552 8.91291 8.32253 9.58594 7.4868 9.58594C6.65107 9.58594 5.99129 8.91291 6.00009 8.08593C6.00888 7.25895 6.68626 6.58594 7.5132 6.58594Z" fill="#F5F5F5"/>
                <path d="M8.5 10.5859L8.44196 18.5859H6L6.06219 10.5859H8.5Z" fill="#F5F5F5"/>
                <path d="M14.964 10.5859C17.5524 10.5859 18.0128 12.1991 17.9997 14.3033L17.965 18.5859H15.4157L15.4461 14.7943C15.4548 13.8866 15.4417 12.719 14.1345 12.719C12.8273 12.719 12.5971 13.7051 12.5884 14.7242L12.558 18.5859H10L10.0608 10.7799H12.5102L12.5015 11.8484H12.5406C12.8881 11.2378 13.7219 10.5901 14.964 10.5901V10.5859Z" fill="#F5F5F5"/>
              </g>
              <defs>
                <clipPath id="clip0_4033_27">
                  <rect width="12" height="12" fill="white" transform="translate(6 6.58594)"/>
                </clipPath>
              </defs>
            </svg>
          </a>
        </div>
      </div>
    </v-container>

      <div class="footer-copy-right bg-sGrayLighten3">
        <div class="footer__logo-hologram d-flex justify-center align-center">
          <a href="/" title="Shavaz hologram">
            <img data-not-lazy src="~/assets/images/should-delete/snappay.png" class="" alt="snappay" width="32" height="19" title="" />
          </a>

          <a title="Shavaz Enamad" referrerpolicy='origin' target='_blank' href='https://trustseal.enamad.ir/?id=221799&Code=NdHOlUV0i4UFPJJJ5LXF'>
            <img width="32" height="32" referrerpolicy='origin' src='https://trustseal.enamad.ir/logo.aspx?id=221799&Code=NdHOlUV0i4UFPJJJ5LXF' alt='' style='cursor:pointer' Code='NdHOlUV0i4UFPJJJ5LXF'>
          </a>


          <a href="/" >
            <img data-not-lazy src="~/assets/images/should-delete/logonama(1).png" class="frame-hologram" alt="" width="32" height="32" title="" />
          </a>

          <a href="/" title="Shavaz hologram">
            <img data-not-lazy src="~/assets/images/should-delete/samandehi.png" class="" alt="samandehi" width="32" height="32" title="" />
          </a>
        </div>
        <p class="footer__copy-right-text t10 w700">استفاده از مطالب فروشگاه شاواز فقط برای مقاصد غیرتجاری و با ذکر منبع بلامانع است. کلیه حقوق این سایت متعلق به شرکت سلامت آوران یزدان نفیس‌می باشد.</p>
      </div>
</footer>
</client-only>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      isAboutShavaz: false,
      open: '',
      fullText: ' فروشگاه اینترنتی لوازم آرایشی و بهداشتی شاواز، مرجع مطمئن شما برای خرید لوازم آرایشی، بهداشتی و انواع محصولات مراقبتی برای آقایان، خانم‌ها و کودکان با کیفیت بالا است.<br>' +
          '             با گشت‌و‌گذار در سایت لوازم آرایشی و بهداشتی ما، می‌توانید از برترین برندهای لوازم آرایشی با ضمانت اصالت کالا و پایین‌ترین قیمت بهره‌مند شوید. همچنین، با 7 روز ضمانت بازگشت کالا و ارسال سریع، تجربه‌ای متفاوت از خرید اینترنتی لوازم آرایشی و بهداشتی را برای خود رقم بزنید.',
      shortText: 'فروشگاه اینترنتی لوازم آرایشی و بهداشتی شاواز، مرجع مطمئن شما برای خرید لوازم آرایشی، بهداشتی و انواع محصولات مراقبتی برای آقایان، خانم‌ها و کودکان با کیفیت بالا است.<br>' +
          ' با گشت‌و‌گذار در سایت لوازم آرایشی و بهداشتی ما، می‌توانید از برترین برندهای...',
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
            show:true , text:'ایمیل شما با موفقیت ثبت شد.', status:'success'
          })
        },

      showMore() {
        this.show = !this.show;
      },
    },
};
</script>

<style lang="scss">
@import '~/assets/scss/components/mobile/general/menu.scss';
@import "~/assets/scss/tools/bp";

$parent: "footer";

.#{$parent} {
    &--desktop {
        width: 100%;
        background: #FAFAFA;
        .#{$parent}__logo {
          .btn-logo {
              margin-top: 0px;
              margin-left: 16px !important;
              border: 2px solid #F3F3F3;
              border-radius: 12px;
              padding: 8px 16px 8px 16px;
              color: #6A6A6A;
              font-size: 12px;
              font-weight: 700;
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
                font-size: 12px !important;
                font-weight: 500;
                color: #6A6A6A;
            }
        }

        .#{$parent}__logo-hologram {
            display: flex;
            justify-content: center;
            align-items: center;

            @include gbp(769, 1280) {
                justify-content: flex-start;
                margin-bottom: 20px;
            }

            a {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 44px;
                height: 44px;
                border: 1px solid var(--grey-grey-lighten-1, #E8E8E8);
                margin: 5px;
                border-radius: 6px;
                padding: 5px;
                box-sizing: border-box;
                background-color: #FFFFFF;

                img {
                    object-fit: contain;
                }
            }
        }

        .#{$parent}__social-media {
            .custom-svg-icon {
              margin-left: 6px;
            }
        }

        .#{$parent}__copy-right-text {
            text-align: justify;
            color: #9A9A9A;
        }
    }
}

.v-list {
  background: none !important;
  padding: 0px !important;
}

.v-list .v-list-item {
  min-height: 21px ;
  padding-inline: 0px !important;
  margin-top: 0px !important;
}

.footer-copy-right {
  padding: 8px 16px 8px 16px;
}
.email-btn {
  border-radius: 12px;
}
</style>
