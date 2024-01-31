<template>
<main v-if="screenType !== null" class="v-home">
    <!--  desktop size -->
    <template v-if="screenType === 'desktop'">
        <desktopHomeMainSlider :items="responseDot(1)" />
        <v-container>
            <mobileHomeSurprise class="mt-4" :content="responseDot(2)" />

            <desktopHomeCategoryList :items="responseDot(3)" />

            <desktopHomeBanner
                :items="desktopBanner1"
                col="6"
                class="pt-3 mb-4" />

            <MobileHomeSection5Slider :content="responseDot(5)" />

            <generalTabSlider
                :items="responseDot(6)"
                class="tab-slider1 mb-8"
                contentWidth="1080px"
                title="پیشنهاد شاواز"
                :componentProps=tabSlider1ComponentProps
                columnHeader />

            <mobileHomeBrands :items="responseDot(7)" />

            <desktopHomeBanner
                class="mt-3"
                :items="desktopBanner2"
                col="3" />

            <mobileHomeSection8Slider :items="homeSkus" :title="titleSection9"/>

            <desktopHomeBanner
                :title="titleSection10"
                :items="desktopBanner3"
                col="3" />

            <generalTabSlider
                setRef="tab2"
                :items="responseDot(11)"
                class="tab-slider2 mb-8"
                :title="titleSection11"
                componentName="generalProductMinimalCard"
                contentWidth="100%"
                wrapContent
                limit=6 />

            <desktopHomeBanner :items="desktopBanner4" col="4" />

            <template v-if="homeBlog && homeBlog.length">
                <header class="t20 text-right text-grey-darken-2 pa-3 pb-5">
                  {{titleSection13 }}
                </header>

                <v-row>
                    <v-col
                        cols="12"
                        md="3"
                        sm="6"
                        v-for="(item, index) in homeBlog"
                        :key="`blogs-${index}`">
                        <mobileHomeBlogCard :content="item" />
                    </v-col>
                </v-row>
            </template>
        </v-container>
    </template>

    <!--  mobile size -->
    <template v-else-if="screenType === 'mobile'">
        <mobileHomeMainSlider :items="responseDot(1)" />

        <v-container class="mobile-no-padd mt-4">
            <mobileHomeSurprise :content="responseDot(2)" />

            <mobileHomeCategoryList :items="responseDot(3)" />
        </v-container>

        <v-container>
            <mobileHomeBanner :items="mobileBanner1" />
        </v-container>

        <v-container class="mobile-no-padd mt-4">
            <MobileHomeSection5Slider :content="responseDot(5)" />
        </v-container>

        <v-container>
            <generalTabSlider
                :items="responseDot(6)"
                class="tab-slider1"
                contentWidth="1080px"
                title="پیشنهاد شاواز"
                :componentProps=tabSlider1ComponentProps />

            <mobileHomeBrands :items="responseDot(7)" />

            <mobileHomeBanner :items="mobileBanner2" />

            <mobileHomeSection8Slider :items="homeSkus" title="پرفروش‌ترین محصولات"/>

            <mobileHomeBanner :items="mobileBanner3" />

            <generalTabSlider
                setRef="tab2"
                :items="responseDot(11)"
                class="tab-slider2"
                title="جدید‌ترین محصولات"
                componentName="generalProductMinimalCard"
                contentWidth="1160px"
                wrapContent
                limit=6 />

            <div class="custom-banner">
                <mobileHomeBanner :items="mobileBanner4" col="4" />
            </div>

            <template v-if="homeBlog && homeBlog.length">
                <header class="t20 text-right text-grey-darken-2 pa-3 pb-5 w500">
                    پربازدیدترین مقالات
                </header>

                <v-row>
                    <v-col
                        cols="12"
                        md="3"
                        v-for="(item, index) in homeBlog"
                        :key="`blogs-${index}`">
                        <mobileHomeBlogCard :content="item" />
                    </v-col>
                </v-row>
            </template>
        </v-container>
    </template>
</main>
</template>

<script>
import Home from '~/composables/Home';

export default {
    data() {
        return {
            tabSlider1ComponentProps: {
                hideInfo: true
            },
            screenType: null,
        }
    },

    setup(props) {
        const title = ref('فروشگاه اینترنتی شاواز | خرید لوازم آرایشی، بهداشتی، عطر')
        const description = ref(' مقایسه و خرید آنلاین انواع لوازم آرایشی، بهداشتی، عطر | برندهای متنوع با پایین ترین قیمت | فروشگاه اینترنتی شاواز Shavaz.com')

        useHead({
            title,
            meta: [{
                name: 'description',
                content: description
            }]
        });

        const {
            getHomeSections,
            homeSectionList,
            loading
        } = Home();
        return {
            getHomeSections,
            homeSectionList,
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
                return this.responseDot(9)?.skus.slice(0, 6)
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

    mounted() {
        /**
         * Check screen size
         */
        window.innerWidth < 769 ? this.screenType = 'mobile' : this.screenType = 'desktop';

        /**
         * Call getHomeSections in setup 
         */
        this.getHomeSections();
    },
}
</script>
