<template>
<main class="v-product v-product--list">
  <h1 class="v-hide">{{ title }}</h1>
  <v-container v-show="loading">
    <v-row justify="start">
      <v-col cols="4">
        <v-skeleton-loader
            :loading="loading"
            type="text"/>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12">
        <div class="v-product__contents">
          <div class="px-2">
            <v-row>
              <v-col
                  v-for="card in 12"
                  :key="card"
                  cols="12"
                  lg="3">
                <v-skeleton-loader
                    :loading="loading"
                    height="240"
                    type="image, list-item-two-line"
                >
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
          </div>
        </div>

        <div class="v-product__pagination d-flex justify-center mt-8">
          <v-row justify="center">
            <v-col v-for="num in 6" :key="num" cols="1">
              <v-skeleton-loader
                  class="mx-auto"
                  max-width="100"
                  type="button"/>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>

  <v-container v-show="!loading">
    <generalBreadcrumb :items="breadcrumbList" />
    <v-row class="mt-10">
      <v-col cols="12">
        <div class="v-product__contents" :class="screenType === 'desktop' ? 'mt-6' : ''">
          <v-row v-if="productListData?.length" class="ma-0">
            <v-col
                cols="12"
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
                  :sectionName = "`لیست کالاهای ${plpTitle}`"
                  :categoryName = "category"
                  :showColors="true" />
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
                    href: '/'
                },
                {
                    title: 'آرایش صورت',
                    href: '/products'
                }
            ],
            productList: [],
            filters: [],
            screenType: null,
            category:null
        }
    },

    setup() {
        const title = ref('فروشگاه اینترنتی شاواز | لیست محصولات فروشگاه شاواز')
        const {
            productList,
            page,
            query,
            getBreadcrumb ,
            breadcrumb,
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
            page,
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
    },

    methods:{
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
        this.getBreadcrumb('skugroup')
    },

    watch: {
        page(val) {
            let query = this.$route.query;
            if (val) {
                this.$router.push({
                    query: {
                        ...query,
                        page: val
                    }
                })
            }
        },

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
        }
    }
}
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";
@import '~/assets/scss/views/products.scss';
</style>
