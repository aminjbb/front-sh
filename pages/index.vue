<template>
<main v-if="screenType !== null" class="v-home">
    <template v-if="screenType === 'desktop'">
        <desktopHomeMainSlider :items="mainSliderItems" />
        <v-container>
            <mobileHomeSurprise :content="surprise" />
            <desktopHomeCategoryList :items="categories" />
            <desktopHomeBanner
                :items="banner1"
                col="6"
                class="pt-3" />
            <MobileHomeSection5Slider :content="section5" />

            <generalTabSlider
                :items="section6"
                class="tab-slider1"
                title="پیشنهاد شاواز"
                :componentProps=tabSlider1ComponentProps
                columnHeader />

            <mobileHomeBrands :items="brands" />
            <desktopHomeBanner :items="banner2" col="3" />
            <mobileHomeSection8Slider :items="products" />
            <desktopHomeBanner :items="banner2" col="3" />
            <generalTabSlider
                setRef="tab2"
                :items="section6"
                class="tab-slider2"
                title="جدید‌ترین محصولات"
                componentName="generalMinimalProductCard"
                contentWidth="100%"
                wrapContent
                limit=6 />
            <desktopHomeBanner :items="banner3" col="4" />
            <template v-if="blogs && blogs.length">
                <header class="t20 text-right text-grey-darken-2 pa-3 pb-5">
                    پربازدیدترین مقالات
                </header>
                <v-row>
                    <v-col
                        cols="12"
                        md="3"
                        v-for="(item, index) in blogs"
                        :key="`blogs-${index}`">
                        <mobileHomeBlogCard :content="item" />
                    </v-col>
                </v-row>
            </template>
        </v-container>
    </template>
    <!--  mobile size -->
    <template v-else-if="screenType === 'mobile'">
        <mobileHomeMainSlider :items="mainSliderItems" />

        <v-container class="mobile-no-padd mt-4">
            <mobileHomeSurprise :content="surprise" />
            <mobileHomeCategoryList :items="categories" />
        </v-container>

        <v-container>
            <mobileHomeBanner :items="banner1" />
        </v-container>

        <v-container class="mobile-no-padd mt-4">
            <MobileHomeSection5Slider :content="section5" />
        </v-container>

        <v-container>
            <generalTabSlider
                :items="section6"
                class="tab-slider1"
                title="پیشنهاد شاواز"
                :componentProps=tabSlider1ComponentProps />

            <mobileHomeBrands :items="brands" />
            <mobileHomeBanner :items="banner2" />
            <mobileHomeSection8Slider :items="products" />
            <mobileHomeBanner :items="banner2" />
            
            <generalTabSlider
                setRef="tab2"
                :items="section6"
                class="tab-slider2"
                title="جدید‌ترین محصولات"
                componentName="generalMinimalProductCard"
                contentWidth="1160px"
                wrapContent
                limit=6 />

            <div class="custom-banner">
                <mobileHomeBanner :items="banner3" col="4" />
            </div>

            <template v-if="blogs && blogs.length">
                <header class="t20 text-right text-grey-darken-2 pa-3 pb-5 w500">
                    پربازدیدترین مقالات
                </header>
                <v-row>
                    <v-col
                        cols="12"
                        md="3"
                        v-for="(item, index) in blogs"
                        :key="`blogs-${index}`">
                        <mobileHomeBlogCard :content="item" />
                    </v-col>
                </v-row>
            </template>
        </v-container>
    </template>
</main>
</template>

