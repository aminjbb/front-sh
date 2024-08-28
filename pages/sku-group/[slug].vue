<template>
<main class="v-product v-product--list">
    <v-container v-show="loading">
        <generalSkeletonPlpNoFilter :loading="loading" />
    </v-container>

    <v-container v-show="!loading" class="main-col">
        <generalBreadcrumb :items="breadcrumbList" />
        <v-row>
            <v-col cols="12">
                <div class="v-product__contents" :class="screenType === 'desktop' ? 'mt-6' : ''">
                    <v-row v-if="productListData?.length" class="ma-0">
                        <v-col cols="6" md="3" v-for="(item, index) in productListData" :key="`card-${index}`" class="v-product__content d-flex">
                            <generalProductCard :content="item" :lazy=false class="mb-4 flex-grow-1" :hideInfo="true" :isPLP="true" :index="index + 1" showBasket :sectionName="`لیست کالاهای ${plpTitle}`" :categoryName="category" :showColors="true" />
                        </v-col>
                    </v-row>
                </div>

                <div class="v-product__pagination d-flex justify-center mt-8 w-100">
                    <v-pagination v-model="page" :length="productListPageLength" size="40" :total-visible="6" @click="backToTop" prev-icon="mdi-chevron-right" next-icon="mdi-chevron-left" />
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
            productList: [],
            filters: [],
            screenType: null,
            category: null
        }
    },

    setup() {
        const title = ref('فروشگاه اینترنتی شاواز | لیست محصولات فروشگاه شاواز')
        const runtimeConfig = useRuntimeConfig()

        const {
            productList,
            page,
            query,
            getBreadcrumb,
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
            getBreadcrumb,
            breadcrumb,
            plpTitle,
            title,
            loading,
            runtimeConfig
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
                        this.title = item ?.name
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
         * Return PageLength product list for pagination 
         */
        productListPageLength() {
            try {
                return this.productList.data.data.last_page
            } catch (e) {
                return 1
            }
        },
    },

    methods: {
        /**
         * Back to top on change pagination
         */
        backToTop() {
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

        if (this.$route.query ?.page) {
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
    }
}
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";
@import '~/assets/scss/views/products.scss';
</style>
