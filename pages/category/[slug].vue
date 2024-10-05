<template>
  <mobileHeaderPlp v-if="screenType === 'mobile'" :pageTitle="pageTitle"/>
  
    <main class="v-product v-product--list">
      <v-container v-show="loading">
        <generalSkeletonPlp :loading="loading" :screenSize="screenType === 'desktop' ? 'desktop' : 'mobile'"/>
      </v-container>

      <v-container v-show="!loading">
        <generalBreadcrumb :items="breadcrumbList"/>
  
<!--        <generalProductCategorySlider v-if="productsSecondaryData?.length" :items="productsSecondaryData" class="mt-5" :loop="false"/>-->

        <template v-if="screenType === 'desktop'">
          <client-only>
            <div class="v-product__filter d-flex pt-1 align-center justify-space-between mt-7 pb-1">
              <nav class="d-flex align-center flex-grow-1">
                <div class="pl-4">
                  <v-icon icon="mdi-sort-ascending" color="grey-darken-1"/>
                  <span class="t14 w400 text-grey-darken-1">مرتب‌سازی بر اساس:</span>
                </div>

                <ul class="v-product__filter__items d-flex align-center">
                  <li class="t14 w400  px-4" :class="(sortType=== 'seen_count' && orderType === 'asc') ? 'text-primary' : 'text-grey' " @click="sort('seen_count', 'asc')">محبوب ترین </li>
                  <li class="t14 w400  px-4" :class="(sortType=== 'created_at' && orderType === 'desc') ? 'text-primary' : 'text-grey' " @click="sort('created_at', 'desc')">جدیدترین</li>
                  <li class="t14 w400  px-4" :class="(sortType=== 'site_price' && orderType === 'asc') ? 'text-primary' : 'text-grey' " @click="sort('site_price', 'asc')">ارزان‌ترین</li>
                  <li class="t14 w400  px-4" :class="(sortType=== 'site_price' && orderType === 'desc') ? 'text-primary' : 'text-grey' "  @click="sort('site_price', 'desc')">گران‌ترین</li>
                  <li class="t14 w400  px-4"  :class="(sortType=== 'discount' && orderType ===  'desc') ? 'text-primary' : 'text-grey' " @click="sort('discount', 'desc')">بیشترین تخفیف</li>
                </ul>
              </nav>
            </div>
          </client-only>
        </template>

        <v-row class="mt-5">
          <v-col cols="12" md="3" class="filter-bg-mobile">
            <client-only>
              <template v-if="screenType === 'desktop'">
                <generalProductFilterSideBar
                    :filterList="productFilterSecondaryData"
                    @listFiltersModal="listFiltersModal"
                    @selectFiltersModal="selectFiltersModal"
                    @clearFilterQuery="clearFilterQuery"
                    @setAmount="selectByAmount"/>
              </template>

              <template v-if="screenType === 'mobile'">
                <div class="d-flex align-center">
                    <generalProductFilterSideBarModal
                      :filterLength ="selectedFilterLength"
                      class="ml-3"
                      :filterList="productFilterSecondaryData"
                      @clearFilterQuery="clearFilterQuery"
                      @listFiltersModal="listFiltersModal"
                      @selectFiltersModal="selectFiltersModal"
                      @setAmount="selectByAmount"/>
    
                    <generalProductSortModal @sort="sort" :sortItems="sortItems"/>
                </div>
              </template>
            </client-only>
          </v-col>

          <v-col cols="12" md="9" class="main-col">
            <div class="v-product__contents" >
              <v-row v-if="productListData?.length" class="ma-0">
                <v-col
                    cols="6"
                    md="3"
                    v-for="(item, index) in productListData"
                    :key="`card-${index}`"
                    class="v-product__content d-flex">
                  <generalProductCard
                      :content="item"
                      :lazy=false
                      class="mb-4 flex-grow-1"
                      :hideInfo="true"
                      :isPLP="true"
                      :index = "index + 1"
                      showBasket
                      :categoryName = "category"
                      :sectionName = "` لیست کالاهای دسته بندی ${plpTitle}`"
                      :showColors="true"/>
                </v-col>
              </v-row>
            </div>
  
            <div class="v-product__pagination d-flex justify-center mt-8 w-100">
              <v-pagination
                  v-model="page"
                  :length="productListPageLength"
                  size="40"
                  :total-visible="6"
                  @click="backToTop"
                  @next="changePagination()"
                  @prev="changePagination()"
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
        pageTitle:null,
        productList: [],
        filters: [],
        screenType: null,
        sortType:'seen_count',
        orderType: 'asc',
        category:null,
        selectedFilterLength: null,
        sortItems: [
              {
                  label: 'محبوب ترین',
                  value: 'seen_count',
                  type: 'asc'
              },
              {
                  label: 'جدیدترین',
                  value: 'created_at',
                  type: 'desc'
              },
              {
                  label: 'ارزان‌ترین',
                  value: 'site_price',
                  type: 'asc'
              },
              {
                  label: 'گران‌ترین',
                  value: 'site_price',
                  type: 'desc'
              },
              {
                  label: 'بیشترین تخفیف',
                  value: 'discount',
                  type: 'desc'
              }
          ],
      }
    },
  
    setup() {
      const title = ref('فروشگاه اینترنتی شاواز | لیست محصولات ')
      
      const {
        productList,
        filterQuery,
        page,
        secondaryData,
        filterForFilter,
        getBreadcrumb ,
        breadcrumb,
        query,
        plpTitle,
        description,
        loading
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
        secondaryData,
        filterForFilter,
        query,
        getBreadcrumb ,
        breadcrumb,
        plpTitle,
        title,
        loading
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
          this.pageTitle = this.breadcrumb?.category_l1?.name;
        }

        if(this.breadcrumb?.category_l2?.name){
          const form = {
            type : "category_l2",
            href: `/category/${this.breadcrumb.category_l2.slug}`,
            title: this.breadcrumb.category_l2.name
          }
          breadcrumb.push(form)
          this.pageTitle = this.breadcrumb?.category_l2?.name;
        }

        if(this.breadcrumb?.category_l3?.name){
          const form = {
            type : "category_l3",
            href: `/category/${this.breadcrumb.category_l3.slug}`,
            title: this.breadcrumb.category_l3.name
          }
          breadcrumb.push(form)
          this.pageTitle = this.breadcrumb?.category_l3?.name;
        }

        if(this.breadcrumb?.product){
          const form = {
            type : "product",
            href: `/product/${this.breadcrumb.product.slug}`,
            title: this.breadcrumb.product.name
          }
          breadcrumb.push(form)

          this.pageTitle = this.breadcrumb?.product.name;
  
        }
  
        if(this.breadcrumb?.sku_group){
          const form = {
            type : "sku_group",
            href: `/sku-group/${this.breadcrumb.sku_group.slug}`,
            title: this.breadcrumb?.sku_group.name
          }
          breadcrumb.push(form)
          this.pageTitle = this.breadcrumb.product.name;
  
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

      clearFilterQuery(){
        this.filterQuery = []
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
       * @param {*} array
       */
      selectFiltersModal(array) {


        if (array.param === "stock") {
          this.createQueryForFilter(array)
        } else {
          const findQueryIndex = this.filterQuery.findIndex(query => query.name === array.name);

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

          if (amount?.amount?.from !== null) {
            site_price_from = amount?.amount?.from
          }
          if (amount?.amount?.to !== null) {
            site_price_to = amount?.amount?.to
          }

          let query = this.$route.query;

          if (site_price_from && !site_price_to){
            this.$router.push({
              query: {
                ...query,
                site_price_from: site_price_from,
              }
            })
          }
          else if (!site_price_from && site_price_to ){
            this.$router.push({
              query: {
                ...query,
                site_price_to: site_price_to
              }
            })
          }
          else if (site_price_from && site_price_to ){
            this.$router.push({
              query: {
                ...query,
                site_price_from: site_price_from,
                site_price_to: site_price_to
              }
            })
          }
  
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
             order: order, order_type: orderType,
              page:1,

            }

          })
          this.page= 1
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
                this.$router.replace({
                  query: {
                    ...query,
                    stock: param,
                    page:1
                  }
                })
              }
              else {
                this.$router.push({
                  query: {
                    stock: param,
                    page:1
                  }
                })
              }
  
            }
            else {
              this.$router.replace({
                query: {
                  ...query,
                  stock: param,
                  page:1
                }
              })
            }
          }
          else {
            this.$router.push(`${this.$route.path}?stock=${param}`)
          }
        }
        else {
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
        console.log(values)
        let param = ''
        let colorParam = ''
        let brandParam = ''
        let paramQuery = ''
        let categoryQuery = ''
        let productQuery = ''
        const colorsObject = values.filter(filterValue => filterValue.param == "colors")
        const attributeObject = values.filter(filterValue => filterValue.param == "attributes")
        const brandObject = values.filter(filterValue => filterValue.param == "brands")
        const categoriesObject = values.filter(filterValue => filterValue.param == "categories")
        const productsObject = values.filter(filterValue => filterValue.param == "products")
        attributeObject.forEach(element => {
          param += `attributes[]=${element.value}&`
        })
        brandObject.forEach(element => {
          brandParam += `brands[]=${element.value}&`
        })
        colorsObject.forEach(element => {
          colorParam += `colors[]=${element.value}&`
        })
        categoriesObject.forEach(element => {
          categoryQuery += `categories[]=${element.value}&`
        })
        productsObject.forEach(element => {
          productQuery += `products[]=${element.value}&`
        })
  
        if (attributeObject.length) {

          let finalParam = `${param.substring(0, param.length - 1)}`
          if (!paramQuery) paramQuery += `?${finalParam}`
          else paramQuery += `&${finalParam}`
        }
        if (brandObject.length) {
          let finalParam = `${brandParam.substring(0, brandParam.length - 1)}`
          if (!paramQuery) paramQuery += `?${finalParam}`
          else paramQuery += `&${finalParam}`
        }
        if (colorsObject.length) {
          let finalParam = `${colorParam.substring(0, colorParam.length - 1)}`
          if (!paramQuery) paramQuery += `?${finalParam}`
          else paramQuery += `&${finalParam}`
        }
        if (categoriesObject.length) {
          let finalParam = `${categoryQuery.substring(0, categoryQuery.length - 1)}`
          if (!paramQuery) paramQuery += `?${finalParam}`
          else paramQuery += `&${finalParam}`
        }
        if (productsObject.length) {
          let finalParam = `${productQuery.substring(0, productQuery.length - 1)}`
          if (!paramQuery) paramQuery += `?${finalParam}`
          else paramQuery += `&${finalParam}`
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
        this.page =1
      },
  
      async createQueryForFilter(array) {
        await this.paramGenerator(array)
      },
  
      /**
       * Back to top on change pagination
       */
      backToTop(){
        this.changePagination()
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
      },
  
      changePagination(){
        let query = this.$route.query;
        this.$router.push({
          query: {
            ...query,
            page: this.page,

          }
        })
      }
    },

    beforeCreate(){
        this.$store.commit('set_loadingModal', true);
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
      this.getBreadcrumb('category')
    },
  
    watch:{
      plpTitle(newVal){
          this.title = newVal
      },

      breadcrumb(newVal){
        if(newVal?.category_l3?.name){
          this.category = newVal?.category_l3?.name
        }else if(newVal?.category_l2?.name){
          this.category = newVal?.category_l2?.name
        }else if(newVal?.category_l1?.name){
          this.category = newVal.category_l1.name
        }
      },

      $route(newVal){
      if(Object.keys(newVal?.query).length === 0){
          this.selectedFilterLength = 0
        }else{
          this.selectedFilterLength = Object.keys(newVal?.query).length
        }

      }
    }
  }
  </script>
  
  <style lang="scss">
  @import "~/assets/scss/tools/bp";
  @import '~/assets/scss/views/products.scss';
  </style>
  