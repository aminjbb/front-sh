<template lang="">
<main class="v-product v-product--list">
    <v-container>
        <generalBreadcrumb :items="BreadcrumbItems" />

        <generalProductCategorySlider :items="categoryListMocket" class="mt-5" />

        <v-row class="mt-10">
            <v-col cols="12" md="3">
                <generalProductFilterSideBar
                    :categories="categoryListMocket"
                    :brands="brandsMocket"
                    @selectByCategory="selectByCategory"
                    @selectByBrands="selectByBrands"
                    @changeStatus="showAvailableItems"
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
                    <div class="t14 w400 text-grey number-font">
                        {{splitChar(productList.length)}} کالا
                    </div>
                </div>

                <div class="v-product__contents mt-6">
                    <v-row class="ma-0">
                        <v-col
                            cols="12"
                            md="3"
                            v-for="(item, index) in productListMocket"
                            :key="`card-${index}`"
                            class="v-product__content"
                            >
                            <generalProductCard :content="item" class="mb-4" :hideInfo="true"/>
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
                    discount:'30%'
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
                    discount:'30%'
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
                    discount:'30%'
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
                    discount:'30%'
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
            brands: [],
            brandsMocket: [{
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
        }
    },

    setup(props) {
        const title = ref('فروشگاه اینترنتی شاواز | لیست محصولات فروشگاه شاواز')
        const description = ref(' فروشگاه اینترنتی شاواز، فروشگاه لوازم آرایشی و بهداشتی شاواز ، محصولات آرایشی زنانه، محصولات بهداشتی بانوان* محصولات بهداشتی آقایان،محصولات بهداشتی شخصی')

        useHead({
            title,
            meta: [{
                name: 'description',
                content: description
            }]
        });

    },

    methods: {
        /**
         * Filter productList by category id
         * @param {*} categoryId 
         */
        selectByCategory(categoryId) {
            console.log("🚀 ~ selectCategory ~ categoryId:", categoryId);

            //TODO: Add filter for 'productList'
        },

        /**
         * Filter productList by brands list
         * @param {*} brands 
         */
        selectByBrands(brands) {
            console.log("🚀 ~ selectByBrands ~ brands:", brands);

            //TODO: Add filter for 'productList' by brands
        },

        /**
         * Show available items
         * @param {*} status 
         */
        showAvailableItems(status) {
            console.log("🚀 ~ status:", status);

            //TODO: filter by available items
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
}
</script>

<style lang="scss">
@import "~/assets/scss/tools/bp";
@import '~/assets/scss/views/products.scss';
</style>
