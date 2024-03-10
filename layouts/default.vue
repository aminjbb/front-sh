<template>
<v-app>
    <LoadingModal v-if="loading" />
    <div v-if="screenType !== null">
        <template v-if="screenType === 'desktop'">
            <desktopHeader v-if="$route.name !== 'login' && $route.name !== 'forgotPassword'" :userData="userData" />

            <slot />
            <div id="body-cover" />
            <desktopFooter v-if="$route.name !== 'login' && $route.name !== 'forgotPassword'" />
        </template>

        <template v-else-if="screenType === 'mobile'">
            <mobileHeader v-if="$route.name !== 'login' && $route.name !== 'forgotPassword'" />
            <slot />
            <mobileFooter v-if="$route.name !== 'login' && $route.name !== 'forgotPassword'" :userData="userData" />
        </template>
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
            screenType: null,
            userData: null,
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
        if (this.$route.name !== 'login' && this.$route.name !== 'forgotPassword') {
            this.getBasket();
        }
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
                const response = await auth.getUserProfile(this.userToken)
                if (response.data.data) {
                    this.$store.commit('set_userData', response.data.data)
                    this.userData = response.data.data

                }
            } catch (error) {
                // Handle errors
            }
        }
    }

}
</script>
