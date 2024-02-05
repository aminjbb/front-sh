<template lang="">
<main class="v-about">
    <v-container>
        <div class="v-about__banner">
            <img src="~/assets/images/about-banner.jpg" class="" alt="Shavaz Logo" width="1296" height="310" title="Shavaz about us banner" />
        </div>
        <div class="v-about__info">
            <header class="t20 text-right text-grey-darken-2 pa-3 pb-3 mt-3 pr-0">
                <h1 class="t20">داستان ما</h1>
            </header>

            <p class="t14 w400 text-grey l28">
                فروشگاه اینترنتی شاواز (شرکت سلامت آوران یزدان نفیس) با معرفی و عرضه بهترین محصولات لوازم آرایشی و بهداشتی، عطر و ادکلن، بهداشت شخصی وبا 7 روز ضمانت بازگشت کالا، ارسال سریع و تضمین اصل بودن کالا تجربه‌ای متفاوت از خرید اینترنتی را برای شما ایجاد خواهد کرد. ما در فروشگاه اینترنتی شاواز دنیایی از محصولات و برندهای مختلف را در کنار هم جمع کرده‌ایم که دسترسی شما را به طیف وسیعی از لوازم آرایشی و بهداشتی مناسب خانم‌ها و آقایان راحت‌تر کرده است.
            </p>
            <p class="t14 w400 text-grey l28">
                بهره‌گیری از توضیحات دقیق و کامل، تضمین بهترین قیمت و پشتیبانی سریع بخشی از خدماتی است که ما در فروشگاه اینترنتی شاواز فراهم کرده‌ایم که در نهایت باعث می‌شود تا شما بتوانید در زمان خرید اینترنتی لوازم آرایشی و بهداشتی محصول مورد نظر خود را به راحتی انتخاب کنید
            </p>
            <p class="t14 w400 text-grey l28">
                یکی دیگر از ویژگی‌های منحصر به فرد فروشگاه اینترنتی شاواز تخفیف روزانه در قالب استند، حراج‌های هفتگی و ماهیانه و انواعی از پیشنهادهای ویژه است که در نهایت خرید اینترنتی را برای شما بسیار لذت ‌بخش‌تر خواهد کرد.
            </p>
        </div>

        <div class="v-about__values">
            <header class="pa-3 pb-5 pr-0 mt-4">
               <h2 class="t20 text-right text-grey-darken-2"> ارزش‌های شاواز</h2>
            </header>

            <generalAboutOurValues />
        </div>

        <div class="v-about__progress">
            <header class="pa-3 pb-5 pr-0 mt-5">
               <h2 class="t20 text-right text-grey-darken-2"> مسیر شاواز</h2>
            </header>

            <div class="v-about__progress__image d-flex justify-center">
                <img src="~/assets/images/about-progress.jpg" class="" alt="Shavaz Logo" width="988" height="570" title="Shavaz about us banner" />
            </div>
        </div>
    </v-container>
</main>
</template>

<script>
export default {
    setup(props) {
        const title = ref('فروشگاه اینترنتی شاواز | درباره ما')
        const description = ref("آنچه باید درباره شاواز بدانید | فروشگاه اینترنتی شاواز (شرکت سلامت آوران یزدان نفیس) با معرفی و عرضه بهترین محصولات لوازم آرایشی و بهداشتی، عطر و ادکلن، بهداشت شخصی وبا 7 روز ضمانت بازگشت کالا، ارسال سریع و تضمین اصل بودن کالا تجربه‌ای متفاوت از خرید اینترنتی را برای شما ایجاد خواهد کرد.")

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

<style scoped>
@import '~/assets/scss/views/about.scss';
</style>
