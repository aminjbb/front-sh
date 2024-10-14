<template>
  <main class="v-home">
    <h1 class="ov-h h-0">{{ title }}</h1>
    <div v-show="loading">
      <generalSkeletonHome :loading="loading" :screenSize="screenType === 'desktop' ? 'desktop' : 'mobile'"/>
    </div>

    <div v-show="!loading">
        <!--  desktop size -->
        <div v-if="screenType === 'desktop'">
            <desktopHomeMainSlider  :items="responseDot(1)" />
            <v-container class="pt-0">
                <desktopHomeSurprise  class="mt-4" :content="responseDot(2)" />

          <desktopHomeCategoryList :items="responseDot(3)"/>

                <desktopHomeBanner :sectionId="responseDot(4)?.id" :items="desktopBanner1" col="6" class="pt-3 mb-4" />

          <MobileHomeSection5Slider :content="responseDot(5)"/>

                <generalTabSlider home :items="responseDot(6)" class="tab-slider1 mb-0" limit="12" contentWidth="1080px" :title="titleSection6" :componentProps="tabSlider1ComponentProps" mobileMode/>

          <mobileHomeBrands :items="responseDot(7)" class="mb-8"/>

                <desktopHomeBanner :sectionId="responseDot(8)?.id" class="mt-3" :items="desktopBanner2" col="3" />

                <mobileHomeSection8Slider :sectionId="responseDot(9)?.id" :items="homeSkus" :title="titleSection9" class="mb-10 mt-4"/>

                <desktopHomeBanner :sectionId="responseDot(10)?.id" :items="desktopBanner3" col="3" class="mt-5"/>

                <generalTabSlider home :items="responseDot(11)" class="tab-slider1 mb-8 mt-4" limit="12" contentWidth="1080px" :title="titleSection11" :componentProps="tabSlider1ComponentProps" mobileMode/>

                <desktopHomeBanner :sectionId="responseDot(12)?.id" :items="desktopBanner4" col="4" />

          <template v-if="homeBlog && homeBlog.length">
            <header class="pa-3 pb-5">
              <h2 class="t20 text-sGrayDarken2 pt-4 w700">
                {{ titleSection13 }}
              </h2>
            </header>

                    <v-row>
                        <v-col cols="12" md="3" sm="6" class="px-2" v-for="(item, index) in homeBlog" :key="`blogs-${index}`">
                            <mobileHomeBlogCard :cardId="`home-D-${responseDot(12)?.id}-${index + 1}`" :content="item" />
                        </v-col>
                    </v-row>
                </template>
            </v-container>
        </div>

      <!--  mobile size -->
      <div v-if="screenType === 'mobile'">
        <mobileHomeMainSlider class="pt-6" :items="responseDot(1)"/>

        <v-container class="mobile-no-padd mt-4">
          <mobileHomeSurprise :content="responseDot(2)"/>

          <mobileHomeCategoryList :items="responseDot(3)" class="px-5"/>
        </v-container>

            <mobileHomeBanner :sectionId="responseDot(4)?.id" :items="mobileBanner1" scroll class="pr-4 mt-4"/>

        <v-container class="mobile-no-padd">
          <MobileHomeSection5Slider class="mt-4" :content="responseDot(5)"/>
        </v-container>

            <generalTabSlider home screenId="M" :items="responseDot(6)" class="tab-slider1 pr-4" limit="12" device="mobile" title="پیشنهاد شاواز" :componentProps="tabSlider1ComponentProps" mobileMode/>

            <mobileHomeBanner  screenId="M"  :sectionId="responseDot(8)?.id" :items="mobileBanner2" scroll class="pr-4"/>

             <mobileHomeBrands  screenId="M"  :items="responseDot(7)" device="mobile" class="mb-3 pr-4" />

            <v-container>
                <mobileHomeBanner screenId="M"  :sectionId="responseDot(10)?.id" :items="mobileBanner3" generalCol="6" col="6" device="mobile"/>
            </v-container>

            <mobileHomeSection8Slider screenId="M"  :sectionId="responseDot(9)?.id" :items="homeSkus" :title="titleSection9" :class="homeSkus && homeSkus.length > 0 ? 'mb-5 pr-4' : ''" device="mobile"  :navigation="true"/>

            <mobileHomeBanner screenId="M"  :sectionId="responseDot(12)?.id" :items="mobileBanner4" generalCol="6" col="6" scroll class="pr-4"/>

            <generalTabSlider home screenId="M" :items="responseDot(11)" class="tab-slider1 pr-4" limit="12" device="mobile" :title="titleSection11" :componentProps="tabSlider1ComponentProps" mobileMode/>

        <template v-if="homeBlog && homeBlog.length">
          <div class="pr-4 blog-section blog-section--mobile mb-6">
            <header>
              <h2 class="t16 text-sGrayDarken2 py-4 w700">
                پربازدیدترین مقالات
              </h2>
            </header>

                    <section class="scroll--x scroll--x--hide">
                        <div class="d-flex align-center flex-nowrap blog-section__contents">
                            <div v-for="(item, index) in homeBlog" :key="`blogs-${index}`" class="blog-section__content">
                                <mobileHomeBlogCard :cardId="`home-M-${responseDot(12)?.id}-${index + 1}`" :content="item" />
                            </div>
                        </div>
                    </section>
                </div>
              </div>
            </section>
          </div>
        </template>
      </div>
    </div>
  </main>
