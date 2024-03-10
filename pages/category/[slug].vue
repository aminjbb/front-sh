<template>
  <main class="v-product v-product--list">
    <h1 class="v-hide">{{ title }}</h1>

    <v-container>
      <generalBreadcrumb :items="breadcrumbList"/>

      <generalProductCategorySlider :items="productsSecondaryData" class="mt-5" :loop="false"/>
      <v-row class="mt-10">
        <v-col cols="12" md="3">
          <template v-if="screenType === 'desktop'">
            <generalProductFilterSideBar
                :filterList="productFilterSecondaryData"
                @listFiltersModal="listFiltersModal"
                @selectFiltersModal="selectFiltersModal"
                @switchFiltersModal="switchFiltersModal"
                @setAmount="selectByAmount"/>
          </template>
          <template v-if="screenType === 'mobile'">
            <div class="d-flex align-center justify-space-between">
              <generalProductFilterSideBarModal
                  :filterList="productFilterSecondaryData"
                  @listFiltersModal="listFiltersModal"
                  @selectFiltersModal="selectFiltersModal"
                  @switchFiltersModal="switchFiltersModal"
                  @setAmount="selectByAmount"/>

                <generalProductSortModal @selectSort="selectSort"/>
            </div>
          </template>
        </v-col>
        <v-col cols="12" md="9">
          <template v-if="screenType === 'desktop'">
            <div class="v-product__filter d-flex pt-1 align-center justify-space-between">
              <nav class="d-flex align-center flex-grow-1">
                <div class="pl-4">
                  <v-icon icon="mdi-sort-ascending" color="grey-darken-1"/>
                  <span class="t14 w400 text-grey-darken-1">مرتب‌سازی بر اساس:</span>
                </div>

                <ul class="v-product__filter__items d-flex align-center">
