<template>
<client-only>
    <v-main class="v-rules">
        <v-container>
            <v-row>
                <v-col cols="12" md="3">
                    <generalRulesMenu />
                </v-col>
                <v-col cols="12" md="9">
                    <generalRulesContent :content="content" title="استاندارد" />
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
            content: "شاواز همواره نهایت تلاش خود را می‏‌کند تا کلیه سفارش‏‌ها در نهایت صحت و بدون آسیب به دست مشتریان خود در سراسر کشور برسد. با توجه به بسته بندی ایمن و استاندارد همه مرسولات، تحویل به هر یک از شرکت‌‏های حمل و نقل معتبر به انتخاب کاربر و اعلام بارنامه مرسوله (درج در سبد خرید و اطلاع رسانی از طریق سرویس پیام کوتاه) به این معنی است که بروز هر گونه حادثه در هنگام حمل و تحویل به عهده شرکت حمل و نقل است و شاواز تنها در صورت تایید شرکت حمل کننده سفارش و در راستای تسهیل امور پیگیری، خسارت را جبران می‌‏کند.<br>در صورت مشاهده آسیب دیدگی کارتن در فرایند حمل و نقل از تحویل گرفتن آن خودداری شود و بلافاصله به امورمشتریان شاواز از طریق تماس تلفنی و یا ثبت تیکت در پروفایل شخصی اعلام شود."
        }
    },

    setup() {
        const title = ref('فروشگاه اینترنتی شاواز | قوانین - استاندارد')
        const description = ref("بخش قوانی شاواز ، استاندارد شاواز")

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
