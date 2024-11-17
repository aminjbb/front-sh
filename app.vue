<template>
  <div>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<script setup>

import {onMounted,} from 'vue'
import {useRoute} from "vue-router";
import axios from "axios";
import {useStore} from "vuex";

const store = useStore()
  const route = useRoute();
useSeoMeta({
  themeColor: '#D72685',
  ogType: '',
  ogTitle: 'فروشگاه اینترنتی شاواز',
  ogSite_name: 'شاواز',
  ogDescription: ' مقایسه و خرید آنلاین انواع لوازم آرایشی، بهداشتی، عطر | برندهای متنوع با پایین ترین قیمت | فروشگاه اینترنتی شاواز Shavaz.com - خرید اینترنتی لوازم آرایشی و بهداشتی با ضمانت اصالت کالا -  برای خرید کلیک کنید!',
  ogLocale: 'fa_IR',
  twitterCard: 'summary_large_image',
  twitterSite: '@ShavazCom',
  twitterCreator: 'شاواز',
  twitterTitle: 'فروشگاه اینترنتی شاواز',
  twitterDescription: ' مقایسه و خرید آنلاین انواع لوازم آرایشی، بهداشتی، عطر | برندهای متنوع با پایین ترین قیمت | فروشگاه اینترنتی شاواز Shavaz.com - خرید اینترنتی لوازم آرایشی و بهداشتی با ضمانت اصالت کالا -  برای خرید کلیک کنید!',
  keywords: 'shavaz, شاواز, عطر, لوازم آرایشی, لوازم بهداشتی, فروشگاه اینترنتی, فروشگاه اینترنتی شاواز , رنگ مو, آرایش چشم, مراقبت از پوست,لاک , رژلب,آرایش صورت , خرید اینترنتی'
})

const runtimeConfig = useRuntimeConfig()


useHead({
  link:
  [
    {
      rel: 'canonical',
      href: runtimeConfig.public.siteUrl + route.fullPath,
    },
  ],
  noscript: [{
    children: `<iframe src="https://www.googletagmanager.com/ns.html?id=${runtimeConfig.public.gtagId}"
      height="0" width="0" style="display:none;visibility:hidden"></iframe>
      `
    }
  ],
  script: [
    {
      children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${runtimeConfig.public.gtagId}');`
    },
    {
      children: `window.onload = function () {
        window.zebline.init({
          token: '${runtimeConfig.public.zeblineLogin}',
          licence_code:  '${runtimeConfig.public.zeblineKey}',
          notificationRequest: true,
        });
      };`,
      body:true
    },

    {
      src: 'https://s1.mediaad.org/serve/27794/retargeting.js',
      type: 'text/javascript',
    },
    {
      src: "https://sdk.zebline.io/js/v1/sgm-sdk.js",
      defer: "defer"
    },
    // {
    //   src: 'https://deemanetwork.com/pxjs/22896.js',
    //   type: 'text/javascript',
    //   async: true
    // }
  ],
});

onMounted(() => {
  if (route.name !== 'game-slug') {
    /* Takhfifan code */
    const urlParams = new URLSearchParams(window.location.search);
    const source = urlParams.get('utm_source');

    // if(source === 'takhfifan'){
    //     const tatokenValue = urlParams.get('tatoken');
    //     const tatoken = useCookie('tatoken', {
    //       maxAge: 2592000, // 30 days in seconds
    //     });
    //
    //   tatoken.value = tatokenValue
    // }

    if (source === 'affilinks') {
      const altokenValue = urlParams.get('altoken');
      const altoken = useCookie('altoken');

      altoken.value = altokenValue
    }
  }

  axios.get('https://api.my-ip.io/v2/ip.json')
      .then((response) => {
        store.commit('set_country', response?.data?.country?.code)
      })
      .catch((err) => {
        store.commit('set_country', null)
      })
})
</script>
