<template>
    <mobileHeaderPlp v-if="screenType === 'mobile'" :pageTitle="plpTitle" />
    
    <main class="v-product v-product--list">
        <h1 class="v-hide">{{ title }}</h1>
    
        <v-container v-show="loading">
            <generalSkeletonPlpNoFilter :loading="loading" hideText />
        </v-container>
    
        <v-container v-show="!loading">
            <v-row v-if="screenType === 'desktop'">
                <v-col cols="6" class="d-flex align-center">
                    <div class="t18 w700 text-sGrayDarken2">{{ plpTitle }}</div>
                </v-col>
            </v-row>
    
            <v-row :class="screenType === 'desktop' ? 'mt-3' : ''">
                <div class="v-product__contents" :class="screenType === 'desktop' ? 'mt-6' : ''">
                    <v-row v-if="productListData?.length" class="ma-0">
                        <v-col cols="6" md="3" v-for="(item, index) in productListData" :key="`card-${index}`" class="v-product__content d-flex">
                            <generalProductCard :content="item" :lazy=false :shps="item.id" class="mb-4 flex-grow-1" :hideInfo="true" :isPLP="true" showBasket :index="index + 1" :sectionName="`${plpTitle}لیست کالاهای`" :showColors="true" />
                        </v-col>
                    </v-row>
                </div>
    
                <div class="v-product__pagination d-flex justify-center mt-8 w-100">
                    <v-pagination v-model="page" :length="productListPageLength" size="40" :total-visible="6" @click="backToTop" prev-icon="mdi-chevron-right" next-icon="mdi-chevron-left" />
                </div>
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
                screenType: null
            }
        },
    
        setup() {
            const title = ref('فروشگاه اینترنتی شاواز | لیست محصولات ')
            const {
                productList,
                page,
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
                page,
                query,
                plpTitle,
                title,
                loading
            }
        },
    
        computed: {
            /** return data product list  **/
            productListData() {
                try {
                    return this.productList.data.data.shps.data
                } catch (e) {
                    return []
                }
            },
            /** return PageLength product list for pagination **/
            productListPageLength() {
                try {
                    return this.productList.data.data ?.shps ?.last_page
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
    
            plpTitle(newVal) {
                this.title = 'فروشگاه اینترنتی شاواز | ' + newVal
            }
        }
    }
    </script>
    
    <style lang="scss">
    @import "~/assets/scss/tools/bp";
    @import '~/assets/scss/views/products.scss';
    </style>
    