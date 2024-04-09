<template>
<main class="v-faq">
    <h1 class="ov-h h-0">سوالات متداول</h1>

    <v-container>
        <generalBreadcrumb :items="BreadcrumbItems" />

        <v-expansion-panels class="accordion" variant="inset">
            <v-expansion-panel v-for="faq in faqList" :key="faq.id">
                <v-expansion-panel-title class="accordion__header">
                    <h2 class="pa-a ma-0 t13 w500 text-grey-darken-2"> {{faq.title}}</h2>
                </v-expansion-panel-title>

                <v-expansion-panel-text class="accordion__items__content">
                    <p class="pa-a ma-0 t14 w400 l27 text-grey-darken-3">
                        {{faq.text}}
                    </p>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-container>
</main>
</template>

<script>
export default {
    data() {
        return {
            BreadcrumbItems: [{
                    title: 'خانه',
                    href: '/'
                },
                {
                    title: 'سوالات متدوال',
                    href: '/faq'
                }
            ]
        }
    },

    setup() {
        const runtimeConfig = useRuntimeConfig()
        const title = ref('فروشگاه اینترنتی شاواز | سوالات متداول')
        const description = ref("سوالات متداول و پرسش های پرتکرار از فروشگاه اینترنتی شاواز")

        const faqList = [{
                id: '1',
                title: 'برای مرجوع کردن سفارشم چه کاری انجام دهم؟',
                text: 'اگر از دریافت سفارشتان بیش از 7 روز نگذشته باشد و بسته بندی و پلمپ محصول باز نشده باشد می‌توانید، وارد پروفایل خود شوید و از قسمت لیست سفارشات، به قسمت تحویل داده شده روید و در مشاهده جزیات هر سفارش، میتوانید درخواست مرجوعی دهید. در قسمت مرجوعی علت و توضیحات و تصویر یا ویدیو کالای مد نظر رو میتونید اضافه کنید.'
            },
            {
                id: '2',
                title: 'از چه طریق می‌توانم سفارشم را پیگیری کنم?',
                text: 'در قسمت لیست سفارشات میتوانید سفارشات در حال پردازش، در حال ارسال و تحویل داده شده را ببنیند. در قسمت جزییات سفارش، رهگیری مرسوله وجود دارد. در این قسمت کد مرسوله و وضعیت و تاریخ قابل مشاهده است.چنانچه از آخرین وضعیت سفارش خود ناراضی بودید و یا سوالات بیشتری داشتید می توانید از قسمت درخواست پشتیبانی در پروفایل کاربری خود تیکت پشتیبانی ثبت نمایید.'
            },
            {
                id: '3',
                title: ' محصولی که خریدم چقدر تاریخ مصرف دارد؟',
                text: 'تمام محصولات در شاواز  دارای ضمانت تاریخ انقضا هستند و می تونید با خیال راحت سفارشتون را ثبت کنید.'
            },
            {
                id: '4',
                title: 'سفارشم چند روزه به دستم می‌رسد؟',
                text: 'زمان ارسال تا تحویل سفارش در شاواز از 5 الی 8 روز کاری است.'
            },
            {
                id: '5',
                title: 'چجوری از کد تخفیفم استفاده کنم؟',
                text: 'بعد از تکمیل سبد خرید و در قسمت انتخاب روش پرداختُ کد تخفیف را وارد می نمایید'
            },
            {
                id: '6',
                title: 'هزینه ارسال سفارش چقدر است؟',
                text: 'هزینه ارسال برای سراسر کشور 35000 تومان است'
            },
            {
                id: '7',
                title: 'آیا محصولات موجود در سایت دارای اصالت هستند؟',
                text: 'شاواز اصالت محصولات موجود در سایت را تضمین می کند.'
            },
            {
                id: '8',
                title: 'چطور می‌توانم سفارشم رو ثبت کنم؟',
                text: ' قبل از ثبت سفارش در شاواز ثبت نام کنید و با افزدون کالای موردنظر خود به سبد خرید، از طریق علامت سبد در بالای صفحه، وارد سبد خرید خود شوید. سپس با کلیک روی گزینه ادامه فرایند خرید، به بخش انتخاب آدرس وارد می شوید. پس از تکمیل آدرس و ادامه فرایند خرید، می‌توانید روش پرداخت خود را انتخاب کرده و خرید خود را ثبت کنید.'
            },
            {
                id: '9',
                title: 'چطور میتوانم سفارشم رو ویرایش کنم؟',
                text: 'حذف محصول از سبد خرید تنها تا قبل از مرحله پردازش سفارش امکان پذیر است.مبلغ کالای حذف شده نیز در کیف پول شما در سایت شاواز اضافه می‌شود.'
            },
            {
                id: '10',
                title: 'روش پرداخت سفارش به چه صورت است؟',
                text: 'پرداخت سفارش‌ها در شاواز فقط به صورت آنلاین و کیف پول بوده و در حال حاضر امکان پرداخت درب منزل وجود ندارد.'
            }

        ];

        const faqArray = []
        faqList.forEach(item => {
            const obj = {
                "@type": "Question",
                "name": item.title,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": item.text
                }
            }
            faqArray.push(obj);
        });
        /**Schema - structured data */
        const structureData = {
            "@context": "http://schema.org/",
            "@graph": [{
                    "@context": "http://schema.org/",
                    "@type": "Organization",
                    "name": "shavaz",
                    "url": "https://shavaz.com/",
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "بزرگراه باکری جنوب کوی ارم خیابان شهیدمحسن یعقوبی(بهار جنوبی) نبش کوچه شهید اکبر اصغر زاده پلاک 18",
                        "addressLocality": "Tehran",
                        "addressRegion": "Tehran",
                        "postalCode": "1484633439",
                        "addressCountry": "Iran, Islamic Republic of",
                        "countryCode":"IR"
                    },
                    "sameAs": [
                        "https://twitter.com/ShavazCom",
                        "https://www.linkedin.com/company/shavaz/about",
                        "https://t.me/shavazcomm",
                        "https://www.youtube.com/channel/UCh1GzMPHJXoIvTP9DtUli4",
                        "https://www.instagram.com/shavazcom"
                    ],
                    "logo":{
                        "@type":"ImageObject",
                        "inLanguage":"fa-IR",
                        "url":`${runtimeConfig.public.siteUrl}/Sign192.png`,
                        "contentUrl":`${runtimeConfig.public.siteUrl}/Sign192.png`,
                        "width":192,
                        "height":192,
                        "caption":"فروشگاه اینترنتی شاواز"
                    }
                },
                {
                    "@type": "FAQPage",
                    "mainEntity": faqArray
                }
            ]

        }

        useHead({
            title,
            meta: [{
                name: 'description',
                content: description
            }],
            script: [{
                type: 'application/ld+json',
                children: JSON.stringify(structureData)
            }]

        })

        return {
            title,
            faqList
        }
    },
}
</script>

<style>
@import '~/assets/scss/views/faq.scss';
@import '~/assets/scss/components/general/faq.scss';
</style>
