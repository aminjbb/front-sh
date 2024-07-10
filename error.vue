<template>
<div v-if="screenType !== null">
    <template v-if="screenType === 'desktop'">
        <desktopHeader />
        <template v-if="error.statusCode === 404">
            <main class="v-error">
                <img src="~/assets/images/404.jpg" class="mb-5" alt="Shavaz 404 error image" width="152" height="169">
                <h1>متاسفانه صفحه مورد نظر یافت نشد</h1>
                <v-btn
                    href="/"
                    color="primary"
                    title="بازگشت به صفحه اصلی"
                    class="header__login-btn mt-5"
                    >
                    بازگشت به صفحه اصلی
                </v-btn>
            </main>
        </template>
        <div id="body-cover" />
        <desktopFooter />
    </template>

    <template v-else-if="screenType === 'mobile'">
        <mobileHeader />
        <template v-if="error.statusCode === 404">
            <main class="v-error">
                <img src="~/assets/images/404.jpg" class="mb-5" alt="Shavaz 404 error image" width="152" height="169">
                <h1>متاسفانه صفحه مورد نظر یافت نشد</h1>
                <v-btn
                    href="/"
                    color="primary"
                    title="بازگشت به صفحه اصلی"
                    class="header__login-btn mt-5 mb-10"
                    >
                    بازگشت به صفحه اصلی
                </v-btn>
            </main>
        </template>
        <mobileFooter />
    </template>
</div>
</template>

<script>
export default {
    name: "layout",

    data() {
        return {
            screenType: null
        }
    },

    setup() {
        const error = useError();
        return {
            error
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

.v-error {
    padding-bottom: 60px;
    padding-top: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    @include gbp (0, 768) {
        padding-bottom: 60px;
        padding-top: 0 !important;
    }

    img {
        width: 152px;
    }

    h1 {
        font-size: 17px;
        font-weight: 500;
        line-height: 45px;
        font-family: 'Morabba' !important;
        color: #616161;
    }

    .v-btn__content{
        letter-spacing:0;
        font-weight: 500;
        font-family: 'Morabba' !important;
    }
}
</style>
