<template>
    
<mobileHeaderPlp v-if="screenType === 'mobile'" :submenu="selectedLastCategory ? true : false" :pageImage="selectedLastCategory ? selectedLastCategory.image_url : ''" :pageTitle="pageTitle" :pageReference="parentCategory" :items="breadcrumbList"/>

<main class="v-product v-product--list">
    <v-container v-show="loading">
        <generalSkeletonPlp :loading="loading" :screenSize="screenType === 'desktop' ? 'desktop' : 'mobile'" />
    </v-container>

    <div v-show="!loading">
        <generalProductCategorySlider :items="categoryList" :title="parentCategoryLabel"/>
    </div>

    <v-container v-show="!loading">
        <v-row v-if="screenType === 'desktop'">
            <v-col cols="6" class="d-flex align-center">
                <template v-if="selectedLastCategory">
                  <generalKitsImageSimage :src="selectedLastCategory.image_url"  :title="selectedLastCategory.label"  :alt="selectedLastCategory.name" width="32" height="32" class="ml-2 br12 ov-h" />
                </template>
                <div >
                  <h1 class="t18 w700 text-sGrayDarken2">
                    {{ pageTitle }}
                  </h1>
                </div>
            </v-col>
            <v-col cols="6">
                <generalBreadcrumb :items="breadcrumbList" icon/>
            </v-col>
        </v-row>

        <v-row class="mt-5 change-row">
            <v-col cols="12" md="3" class="pa-0 mobile-filter-box" id="filter-parent">
                <client-only>
                    <div class="filter-bg-mobile pa-3 w-100" id="filter-bg-mobile">
                        <template v-if="screenType === 'desktop'">
                            <generalProductFilterSideBar :filterList="productFilterSecondaryData" @listFiltersModal="listFiltersModal" @selectFiltersModal="selectFiltersModal" @clearFilterQuery="clearFilterQuery" @setAmount="selectByAmount" />
                        </template>

                        <template v-if="screenType === 'mobile'">
                            <div class="d-flex align-center">
                                <generalProductFilterSideBarModal :filterLength="selectedFilterLength" class="ml-1" :filterList="productFilterSecondaryData" @clearFilterQuery="clearFilterQuery" @listFiltersModal="listFiltersModal" @selectFiltersModal="selectFiltersModal" @setAmount="selectByAmount" />

                                <generalProductSortModal @selectSort= "mobileSort" @sort="sort" :sortItems="sortItems" :sortType = "sortType" :orderType="orderType"/>
                            </div>
                        </template>
                    </div>
                </client-only>
            </v-col>

            <v-col cols="12" md="9" class="main-col">
                <template v-if="screenType === 'desktop'">
                    <client-only>
                        <div class="v-product__filter d-flex align-center justify-space-between mb-4 pb-1 pr-2">
                            <nav class="d-flex align-center flex-grow-1">
                                <div class="pl-4">
                                    <v-icon icon="mdi-sort-ascending" color="grey-darken-1" class="ml-1" size="small"/>
                                    <span class="t12 w700 text-sGray">مرتب‌سازی بر اساس</span>
                                </div>

                                <ul class="v-product__filter__items d-flex align-center">
                                    <li class="t12 w700 px-4" :class="(sortType=== 'seen_count' && orderType === 'desc') ? 'text-primary' : 'text-sGray' " @click="sort('seen_count', 'desc')">محبوب ترین </li>
                                    <li class="t12 w700 px-4" :class="(sortType=== 'created_at' && orderType === 'desc') ? 'text-primary' : 'text-sGray' " @click="sort('created_at', 'desc')">جدیدترین</li>
                                    <li class="t12 w700 px-4" :class="(sortType=== 'site_price' && orderType === 'asc') ? 'text-primary' : 'text-sGray' " @click="sort('site_price', 'asc')">ارزان‌ترین</li>
                                    <li class="t12 w700 px-4" :class="(sortType=== 'site_price' && orderType === 'desc') ? 'text-primary' : 'text-sGray' " @click="sort('site_price', 'desc')">گران‌ترین</li>
                                    <li class="t12 w700 px-4" :class="(sortType=== 'discount' && orderType ===  'desc') ? 'text-primary' : 'text-sGray' " @click="sort('discount', 'desc')">بیشترین تخفیف</li>
                                </ul>
                            </nav>
                        </div>
                    </client-only>
                </template>

                <div class="v-product__contents">
                    <v-row v-if="productListData?.length" class="ma-0">
                        <v-col cols="6" md="3" v-for="(item, index) in productListData" :key="`card-${index}`" class="v-product__content d-flex">
                            <generalProductCard :content="item" :lazy=false class="mb-4 flex-grow-1" :hideInfo="true" :isPLP="true" :index="index + 1" showBasket :categoryName="category" :sectionName="` لیست کالاهای دسته بندی ${plpTitle}`" :showColors="true" />
                        </v-col>
                    </v-row>
                </div>

                <div class="v-product__pagination d-flex justify-center mt-8 w-100">
                    <v-pagination v-model="page" :length="productListPageLength" size="40" :total-visible="6" @click="backToTop" @next="changePagination()" @prev="changePagination()" prev-icon="mdi-chevron-right" next-icon="mdi-chevron-left" />
                </div>
            </v-col>
        </v-row>
    </v-container>
