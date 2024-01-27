<template lang="">
<main class="v-product v-product--single">
    <h1 class="v-hide">{{title}}</h1>

    <v-container>
        <generalBreadcrumb :items="BreadcrumbItems" />
        <v-row>
            <v-col
                class="pa-3"
                cols="12"
                lg="5">
                <generalProductSingleImageGallery :items="contentMocket.images" :imageAlt="contentMocket.label" />
            </v-col>

            <v-col
                class="pa-3"
                cols="12"
                lg="7">
                <generalProductSingleDetails :content="contentMocket" />
                <template v-if="screenType !== null && screenType === 'desktop'">
                    <v-row class="v-product--single__border ma-0 px-1 mt-5">
                        <v-col md="7" lg="8">
                            <desktopProductSingleSelectedSeller :content="selectedSellerMoc" />
                        </v-col>
                        <v-col md="5" lg="4">
                            <generalAddToBasket :content="selectedSellerMoc" />
                        </v-col>
                    </v-row>
                </template>

                <template v-else-if="screenType !== null && screenType === 'mobile'">
                    <v-row class="v-product--single__border ma-0 px-1 mt-5">
                        <v-col md="7" lg="8">
                            <mobileProductSingleSelectedSeller :content="selectedSellerMoc" :sellers="contentMocket.sellers" />
                        </v-col>
                    </v-row>
                </template>
            </v-col>
        </v-row>

        <template v-if="screenType !== null && screenType === 'desktop'">
            <generalAboutOurValues class="v-product--single__values ma-0 mt-5" />

            <div class="v-product--single__border mt-5" id="seller-list">
                <template v-for="(seller, index) in contentMocket.sellers" :key="`seller${index}`">
                    <generalProductSingleSellerCard :seller="seller" />
                    <v-divider v-if="index +1 < contentMocket.sellers.length" color="grey" />
                </template>
            </div>
        </template>

        <mobileHomeSection8Slider
            class="mt-5 pb-3"
            :items="relatedProductsMocket"
            title="محصولات مشابه"
            hideIndex
            navigation />

        <generalProductSingleCompleteDetails
            :description="contentMocket.details.general"
            :attrs="contentMocket.descAttrs"
            :instructions="contentMocket.details.instructions"
            :advantages="contentMocket.details.advantages"
            :disadvantages="contentMocket.details.disadvantages" />

        <v-divider color="grey" class="mt-5" />

        <generalProductSingleComments :comments="contentMocket.comments" />

        <template v-if="screenType !== null && screenType === 'mobile'">
            <div class="mobile-basket">
                <generalAddToBasket
                    :content="selectedSellerMoc"
                    revers="revers"
                    :mdCols="['6','6']"
                    :smCols="['4','8']" />
            </div>
        </template>

    </v-container>
</main>
</template>

