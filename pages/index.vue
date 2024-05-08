<template>
  <main class="v-home">
    <h1 class="ov-h h-0">{{ title }}</h1>
    <div v-show="loading">
      <!--  desktop size -->
      <div v-if="screenType === 'desktop'">
        <v-row justify="center">
          <v-col
              cols="12"
              lg="4"
              md="6">
            <v-skeleton-loader
                :loading="loading"
                height="240"
                type="image"
            >
              <v-responsive>
                <v-img
                    src="src"
                    class="rounded-lg mb-2"
                    height="184"
                    cover/>
              </v-responsive>
            </v-skeleton-loader>
          </v-col>
        </v-row>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-card
                  class="px-5 py-3"
                  rounded="lg">
                <v-row>
                  <v-col
                      v-for="pro in 6"
                      :key="pro"
                      cols="2">
                    <v-skeleton-loader
                        :loading="loading"
                        height="240"
                        type="image, list-item">
                      <v-responsive>
                        <v-img
                            src="src"
                            class="rounded-lg mb-2"
                            height="184"
                            cover/>

                        <v-list-item
                            subtitle="subtitle"
                            title="title"
                            class="px-0"/>
                      </v-responsive>
                    </v-skeleton-loader>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="2">
              <v-skeleton-loader
                  :loading="loading"
                  type="text" />
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col
                v-for="pro in 12"
                :key="pro"
                cols="2">
              <v-skeleton-loader type="avatar" class="d-flex justify-center"/>
              <v-skeleton-loader
                  :loading="loading"
                  type="text" />
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col
                v-for="img in 2"
                :key="img"
                cols="6"
                lg="6"
                md="6">
              <v-skeleton-loader
                  :loading="loading"
                  height="240"
                  type="image">
                <v-responsive>
                  <v-img
                      src="src"
                      class="rounded-lg mb-2"
                      height="184"
                      cover/>
                </v-responsive>
              </v-skeleton-loader>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-row justify="start">
                <v-col cols="2">
                  <v-skeleton-loader
                      :loading="loading"
                      type="text"/>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-card
                      class="px-5"
                      rounded="lg">
                    <v-row>
                      <v-col
                          v-for="pro in 6"
                          :key="pro"
                          cols="2">
                        <v-skeleton-loader
                            :loading="loading"
                            height="240"
                            type="image, list-item">
                          <v-responsive>
                            <v-img
                                src="src"
                                class="rounded-lg mb-2"
                                height="184"
                                cover/>

                            <v-list-item
                                subtitle="subtitle"
                                title="title"
                                class="px-0"/>
                          </v-responsive>
                        </v-skeleton-loader>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-card
                  class="px-5"
                  rounded="lg">
                <v-row justify="center" align="center">
                  <v-col cols="2">
                    <v-skeleton-loader
                        :loading="loading"
                        type="text" />
                  </v-col>
                  <v-col
                      v-for="pro in 5"
                      :key="pro"
                      cols="2">
                    <v-skeleton-loader type="avatar" class="d-flex justify-center"/>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col
                v-for="img in 4"
                :key="img"
                cols="3"
                lg="3"
                md="3">
              <v-skeleton-loader
                  :loading="loading"
                  height="240"
                  type="image">
                <v-responsive>
                  <v-img
                      src="src"
                      class="rounded-lg mb-2"
                      height="184"
                      cover/>
                </v-responsive>
              </v-skeleton-loader>
            </v-col>
          </v-row>
          <v-row justify="start">
            <v-col cols="2">
              <v-skeleton-loader
                  :loading="loading"
                  type="text" />
            </v-col>
          </v-row>
          <v-row justify="space-between">
            <v-col
                v-for="pro in 5"
                :key="pro"
                class="border rounded-lg"
                cols="2">
              <v-skeleton-loader
                  :loading="loading"
                  height="240"
                  type="image, list-item">
                <v-responsive>
                  <v-img
                      src="src"
                      class="rounded-lg mb-2"
                      height="184"
                      cover/>

                  <v-list-item
                      subtitle="subtitle"
                      title="title"
                      class="px-0"/>
                </v-responsive>
              </v-skeleton-loader>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col
                v-for="img in 4"
                :key="img"
                cols="3"
                lg="3"
                md="3">
              <v-skeleton-loader
                  :loading="loading"
                  height="240"
                  type="image">
                <v-responsive>
                  <v-img
                      src="src"
                      class="rounded-lg mb-2"
                      height="184"
                      cover/>
                </v-responsive>
              </v-skeleton-loader>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-row justify="start">
                <v-col cols="2">
                  <v-skeleton-loader
                      :loading="loading"
                      type="text"/>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-card
                      class="px-5"
                      rounded="lg">
                    <v-row>
                      <v-col
                          v-for="pro in 6"
                          :key="pro"
                          cols="2">
                        <v-skeleton-loader
                            :loading="loading"
                            height="240"
                            type="image, list-item">
                          <v-responsive>
                            <v-img
                                src="src"
                                class="rounded-lg mb-2"
                                height="184"
                                cover/>

                            <v-list-item
                                subtitle="subtitle"
                                title="title"
                                class="px-0"/>
                          </v-responsive>
                        </v-skeleton-loader>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col
                v-for="img in 3"
                :key="img"
                cols="4"
                lg="4"
                md="4">
              <v-skeleton-loader
                  :loading="loading"
                  height="240"
                  type="image">
                <v-responsive>
                  <v-img
                      src="src"
                      class="rounded-lg mb-2"
                      height="184"
                      cover/>
                </v-responsive>
              </v-skeleton-loader>
            </v-col>
          </v-row>
          <v-row justify="start">
            <v-col cols="2">
              <v-skeleton-loader
                  :loading="loading"
                  type="text"/>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col
                v-for="img in 3"
                :key="img"
                cols="4"
                lg="4"
                md="4">
              <v-skeleton-loader
                  :loading="loading"
                  height="200"
                  type="image">
                <v-responsive>
                  <v-img
                      src="src"
                      class="rounded-lg"
                      height="184"
                      cover/>
                </v-responsive>
              </v-skeleton-loader>
            </v-col>
          </v-row>
        </v-container>
      </div>

      <!--  mobile size -->
      <div v-if="screenType === 'mobile'">
        <v-row justify="center">
          <v-col
              cols="12"
              lg="4"
              md="6">
            <v-skeleton-loader
                :loading="loading"
                height="240"
                type="image"
            >
              <v-responsive>
                <v-img
                    src="src"
                    class="rounded-lg mb-2"
                    height="184"
                    cover/>
              </v-responsive>
            </v-skeleton-loader>
          </v-col>
        </v-row>

        <v-container class="mobile-no-padd mt-4">
          <v-row>
            <v-col cols="12">
              <v-card
                  class="px-5 py-3"
                  rounded="lg">
                <v-row>
                  <v-col
                      v-for="pro in 3"
                      :key="pro"
                      cols="4">
                    <v-skeleton-loader
                        :loading="loading"
                        height="240"
                        type="image, list-item">
                      <v-responsive>
                        <v-img
                            src="src"
                            class="rounded-lg mb-2"
                            height="184"
                            cover/>

                        <v-list-item
                            subtitle="subtitle"
                            title="title"
                            class="px-0"/>
                      </v-responsive>
                    </v-skeleton-loader>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="4">
              <v-skeleton-loader
                  :loading="loading"
                  type="text" />
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col
                v-for="pro in 5"
                :key="pro"
                cols="2">
              <v-skeleton-loader type="avatar" class="d-flex justify-center"/>
              <v-skeleton-loader
                  :loading="loading"
                  type="text" />
            </v-col>
          </v-row>
        </v-container>

        <v-container>
          <v-row justify="center">
            <v-col
                v-for="img in 2"
                :key="img"
                cols="12">
              <v-skeleton-loader
                  :loading="loading"
                  height="190"
                  type="image">
                <v-responsive>
                  <v-img
                      src="src"
                      class="rounded-lg mb-2"
                      height="184"
                      cover/>
                </v-responsive>
              </v-skeleton-loader>
            </v-col>
          </v-row>
        </v-container>

        <v-container class="mobile-no-padd mt-4">
          <MobileHomeSection5Slider :content="responseDot(5)" />
        </v-container>

        <v-container>
          <v-row>
            <v-col cols="12">
              <v-row justify="start">
                <v-col cols="4">
                  <v-skeleton-loader
                      :loading="loading"
                      type="text"/>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-card
                      class="px-5"
                      rounded="lg">
                    <v-row>
                      <v-col
                          v-for="pro in 3"
                          :key="pro"
                          cols="4">
                        <v-skeleton-loader
                            :loading="loading"
                            height="240"
                            type="image, list-item">
                          <v-responsive>
                            <v-img
                                src="src"
                                class="rounded-lg mb-2"
                                height="184"
                                cover/>

                            <v-list-item
                                subtitle="subtitle"
                                title="title"
                                class="px-0"/>
                          </v-responsive>
                        </v-skeleton-loader>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-row justify="center">
                <v-col cols="4">
                  <v-skeleton-loader
                      :loading="loading"
                      type="text" />
                </v-col>
              </v-row>
              <v-card
                  class="px-5"
                  rounded="lg">
                <v-row justify="center" align="center">
                  <v-col
                      v-for="pro in 5"
                      :key="pro"
                      cols="2">
                    <v-skeleton-loader type="avatar" class="d-flex justify-center"/>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col
                v-for="img in 4"
                :key="img"
                cols="12">
              <v-skeleton-loader
                  :loading="loading"
                  height="150"
                  type="image">
                <v-responsive>
                  <v-img
                      src="src"
                      class="rounded-lg mb-2"
                      height="184"
                      cover/>
                </v-responsive>
              </v-skeleton-loader>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-row justify="start">
                <v-col cols="4">
                  <v-skeleton-loader
                      :loading="loading"
                      type="text"/>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-card
                      class="px-5"
                      rounded="lg">
                    <v-row>
                      <v-col
                          v-for="pro in 3"
                          :key="pro"
                          cols="4">
                        <v-skeleton-loader
                            :loading="loading"
                            height="240"
                            type="image, list-item">
                          <v-responsive>
                            <v-img
                                src="src"
                                class="rounded-lg mb-2"
                                height="184"
                                cover/>

                            <v-list-item
                                subtitle="subtitle"
                                title="title"
                                class="px-0"/>
                          </v-responsive>
                        </v-skeleton-loader>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col
                v-for="img in 4"
                :key="img"
                cols="6">
              <v-skeleton-loader
                  :loading="loading"
                  height="150"
                  type="image">
                <v-responsive>
                  <v-img
                      src="src"
                      class="rounded-lg mb-2"
                      height="184"
                      cover/>
                </v-responsive>
              </v-skeleton-loader>
            </v-col>
          </v-row>
          <v-row justify="start">
            <v-col cols="4">
              <v-skeleton-loader
                  :loading="loading"
                  type="text" />
            </v-col>
          </v-row>
          <v-row justify="start">
            <v-col v-for="text in 4" :key="text" cols="3">
              <v-skeleton-loader
                  :loading="loading"
                  type="text" />
            </v-col>
          </v-row>
          <v-row justify="start">
            <v-col cols="4">
              <v-skeleton-loader
                  :loading="loading"
                  type="text" />
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col
                v-for="img in 4"
                :key="img"
                cols="12">
              <v-skeleton-loader
                  :loading="loading"
                  height="150"
                  type="image">
                <v-responsive>
                  <v-img
                      src="src"
                      class="rounded-lg mb-2"
                      height="184"
                      cover/>
                </v-responsive>
              </v-skeleton-loader>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>

    <div v-show="!loading">
      <!--  desktop size -->
      <div v-if="screenType === 'desktop'">
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
              :componentProps="tabSlider1ComponentProps"
              columnHeader />

          <mobileHomeBrands :items="responseDot(7)" />

          <desktopHomeBanner
              class="mt-3"
              :items="desktopBanner2"
              col="3" />

          <mobileHomeSection8Slider :items="homeSkus" :title="titleSection9" />

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
            <header class="pa-3 pb-5">
              <h2 class="t20 text-right text-grey-darken-2">
                {{titleSection13 }}
              </h2>
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
      </div>

      <!--  mobile size -->
      <div v-if="screenType === 'mobile'">
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
              :componentProps="tabSlider1ComponentProps" />

          <mobileHomeBrands :items="responseDot(7)" />

          <mobileHomeBanner :items="mobileBanner2" />

          <mobileHomeSection8Slider :items="homeSkus" title="پرفروش‌ترین محصولات" class="mb-5"/>

          <mobileHomeBanner :items="mobileBanner3" :title="titleSection10" generalCol="6" col="6"/>

          <generalTabSlider
              setRef="tab2"
              :items="responseDot(11)"
              class="tab-slider2"
              :title="titleSection11"
              componentName="generalProductMinimalCard"
              contentWidth="1160px"
              wrapContent
              limit=6 />

          <div class="custom-banner">
            <mobileHomeBanner :items="mobileBanner4" col="4" />
          </div>

          <template v-if="homeBlog && homeBlog.length">
            <header class="pa-3 pb-5 w500">
              <h2 class="t20 text-right text-grey-darken-2">
                پربازدیدترین مقالات
              </h2>
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
      </div>
    </div>
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
            screenType: 'desktop',
        }
    },

    setup() {
        const title = ref('فروشگاه اینترنتی شاواز | خرید لوازم آرایشی، بهداشتی، عطر')
        const description = ref(' مقایسه و خرید آنلاین انواع لوازم آرایشی، بهداشتی، عطر | برندهای متنوع با پایین ترین قیمت | فروشگاه اینترنتی شاواز Shavaz.com - خرید اینترنتی لوازم آرایشی و بهداشتی با ضمانت اصالت کالا -  برای خرید کلیک کنید!')

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
                return this.responseDot(4) ?.banners
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
                return this.responseDot(8) ?.banners
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
                return this.responseDot(10) ?.banners
            } catch (e) {
                return []
            }
        },

        titleSection10() {
            try {
                return this.responseDot(10) ?.label
            } catch (e) {
                return ''
            }
        },

        titleSection9() {
            try {
                return this.responseDot(9) ?.label
            } catch (e) {
                return ''
            }
        },

        titleSection11() {
            try {
                return this.responseDot(11) ?.label
            } catch (e) {
                return ''
            }
        },

        titleSection13() {
            try {
                return this.responseDot(13) ?.label
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
                return this.responseDot(12) ?.banners
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
                const skus = this.responseDot(9) ?.skus.slice(0, 6)
                const findSkus = skus.filter(sku => sku?.seller_s_k_us?.length)
              return findSkus
            } catch (e) {
                return []
            }
        },

        homeBlog() {
            try {
                return this.responseDot(13) ?.banners.slice(0, 4)
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
