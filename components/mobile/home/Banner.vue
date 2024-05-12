<template >
<div v-if="items && items.length" class="banner banner--mobile">
    <header v-if="title" class="text-right t20 text-grey-darken-1 py-4 w500">
        {{title}}
    </header>
    <v-row>
        <v-col
            v-for="item in items"
            :key="item.id"
            :cols="generalCol"
            @click="enhanceECommerce(item)"
            :sm="col">
            <a class="banner__image d-block" :href="item.link">
                <img :src="item.image?.image_url" title="بنرهای تبلیغاتی فروشگاه شاواز" alt="بنرهای تبلیغاتی فروشگاه شاواز"  width="380" height="200" />
            </a>
        </v-col>
    </v-row>
</div>
</template>

<script>
export default {
    props: {
        /**
         * Item list
         */
        items: null,

        /**
         * Col number for show in desktop
         */
        col: {
            type: String,
            default: '6'
        },

        /**
         * Col number for show in mobile
         */
        generalCol: {
            type: String,
            default: '12'
        },

        /**
         * Section title
         */
        title: String
    },

    methods:{
         /**
         * Enhance E-commerce for Seo in Checkout Step 4 after payment
         */
         enhanceECommerce(banner){
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: 'select_banner',
                banner_name: banner.image_alt,		// name of the promo campaign
                banner_location: banner.homepage_section_id	
            });
        },
    }
}
</script>

<style scoped>
@import '~/assets/scss/components/mobile/home/banner.scss';
</style>
