<template>
<v-app>
    <LoadingModal v-if="loading" />
    <div v-if="screenType !== null">

        <template v-if="screenType === 'desktop'">
            <desktopHeader />
            <slot />
            <div id="body-cover" />
            <desktopFooter />
        </template>

        <template v-else-if="screenType === 'mobile'">
            <mobileHeader />
            <slot />
            <mobileFooter />
        </template>
    </div>
</v-app>
</template>

<script>
import LoadingModal from "~/components/general/LoadingModal.vue";

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

    mounted() {
        /**
         * Check screen size
         */
        window.innerWidth < 769 ? this.screenType = 'mobile' : this.screenType = 'desktop';
    },

    computed: {
        loading() {
            return this.$store.getters['get_loadingModal']
        }
    }
}
</script>
