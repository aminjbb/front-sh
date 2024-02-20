<template>
  <main class="v-product v-product--list">
    <h1 class="v-hide">{{title}}</h1>

    <v-container>
      <generalBreadcrumb :items="BreadcrumbItems" />

      <!--        <generalProductCategorySlider :items="categoryListMocket" class="mt-5" />-->

      <v-row class="mt-10">
        <v-col cols="12" md="3">
          <template v-if="screenType === 'desktop'">
            <generalProductFilterSideBar
                :filterList="productFilterSecondaryData"
                @listFiltersModal="listFiltersModal"
                @selectFiltersModal="selectFiltersModal"
                @switchFiltersModal="switchFiltersModal"
                @setAmount="selectByAmount" />
          </template>

          <template v-if="screenType === 'mobile'">
            <div class="d-flex align-center justify-space-between">
              <generalProductFilterSideBarModal
                  :filterList="filtersMocket"
                  @listFiltersModal="listFiltersModal"
                  @selectFiltersModal="selectFiltersModal"
                  @switchFiltersModal="switchFiltersModal"
                  @setAmount="selectByAmount" />

              <generalProductSortModal @selectSort="selectSort" />
            </div>
          </template>
        </v-col>
        <v-col cols="12" md="9">
          <template v-if="screenType === 'desktop'">
            <div class="v-product__filter d-flex pt-1 align-center justify-space-between">
              <nav class="d-flex align-center flex-grow-1">
                <div class="pl-4">
                  <v-icon icon="mdi-sort-ascending" color="grey-darken-1" />
                  <span class="t14 w400 text-grey-darken-1">مرتب‌سازی بر اساس:</span>
                </div>

                <ul class="v-product__filter__items d-flex align-center">
                  <li class="t14 w400 text-grey px-4" @click="mostView()">پربازدیدترین</li>
                  <li class="t14 w400 text-grey px-4" @click="newest()">جدیدترین</li>
                  <li class="t14 w400 text-grey px-4" @click="cheapest()">ارزان‌ترین</li>
                  <li class="t14 w400 text-grey px-4" @click="mostExpensive()">گران‌ترین</li>
                  <li class="t14 w400 text-grey px-4" @click="biggestDiscount()">بیشترین تخفیف</li>
                </ul>
              </nav>
            </div>
          </template>
          <div class="v-product__contents" :class="screenType === 'desktop' ? 'mt-6' : ''">
            <v-row class="ma-0">
              <v-col
                  cols="12"
                  md="3"
                  v-for="(item, index) in productListMocket"
                  :key="`card-${index}`"
                  class="v-product__content d-flex">
                <generalProductCard
                    :content="item"
                    class="mb-4 flex-grow-1"
                    :hideInfo="true"
                    :showColors="true" />
              </v-col>
            </v-row>
          </div>

          <div class="v-product__pagination d-flex justify-center mt-8">
            <v-pagination
                v-model="page"
                :length="pageLength"
                size="40"
                :total-visible="4"
                prev-icon="mdi-chevron-right"
                next-icon="mdi-chevron-left" />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script>
