<template>
<client-only>
    <v-main class="v-rules">
        <v-container>
            <v-row>
                <v-col cols="12" md="3">
                    <generalRulesMenu />
                </v-col>
                <v-col cols="12" md="9">
                    <generalRulesContent :content="content" title="نحوه ی معاملات" />
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</client-only>
</template>

<script>
export default {
    data() {
        return {
            content: "روز کاری به معنی روز شنبه تا پنج شنبه هر هفته، به استثنای تعطیلات عمومی در ایران است و کلیه سفارش‏‌های ثبت شده در طول روزهای کاری و اولین روز پس از تعطیلات پردازش می‌‏شوند. شاواز به مشتریان خود در ۷ روز هفته و ۲۴ ساعت در روز امکان سفارش‌‏گذاری می‌‏دهد.<br>کلیه سفارش‌‏های ثبت شده در سایت شاواز به وسیله ارسال کد سفارش از طریق پیام کوتاه و پیش فاکتور از طریق ایمیل، در صف پردازش قرار می‏‌گیرند. شاواز همواره در ارسال و تحویل کلیه سفارش‌‏های ثبت شده، نهایت دقت و تلاش خود را می‏‌نماید. با وجود این، در صورتی که موجودی محصولی در شاواز به پایان برسد، حتی پس از اقدام مشتری به سفارش‌‏گذاری، حق کنسل کردن آن سفارش و یا استرداد وجه سفارش برای شاواز محفوظ است .>br>شاواز مجاز است بدون اطلاع قبلی نسبت به توقف سفارش‌‏گیری جدید، اقدام و فروش خود را متوقف کند و کلیه سفارش‌‏های ثبت شده قبل از توقف سفارش‌‏گیری، پردازش و ارسال می‌‏شود. حق قطع فروش کلیه و یا بخشی از محصولات به هر دلیلی مانند اتمام موجودی کالا بدون اطلاع قبلی، برای شاواز محفوظ است.<br>کاربران باید هنگام سفارش کالای مورد نظر خود، فرم سفارش را با اطلاعات صحیح و به طور کامل تکمیل کنند. بدیهی است درصورت ورود اطلاعات ناقص یا نادرست، سفارش کاربر قابل پیگیری و تحویل نخواهد بود. مشتریان می‌توانند نام، آدرس و تلفن شخص دیگری را برای تحویل گرفتن سفارش وارد کنند و اگر مبلغ سفارش از پیش پرداخت شده باشد، تحویل گیرنده سفارش هنگام دریافت کالا باید کارت شناسایی همراه داشته باشد.<br>متاسفانه در حال حاضر برای پرداخت سفارش فقط پرداخت به صورت آنلاین امکان پذیر است."
        }
    },

    setup() {
        const title = ref('فروشگاه اینترنتی شاواز | قوانین - نحوه ی معاملات')
        const description = ref("بخش قوانی شاواز ، نحوه ی معاملات شاواز ")

        useHead({
            title,
            meta: [{
                name: 'description',
                content: description
            }]
        })
    },
}
</script>

<style>
@import '~/assets/scss/views/rules.scss';
</style>