<!--                  <li class="t14 w400 text-grey px-4" @click="mostView()">پربازدیدترین</li>-->
                  <li class="t14 w400  px-4" :class="(sortType=== 'created_at' && orderType === 'desc') ? 'text-primary' : 'text-grey' " @click="sort('created_at', 'desc')">جدیدترین</li>
                  <li class="t14 w400  px-4" :class="(sortType=== 'site_price' && orderType === 'asc') ? 'text-primary' : 'text-grey' " @click="sort('site_price', 'asc')">ارزان‌ترین</li>
                  <li class="t14 w400  px-4" :class="(sortType=== 'site_price' && orderType === 'desc') ? 'text-primary' : 'text-grey' "  @click="sort('site_price', 'desc')">گران‌ترین</li>
                  <li class="t14 w400  px-4"  :class="(sortType=== 'discount' && orderType ===  'desc') ? 'text-primary' : 'text-grey' " @click="sort('discount', 'desc')">بیشترین تخفیف</li>
                </ul>
              </nav>
            </div>
          </template>
          <div class="v-product__contents" :class="screenType === 'desktop' ? 'mt-6' : ''">
            <v-row class="ma-0">
              <v-col
                  cols="12"
                  md="3"
                  v-for="(item, index) in productListData"
                  :key="`card-${index}`"
                  class="v-product__content d-flex">
                <generalProductCard
                    :content="item"
                    class="mb-4 flex-grow-1"
                    :hideInfo="true"
                    :isPLP="true"
                    :showColors="true"/>
              </v-col>
            </v-row>
          </div>

          <div class="v-product__pagination d-flex justify-center mt-8">
            <v-pagination
                v-model="page"
                :length="productListPageLength"
                size="40"
                :total-visible="6"
                @click="backToTop"
                prev-icon="mdi-chevron-right"
                next-icon="mdi-chevron-left"/>
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
      filters: [],
      screenType: null,
      sortType:'',
      orderType: ''
    }
  },

  setup(props) {
    const title = ref('فروشگاه اینترنتی شاواز | لیست محصولات فروشگاه شاواز')
    const description = ref(' فروشگاه اینترنتی شاواز، فروشگاه لوازم آرایشی و بهداشتی شاواز ، محصولات آرایشی زنانه، محصولات بهداشتی بانوان* محصولات بهداشتی آقایان،محصولات بهداشتی شخصی')
    const {
      productList,
      filterQuery,
      page,
      getSecondaryData,
      secondaryData,
      filterForFilter,
      getBreadcrumb , breadcrumb,
      query
    } = new PLP()
    useHead({
      title,
      meta: [{
        name: 'description',
        content: description
      }]
    });
    return {
      productList,
      filterQuery,
      page,
      getSecondaryData,
      secondaryData,
      filterForFilter,
      query,
      getBreadcrumb , breadcrumb,
    }
  },

  computed: {
    breadcrumbList(){
      let breadcrumb = []
      if(this.breadcrumb?.category_l1?.name){
        const form = {
          type : "category_l1",
          href: `/category/${this.breadcrumb.category_l1.slug}`,
          title: this.breadcrumb.category_l1.name
        }
        breadcrumb.push(form)

      }
      if(this.breadcrumb?.category_l2?.name){
        const form = {
          type : "category_l2",
          href: `/category/${this.breadcrumb.category_l2.slug}`,
          title: this.breadcrumb.category_l2.name
        }
        breadcrumb.push(form)

      }
      if(this.breadcrumb?.category_l3?.name){
        const form = {
          type : "category_l3",
          href: `/category/${this.breadcrumb.category_l3.slug}`,
          title: this.breadcrumb.category_l3.name
        }
        breadcrumb.push(form)

      }
      if(this.breadcrumb?.product){
        const form = {
          type : "product",
          href: `/product/${this.breadcrumb.product.slug}`,
          title: this.breadcrumb.product.name
        }
        breadcrumb.push(form)

      }

      if(this.breadcrumb?.sku_group){
        const form = {
          type : "sku_group",
          href: `/sku-group/${this.breadcrumb.sku_group.slug}`,
          title: this.breadcrumb.sku_group.name
        }
        breadcrumb.push(form)

      }

      return breadcrumb
    },
    /** return data product list  **/
    productListData() {
      try {
        return this.productList.data.data.data
      } catch (e) {
        return []
      }
    },
    /** return PageLength product list for pagination **/
    productListPageLength() {
      try {
        return this.productList.data.data.last_page
      } catch (e) {
        return 1
      }
    },
    /** return filters on secondaryData slug route **/
    productFilterSecondaryData() {
      try {
        return this.secondaryData.data.data.filters
      } catch (e) {
        return []
      }
    },

    /** return filters on secondaryData slug route **/
    productsSecondaryData() {
      try {
        return this.secondaryData.data.data.products
      } catch (e) {
        return []
      }
    },
  },

  methods: {
    /**
     * Filter productList by select type items
     * @param {*} array
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

    sort(order, orderType) {
      this.sortType = order
      this.orderType = orderType
      let query = this.$route.query;
      if (order && orderType) {
        this.$router.push({
          query: {
            ...query,
           order: order, order_type: orderType

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

      this.$router.push(this.$route.path + paramQuery)
      this.query = paramQuery
    },

    async createQueryForFilter(array) {
      await this.paramGenerator(array)
    },

    /**
     * Back to top on change pagination
     */
    backToTop(){
      window.scrollTo({
          top: 0,
          behavior: "smooth",
      });
    }
  },

  mounted() {
    /**
     * Check screen size
     */
    window.innerWidth < 769 ? this.screenType = 'mobile' : this.screenType = 'desktop';
    if(this.$route.query?.page){
      this.page = parseInt(this.$route.query.page)
    }
  },

  beforeMount() {
    this.getSecondaryData()
    this.getBreadcrumb('category')
  },

  watch:{
    page(val){
      let query = this.$route.query;
      if (val) {
        this.$router.push({
          query: {
            ...query,
            page: val
          }
        })
      }
    }
  }
}
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";
@import '~/assets/scss/views/products.scss';
</style>
