<template>
<div v-if="(items && items.length) && screenType === 'desktop'">
    <v-breadcrumbs :items="items">
        <template v-slot:title="{ item, index }">
           <template v-if="index + 1 === items.length && this.$route.name !== 'sku-slug'">
                <h1>
                    {{ item.title }}
                </h1>
           </template>
           <template v-else>
                {{ item.title }}
           </template>
        </template>
        <template v-slot:divider>
            <span>/</span>
        </template>
    </v-breadcrumbs>
</div>
</template>

<script>
export default {
    data() {
        return {
            screenType: null
        }
    },
    
    props:{
        items:Array
    },

    mounted() {
        /**
         * Check screen size
         */
        window.innerWidth < 769 ? this.screenType = 'mobile' : this.screenType = 'desktop';
    },
}
</script>

<style>
@import '~/assets/scss/components/general/breadcrumbs.scss';
</style>
