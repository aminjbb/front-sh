<template>
<v-app>
    <div v-show="show">
        <div v-if="screenType === 'desktop'">
           
            <template v-if="$route.name !== 'login' && $route.name !== 'forgotPassword' && $route.name !== 'welcome' && $route.name !== 'game-slug'">
                <desktopHeader :userData="userData" />
            </template>
            <slot />
            <div id="body-cover" />

            <template v-if="$route.name !== 'login' && $route.name !== 'forgotPassword' && $route.name !== 'welcome' && $route.name !== 'game-slug'">
                <desktopFooter />
            </template>
            <template v-if="$route.name === 'index'">
                <generalModalsLogin :signupStatus="!loginStatus" image="voucher-login.svg" voucherImage="voucher-cart.svg" title="با ثبت نام در شاواز کد تخفیف ۵۰ هزار تومانی دریافت کنید"/>
            </template>
        </div>

        <div v-else-if="screenType === 'mobile'">
            <template v-if="$route.name !== 'login' && $route.name !== 'forgotPassword' && $route.name !== 'welcome' && $route.name !== 'game-slug'">
                <mobileHeader />
            </template>
            <slot />
            <template v-if="$route.name !== 'login' && $route.name !== 'forgotPassword' && $route.name !== 'welcome' && $route.name !== 'game-slug' && $route.name !== 'cart'">
                <mobileFooter :userData="userData" />
            </template>
            <template v-if="$route.name === 'index'">
                <generalSheetsLogin :signupStatus="!loginStatus" image="voucher-login.svg" voucherImage="voucher-cart.svg" title="با ثبت نام در شاواز کد تخفیف ۵۰ هزار تومانی دریافت کنید"/>
            </template>
        </div>
    </div>
</v-app>
</template>

<script>
import LoadingModal from "~/components/general/LoadingModal.vue";
import Basket from '@/composables/Basket.js'
import auth from '@/middleware/auth';

export default {
    name: "layout",

    components: {
        LoadingModal
    },

    data() {
        return {
            screenType: 'desktop',
            userData: null,
            show: false,
            loginStatus: false
        }
    },

    computed: {
        loading() {
            return this.$store.getters['get_loadingModal']
        }
    },

    setup() {
        const userToken = useCookie('userToken')
        const {
            getBasket
        } = new Basket()
        return {
            getBasket,
            userToken
        }
    },

    mounted() {
        /**
         * Check screen size
         */
        window.innerWidth < 769 ? this.screenType = 'mobile' : this.screenType = 'desktop';

        if (this.$route.name !== 'login' && this.$route.name !== 'forgotPassword' && this.$route.name !== 'game-slug') {
            this.getBasket();
        }

        this.show = true;
    },

    created() {
        this.fetchUserProfile();
    },

    methods: {
        /**
         * fetch user data
         */
        async fetchUserProfile() {
            try {
                if (this.userToken) {
                    const response = await auth.getUserProfile(this.userToken)
                    if (response.data.data) {
                        this.$store.commit('set_userData', response.data.data)
                        this.userData = response.data.data
                        this.loginStatus = true;
                    }
                } else {
                    this.loginStatus = false;
                }
            } catch (error) {
                // Handle errors
            }
        }
    }

}
</script>
