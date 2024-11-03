<template>
<div v-if="(items && items.length) && screenType === 'desktop'">
    <v-breadcrumbs :items="items">
        <template v-slot:title="{ item, index }">
           <template v-if="index + 1 === items.length && this.$route.name !== 'sku-slug'">
                <span class="d-flex align-center text-sGrayDarken2 t12 w700">
                    <span v-if="icon" class="ml-2 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M2.9165 5.83329H4.08317C5.24984 5.83329 5.83317 5.24996 5.83317 4.08329V2.91663C5.83317 1.74996 5.24984 1.16663 4.08317 1.16663H2.9165C1.74984 1.16663 1.1665 1.74996 1.1665 2.91663V4.08329C1.1665 5.24996 1.74984 5.83329 2.9165 5.83329Z" stroke="#3C3C3C" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M9.9165 5.83329H11.0832C12.2498 5.83329 12.8332 5.24996 12.8332 4.08329V2.91663C12.8332 1.74996 12.2498 1.16663 11.0832 1.16663H9.9165C8.74984 1.16663 8.1665 1.74996 8.1665 2.91663V4.08329C8.1665 5.24996 8.74984 5.83329 9.9165 5.83329Z" stroke="#3C3C3C" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M9.9165 12.8333H11.0832C12.2498 12.8333 12.8332 12.25 12.8332 11.0833V9.91663C12.8332 8.74996 12.2498 8.16663 11.0832 8.16663H9.9165C8.74984 8.16663 8.1665 8.74996 8.1665 9.91663V11.0833C8.1665 12.25 8.74984 12.8333 9.9165 12.8333Z" stroke="#3C3C3C" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M2.9165 12.8333H4.08317C5.24984 12.8333 5.83317 12.25 5.83317 11.0833V9.91663C5.83317 8.74996 5.24984 8.16663 4.08317 8.16663H2.9165C1.74984 8.16663 1.1665 8.74996 1.1665 9.91663V11.0833C1.1665 12.25 1.74984 12.8333 2.9165 12.8333Z" stroke="#3C3C3C" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </span>
                    {{ item.title }}
                </span>
           </template>
           <template v-else>
                {{ item.title }}
           </template>
        </template>
        <template v-slot:divider>
            <span class="w700">/</span>
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
        items:Array,
        icon: Boolean
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
