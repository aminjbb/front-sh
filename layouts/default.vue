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
                <generalModalsLogin :signupStatus="!loginStatus" image="voucher-login.png" voucherImage="voucher-cart.svg" title="با ثبت نام در شاواز کد تخفیف ۵۰ هزار تومانی دریافت کنید" />
            </template>
        </div>

        <div v-else-if="screenType === 'mobile'">
            <template v-if="hasMobileHeader">
                <mobileHeader />
            </template>
            <slot />
            <template v-if="$route.name !== 'login' && $route.name !== 'forgotPassword' && $route.name !== 'welcome' && $route.name !== 'game-slug' && $route.name !== 'cart' ">
                <mobileFooter :userData="userData" />
            </template>
           <template v-if="$route.name === 'index'">
                <generalSheetsLogin :signupStatus="!loginStatus" image="voucher-login-m.png" voucherImage="voucher-cart.svg" title="با ثبت نام در شاواز کد تخفیف ۵۰ هزار تومانی دریافت کنید" />
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
            loginStatus: false,
            mobileMainHeader: false
        }
    },

    computed: {
        loading() {
            return this.$store.getters['get_loadingModal']
        },
        hasMobileHeader() {
            const allowedName = ['index', 'sku-slug', 'sku-group-slug', 'search', 'faq', 'rules-general-rules',
                'rules-how-to-trade', 'rules-information', 'rules-iranian-products', 'rules-my-orders', 'rules-office-rights', 'rules-product-return', 'rules-standard'
            ]
            // allowedName.forEach(item => {
            //     if(item === this.$route.name){
            //         this.mobileMainHeader = true
            //     }
            // });
            const hasHeader = allowedName.find(element => element == this.$route.name)
            if (hasHeader) return true
            return false
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
        },

    },

}
</script>
