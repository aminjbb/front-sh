<template>
<main class="v-product v-product--list">
    <h1 class="v-hide">{{ title }}</h1>

    <v-container>
        <v-row class="mt-10">
            <v-col cols="12">
                <template v-if="screenType === 'desktop'">
                    <div class="v-product__filter d-flex pt-1 align-center justify-space-between">
                        <nav class="d-flex align-center flex-grow-1">
                            <div class="pl-4">
                                <v-icon icon="mdi-sort-ascending" color="grey-darken-1" />
                                <span class="t14 w400 text-grey-darken-1">مرتب‌سازی بر اساس:</span>
                            </div>

                            <ul class="v-product__filter__items d-flex align-center">
                                <li class="t14 w400 px-4" :class="(sortType=== 'created_at' && orderType === 'desc') ? 'text-primary' : 'text-grey' " @click="sort('created_at', 'desc')">جدیدترین</li>
                                <li class="t14 w400 px-4" :class="(sortType=== 'site_price' && orderType === 'asc') ? 'text-primary' : 'text-grey' " @click="sort('site_price', 'asc')">ارزان‌ترین</li>
                                <li class="t14 w400 px-4" :class="(sortType=== 'site_price' && orderType === 'desc') ? 'text-primary' : 'text-grey' " @click="sort('site_price', 'desc')">گران‌ترین</li>
                                <li class="t14 w400 px-4" :class="(sortType=== 'discount' && orderType ===  'desc') ? 'text-primary' : 'text-grey' " @click="sort('discount', 'desc')">بیشترین تخفیف</li>
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
            filters: [],
            screenType: null,
            sortType:'',
            orderType: ''
        }
    },

    setup(props) {
        const title = ref('فروشگاه اینترنتی شاواز | جستجو در شاواز')
        const description = ref(' فروشگاه اینترنتی شاواز، فروشگاه لوازم آرایشی و بهداشتی شاواز ، محصولات آرایشی زنانه، محصولات بهداشتی بانوان* محصولات بهداشتی آقایان،محصولات بهداشتی شخصی')

        const {
            productList,
            filterQuery,
            page,
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
            query
        }
    },

    computed: {
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

    methods: {

      /**
       * Sort data
       * @param {*} order 
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
                        order_type: orderType

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
        }
    }
}
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";
@import '~/assets/scss/views/products.scss';
</style>
