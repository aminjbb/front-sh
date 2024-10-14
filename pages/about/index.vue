<template>
  <main class="v-about">
    <v-container>
      <div class="v-about__banner">
        <img src="~/assets/images/about-us2.jpg" class="" alt="Shavaz Logo"
             :width="screenType === 'desktop' ? '1296' : '736'" :height="screenType === 'desktop' ? '531' : '302'"
             title="Shavaz about us banner"/>
      </div>
      <div class="v-about__info">
        <header class="t20 text-right text-grey-darken-2 pa-3 pb-3 mt-3 pr-0">
          <h1 class="t20">داستان ما</h1>
        </header>

        <p class="t14 w400 text-grey l28">
          فروشگاه اینترنتی شاواز (شرکت سلامت آوران یزدان نفیس) با معرفی و عرضه بهترین محصولات لوازم آرایشی و بهداشتی،
          عطر و ادکلن، بهداشت شخصی وبا 7 روز ضمانت بازگشت کالا، ارسال سریع و تضمین اصل بودن کالا تجربه‌ای متفاوت از خرید
          اینترنتی را برای شما ایجاد خواهد کرد. ما در فروشگاه اینترنتی شاواز دنیایی از محصولات و برندهای مختلف را در
          کنار هم جمع کرده‌ایم که دسترسی شما را به طیف وسیعی از لوازم آرایشی و بهداشتی مناسب خانم‌ها و آقایان راحت‌تر
          کرده است.
        </p>
        <p class="t14 w400 text-grey l28">
          بهره‌گیری از توضیحات دقیق و کامل، تضمین بهترین قیمت و پشتیبانی سریع بخشی از خدماتی است که ما در فروشگاه
          اینترنتی شاواز فراهم کرده‌ایم که در نهایت باعث می‌شود تا شما بتوانید در زمان خرید اینترنتی لوازم آرایشی و
          بهداشتی محصول مورد نظر خود را به راحتی انتخاب کنید
        </p>
        <p class="t14 w400 text-grey l28">
          یکی دیگر از ویژگی‌های منحصر به فرد فروشگاه اینترنتی شاواز تخفیف روزانه در قالب استند، حراج‌های هفتگی و ماهیانه
          و انواعی از پیشنهادهای ویژه است که در نهایت خرید اینترنتی را برای شما بسیار لذت ‌بخش‌تر خواهد کرد.
        </p>
      </div>

      <div class="v-about__values">
        <header class="pa-3 pb-5 pr-0 mt-4">
          <h2 class="t20 text-right text-grey-darken-2"> ارزش‌های شاواز</h2>
        </header>

        <generalAboutOurValues/>
      </div>

      <div class="v-about__progress">
        <header class="pa-3 pb-5 pr-0 mt-5">
          <h2 class="t20 text-right text-grey-darken-2"> مسیر شاواز</h2>
        </header>

        <div class="v-about__progress__image d-flex justify-center">
          <img src="~/assets/images/about-progress.jpg" class="" alt="Shavaz Logo" width="988" height="570"
               title="Shavaz about us banner"/>
        </div>
      </div>
    </v-container>
  </main>
</template>

<script>
export default {
  data() {
    return {
      screenType: null,
    }
  },
  setup() {
    const title = ref('فروشگاه اینترنتی شاواز | درباره ما')
    const description = ref("آنچه باید درباره شاواز بدانید | فروشگاه اینترنتی شاواز (شرکت سلامت آوران یزدان نفیس) با معرفی و عرضه بهترین محصولات لوازم آرایشی و بهداشتی، عطر و ادکلن، بهداشت شخصی وبا 7 روز ضمانت بازگشت کالا، ارسال سریع و تضمین اصل بودن کالا تجربه‌ای متفاوت از خرید اینترنتی را برای شما ایجاد خواهد کرد.")
    const runtimeConfig = useRuntimeConfig()
    const structureData = [
      {
        "@context": "http://schema.org/",
        "@type": "Corporation",
        "name": "دربازه شاواز",
        "url": "https://shavaz.com/about",
        "id": "https://shavaz.com/about",
        "alternateName": ["شاواز", "shavaz"],
        "legalName": "سلامت آوران یزدان نفیس",
        "email": "Info@shavaz.com",
        "sameAs": [
          "https://twitter.com/ShavazCom",
          "https://www.linkedin.com/company/shavaz/about",
          "https://t.me/shavazcomm",
          "https://www.youtube.com/channel/UCh1GzMPHJXoIvTP9DtUli4",
          "https://www.instagram.com/shavazcom"
        ],
        "logo": {
          "@type": "ImageObject",
          "inLanguage": "fa-IR",
          "url": `${runtimeConfig.public.siteUrl}/Sign192.png`,
          "contentUrl": `${runtimeConfig.public.siteUrl}/Sign192.png`,
          "width": 192,
          "height": 192,
          "caption": "فروشگاه اینترنتی شاواز"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "021-91552343",
          "contactType": "customer service",
          "areaServed": "IR",
          "availableLanguage": "Persian",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "No. 18, corner of Shahid Akbar Asgharzadeh alley, Shahid Mohsen Yaqoubi St.",
            "addressLocality": "Tehran",
            "addressRegion": "Tehran",
            "postalCode": "1484633439",
            "addressCountry": "Iran, Islamic Republic of",
            "areaServed": {
              "@context": "https://schema.org",
              "@type": "Place",
              "geo": {"@type": "GeoCoordinates", "latitude": "35.72814946987037", "longitude": "51.290000176638316"},
              "hasMap": 'https://maps.app.goo.gl/jPviUNqahqmVHpY96',
              "addressCountry": {"@type": "Country", "name": "Iran"}
            }
          },
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "url": "https://shavaz.com/about",
        "id": "https://shavaz.com/about",
        "name": "شاواز",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://shavaz.com/search?needl={search_term_string}",
          "query-input": {
            "@type": "PropertyValueSpecification",
            "valueRequired": "http://schema.org/True",
            "valueName": "search_term_string",
          }
        },
        "copyrightHolder": {
          "@type": "Corporation",
          "id": "https://shavaz.com/",
          "name": "شاواز"
        }
      }

    ]
    useHead({
      script: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(structureData)
        },
      ],
      title,
      meta: [{
        name: 'description',
        content: description
      }]
    })
  },

  mounted() {
    /**
     * Check screen size
     */
    window.innerWidth < 769 ? this.screenType = 'mobile' : this.screenType = 'desktop';
  },
}
</script>

<style scoped>
@import '~/assets/scss/views/about.scss';
</style>