import PLP from '@/composables/PLP.js'
export default {
  data() {
    return {
      BreadcrumbItems: [{
        title: 'لوازم آرایشی',
        /* Should be main category */
        href: '/'
      },
        {
          title: 'آرایش صورت',
          /* Should be sub category */
          href: '/products'
        }
      ],
      productList: [],
      productListMocket: [{
        image: 'category.jpg',
        label: 'ژل کرم آبرسان مناسب پوست چرب و مستعد آکنه ظرفیت ۷۰‌میلی‌لیتر',
        customer_price: '269900',
        site_price: '184030',
        discount: '30%',
        colors: [{
          code: '#C90000',
          label: 'قرمز',
        },
          {
            code: '#C90000',
            label: 'قرمز',
          },
          {
            code: '#C90000',
            label: 'قرمز',
          },
          {
            code: '#C90000',
            label: 'قرمز',
          },
          {
            code: '#C90000',
            label: 'قرمز',
          },
          {
            code: '#C90000',
            label: 'قرمز',
          },
          {
            code: '#000000',
            label: 'مشکی',
          },
          {
            code: '#C90000',
            label: 'قرمز',
          },
          {
            code: '#C90000',
            label: 'قرمز',
          },
          {
            code: '#C90000',
            label: 'قرمز',
          },
        ]
      },
        {
          image: 'category.jpg',
          label: 'ژل کرم آبرسان مناسب پوست چرب و مستعد آکنه ظرفیت ۷۰‌میلی‌لیتر',
          customer_price: '269900',
          site_price: '184030',
          colors: [{
            code: '#C90000',
            label: 'قرمز',
          },
            {
              code: '#C90000',
              label: 'قرمز',
            },
            {
              code: '#C90000',
              label: 'قرمز',
            },
          ]
        }, {
          image: 'category.jpg',
          label: 'ژل کرم آبرسان مناسب پوست چرب و مستعد آکنه ظرفیت ۷۰‌میلی‌لیتر',
          customer_price: '269900',
          site_price: '184030',
        },
        {
          image: 'category.jpg',
          label: 'ژل کرم آبرسان مناسب پوست چرب و مستعد آکنه ظرفیت ۷۰‌میلی‌لیتر',
          customer_price: '269900',
          site_price: '184030',
          discount: '30%'
        },
        {
          image: 'category.jpg',
          label: 'ژل کرم آبرسان مناسب پوست چرب و مستعد آکنه ظرفیت ۷۰‌میلی‌لیتر',
          customer_price: '269900',
          site_price: '184030',
        },
        {
          image: 'category.jpg',
          label: 'ژل کرم آبرسان مناسب پوست چرب و مستعد آکنه ظرفیت ۷۰‌میلی‌لیتر',
          customer_price: '269900',
          site_price: '184030',
        },
        {
          image: 'category.jpg',
          label: 'ژل کرم آبرسان مناسب پوست چرب و مستعد آکنه ظرفیت ۷۰‌میلی‌لیتر',
          customer_price: '269900',
          site_price: '184030',
          discount: '30%'
        },
        {
          image: 'category.jpg',
          label: 'ژل کرم آبرسان مناسب پوست چرب و مستعد آکنه ظرفیت ۷۰‌میلی‌لیتر',
          customer_price: '269900',
          site_price: '184030',
        }, {
          image: 'category.jpg',
          label: 'ژل کرم آبرسان مناسب پوست چرب و مستعد آکنه ظرفیت ۷۰‌میلی‌لیتر',
          customer_price: '269900',
          site_price: '184030',
        },
        {
          image: 'category.jpg',
          label: 'ژل کرم آبرسان مناسب پوست چرب و مستعد آکنه ظرفیت ۷۰‌میلی‌لیتر',
          customer_price: '269900',
          site_price: '184030',
          discount: '30%'
        }
      ],
      categoryList: [],
      categoryListMocket: [{
        title: 'کرم پودر',
        image: {
          image_url: 'category.jpg'
        },
        id: '1'
      },
        {
          title: 'پرایمر',
          image: {
            image_url: 'category.jpg'
          }
        },
        {
          title: 'کانتور و هایلایتر',
          image: {
            image_url: 'category.jpg'
          }
        },
        {
          title: 'پنکیک',
          image: {
            image_url: 'category.jpg'
          }
        },
        {
          title: 'برنزکننده',
          image: {
            image_url: 'category.jpg'
          }
        },
        {
          title: 'رژگونه',
          image: {
            image_url: 'category.jpg'
          }
        },
        {
          title: 'کانسیلر',
          image: {
            image_url: 'category.jpg'
          }
        },
        {
          title: 'پنکیک',
          image: {
            image_url: 'category.jpg'
          }
        },
        {
          title: 'برنزکننده',
          image: {
            image_url: 'category.jpg'
          }
        },
        {
          title: 'رژگونه',
          image: {
            image_url: 'category.jpg'
          }
        }
      ],
      filters: [],
      filtersMocket: [{
        id: 1,
        type: 'list',
        label: 'دسته‌بندی',
        name: 'category',
        values: [{
          title: 'کرم پودر',
          image: {
            image_url: 'category.jpg'
          },
          id: '1'
        },
          {
            title: 'پرایمر',
            image: {
              image_url: 'category.jpg'
            }
          },
          {
            title: 'کانتور و هایلایتر',
            image: {
              image_url: 'category.jpg'
            }
          },
          {
            title: 'پنکیک',
            image: {
              image_url: 'category.jpg'
            }
          },
          {
            title: 'برنزکننده',
            image: {
              image_url: 'category.jpg'
            }
          },
          {
            title: 'رژگونه',
            image: {
              image_url: 'category.jpg'
            }
          },
          {
            title: 'کانسیلر',
            image: {
              image_url: 'category.jpg'
            }
          },
          {
            title: 'پنکیک',
            image: {
              image_url: 'category.jpg'
            }
          },
          {
            title: 'برنزکننده',
            image: {
              image_url: 'category.jpg'
            }
          },
          {
            title: 'رژگونه',
            image: {
              image_url: 'category.jpg'
            }
          }
        ]
      },
        {
          id: 2,
          label: 'فقط کالاهای موجود',
          type: 'switch',
          name: 'avalabel',
          values: 'availabel_items'
        },
        {
          id: 3,
          label: 'برند',
          type: 'select',
          name: 'brands',
          values: [{
            label: 'آموتیا',
            name: 'Amutiya',
            id: '1'
          },
            {
              label: 'استی لودر',
              name: 'Estee lauder',
              id: '2'
            },
            {
              label: 'اسنس',
              name: 'Essence',
              id: '3'
            },
            {
              label: 'بورژوا',
              name: 'Bourjois',
              id: '4'
            },
            {
              label: 'پریم',
              name: 'Prime',
              id: '5'
            },
            {
              label: 'دوسه',
              name: 'Doucce',
              id: '6'
            },
            {
              label: 'سینره',
              name: 'Cinere',
              id: '7'
            },
            {
              label: 'دیور',
              name: 'dior',
              id: '8'
            },
            {
              label: 'فلورما',
              name: 'flormar',
              id: '9'
            },
          ]
        },
      ],
      screenType: null
    }
  },

  setup() {
    const title = ref('فروشگاه اینترنتی شاواز | لیست محصولات فروشگاه شاواز')
    const description = ref(' فروشگاه اینترنتی شاواز، فروشگاه لوازم آرایشی و بهداشتی شاواز ، محصولات آرایشی زنانه، محصولات بهداشتی بانوان* محصولات بهداشتی آقایان،محصولات بهداشتی شخصی')
    const {
      productList,
      filterQuery,
      page,
      getSecondaryData,
      secondaryData
    } = new PLP()
    useHead({
      title,
      meta: [{
        name: 'description',
        content: description
      }]
    });
    return {productList, filterQuery, page , getSecondaryData , secondaryData}
  },

  methods: {
    selectSort(obj) {
      console.log("🚀 ~ selectSort:", obj);

      //TODO: Sort items in mobile
    },
    /**
     * Filter productList by list type items
     * @param {*} array
     */
    listFiltersModal(array) {
      let query = this.$route.query;
      if (array?.values) {
        this.$router.push({
          query: {
            ...query,
            categories: `[${array?.values}]`
          }
        })
      }
    },

    /**
     * Filter productList by select type items
     * @param {*} brands
     */
    selectFiltersModal(array) {
      if (array.param === "stock") {
        this.createQueryForFilter(array)
      } else {
        const findQueryIndex = this.filterQuery.findIndex(query => query.name === array.name)
        if (findQueryIndex > -1) {
          if (array.values.length) this.filterQuery[findQueryIndex].values = array.values
          else this.filterQuery.splice(findQueryIndex, 1)
        } else {
          this.filterQuery.push(array)
        }
        this.createQueryForFilter()
      }

    },
    /**
     * Filter productList by switch type items
     * @param {*} status
     */
    switchFiltersModal(array) {
      console.log("🚀 ~ switchFiltersModal:", array);
      //TODO: filter by switch items like available
    },

    /**
     * Filter by amount
     * @param {*} amount
     */
    async selectByAmount(amount) {
      if (amount?.param === "site_price") {
        let site_price_to = ''
        let site_price_from = ''
        if (amount.amount?.max) {
          site_price_to = amount.amount?.max
        }
        if (amount.amount?.min) {
          site_price_from = amount.amount?.min
        }

        await this.setMinAmount(amount)
        await this.setMaxAmount(amount)
      }
    },

    /**
     * Set min
     */
    setMinAmount(amount) {
      let query = this.$route.query;
      if (amount.amount?.min) {
        this.$router.push({
          query: {
            ...query,
            site_price_from: amount.amount?.min
          }
        })
      }

    },

    /**
     * Set max
     * @param {*} amount
     */
    setMaxAmount(amount) {
      let query = this.$route.query;
      if (amount.amount?.max) {
        this.$router.push({
          query: {
            ...query,
            site_price_to: amount.amount?.max
          }
        })
      }

    },

    /**
     * Params generator
     * @param {*} array
     */
    async paramGenerator(array) {
      let finalFilterObject = []
      const newObject = Object.create(this.filterQuery)
      if (array?.param === "stock") {
        let param = ''
        if (array.values) {
          param = `1`
        } else {
          param = `0`
        }
        let routeSplit = this.$route.fullPath.split('?')
        let query = this.$route.query;
        if (routeSplit[1]) {
          if (this.$route.query?.stock) {
            if (query) {
              this.$router.push({
                query: {
                  ...query,
                  stock: param
                }
              })
            } else {
              this.$router.push({
                query: {
                  stock: param
                }
              })
            }

          } else {
            this.$router.push({
              query: {
                ...query,
                stock: param
              }
            })
          }
        } else {
          this.$router.push(`${this.$route.path}?stock=${param}`)
        }
      } else {
        await newObject.forEach((query, index) => {
          query.values.forEach(value => {
            const form = {
              param: query.param,
              value: value
            }
            finalFilterObject.push(form)
          })
        })
        this.createRoute(finalFilterObject)
      }
    },
    /**
     * Create route after filter
     * @param {*} values
     */
    createRoute(values) {
      let param = ''
      let brandParam = ''
      let paramQuery = ''
      const attributeObject = values.filter(filterValue => filterValue.param == "attributes")
      const brandObject = values.filter(filterValue => filterValue.param == "brands")
      attributeObject.forEach(element => {
        param += `${element.value},`
      })
      brandObject.forEach(element => {
        brandParam += `${element.value},`
      })

      if (attributeObject.length) {
        let finalParam = `[${param.substring(0, param.length - 1)}]`
        if (!paramQuery) paramQuery += `?attribute=${finalParam}`
        else paramQuery += `&attribute=${finalParam}`
      }
      if (brandObject.length) {
        let finalParam = `[${brandParam.substring(0, brandParam.length - 1)}]`
        if (!paramQuery) paramQuery += `?brands=${finalParam}`
        else paramQuery += `&brands=${finalParam}`
      }
      if (this.$route.query.site_price_from) {
        if (!paramQuery) paramQuery += `?site_price_from=${this.$route.query.site_price_from}`
        else paramQuery += `&site_price_from=${this.$route.query.site_price_from}`
      }
      if (this.$route.query.site_price_to) {
        if (!paramQuery) paramQuery += `?site_price_to=${this.$route.query.site_price_to}`
        else paramQuery += `&site_price_to=${this.$route.query.site_price_to}`
      }
      if (this.$route.query.stock) {
        if (!paramQuery) paramQuery += `?stock=${this.$route.query.stock}`
        else paramQuery += `&stock=${this.$route.query.stock}`
      }

      if (this.$route.query.categories) {
        if (!paramQuery) paramQuery += `?categories=${this.$route.query.categories}`
        else paramQuery += `&categories=${this.$route.query.categories}`
      }

      this.$router.push(this.$route.path + paramQuery)
      this.query = paramQuery
    },
    async createQueryForFilter(array) {

      await this.paramGenerator(array)

    },
  },

  computed:{
    /** return filters on secondaryData slug route **/
    productFilterSecondaryData() {
      try {
        return this.secondaryData.data.data.filters
      } catch (e) {
        return []
      }
    },
  },

  mounted() {
    /**
     * Check screen size
     */
    window.innerWidth < 769 ? this.screenType = 'mobile' : this.screenType = 'desktop';
  },

  beforeMount() {
    this.getSecondaryData()
  }
}
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";
@import '~/assets/scss/views/products.scss';
</style>