<script>
export default {
    data() {
        return {
            tabSlider1ComponentProps: {
                hideInfo: true
            },

            screenType: null,
            mainSliderItems: [{
                    id: 'wed',
                    image: '',
                    title: 'اسلاید اول',
                    href: '/'
                },
                {
                    id: 'wesd',
                    image: '',
                    title: 'اسلاید دوم',
                    href: '/'
                },
                {
                    id: 'werd',
                    image: '',
                    title: 'اسلاید ینجم',
                    href: '/'
                },
                {
                    id: 'wewd',
                    image: '',
                    title: 'اسلاید چهارم',
                    href: '/'
                }
            ],
            categories: [{
                    id: 'wed',
                    image: '',
                    title: 'عطر و ادکلن',
                    href: '/'
                },
                {
                    id: 'wesd',
                    image: '',
                    title: 'عطر و ادکلن',
                    href: '/'
                },
                {
                    id: 'werd',
                    image: '',
                    title: 'عطر و ادکلن',
                    href: '/'
                },
                {
                    id: 'wewd',
                    image: '',
                    title: 'عطر و ادکلن',
                    href: '/'
                },
                {
                    id: 'wed',
                    image: '',
                    title: 'عطر و ادکلن',
                    href: '/'
                },
                {
                    id: 'wesd',
                    image: '',
                    title: 'اسلاید دوم',
                    href: '/'
                },
                {
                    id: 'werd',
                    image: '',
                    title: 'عطر و ادکلن',
                    href: '/'
                },
                {
                    id: 'wewd',
                    image: '',
                    title: 'عطر و ادکلن',
                    href: '/'
                },
                {
                    id: 'wed',
                    image: '',
                    title: 'عطر و ادکلن',
                    href: '/'
                },
                {
                    id: 'wesd',
                    image: '',
                    title: 'عطر و ادکلن',
                    href: '/'
                },
                {
                    id: 'werd',
                    image: '',
                    title: 'عطر و ادکلن',
                    href: '/'
                },
                {
                    id: 'wewd',
                    image: '',
                    title: 'عطر و ادکلن',
                    href: '/'
                }
            ],
            banner1: [{
                    id: 'wedd',
                    image: '',
                    title: 'بنر اول',
                    href: '/'
                },
                {
                    id: 'wedd',
                    image: '',
                    title: 'بنر اول',
                    href: '/'
                }
            ],
            banner2: [{
                    id: 'wedd',
                    image: '',
                    title: 'بنر اول',
                    href: '/'
                },
                {
                    id: 'wedd',
                    image: '',
                    title: 'بنر اول',
                    href: '/'
                },
                {
                    id: 'wedd',
                    image: '',
                    title: 'بنر اول',
                    href: '/'
                },
                {
                    id: 'wedd',
                    image: '',
                    title: 'بنر اول',
                    href: '/'
                }
            ],
            banner3: [{
                    id: 'wedd',
                    image: '',
                    title: 'بنر اول',
                    href: '/'
                },
                {
                    id: 'wedd',
                    image: '',
                    title: 'بنر اول',
                    href: '/'
                },
                {
                    id: 'wedd',
                    image: '',
                    title: 'بنر اول',
                    href: '/'
                }
            ],
            products: [{
                    id: 'wedd',
                    image: '',
                    title: 'ماشین اصلاح موی صورت لکسیکال مدل LHC-5631',
                    star: '4.1',
                    href: '/',
                    price: '184.030',
                    old_price: '184.030',
                    new_price: '269,900',
                    discount: '30%',
                    currency: 'تومان'
                },
                {
                    id: 'wedd',
                    image: '',
                    title: 'ماشین اصلاح موی صورت لکسیکال مدل LHC-5631',
                    star: '4.1',
                    href: '/',
                    price: '184.030',
                    old_price: '184.030',
                    new_price: '269,900',
                    discount: '30%',
                    currency: 'تومان'
                },
                {
                    id: 'wedd',
                    image: '',
                    title: 'ماشین اصلاح موی صورت لکسیکال مدل LHC-5631',
                    star: '4.1',
                    href: '/',
                    price: '184.030',
                    old_price: '184.030',
                    new_price: '269,900',
                    discount: '30%',
                    currency: 'تومان'
                },
                {
                    id: 'wedd',
                    image: '',
                    title: 'ماشین اصلاح موی صورت لکسیکال مدل LHC-5631',
                    star: '4.1',
                    href: '/',
                    price: '184.030',
                    old_price: '184.030',
                    new_price: '269,900',
                    discount: '30%',
                    currency: 'تومان'
                },
                {
                    id: 'wedd',
                    image: '',
                    title: 'ماشین اصلاح موی صورت لکسیکال مدل LHC-5631',
                    star: '4.1',
                    href: '/',
                    price: '184.030',
                    old_price: '184.030',
                    new_price: '269,900',
                    discount: '30%',
                    currency: 'تومان'
                },
                {
                    id: 'wedd',
                    image: '',
                    title: 'ماشین اصلاح موی صورت لکسیکال مدل LHC-5631',
                    star: '4.1',
                    href: '/',
                    price: '184.030',
                    old_price: '184.030',
                    new_price: '269,900',
                    discount: '30%',
                    currency: 'تومان'
                },
            ],
            surprise: {
                skus: [{
                        id: 'wedd',
                        image: '',
                        title: 'ماشین اصلاح موی صورت لکسیکال مدل LHC-5631',
                        star: '4.1',
                        href: '/',
                        price: '184.030',
                        old_price: '184.030',
                        new_price: '269,900',
                        discount: '30%',
                        currency: 'تومان'
                    },
                    {
                        id: 'wedd',
                        image: '',
                        title: 'ماشین اصلاح موی صورت لکسیکال مدل LHC-5631',
                        star: '4.1',
                        href: '/',
                        price: '184.030',
                        old_price: '184.030',
                        new_price: '269,900',
                        discount: '30%',
                        currency: 'تومان'
                    },
                    {
                        id: 'wedd',
                        image: '',
                        title: 'ماشین اصلاح موی صورت لکسیکال مدل LHC-5631',
                        star: '4.1',
                        href: '/',
                        price: '184.030',
                        old_price: '184.030',
                        new_price: '269,900',
                        discount: '30%',
                        currency: 'تومان'
                    },
                    {
                        id: 'wedd',
                        image: '',
                        title: 'ماشین اصلاح موی صورت لکسیکال مدل LHC-5631',
                        star: '4.1',
                        href: '/',
                        price: '184.030',
                        old_price: '184.030',
                        new_price: '269,900',
                        discount: '30%',
                        currency: 'تومان'
                    },
                    {
                        id: 'wedd',
                        image: '',
                        title: 'ماشین اصلاح موی صورت لکسیکال مدل LHC-5631',
                        star: '4.1',
                        href: '/',
                        price: '184.030',
                        old_price: '184.030',
                        new_price: '269,900',
                        discount: '30%',
                        currency: 'تومان'
                    },
                    {
                        id: 'wedd',
                        image: '',
                        title: 'ماشین اصلاح موی صورت لکسیکال مدل LHC-5631',
                        star: '4.1',
                        href: '/',
                        price: '184.030',
                        old_price: '184.030',
                        new_price: '269,900',
                        discount: '30%',
                        currency: 'تومان'
                    },
                ],
            },
            brands: [{
                    id: 'wed',
                    image: '',
                    title: 'برند 1',
                    href: '/'
                },
                {
                    id: 'wesd',
                    image: '',
                    title: 'برند 1',
                    href: '/'
                },
                {
                    id: 'werd',
                    image: '',
                    title: 'برند 1',
                    href: '/'
                },
                {
                    id: 'wewd',
                    image: '',
                    title: 'برند 1',
                    href: '/'
                },
                {
                    id: 'wed',
                    image: '',
                    title: 'برند 1',
                    href: '/'
                },
                {
                    id: 'wesd',
                    image: '',
                    title: 'برند 1',
                    href: '/'
                },
                {
                    id: 'werd',
                    image: '',
                    title: 'برند 1',
                    href: '/'
                }
            ],
            blogs: [{
                    id: 'wed',
                    image: '',
                    title: 'بهترین کرم ضدجوش و جای جوش صورت و بدن',
                    href: '/'
                },
                {
                    id: 'wesd',
                    image: '',
                    title: 'چطور  ضد آفتاب با SPF مناسب انتخاب کنم؟',
                    href: '/'
                },
                {
                    id: 'werd',
                    image: '',
                    title: 'تاثیر یوگا بر رشد مو',
                    href: '/'
                },
                {
                    id: 'wewd',
                    image: '',
                    title: 'فرق ریمل اصل و فیک اسنس',
                    href: '/'
                },
            ],
            section5: {
                title: 'مناسب پوست تو',
                sku_groups: [{
                        title: 'پوست چرب',
                        skus: [{
                                id: 'wed',
                                image: '',
                                title: 'بهترین کرم ضدجوش و جای جوش صورت و بدن',
                                href: '/'
                            },
                            {
                                id: 'wesd',
                                image: '',
                                title: 'چطور  ضد آفتاب با SPF مناسب انتخاب کنم؟',
                                href: '/'
                            },
                            {
                                id: 'werd',
                                image: '',
                                title: 'تاثیر یوگا بر رشد مو',
                                href: '/'
                            },
                            {
                                id: 'wewd',
                                image: '',
                                title: 'فرق ریمل اصل و فیک اسنس',
                                href: '/'
                            },
                        ],
                    },
                    {
                        title: 'پوست حساس',
                        skus: [{
                                id: 'wed',
                                image: '',
                                title: 'بهترین کرم ضدجوش و جای جوش صورت و بدن',
                                href: '/'
                            },
                            {
                                id: 'wesd',
                                image: '',
                                title: 'چطور  ضد آفتاب با SPF مناسب انتخاب کنم؟',
                                href: '/'
                            },
                            {
                                id: 'werd',
                                image: '',
                                title: 'تاثیر یوگا بر رشد مو',
                                href: '/'
                            },
                            {
                                id: 'wewd',
                                image: '',
                                title: 'فرق ریمل اصل و فیک اسنس',
                                href: '/'
                            },
                        ],
                    },
                    {
                        title: 'پوست خشک',
                        skus: [{
                                id: 'wed',
                                image: '',
                                title: 'بهترین کرم ضدجوش و جای جوش صورت و بدن',
                                href: '/'
                            },
                            {
                                id: 'wesd',
                                image: '',
                                title: 'چطور  ضد آفتاب با SPF مناسب انتخاب کنم؟',
                                href: '/'
                            },
                            {
                                id: 'werd',
                                image: '',
                                title: 'تاثیر یوگا بر رشد مو',
                                href: '/'
                            },
                            {
                                id: 'wewd',
                                image: '',
                                title: 'فرق ریمل اصل و فیک اسنس',
                                href: '/'
                            },
                        ],
                    }
                ]
            },
            section6: [{
                    id: 'fef',
                    title: 'مراقبت پوست',
                    skus: [{
                            id: 'wedd',
                            image: '',
                            title: 'ماشین اصلاح موی صورت لکسیکال مدل LHC-5631',
                            star: '4.1',
                            href: '/',
                            price: '184.030',
                            old_price: '184.030',
                            new_price: '269,900',
                            discount: '30%',
                            currency: 'تومان'
                        },
                        {
                            id: 'wedd',
                            image: '',
                            title: 'ماشین اصلاح موی صورت لکسیکال مدل LHC-5631',
                            star: '4.1',
                            href: '/',
                            price: '184.030',
                            old_price: '184.030',
                            new_price: '269,900',
                            discount: '30%',
                            currency: 'تومان'
                        },
                        {
                            id: 'wedd',
                            image: '',
                            title: 'ماشین اصلاح موی صورت لکسیکال مدل LHC-5631',
                            star: '4.1',
                            href: '/',
                            price: '184.030',
                            old_price: '184.030',
                            new_price: '269,900',
                            discount: '30%',
                            currency: 'تومان'
                        },
                        {
                            id: 'wedd',
                            image: '',
                            title: 'ماشین اصلاح موی صورت لکسیکال مدل LHC-5631',
                            star: '4.1',
                            href: '/',
                            price: '184.030',
                            old_price: '184.030',
                            new_price: '269,900',
                            discount: '30%',
                            currency: 'تومان'
                        },
                        {
                            id: 'wedd',
                            image: '',
                            title: 'ماشین اصلاح موی صورت لکسیکال مدل LHC-5631',
                            star: '4.1',
                            href: '/',
                            price: '184.030',
                            old_price: '184.030',
                            new_price: '269,900',
                            discount: '30%',
                            currency: 'تومان'
                        },
                        {
                            id: 'wedd',
                            image: '',
                            title: 'ماشین اصلاح موی صورت لکسیکال مدل LHC-5631',
                            star: '4.1',
                            href: '/',
                            price: '184.030',
                            old_price: '184.030',
                            new_price: '269,900',
                            discount: '30%',
                            currency: 'تومان'
                        },
                        {
                            id: 'wedd',
                            image: '',
                            title: 'ماشین اصلاح موی صورت لکسیکال مدل LHC-5631',
                            star: '4.1',
                            href: '/',
                            price: '184.030',
                            old_price: '184.030',
                            new_price: '269,900',
                            discount: '30%',
                            currency: 'تومان'
                        }
                    ],
                },
                {
                    title: 'مراقبت مو',
                    id: 'feedef',
                    skus: [{
                            id: 'wedd',
                            image: '',
                            title: 'ماشین اصلاح موی صورت لکسیکال مدل LHC-5631',
                            star: '4.1',
                            href: '/',
                            price: '184.030',
                            old_price: null,
                            new_price: null,
                            discount: null,
                            currency: 'تومان'
                        },
                        {
                            id: 'wedd',
                            image: '',
                            title: 'ماشین اصلاح موی صورت لکسیکال مدل LHC-5631',
                            star: '4.1',
                            href: '/',
                            price: '184.030',
                            old_price: null,
                            new_price: null,
                            discount: null,
                            currency: 'تومان'
                        },
                        {
                            id: 'wedd',
                            image: '',
                            title: 'ماشین اصلاح موی صورت لکسیکال مدل LHC-5631',
                            star: '4.1',
                            href: '/',
                            price: '184.030',
                            old_price: null,
                            new_price: null,
                            discount: null,
                            currency: 'تومان'
                        },
                        {
                            id: 'wedd',
                            image: '',
                            title: 'ماشین اصلاح موی صورت لکسیکال مدل LHC-5631',
                            star: '4.1',
                            href: '/',
                            price: '184.030',
                            old_price: null,
                            new_price: null,
                            discount: null,
                            currency: 'تومان'
                        },
                        {
                            id: 'wedd',
                            image: '',
                            title: 'ماشین اصلاح موی صورت لکسیکال مدل LHC-5631',
                            star: '4.1',
                            href: '/',
                            price: '184.030',
                            old_price: '184.030',
                            new_price: '269,900',
                            discount: '30%',
                            currency: 'تومان'
                        }
                    ],
                },
                {
                    title: 'آرایش صورت',
                    id: 'trt',
                    skus: [{
                            id: 'wedd',
                            image: '',
                            title: 'ماشین اصلاح موی صورت لکسیکال مدل LHC-5631',
                            star: '4.1',
                            href: '/',
                            price: '184.030',
                            old_price: '184.030',
                            new_price: '269,900',
                            discount: '30%',
                            currency: 'تومان'
                        },
                        {
                            id: 'wedd',
                            image: '',
                            title: 'ماشین اصلاح موی صورت لکسیکال مدل LHC-5631',
                            star: '4.1',
                            href: '/',
                            price: '184.030',
                            old_price: '184.030',
                            new_price: '269,900',
                            discount: '30%',
                            currency: 'تومان'
                        },
                        {
                            id: 'wedd',
                            image: '',
                            title: 'ماشین اصلاح موی صورت لکسیکال مدل LHC-5631',
                            star: '4.1',
                            href: '/',
                            price: '184.030',
                            old_price: '184.030',
                            new_price: '269,900',
                            discount: '30%',
                            currency: 'تومان'
                        },
                        {
                            id: 'wedd',
                            image: '',
                            title: 'ماشین اصلاح موی صورت لکسیکال مدل LHC-5631',
                            star: '4.1',
                            href: '/',
                            price: '184.030',
                            old_price: '184.030',
                            new_price: '269,900',
                            discount: '30%',
                            currency: 'تومان'
                        },
                        {
                            id: 'wedd',
                            image: '',
                            title: 'ماشین اصلاح موی صورت لکسیکال مدل LHC-5631',
                            star: '4.1',
                            href: '/',
                            price: '184.030',
                            old_price: '184.030',
                            new_price: '269,900',
                            discount: '30%',
                            currency: 'تومان'
                        }
                    ],
                },
                {
                    title: 'آرایش چشم',
                    id: 'uju',
                    skus: [{
                            id: 'wedd',
                            image: '',
                            title: 'ماشین اصلاح موی صورت لکسیکال مدل LHC-5631',
                            star: '4.1',
                            href: '/',
                            price: '184.030',
                            old_price: '184.030',
                            new_price: '269,900',
                            discount: '30%',
                            currency: 'تومان'
                        },
                        {
                            id: 'wedd',
                            image: '',
                            title: 'ماشین اصلاح موی صورت لکسیکال مدل LHC-5631',
                            star: '4.1',
                            href: '/',
                            price: '184.030',
                            old_price: '184.030',
                            new_price: '269,900',
                            discount: '30%',
                            currency: 'تومان'
                        },
                        {
                            id: 'wedd',
                            image: '',
                            title: 'ماشین اصلاح موی صورت لکسیکال مدل LHC-5631',
                            star: '4.1',
                            href: '/',
                            price: '184.030',
                            old_price: '184.030',
                            new_price: '269,900',
                            discount: '30%',
                            currency: 'تومان'
                        },
                        {
                            id: 'wedd',
                            image: '',
                            title: 'ماشین اصلاح موی صورت لکسیکال مدل LHC-5631',
                            star: '4.1',
                            href: '/',
                            price: '184.030',
                            old_price: '184.030',
                            new_price: '269,900',
                            discount: '30%',
                            currency: 'تومان'
                        },
                        {
                            id: 'wedd',
                            image: '',
                            title: 'ماشین اصلاح موی صورت لکسیکال مدل LHC-5631',
                            star: '4.1',
                            href: '/',
                            price: '184.030',
                            old_price: '184.030',
                            new_price: '269,900',
                            discount: '30%',
                            currency: 'تومان'
                        }
                    ],
                },
                {
                    title: 'آرایش لب',
                    id: 'oiu',
                    skus: [{
                            id: 'wedd',
                            image: '',
                            title: 'ماشین اصلاح موی صورت لکسیکال مدل LHC-5631',
                            star: '4.1',
                            href: '/',
                            price: '184.030',
                            old_price: '184.030',
                            new_price: '269,900',
                            discount: '30%',
                            currency: 'تومان'
                        },
                        {
                            id: 'wedd',
                            image: '',
                            title: 'ماشین اصلاح موی صورت لکسیکال مدل LHC-5631',
                            star: '4.1',
                            href: '/',
                            price: '184.030',
                            old_price: '184.030',
                            new_price: '269,900',
                            discount: '30%',
                            currency: 'تومان'
                        },
                        {
                            id: 'wedd',
                            image: '',
                            title: 'ماشین اصلاح موی صورت لکسیکال مدل LHC-5631',
                            star: '4.1',
                            href: '/',
                            price: '184.030',
                            old_price: '184.030',
                            new_price: '269,900',
                            discount: '30%',
                            currency: 'تومان'
                        },
                        {
                            id: 'wedd',
                            image: '',
                            title: 'ماشین اصلاح موی صورت لکسیکال مدل LHC-5631',
                            star: '4.1',
                            href: '/',
                            price: '184.030',
                            old_price: '184.030',
                            new_price: '269,900',
                            discount: '30%',
                            currency: 'تومان'
                        },
                        {
                            id: 'wedd',
                            image: '',
                            title: 'ماشین اصلاح موی صورت لکسیکال مدل LHC-5631',
                            star: '4.1',
                            href: '/',
                            price: '184.030',
                            old_price: '184.030',
                            new_price: '269,900',
                            discount: '30%',
                            currency: 'تومان'
                        }
                    ],
                },
                {
                    title: 'بهداشت شخصی',
                    id: 'qqw',
                    skus: [{
                            id: 'wedd',
                            image: '',
                            title: 'ماشین اصلاح موی صورت لکسیکال مدل LHC-5631',
                            star: '4.1',
                            href: '/',
                            price: '184.030',
                            old_price: '184.030',
                            new_price: '269,900',
                            discount: '30%',
                            currency: 'تومان'
                        },
                        {
                            id: 'wedd',
                            image: '',
                            title: 'ماشین اصلاح موی صورت لکسیکال مدل LHC-5631',
                            star: '4.1',
                            href: '/',
                            price: '184.030',
                            old_price: '184.030',
                            new_price: '269,900',
                            discount: '30%',
                            currency: 'تومان'
                        },
                        {
                            id: 'wedd',
                            image: '',
                            title: 'ماشین اصلاح موی صورت لکسیکال مدل LHC-5631',
                            star: '4.1',
                            href: '/',
                            price: '184.030',
                            old_price: '184.030',
                            new_price: '269,900',
                            discount: '30%',
                            currency: 'تومان'
                        },
                        {
                            id: 'wedd',
                            image: '',
                            title: 'ماشین اصلاح موی صورت لکسیکال مدل LHC-5631',
                            star: '4.1',
                            href: '/',
                            price: '184.030',
                            old_price: '184.030',
                            new_price: '269,900',
                            discount: '30%',
                            currency: 'تومان'
                        },
                        {
                            id: 'wedd',
                            image: '',
                            title: 'ماشین اصلاح موی صورت لکسیکال مدل LHC-5631',
                            star: '4.1',
                            href: '/',
                            price: '184.030',
                            old_price: '184.030',
                            new_price: '269,900',
                            discount: '30%',
                            currency: 'تومان'
                        }
                    ],
                },
            ]
        }
    },

    mounted() {
        /**
         * Check screen size
         */
        window.innerWidth < 769 ? this.screenType = 'mobile' : this.screenType = 'desktop';
    },
}
</script>
