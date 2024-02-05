<template lang="">
<main class="v-faq">
    <h1 class="ov-h h-0">سوالات متداول</h1>
    
    <v-container>
        <generalBreadcrumb :items="BreadcrumbItems"/>

        <div>
            <v-expansion-panels class="accordion">
                <v-expansion-panel v-for="faq in faqList" :key="faq.id">
                    <v-expansion-panel-title class="accordion__header">
                       <h2 class="pa-a ma-0 t13 w500 text-grey-darken-2"> {{faq.title}}</h2>
                    </v-expansion-panel-title>

                    <v-expansion-panel-text v-if="faq.items && faq.items.length" class="accordion__items">
                        <v-expansion-panels
                            class="mb-2"
                            v-for="item in faq.items"
                            :key="item.id">
                            <v-expansion-panel>
                                <v-expansion-panel-title class="accordion__items__header">
                                    <h3 class="pa-a ma-0 t13 w400 text-grey-darken-3"> {{item.title}}</h3>
                                </v-expansion-panel-title>

                                <v-expansion-panel-text class="accordion__items__content">
                                    <p class="pa-a ma-0 t14 w400 l27 text-grey-darken-3">
                                        {{item.text}}
                                    </p>
                                </v-expansion-panel-text>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
        </div>
    </v-container>
</main>
</template>

<script>
export default {
    data() {
        return {
            faqList: [{
                    id: 'fwef',
                    title: 'چطور می‌توانم سفارشم را پیگیری کنم؟',
                    
                    items: [{
                            id: 'fwwqwef',
                            title: 'میتوانم سفارشم را بصورت اقساطی ( اعتباری ) پرداخت کنم؟',
                            text: 'در صورتی که منتظر دریافت سفارش خود از طریق پست هستید، می‌توانید مرسوله را از طریق سایت شرکت پست به آدرس زیر پیگیری کنید: https://tracking.post.ir/ شماره مرسوله ۲۴ رقمی پست برای شما از طریق پیامک ارسال شده و همچنین می‌توانید با مراجعه به حساب کاربری‌تان اطلاعات را دریافت کنید.'
                        },
                        {
                            id: '5416',
                            title: 'میتوانم سفارشم را بصورت اقساطی ( اعتباری ) پرداخت کنم؟',
                            text: 'در صورتی که منتظر دریافت سفارش خود از طریق پست هستید، می‌توانید مرسوله را از طریق سایت شرکت پست به آدرس زیر پیگیری کنید: https://tracking.post.ir/ شماره مرسوله ۲۴ رقمی پست برای شما از طریق پیامک ارسال شده و همچنین می‌توانید با مراجعه به حساب کاربری‌تان اطلاعات را دریافت کنید.'
                        },
                        {
                            id: 'rth',
                            title: 'میتوانم سفارشم را بصورت اقساطی ( اعتباری ) پرداخت کنم؟',
                            text: 'در صورتی که منتظر دریافت سفارش خود از طریق پست هستید، می‌توانید مرسوله را از طریق سایت شرکت پست به آدرس زیر پیگیری کنید: https://tracking.post.ir/ شماره مرسوله ۲۴ رقمی پست برای شما از طریق پیامک ارسال شده و همچنین می‌توانید با مراجعه به حساب کاربری‌تان اطلاعات را دریافت کنید.'
                        }
                    ]
                },
                {
                    id: 'rwr',
                    title: 'چطور میتوانم بدون برقراری تماس، درخواست مرجوعی کالای خریداری شده را اعلام کنم؟',
                    items: [{
                        id: 'kko',
                        title: 'میتوانم سفارشم را بصورت اقساطی ( اعتباری ) پرداخت کنم؟',
                        text: 'در صورتی که منتظر دریافت سفارش خود از طریق پست هستید، می‌توانید مرسوله را از طریق سایت شرکت پست به آدرس زیر پیگیری کنید: https://tracking.post.ir/ شماره مرسوله ۲۴ رقمی پست برای شما از طریق پیامک ارسال شده و همچنین می‌توانید با مراجعه به حساب کاربری‌تان اطلاعات را دریافت کنید.'
                    }, ]
                },
                {
                    id: 'our',
                    title: 'میتوانم بعد از فاکتور شدن سفارش درخواست تغییر در مندرجات فاکتور را بدهم ؟',
                },
                {
                    id: 'wqq',
                    title: 'سفارشم را بصورت اینترنتی پرداخت نمودم ، وجه از حسابم کسر شده اما پرداخت سفارشم تایید نشده است؟',
                },
            ],

            BreadcrumbItems:[{
                title:'خانه',
                href:'/'
            },
            {
                title:'سوالات متدوال',
                href:'/faq'
            }]
        }
    },
    setup(props) {
        const title = ref('فروشگاه اینترنتی شاواز | سوالات متداول')
        const description = ref("سوالات متداول و پرسش های پرتکرار از فروشگاه اینترنتی شاواز")

        useHead({
            title,
            meta: [{
                name: 'description',
                content: description
            }]
        })

        return{title}
    },
}
</script>

<style>
@import '~/assets/scss/views/faq.scss';
@import '~/assets/scss/components/general/faq.scss';
</style>
