<template >
  <main class="v-product v-product--list">
    <h1 class="v-hide">{{title}}</h1>

    <v-container>
      <generalBreadcrumb :items="BreadcrumbItems" />


      <v-row class="mt-10">
        <v-col cols="12" md="3">
          <generalProductFilterSideBar
              :filterList="productFilterSecondaryData"
              @listFiltersModal="listFiltersModal"
              @selectFiltersModal="selectFiltersModal"
              @switchFiltersModal="switchFiltersModal"
              @setAmount="selectByAmount" />
        </v-col>
        <v-col cols="12" md="9">
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

          <div class="v-product__contents mt-6">
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
                    :showColors="true" />
              </v-col>
            </v-row>
          </div>

          <div class="v-product__pagination d-flex justify-center mt-8">
            <v-pagination
                v-model="page"
                :length="productListPageLength"
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
      filters: [],
    }
  },

  setup(props) {
    const title = ref('فروشگاه اینترنتی شاواز | لیست محصولات فروشگاه شاواز')
    const description = ref(' فروشگاه اینترنتی شاواز، فروشگاه لوازم آرایشی و بهداشتی شاواز ، محصولات آرایشی زنانه، محصولات بهداشتی بانوان* محصولات بهداشتی آقایان،محصولات بهداشتی شخصی')
    const {productList, filterQuery, page , getSecondaryData ,secondaryData} = new PLP()
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
    /**
     * Filter productList by list type items
     * @param {*} array
     */
    listFiltersModal(array) {
      console.log("🚀 ~ listFiltersModal:", arr);

      //TODO: Add filter for 'productList'
    },

    /**
     * Filter productList by select type items
     * @param {*} brands
     */
    selectFiltersModal(array) {
      if (this.filterQuery === null){
        this.filterQuery = `?${array.param}=[${array.values.toString()}]`
        this.$router.push(`${this.$route.fullPath}${ this.filterQuery}`)
      }
      else{
        this.filterQuery = `${array.param}=[${array.values.toString()}]`
      }
      console.log("🚀 ~ selectFiltersModal:", this.filterQuery);
      //TODO: Add filter for 'productList' by brands
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
    selectByAmount(amount) {
      console.log("🚀 ~ amount:", amount);
      //TODO: filter by available items
    }
  },
  computed:{
    /** return data product list  **/
    productListData(){
      try {
        return this.productList.data.data.data
      }
      catch (e) {
        return []
      }
    },
    /** return PageLength product list for pagination **/
    productListPageLength(){
      try {
        return this.productList.data.data.last_page
      }
      catch (e) {
        return 1
      }
    },
    /** return filters on secondaryData slug route **/
    productFilterSecondaryData(){
      try {
        return this.secondaryData.data.data.filters
      }
      catch (e) {
        return []
      }
    },
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
