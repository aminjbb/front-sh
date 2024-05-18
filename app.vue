<template>
  <div>
      <NuxtLayout>
          <NuxtPage />
      </NuxtLayout>
  </div>
</template>

<script setup>

import {
    onMounted,
} from 'vue'

useSeoMeta({
  themeColor:'#D72685',
  ogType:'',
  ogTitle: 'فروشگاه اینترنتی شاواز',
  ogSite_name: 'شاواز',
  ogDescription: ' مقایسه و خرید آنلاین انواع لوازم آرایشی، بهداشتی، عطر | برندهای متنوع با پایین ترین قیمت | فروشگاه اینترنتی شاواز Shavaz.com - خرید اینترنتی لوازم آرایشی و بهداشتی با ضمانت اصالت کالا -  برای خرید کلیک کنید!',
  ogLocale: 'fa_IR',
  twitterCard: 'summary_large_image',
  twitterSite: '@ShavazCom',
  twitterCreator: 'شاواز',
  twitterTitle: 'فروشگاه اینترنتی شاواز',
  twitterDescription: ' مقایسه و خرید آنلاین انواع لوازم آرایشی، بهداشتی، عطر | برندهای متنوع با پایین ترین قیمت | فروشگاه اینترنتی شاواز Shavaz.com - خرید اینترنتی لوازم آرایشی و بهداشتی با ضمانت اصالت کالا -  برای خرید کلیک کنید!',
  keywords:'shavaz, شاواز, عطر, لوازم آرایشی, لوازم بهداشتی, فروشگاه اینترنتی, فروشگاه اینترنتی شاواز , رنگ مو, آرایش چشم, مراقبت از پوست,لاک , رژلب,آرایش صورت , خرید اینترنتی'
})

const runtimeConfig = useRuntimeConfig()

const structureData = {
    "@context": "http://schema.org/",
    "@type": "Organization",
    "name": "shavaz",
    "url": "https://shavaz.com/",
    "telephone":"02191032343",
    "keywords":"فروشگاه اینترنتی شاواز , شاواز , لوازم آرایش و بهداشتی",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "بزرگراه باکری جنوب کوی ارم خیابان شهیدمحسن یعقوبی(بهار جنوبی) نبش کوچه شهید اکبر اصغر زاده پلاک 18",
        "addressLocality": "Tehran",
        "addressRegion": "Tehran",
        "postalCode": "1484633439",
        "addressCountry": "Iran, Islamic Republic of",
        "countryCode":"IR"
    },
    "sameAs":[
        "https://twitter.com/ShavazCom",
        "https://www.linkedin.com/company/shavaz/about",
        "https://t.me/shavazcomm",
        "https://www.youtube.com/channel/UCh1GzMPHJXoIvTP9DtUli4",
        "https://www.instagram.com/shavazcom"
    ],
    "logo":{
        "@type":"ImageObject",
        "inLanguage":"fa-IR",
        "url":`${runtimeConfig.public.siteUrl}/Sign192.png`,
        "contentUrl":`${runtimeConfig.public.siteUrl}/Sign192.png`,
        "width":192,
        "height":192,
        "caption":"فروشگاه اینترنتی شاواز"
    }
}

/* useHead({
  noscript: [{ children: `<iframe src="https://www.googletagmanager.com/ns.html?id=${runtimeConfig.public.gtagId}"
  height="0" width="0" style="display:none;visibility:hidden"></iframe>
  ` }],
    script: [{ children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','${runtimeConfig.public.gtagId}');` },
  {
      type: 'application/ld+json',
      children: JSON.stringify(structureData)
  }],
  }); */

  onMounted(() => {
    /* Takhfifan code */
    const urlParams = new URLSearchParams(window.location.search);
    const source = urlParams.get('utm_source');

    if(source === 'takhfifan'){
      const tatokenValue = urlParams.get('tatoken');
        const tatoken = useCookie('tatoken', {
        maxAge: 2592000, // 30 days in seconds
      });

      tatoken.value = tatokenValue
    }
})
</script>
