<template>
<client-only>
    <v-main class="v-rules">
        <v-container>
            <v-row>
                <v-col cols="12" md="3">
                    <generalRulesMenu />
                </v-col>
                <v-col cols="12" md="9">
                    <generalRulesContent :content="content" title="سفارش های من" />
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
            content: "روز کاری به معنی روز شنبه تا پنج شنبه هر هفته، به استثنای تعطیلات عمومی در ایران است و کلیه سفارش‏‌های ثبت شده در طول روزهای کاری و اولین روز پس از تعطیلات پردازش می‌‏شوند. شاواز به مشتریان خود در ۷ روز هفته و ۲۴ ساعت در روز امکان سفارش‌‏گذاری می‌‏دهد.<br>کلیه سفارش‌‏های ثبت شده در سایت شاواز به وسیله ارسال کد سفارش از طریق پیام کوتاه و پیش فاکتور از طریق ایمیل، در صف پردازش قرار می‏‌گیرند. شاواز همواره در ارسال و تحویل کلیه سفارش‌‏های ثبت شده، نهایت دقت و تلاش خود را می‏‌نماید. با وجود این، در صورتی که موجودی محصولی در شاواز به پایان برسد، حتی پس از اقدام مشتری به سفارش‌‏گذاری، حق کنسل کردن آن سفارش و یا استرداد وجه سفارش برای شاواز محفوظ است ."
        }
    },

    setup() {
        const title = ref('فروشگاه اینترنتی شاواز | قوانین - سفارش های من')
        const description = ref("بخش قوانی شاواز ، سفارش های من شاواز")

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
