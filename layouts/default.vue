<template>
<v-app>
    <LoadingModal v-if="loading" />
    <div v-if="screenType !== null">
        <template v-if="screenType === 'desktop'">
            <desktopHeader v-if="$route.name !== 'login' && $route.name !== 'forgotPassword'" />

            <slot />
            <div id="body-cover" />
            <desktopFooter v-if="$route.name !== 'login' && $route.name !== 'forgotPassword'" />
        </template>

        <template v-else-if="screenType === 'mobile'">
            <mobileHeader v-if="$route.name !== 'login' && $route.name !== 'forgotPassword'" />
            <slot />
            <mobileFooter v-if="$route.name !== 'login' && $route.name !== 'forgotPassword'" />
        </template>
    </div>
</v-app>
</template>

<script>
import LoadingModal from "~/components/general/LoadingModal.vue";
import Basket from '@/composables/Basket.js'

export default {
    name: "layout",

    components: {
        LoadingModal
    },

    data() {
        return {
            screenType: null
        }
    },

    computed: {
        loading() {
            return this.$store.getters['get_loadingModal']
        }
    },

    setup() {
        const {
            getBasket
        } = new Basket()
        return {
            getBasket
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
    }

}
</script>
