<template>
<main class="v-product v-product--list">
    <h1 class="v-hide">{{title}}</h1>

    <v-container>
        <generalBreadcrumb :items="BreadcrumbItems" />

        <generalProductCategorySlider :items="categoryListMocket" class="mt-5" />

        <v-row class="mt-10">
            <v-col cols="12" md="3">
                <template v-if="screenType === 'desktop'">
                    <generalProductFilterSideBar
                        :filterList="filtersMocket"
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

    setup(props) {
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
        /* return {productList, filterQuery, page , getSecondaryData , secondaryData} */
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
            console.log("🚀 ~ selectFiltersModal:", array);

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
        },

        selectSort(obj) {
            console.log("🚀 ~ selectSort:", obj);

            //TODO: Sort items in mobile
        }

    },

    mounted() {
        /**
         * Check screen size
         */
        window.innerWidth < 769 ? this.screenType = 'mobile' : this.screenType = 'desktop';
    },

    beforeMount() {
        /* this.getSecondaryData() */
    }
}
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";
@import '~/assets/scss/views/products.scss';
</style>