<script>
export default {
    data() {
        return {
            screenType: null,
            BreadcrumbItems: [{
                    title: 'لوازم آرایشی',
                    /* Should be main category */
                    href: '/'
                },
                {
                    title: 'آرایش چشم',
                    /* Should be sub category */
                    href: '/products'
                },
                {
                    title: 'سایه چشم',
                    /* Should be sub category */
                    href: '/products'
                }
            ],
            content: null,
            contentMocket: {
                label: 'پالت سایه چشم 32 رنگ رولوشن مدل Flawless 3 Resurrection',
                name: 'Revolution Flawless 3 Resurrection Eye Shadow Palette',
                starNumber: 4.5,
                numberOfVotes: 217,
                images: [{
                        image_url: 'product2.png',
                    },
                    {
                        image_url: 'product2.png',
                    },
                    {
                        image_url: 'products.jpg',
                    },
                    {
                        image_url: 'product2.png',
                    },
                    {
                        image_url: 'product2.png',
                    },
                    {
                        image_url: 'product2.png',
                    },
                    {
                        image_url: 'product2.png',
                    },
                ],
                colors: [{
                        code: '#A81199',
                        label: 'ارغوانی',
                        id: 1
                    },
                    {
                        code: '#C90000',
                        label: 'آلبالویی',
                        id: 2
                    },
                    {
                        code: '#FFBBCF',
                        label: 'صورتی',
                        id: 3
                    },
                    {
                        code: '#FD4A4A',
                        label: 'نارنجی',
                        id: 4
                    },
                    {
                        code: '#AA483B',
                        label: 'قهوه ای',
                        id: 5
                    },
                    {
                        code: '#FFE4E4',
                        label: 'نود',
                        id: 6
                    }
                ],
                titleAttrs: [{
                        type: 'سازگار با پوست',
                        value: 'معمولی'
                    },
                    {
                        type: 'جلوه رنگ',
                        value: 'مات'
                    }
                ],
                descAttrs: [{
                        label: 'حجم',
                        value: '50 میلی لیتر'
                    },
                    {
                        label: 'نوع',
                        value: 'چند رنگ'
                    },
                    {
                        label: 'جلوه رنگ',
                        value: 'مات'
                    },
                    {
                        label: 'سازگار با پوست',
                        value: 'معمولی'
                    },
                ],
                sellers: [{
                        name: 'پخش رخسار',
                        stock: false,
                        discount: '30%',
                        customer_price: 184030,
                        site_price: 269900,
                        count: 5,
                    },
                    {
                        name: 'زیبارویان',
                        stock: true,
                        discount: null,
                        customer_price: 289300,
                        site_price: null,
                        count : 0,
                    },
                    {
                        name: 'شاواز',
                        stock: true,
                        discount: null,
                        customer_price: 291000,
                        site_price: null,
                        count:100,
                    }
                ],
                details: {
                    general: '<div>آبرسانی فوق العاده به پوست</div><div>مناسب پوست معمولی تا مختلط</div><div>فوق سبک</div><div>فاقد الکل و چربی</div><div>ماندگاری 24 ساعته</div>',
                    instructions: 'فواید استفاده از محصولات آبرسان شاید این سوال برای شما هم پیش آمده باشد که فایده استفاده از محصولات آبرسان برای پوست چیست و این محصولات چه عملکردی روی پوست دارد؟ محصولات آبرسان سبب تأمین رطوبت برای پوست شده و یا از خروج رطوبت موجود در بافت پوست جلوگیری می‌کند و به سبب همین ویژگی امروزه به یکی از پرکاربرد ترین محصولات مراقبت پوستی تبدیل شده است. استفاده از آب روی پوست و یا نوشیدن زیاد مایعات با وجود اینکه یکی از عوامل تأمین رطوبت برای پوست است اما استفاده تنها از آن برای پوست کافی نیست. توجه به این نکته ضروری است که کاربرد محصولات مرطوب کننده و آبرسان مشابه یکدیگر نبوده و باید از هرکدام از آن‌ها با توجه به نیاز پوستی استفاده کرد. امروزه واتر ژل نوتروژینا یکی از محبوب‌ترین محصولات آبرسان است که به دلیل کیفیت بالا، تبدیل به یکی از پرفروش‌ترین محصولات حال حاضر تبدیل شده است.نحوه عملکرد آبرسان بر پوست همه افراد باید به این نکته توجه داشته باشند که تنها افراد با پوست خشک نیازمند به استفاده از محصولات پوستی نیستند، بلکه همه انواع پوستی چرب، نرمال یا مختلظ نیز باید از محصولات مراقبتی پوست استفاده کنند تا دچار مشکلات پوستی نظیر چین و چروک، پیری زودرس و یا موارد مشابه نشوند. مهم‌ترین عملکرد آبرسان نگهداری رطوبت در سطح پوست و یا جذب رطوبت از هوای اطراف است. پس استفاده از محصولات آبرسان‌ نظیر واتر ژل آبرسان نوتروژینا برای حفظ رطوبت موردنیاز در پوست لازم و ضروری است.',
                    advantages: '<ul><li>بستن منافذ باز</li><li>سازگار با انواع پوست</li><li>رفع چین و چروک های غیر عمیق دور لب</li></ul>',
                    disadvantages: '<ul><li>عدم استفاده دور چشم</li><li>نامناسب برای استفاده روزانه و امکان ایجاد خشکی در صورت عدم رعایت</li></ul>',
                },
                comments: [{
                        id: 1,
                        author: 'نگین اسدی',
                        message: 'هرچقدر از خوشگلی این سایه بگم کمههههه یه شاین خیلی ریز روش داره وقتی استفاده کنید به لایه ی مات می‌رسید رنگ آبی و زردش محشرنننننن پیشنهاد میکنم',
                        date: '۱۹ اردیبهشت ۱۴۰۱'
                    },
                    {
                        id: 1,
                        author: 'نگین اسدی',
                        message: 'محشرهههههه',
                        date: '۱۹ اردیبهشت ۱۴۰۱'
                    },
                    {
                        id: 1,
                        author: 'نگین اسدی',
                        message: 'خیلی بده... اصلا پخش نمیشه',
                        date: '۱۹ اردیبهشت ۱۴۰۱'
                    },
                    {
                        id: 1,
                        author: 'نگین اسدی',
                        message: 'محشرهههههه',
                        date: '۱۹ اردیبهشت ۱۴۰۱'
                    }, {
                        id: 1,
                        author: 'نگین اسدی',
                        message: 'هرچقدر از خوشگلی این سایه بگم کمههههه یه شاین خیلی ریز روش داره وقتی استفاده کنید به لایه ی مات می‌رسید رنگ آبی و زردش محشرنننننن پیشنهاد میکنم',
                        date: '۱۹ اردیبهشت ۱۴۰۱'
                    },
                    {
                        id: 1,
                        author: 'نگین اسدی',
                        message: 'خیلی بده... اصلا پخش نمیشه',
                        date: '۱۹ اردیبهشت ۱۴۰۱'
                    }
                ]
            },
            selectedSeller: null,
            /** cheaper seller or selected seller*/
            selectedSellerMoc: {
                name: 'پخش رخسار',
                stock: true,
                discount: '30%',
                customer_price: 184030,
                site_price: 269900,
                count: 5,
            },
            relatedProducts: [],
            relatedProductsMocket: [{
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

<style lang="scss">
@import "~/assets/scss/tools/bp";
@import '~/assets/scss/views/products.scss';
</style>
