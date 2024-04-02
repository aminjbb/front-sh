<template>
  <div>
      <NuxtLayout>
          <NuxtPage />
      </NuxtLayout>
  </div>
</template>

<script setup>

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
})

const runtimeConfig = useRuntimeConfig()

useHead({
  noscript: [{ children: `<iframe src="https://www.googletagmanager.com/ns.html?id=${runtimeConfig.public.gtagId}"
  height="0" width="0" style="display:none;visibility:hidden"></iframe>
  ` }],
    script: [{ children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','${runtimeConfig.public.gtagId}');` }],
  });
</script>
