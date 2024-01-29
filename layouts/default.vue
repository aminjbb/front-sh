<template>
<v-app>
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
export default {
    name: "layout",

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
}
</script>