</main>
</template>

  
  
<script>
import PLP from '@/composables/PLP.js'
import {stringify} from "devalue";

export default {
    data() {
        return {
            pageTitle: null,
            parentTitle:null,
            productList: [],
            filters: [],
            screenType: null,
            sortType: 'seen_count',
            orderType: 'desc',
            category: null,
            selectedFilterLength: null,
            sortItems: [{
                    label: 'محبوب ترین',
                    value: 'seen_count',
                    type: 'desc',
                    valueByType:'seen_count'
                },
                {
                    label: 'جدیدترین',
                    value: 'created_at',
                    type: 'desc',
                    valueByType:'created_at'
                },
                {
                    label: 'ارزان‌ترین',
                    value: 'site_price',
                    type: 'asc',
                    valueByType:'site_price_asc'
                },
                {
                    label: 'گران‌ترین',
                    value: 'site_price',
                    type: 'desc',
                    valueByType:'site_price_desc'
                },
                {
                    label: 'بیشترین تخفیف',
                    value: 'discount',
                    type: 'desc',
                    valueByType:'discount'
                }
            ],
        }
    },

    setup() {
        const title = ref('فروشگاه اینترنتی شاواز | لیست محصولات فروشگاه شاواز')
        const runtimeConfig = useRuntimeConfig()

        const {
            productList,
            filterQuery,
            page,
            secondaryData,
            filterForFilter,
            getBreadcrumb,
            breadcrumb,
            query,
            plpTitle,
            description,
            loading,
            selectedLastCategory,
            categoryList,
            parentCategory
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
            getBreadcrumb,
            breadcrumb,
            plpTitle,
            title,
            loading,
            runtimeConfig,
            selectedLastCategory,
            categoryList,
            parentCategory
        } 
    },

    computed: {


        /**
         * BreadCrumb
         */
        breadcrumbList() {
            let breadcrumb = []

            const homeForm = {
                href: '/',
                title: 'خانه'
            }
            breadcrumb.push(homeForm)

            if (this.breadcrumb && this.breadcrumb.length) {
                this.breadcrumb.forEach((item, index) => {
                    const form = {
                        href: this.runtimeConfig.public.siteUrl + item ?.slug,
                        title: item ?.name
                    }

                    if (index === this.breadcrumb.length - 1) {
                        this.pageTitle = item ?.name;
                    }

                    breadcrumb.push(form)
                })
            }
            return breadcrumb
        },

        /** 
         * Return data product list 
         */
        productListData() {
            try {
                return this.productList.data.data.data
            } catch (e) {
                return []
            }
        },

        /** 
         * return PageLength product list for pagination 
         */
        productListPageLength() {
            try {
                return this.productList.data.data.last_page
            } catch (e) {
                return 1
            }
        },

        /** 
         * Return filters on secondaryData slug route 
         */
        productFilterSecondaryData() {
            try {
                return this.secondaryData.data.data.filters
            } catch (e) {
                return []
            }
        },

        /** 
         * Return filters on secondaryData slug route 
         */
        productsSecondaryData() {
            try {
                return this.secondaryData.data.data.products
            } catch (e) {
                return []
            }
        },
        categoryTitle(){
            const selected= this.categoryList.find(element => element.is_selected)
            if (selected) return  this.secondaryData.data.data.parent_category.label
            else return  this.secondaryData.data.data.page.label
        },
      /**
         * Return parent category label
         */
        parentCategoryLabel() {
            try {
              if (this.screenType === 'desktop'){
                return  `دسته بندی ${this.categoryTitle}`
              }
              else{
                return  this.categoryTitle
              }
            } catch (e) {
                return []
            }
        },


    },

    methods: {
        /**
         * Clear filter
         */
        clearFilterQuery() {
            this.filterQuery = []
        },

        /**
         * Filter productList by list type items
         * @param {*} array
         */
        listFiltersModal(array) {
            let query = this.$route.query;
            if (array ?.values) {
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
            if (amount ?.param === "site_price") {
                let site_price_to = ''
                let site_price_from = ''

                if (amount ?.amount ?.from !== null) {
                    site_price_from = amount ?.amount ?.from
                }
                if (amount ?.amount ?.to !== null) {
                    site_price_to = amount ?.amount ?.to
                }

                let query = this.$route.query;

                if (site_price_from && !site_price_to) {
                    this.$router.push({
                        query: {
                            ...query,
                            site_price_from: site_price_from,
                        }
                    })
                } else if (!site_price_from && site_price_to) {
                    this.$router.push({
                        query: {
                            ...query,
                            site_price_to: site_price_to
                        }
                    })
                } else if (site_price_from && site_price_to) {
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

        /**
         * Sort in mobile
         */
        mobileSort(item){
            this.sort(item.value, item.type)
        },

        /**
         * Sort data
         * @param {*} array
         * @param {*} orderType
         */
        sort(order, orderType) {
            this.sortType = order
            this.orderType = orderType
            let query = this.$route.query;
            if (order && orderType) {
                this.$router.push({
                    query: {
                        ...query,
                        order: order,
                        order_type: orderType,
                        page: 1,

                    }

                })
                this.page = 1
            }
        },

        /**
         * Params generator
         * @param {*} array
         */
        async paramGenerator(array) {
            let finalFilterObject = []
            const newObject = Object.create(this.filterQuery)
            if (array ?.param === "stock") {
                let param = ''
                if (array.values) {
                    param = `1`
                } else {
                    param = `0`
                }
                let routeSplit = this.$route.fullPath.split('?')
                let query = this.$route.query;
                if (routeSplit[1]) {
                    if (this.$route.query ?.stock) {
                        if (query) {
                            this.$router.replace({
                                query: {
                                    ...query,
                                    stock: param,
                                    page: 1
                                }
                            })
                        } else {
                            this.$router.push({
                                query: {
                                    stock: param,
                                    page: 1
                                }
                            })
                        }

                    } else {
                        this.$router.replace({
                            query: {
                                ...query,
                                stock: param,
                                page: 1
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
            this.page = 1
        },

        async createQueryForFilter(array) {
            await this.paramGenerator(array)
        },

        /**
         * Back to top on change pagination
         */
        backToTop() {
            this.changePagination()
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        },

        changePagination() {
            let query = this.$route.query;
            this.$router.push({
                query: {
                    ...query,
                    page: this.page,

                }
            })
        }
    },

    beforeCreate() {
        this.$store.commit('set_loadingModal', true);
    },

    mounted() {
        /**
         * Check screen size
         */
        window.innerWidth < 769 ? this.screenType = 'mobile' : this.screenType = 'desktop';
        if (this.$route.query ?.page) {
            this.page = parseInt(this.$route.query.page)
        }

        if(this.$route?.query && this.$route.query?.order && this.$route.query?.order_type){
            this.sortType = this.$route.query?.order
            this.orderType = this.$route.query?.order_type
        }

        /**
         * Check length of filter in first time
         */
        if (Object.keys(this.$route ?.query).length === 0) {
            this.selectedFilterLength = 0
        } else {
          const routeSplit = this.$route?.fullPath.split('?')
          const querySplit = routeSplit[1].split('&')
          this.selectedFilterLength = querySplit.length
            this.selectedFilterLength = Object.keys(this.$route ?.query).length

            Object.keys(this.$route ?.query).forEach(element => {
                if(element === 'order'){
                    this.selectedFilterLength = this.selectedFilterLength - 1
                }

                if(element === 'order_type'){
                    this.selectedFilterLength = this.selectedFilterLength - 1
                }

                if(element === 'page'){
                    this.selectedFilterLength = this.selectedFilterLength - 1
                }
            });
            
        }
    },

    beforeMount() {
        this.getBreadcrumb('category')
    },

    watch: {
        plpTitle(newVal) {
            this.title = newVal
        },

        $route(newVal) {
            if (Object.keys(newVal ?.query).length === 0) {
                this.selectedFilterLength = 0
            } else {
              const routeSplit = this.$route?.fullPath.split('?')
              const querySplit = routeSplit[1].split('&')
              this.selectedFilterLength = querySplit.length

                Object.keys(newVal ?.query).forEach(element => {
                    if(element === 'order'){
                        this.selectedFilterLength = this.selectedFilterLength - 1
                    }

                    if(element === 'order_type'){
                        this.selectedFilterLength = this.selectedFilterLength - 1
                    }

                    if(element === 'page'){
                        this.selectedFilterLength = this.selectedFilterLength - 1
                    }
                });
                
            }
        }
    }
}
</script>
  
<style lang="scss">
@import "~/assets/scss/tools/bp";
@import '~/assets/scss/views/products.scss';
</style>