</template>

<script>
import Home from '~/composables/Home';
import axios from "axios";

export default {
  data() {
    return {
      tabSlider1ComponentProps: {
        hideInfo: true
      },
      screenType: 'desktop',
    }
  },

  setup() {
    const title = ref('سایت لوازم آرایشی بهداشتی | خرید از فروشگاه شاواز')
    const description = ref('فروشگاه اینترنتی لوازم آرایشی بهداشتی شاواز، مقایسه و خرید آنلاین لوازم آرایشی و بهداشتی، لوازم شخصی، لوازم زیبایی و سلامت بصورت شخصی یا خانواده برای آقایان، خانم‌ها و کودکان، برندهای ایرانی و خارجی با ضمانت اصالت کالا با پایین ترین قیمت')

    useHead({
      title,
      meta: [{
        name: 'description',
        content: description
      }],
    });

    const {
      homeSectionList,
      loading
    } = Home();
    return {
      homeSectionList,
      title,
      loading
    };
  },

  computed: {
    homeBanners1() {
      try {
        return this.responseDot(4)?.banners
      } catch (e) {
        return []
      }
    },

    desktopBanner1() {
      try {
        const banners = this.homeBanners1.filter(item => item.device === 'desktop')
        return banners.slice(0, 2)
      } catch (e) {
        return []
      }
    },

    mobileBanner1() {
      try {
        const banners = this.homeBanners1.filter(item => item.device === 'mobile')
        return banners.slice(0, 2)
      } catch (e) {
        return []
      }
    },

    homeBanners2() {
      try {
        return this.responseDot(8)?.banners
      } catch (e) {
        return []
      }
    },

    desktopBanner2() {
      try {
        const banners = this.homeBanners2.filter(item => item.device === 'desktop')
        return banners.slice(0, 4)
      } catch (e) {
        return []
      }
    },

    mobileBanner2() {
      try {
        const banners = this.homeBanners2.filter(item => item.device === 'mobile')
        return banners.slice(0, 4)
      } catch (e) {
        return []
      }
    },

    homeBanners3() {
      try {
        return this.responseDot(10)?.banners
      } catch (e) {
        return []
      }
    },

    titleSection10() {
      try {
        return this.responseDot(10)?.label
      } catch (e) {
        return ''
      }
    },

    titleSection6() {
      try {
        return this.responseDot(6)?.label
      } catch (e) {
        return ''
      }
    },

    titleSection9() {
      try {
        return this.responseDot(9)?.label
      } catch (e) {
        return ''
      }
    },

    titleSection11() {
      try {
        return this.responseDot(11)?.label
      } catch (e) {
        return ''
      }
    },

    titleSection13() {
      try {
        return this.responseDot(13)?.label
      } catch (e) {
        return ''
      }
    },

    desktopBanner3() {
      try {
        const banners = this.homeBanners3.filter(item => item.device === 'desktop')
        return banners.slice(0, 4)
      } catch (e) {
        return []
      }
    },

    mobileBanner3() {
      try {
        const banners = this.homeBanners3.filter(item => item.device === 'mobile')
        return banners.slice(0, 4)
      } catch (e) {
        return []
      }
    },

    homeBanners4() {
      try {
        return this.responseDot(12)?.banners
      } catch (e) {
        return []
      }
    },

    desktopBanner4() {
      try {
        const banners = this.homeBanners4.filter(item => item.device === 'desktop')
        return banners.slice(0, 3)
      } catch (e) {
        return []
      }
    },

    mobileBanner4() {
      try {
        const banners = this.homeBanners4.filter(item => item.device === 'mobile')
        return banners.slice(0, 3)
      } catch (e) {
        return []
      }
    },

    homeSkus() {
      try {
        const skus = this.responseDot(9)?.skus
        const findSkus = skus.filter(sku => sku?.seller_s_k_us?.length)
        return findSkus
      } catch (e) {
        return []
      }
    },

    homeBlog() {
      try {
        return this.responseDot(13)?.banners.slice(0, 4)
      } catch (e) {
        return []
      }
    }
  },

  methods: {
    /**
     * Get data from your data
     * @param {String} id - id of array
     * @return {*}
     */
    responseDot(id) {
      if (id) return this.homeSectionList?.find(item => item.id === id);
      return '';
    },
  },

  beforeMount() {
    /**
     * Check screen size
     */
    window.innerWidth < 769 ? this.screenType = 'mobile' : this.screenType = 'desktop';

  },
}
</script>
